export type DocumentKind = 'Quotation' | 'Invoice'

export interface InvoiceDraft {
  kind: DocumentKind
  customer: string
  amount: string
  description: string
  address: string
  notes: string
  date: string
  reference: string
}

export const agency = {
  name: 'Varnam',
  tagline: 'Painting and Designs',
  address: ['Peringilipuram Nandanam, Peringilipuram,', 'Ennakkad, Kerala 689624'],
  phone: '+91 9526100862 / +91 9656200862',
  website: 'www.varnampainting.com',
}

export function formatAmount(amount: string) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(amount) || 0)
}

export function newInvoiceDraft(): InvoiceDraft {
  const now = new Date()
  const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
  return {
    kind: 'Quotation', customer: '', amount: '', description: '', address: '', notes: '', date,
    reference: `VAR-${date.replaceAll('-', '')}-${createReferenceId()}`,
  }
}

function createReferenceId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID().slice(0, 8).toUpperCase()
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(4)
    crypto.getRandomValues(bytes)
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase()
  }
  return Math.random().toString(16).slice(2, 10).toUpperCase()
}

export function validateInvoice(draft: InvoiceDraft): string | null {
  if (!draft.customer.trim()) return 'Enter the customer name.'
  if (!/^\d+(\.\d{1,2})?$/.test(draft.amount) || Number(draft.amount) <= 0 || Number(draft.amount) > 99999999.99) {
    return 'Enter an amount between ₹0.01 and ₹9,99,99,999.99, with up to two decimal places.'
  }
  if (!draft.reference.trim()) return 'Enter a document number.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date) || !Number.isFinite(Date.parse(`${draft.date}T12:00:00`))) return 'Choose a valid date.'
  return null
}
