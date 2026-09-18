'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { agency, formatAmount, newInvoiceDraft, validateInvoice, type InvoiceDraft } from '@/lib/invoice'
import styles from './InvoiceGenerator.module.css'

type GeneratedDocument = { file: File; previews: string[]; url: string }

export default function InvoiceGenerator({ initialDraft }: { initialDraft: InvoiceDraft }) {
  const [draft, setDraft] = useState(initialDraft)
  const [generated, setGenerated] = useState<GeneratedDocument | null>(null)
  const [busy, setBusy] = useState(false)
  const [sharing, setSharing] = useState(false)
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const previewRef = useRef<HTMLElement>(null)
  const pdfRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!generated) return
    return () => URL.revokeObjectURL(generated.url)
  }, [generated])

  function update<K extends keyof InvoiceDraft>(key: K, value: InvoiceDraft[K]) {
    setDraft(previous => ({ ...previous, [key]: value }))
    setGenerated(null)
    setError('')
    setMessage('')
  }

  async function generate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft || busy) return
    const validation = validateInvoice(draft)
    if (validation) { setError(validation); return }
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const { generateInvoicePdf } = await import('@/lib/invoice-pdf')
      const result = await generateInvoicePdf(draft)
      setGenerated({ ...result, url: URL.createObjectURL(result.file) })
      setMessage('PDF ready. Check the preview, then share or download.')
      requestAnimationFrame(() => previewRef.current?.focus())
    } catch (cause) {
      console.error('Invoice PDF generation failed', cause)
      const detail = cause instanceof Error ? cause.message : 'The browser stopped the PDF export.'
      setError(`Could not create the PDF. ${detail} Please try again or use a recent version of Safari or Chrome.`)
    } finally {
      setBusy(false)
    }
  }

  async function share() {
    if (!generated || sharing) return
    setError('')
    // The file is prepared before this tap, preserving mobile share activation.
    if (!navigator.share || typeof File !== 'function' || !(generated.file instanceof File) || !navigator.canShare?.({ files: [generated.file] })) {
      pdfRef.current?.click()
      setMessage('The PDF is open. Use your phone’s Share or Save controls from the PDF viewer.')
      return
    }
    setSharing(true)
    try {
      await navigator.share({ files: [generated.file], title: `Varnam ${draft?.kind.toLowerCase()}` })
      setMessage('PDF handed to your sharing app.')
    } catch (cause) {
      if (!(cause instanceof Error && cause.name === 'AbortError')) {
        pdfRef.current?.click()
        setMessage('The PDF is open. Use your phone’s Share or Save controls from the PDF viewer.')
      }
    } finally {
      setSharing(false)
    }
  }

  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <Link href="/admin" className={styles.back}>← Back to admin</Link>
        <header className={styles.header}>
          <h1>Invoices & quotations</h1>
          <p>A customer, an amount, and a PDF ready to send.</p>
        </header>
        <div className={styles.layout}>
          <form onSubmit={generate} onInvalidCapture={event => {
            const details = (event.target as HTMLElement).closest('details')
            if (details) details.open = true
          }} className={styles.form}>
            <fieldset disabled={!hydrated || busy || sharing} className={styles.fields}>
              <legend className={styles.srOnly}>Document details</legend>
              <div className={styles.switcher} role="group" aria-label="Document type">
                {(['Quotation', 'Invoice'] as const).map(kind => (
                  <button key={kind} type="button" aria-pressed={draft.kind === kind} onClick={() => update('kind', kind)}>{kind}</button>
                ))}
              </div>
              <p className={styles.hint}>{draft.kind === 'Quotation' ? 'Send a price estimate before the work begins.' : 'Send a bill for your services.'}</p>
              <label htmlFor="invoice-customer">Customer name <span>(required)</span></label>
              <input id="invoice-customer" autoComplete="name" required maxLength={100} placeholder="Who is this for?" value={draft.customer} onChange={event => update('customer', event.target.value)} />
              <label htmlFor="invoice-amount">Total amount <span>(₹)</span></label>
              <input id="invoice-amount" type="number" inputMode="decimal" min="0.01" max="99999999.99" step="0.01" required placeholder="0.00" value={draft.amount} onChange={event => update('amount', event.target.value)} />
              <label htmlFor="invoice-description">Work description <span>(optional)</span></label>
              <textarea id="invoice-description" rows={3} maxLength={1000} placeholder="e.g. Interior painting for a 2-bedroom home" value={draft.description} onChange={event => update('description', event.target.value)} />
              <details className={styles.more}>
                <summary>More details <span>Date, address & notes</span></summary>
                <label htmlFor="invoice-date">Date</label>
                <input id="invoice-date" type="date" required min="1900-01-01" max="9999-12-31" value={draft.date} onChange={event => update('date', event.target.value)} />
                <label htmlFor="invoice-reference">Document number</label>
                <input id="invoice-reference" required maxLength={40} value={draft.reference} onChange={event => update('reference', event.target.value)} />
                <label htmlFor="invoice-address">Customer address <span>(optional)</span></label>
                <textarea id="invoice-address" rows={2} maxLength={300} value={draft.address} onChange={event => update('address', event.target.value)} />
                <label htmlFor="invoice-notes">Notes <span>(optional)</span></label>
                <textarea id="invoice-notes" rows={3} maxLength={1000} placeholder="e.g. Materials included. Quote valid for 15 days." value={draft.notes} onChange={event => update('notes', event.target.value)} />
              </details>
              <div className={styles.total}><span>{draft.kind === 'Quotation' ? 'Quoted total' : 'Invoice total'}</span><strong>{formatAmount(draft.amount)}</strong></div>
              <button className={styles.primary} type="submit">{!hydrated ? 'Loading…' : busy ? 'Creating PDF…' : generated ? 'Generate PDF again' : 'Generate PDF'}</button>
            </fieldset>
            <p className={styles.hint}>Customer details stay in this tab. Download your PDF before leaving.</p>
          </form>
          <section className={styles.preview} ref={previewRef} tabIndex={-1} aria-label="Document preview">
            {generated ? (
              <>
                <div className={styles.previewHeading}><h2>Your PDF is ready</h2><span>{generated.previews.length} {generated.previews.length === 1 ? 'page' : 'pages'}</span></div>
                <div className={styles.actions}>
                  <button className={styles.primary} type="button" disabled={sharing} onClick={share}>{sharing ? 'Sharing…' : 'Share PDF'}</button>
                  <a className={styles.secondary} href={generated.url} target="_blank" rel="noopener noreferrer" ref={pdfRef}>Open PDF</a>
                </div>
                <p className={styles.hint}>On a phone, open the PDF and use the viewer’s Share or Save option.</p>
                {generated.previews.map((src, index) => (
                  // A local canvas preview displays the exact exported PDF page.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={index} src={src} alt={`${draft.kind} for ${draft.customer}, ${formatAmount(draft.amount)}. Page ${index + 1}.`} width={1240} height={1754} className={styles.page} />
                ))}
                <button className={styles.newDocument} disabled={sharing} type="button" onClick={() => {
                  if (!window.confirm('Start a new document? Download or share this PDF first.')) return
                  setDraft(newInvoiceDraft()); setGenerated(null); setMessage(''); setError('')
                  document.getElementById('invoice-customer')?.focus()
                }}>Start a new document</button>
              </>
            ) : (
              <div className={styles.brandPreview}>
                <div className={styles.letterhead}>
                  <Image src="/images/branding/varnam-logo.png" alt="Varnam Painting & Designs logo" width={2000} height={2000} className={styles.logo} />
                  <div className={styles.agencyIdentity}>
                    <p className={styles.agencyName}>{agency.name}</p>
                    <p className={styles.agencyTagline}>{agency.tagline}</p>
                    <div className={styles.agencyAddress}>{agency.address.map(line => <p key={line}>{line}</p>)}</div>
                    <div className={styles.agencyContact}><span>{agency.phone}</span><span>{agency.website}</span></div>
                  </div>
                  <div className={styles.headerStamp}><span>{draft.kind}</span><strong>{draft.reference}</strong></div>
                </div>
                <div className={styles.documentBar}>
                  <div><span className={styles.documentLabel}>{draft.kind === 'Quotation' ? 'Prepared for' : 'Bill to'}</span><strong>{draft.customer || 'Customer name'}</strong>{draft.address && <p className={styles.documentAddress}>{draft.address}</p>}</div>
                  <div className={styles.documentDate}><span className={styles.documentLabel}>Issue date</span><strong>{new Date(`${draft.date}T12:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong></div>
                </div>
                <table className={styles.servicesTable}>
                  <thead><tr><th>No.</th><th>Description of services</th><th>Amount (INR)</th></tr></thead>
                  <tbody><tr><td>1</td><td>{draft.description || 'Painting and design services'}</td><td>{formatAmount(draft.amount)}</td></tr></tbody>
                </table>
                <div className={styles.documentTotal}><span>Total amount <small>INR</small></span><strong>{formatAmount(draft.amount)}</strong></div>
                {draft.notes && <div className={styles.documentNotes}><strong>Notes</strong><p>{draft.notes}</p></div>}
                {draft.kind === 'Quotation' && <p className={styles.documentNotes}>This quotation is an estimate, not a payment receipt.</p>}
                <div className={styles.signature}><p>For Varnam Painting and Designs</p><span>Authorised signatory</span></div>
                <p className={styles.documentFooter}>Thank you for choosing Varnam.</p>
              </div>
            )}
          </section>
        </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <p className={styles.status} role="status" aria-live="polite">{message}</p>
      </div>
    </main>
  )
}
