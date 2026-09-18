import { agency, formatAmount, validateInvoice, type InvoiceDraft } from './invoice'

const PAGE = { width: 620, height: 877, left: 44, right: 576 }

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('The Varnam logo could not be loaded.'))
    image.src = src
  })
}

/** Render the branded invoice preview to a canvas, then place that exact page in jsPDF. */
export async function generateInvoicePdf(draft: InvoiceDraft) {
  const error = validateInvoice(draft)
  if (error) throw new Error(error)
  const { jsPDF } = await import('jspdf')
  const logo = await loadImage('/images/branding/varnam-logo.png')
  const canvas = document.createElement('canvas')
  const scale = 2
  canvas.width = PAGE.width * scale
  canvas.height = PAGE.height * scale
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser could not create the PDF canvas.')
  ctx.scale(scale, scale)
  const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true })
  pdf.setProperties({ title: `${draft.kind} ${draft.reference}`, author: 'Varnam Painting and Designs' })
  const previews: string[] = []
  const bodyFont = getComputedStyle(document.body).fontFamily || 'Arial, sans-serif'
  const serifFont = getComputedStyle(document.documentElement).getPropertyValue('--font-serif').trim() || 'Georgia, serif'
  const sansFont = getComputedStyle(document.documentElement).getPropertyValue('--font-sans').trim() || bodyFont
  const malayalamFont = getComputedStyle(document.documentElement).getPropertyValue('--font-mlm').trim() || 'sans-serif'
  const font = `${malayalamFont}, Arial, ${sansFont}`
  const serif = `Georgia, ${serifFont}`
  const colors = { ink: '#17211f', teal: '#0F766E', muted: '#53635d', light: '#EFF5F1', line: '#B9C9C1', paleLine: '#D7DED9' }
  const text = (value: string, x: number, y: number, size = 12, color = colors.ink, weight = '400', family = font) => {
    ctx.font = `${weight} ${size}px ${family}`
    ctx.fillStyle = color
    ctx.textBaseline = 'top'
    ctx.fillText(value, x, y)
  }
  const rule = (y: number, color = colors.line) => { ctx.fillStyle = color; ctx.fillRect(PAGE.left, y, PAGE.right - PAGE.left, 1) }
  const wrap = (value: string, maxWidth: number, size: number, weight = '400', family = font) => {
    ctx.font = `${weight} ${size}px ${family}`
    const lines: string[] = []
    for (const sourceLine of value.split('\n')) {
      let line = ''
      for (const word of sourceLine.split(/\s+/)) {
        const candidate = line ? `${line} ${word}` : word
        if (ctx.measureText(candidate).width <= maxWidth || !line) line = candidate
        else { lines.push(line); line = word }
      }
      lines.push(line)
    }
    return lines.filter(Boolean)
  }

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, PAGE.width, PAGE.height)
  ctx.drawImage(logo, 36, 24, 90, 90)
  text(agency.name, 145, 34, 22, colors.ink, '700', serif)
  text(agency.tagline, 145, 61, 9, colors.teal, '700')
  agency.address.forEach((line, index) => text(line, 145, 80 + index * 13, 8, colors.muted))
  text(`${agency.phone}  |  ${agency.website}`, 145, 111, 8, colors.muted)
  text(draft.kind.toUpperCase(), 465, 37, 9, colors.teal, '700')
  text(draft.reference, 465, 56, 8, colors.muted)
  rule(140)
  text(draft.kind === 'Quotation' ? 'PREPARED FOR' : 'BILL TO', 44, 164, 8, colors.muted, '700')
  text(draft.customer.trim(), 44, 180, 16, colors.ink, '700', serif)
  if (draft.address.trim()) wrap(draft.address.trim(), 280, 8).slice(0, 3).forEach((line, index) => text(line, 44, 203 + index * 12, 8, colors.muted))
  text('ISSUE DATE', 448, 164, 8, colors.muted, '700')
  const date = new Date(`${draft.date}T12:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  text(date, 448, 180, 14, colors.teal, '700')
  rule(232, colors.paleLine)

  let y = 252
  ctx.fillStyle = colors.light; ctx.fillRect(PAGE.left, y, PAGE.right - PAGE.left, 30)
  rule(y)
  text('No.', 52, y + 9, 9, colors.muted, '700')
  text('Description of services', 88, y + 9, 9, colors.muted, '700')
  text('Amount (INR)', 451, y + 9, 9, colors.muted, '700')
  y += 30; rule(y)
  const descriptionLines = wrap(draft.description.trim() || 'Painting and design services', 330, 11)
  const rowHeight = Math.max(42, descriptionLines.length * 17 + 20)
  ctx.strokeStyle = '#D1D5DB'; ctx.lineWidth = 0.6
  for (const x of [44, 78, 432, 576]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + rowHeight); ctx.stroke() }
  text('1', 55, y + 10, 10)
  descriptionLines.forEach((line, index) => text(line, 88, y + 9 + index * 17, 11, colors.ink))
  const amount = formatAmount(draft.amount)
  ctx.font = `400 11px ${font}`
  text(amount, 568 - ctx.measureText(amount).width, y + 10, 11, colors.ink)
  y += rowHeight; rule(y)

  y += 18
  text('Total amount', 355, y, 11, colors.muted, '700')
  text('INR', 355, y + 18, 7, colors.muted, '700')
  ctx.font = `700 20px ${serif}`
  text(amount, 576 - ctx.measureText(amount).width, y + 8, 20, colors.teal, '700', serif)
  y += 64; rule(y)
  if (draft.notes.trim()) {
    y += 18; text('NOTES', 44, y, 8, colors.muted, '700'); y += 16
    wrap(draft.notes.trim(), 532, 10).slice(0, 6).forEach(line => { text(line, 44, y, 10, colors.ink); y += 15 })
  }
  if (draft.kind === 'Quotation') { y += 16; text('This quotation is an estimate, not a payment receipt.', 44, y, 9, colors.muted) }
  const signatureY = Math.max(y + 58, 710)
  text('For Varnam Painting and Designs', 365, signatureY, 9, colors.ink)
  text('Authorised signatory', 410, signatureY + 48, 9, colors.muted)
  rule(810, colors.paleLine)
  text('Thank you for choosing Varnam.', 44, 829, 9, colors.muted)
  text('Page 1', 530, 829, 9, colors.muted)

  const image = canvas.toDataURL('image/jpeg', 0.96)
  previews.push(image)
  pdf.addImage(image, 'JPEG', 0, 0, 595.28, 841.89)
  const filename = `${draft.kind.toLowerCase()}-${draft.reference.replace(/[^a-zA-Z0-9_-]/g, '-')}.pdf`
  const blob = pdf.output('blob')
  const file = typeof File === 'function' ? new File([blob], filename, { type: 'application/pdf' }) : Object.assign(blob, { name: filename, lastModified: Date.now() })
  return { file: file as File, previews }
}
