import type { Metadata } from 'next'
import { connection } from 'next/server'
import InvoiceGenerator from '@/components/InvoiceGenerator'
import { newInvoiceDraft } from '@/lib/invoice'

export const metadata: Metadata = {
  title: 'Invoices & quotations | Varnam',
  robots: { index: false, follow: false },
}

export default async function InvoicesPage() {
  await connection()
  return <InvoiceGenerator initialDraft={newInvoiceDraft()} />
}
