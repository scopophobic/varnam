import { agency, formatAmount, validateInvoice, type InvoiceDraft } from './invoice'

/** Render with browser fonts so customer names in Malayalam also survive export. */
export async function generateInvoicePdf(draft: InvoiceDraft) {
  const error = validateInvoice(draft)
  if (error) throw new Error(error)
  const { jsPDF } = await import('jspdf')
  await document.fonts.ready
  const sample = `${draft.customer} ${draft.description} ${draft.address} ${draft.notes}`
  const bodyFont = getComputedStyle(document.body).fontFamily
  const malayalamFont = getComputedStyle(document.documentElement).getPropertyValue('--font-mlm').trim() || 'sans-serif'
  const font = `Arial, ${malayalamFont}, ${bodyFont}`
  const logo = new Image()
  logo.src = '/images/branding/varnam-logo.png'
  await Promise.all([document.fonts.load(`14px ${font}`, sample), logo.decode()])

  const canvas = document.createElement('canvas')
  canvas.width = 1240
  canvas.height = 1754
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser could not create the PDF. Please try another browser.')
  ctx.scale(2, 2)
  const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true })
  pdf.setProperties({ title: `${draft.kind} ${draft.reference}`, author: 'Varnam Painting and Designs' })
  const previews: string[] = []
  let y = 0
  let page = 1
  const text = (value: string, x: number, top: number, size = 12, color = '#111827', weight = '400') => {
    ctx.font = `${weight} ${size}px ${font}`
    ctx.fillStyle = color
    ctx.textBaseline = 'top'
    ctx.fillText(value, x, top)
  }
  const rule = (top: number) => {
    ctx.fillStyle = '#D1D5DB'
    ctx.fillRect(44, top, 532, 1)
  }
  const startPage = () => {
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, 620, 877)
    ctx.drawImage(logo, 36, 24, 90, 90)
    text(agency.name, 145, 34, 22, '#111827', '700')
    text(agency.tagline, 145, 61, 10, '#0F766E', '600')
    agency.address.forEach((line, index) => text(line, 145, 80 + index * 14, 9, '#4B5563'))
    text(`${agency.phone}  ·  ${agency.website}`, 145, 111, 8, '#4B5563')
    text(draft.kind.toUpperCase(), 465, 37, 12, '#0F766E', '700')
    text(draft.reference, 465, 58, 8, '#4B5563')
    rule(140)
    const date = new Date(`${draft.date}T12:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    text(draft.kind === 'Quotation' ? 'PREPARED FOR' : 'BILL TO', 44, 165, 8, '#4B5563', '600')
    text(draft.customer.trim(), 44, 180, 16, '#111827', '600')
    text('ISSUE DATE', 448, 165, 8, '#4B5563', '600')
    text(date, 448, 180, 14, '#111827', '700')
    y = 225
  }
  const finishPage = () => {
    rule(810)
    text('Thank you for choosing Varnam.', 44, 829, 10, '#4B5563')
    text(`Page ${page}`, 530, 829, 9, '#4B5563')
    const jpeg = canvas.toDataURL('image/jpeg', 0.94)
    previews.push(jpeg)
    pdf.addImage(jpeg, 'JPEG', 0, 0, 595.28, 841.89)
  }
  const ensureSpace = (height: number) => {
    if (y + height <= 778) return
    finishPage()
    pdf.addPage()
    page += 1
    startPage()
  }
  const tableHeader = () => {
    ctx.fillStyle = '#F3F4F6'
    ctx.fillRect(44, y, 532, 30)
    rule(y)
    text('No.', 52, y + 9, 10, '#111827', '600')
    text('Description of services', 88, y + 9, 10, '#111827', '600')
    text('Amount (INR)', 446, y + 9, 10, '#111827', '600')
    y += 30
    rule(y)
  }
  // Wrap by grapheme to handle long addresses and names without cutting glyphs.
  const paragraph = (value: string, size = 13, color = '#111827', weight = '400', x = 44, width = 530, table = false) => {
    const measure = (value: string) => {
      ctx.font = `${weight} ${size}px ${font}`
      return ctx.measureText(value).width
    }
    const segments = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    const emit = (line: string) => {
      if (table && y + size * 1.8 > 778) {
        rule(y)
        ensureSpace(size * 1.8)
        tableHeader()
      } else {
        ensureSpace(size * 1.8)
      }
      if (table) {
        ctx.strokeStyle = '#D1D5DB'
        ctx.lineWidth = 0.6
        for (const edge of [44, 78, 432, 576]) {
          ctx.beginPath(); ctx.moveTo(edge, y); ctx.lineTo(edge, y + size * 1.8); ctx.stroke()
        }
      }
      text(line, x, y, size, color, weight)
      y += size * 1.8
    }
    for (const line of value.split('\n')) {
      let current = ''
      for (const word of line.split(/\s+/)) {
        const candidate = current ? `${current} ${word}` : word
        if (measure(candidate) <= width) { current = candidate; continue }
        if (current) { emit(current); current = '' }
        for (const { segment } of segments.segment(word)) {
          if (measure(current + segment) > width && current) {
            emit(current)
            current = ''
          }
          current += segment
        }
      }
      emit(current)
    }
  }
  startPage()
  // Customer and date are part of the compact header above.
  if (draft.address.trim()) paragraph(draft.address.trim(), 9, '#4B5563', '400', 44, 265)
  y += 18
  ensureSpace(110)
  tableHeader()
  text('1', 55, y + 5, 11)
  ctx.font = `400 11px ${font}`
  const amount = formatAmount(draft.amount)
  text(amount, 564 - ctx.measureText(amount).width, y + 5, 11)
  paragraph(draft.description.trim() || 'Painting and design services', 12, '#111827', '400', 88, 332, true)
  rule(y)
  y += 20
  ensureSpace(65)
  text('Total amount', 335, y, 12, '#111827', '700')
  ctx.font = `700 16px ${font}`
  text(amount, 576 - ctx.measureText(amount).width, y + 23, 16, '#111827', '700')
  y += 60
  rule(y)
  y += 24
  if (draft.notes.trim()) {
    ensureSpace(65)
    paragraph('Notes', 10, '#4B5563')
    paragraph(draft.notes.trim(), 11)
    y += 15
  }
  if (draft.kind === 'Quotation') paragraph('This quotation is an estimate, not a payment receipt.', 10, '#4B5563')
  ensureSpace(110)
  y += 28
  text('For Varnam Painting and Designs', 365, y, 10)
  y += 48
  text('Authorised signatory', 410, y, 10, '#4B5563')
  finishPage()
  const filename = `${draft.kind.toLowerCase()}-${draft.reference.replace(/[^a-zA-Z0-9_-]/g, '-')}.pdf`
  return { file: new File([pdf.output('blob')], filename, { type: 'application/pdf' }), previews }
}
