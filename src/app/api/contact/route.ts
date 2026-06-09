import { NextResponse } from 'next/server'
import { addMessage } from '@/lib/db'
import { sendMail } from '@/lib/mail'

export async function POST(req: Request) {
  try {
    const { name, phone, district, scope } = await req.json()

    if (!name || !phone || !district || !scope) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const msg = addMessage({ name, phone, district, scope })

    const to = process.env.MAIL_TO
    if (to) {
      await sendMail({
        to,
        subject: `New enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Location: ${district}`,
          `Scope: ${scope}`,
          `---`,
          `Received: ${new Date(msg.createdAt).toLocaleString('en-IN')}`,
        ].join('\n'),
        html: `
          <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:480px">
            <tr><td colspan="2" style="padding:16px 0;font-size:18px;color:#1A1A1A;border-bottom:2px solid #D4AF37">
              <strong>Varnam — New Enquiry</strong>
            </td></tr>
            <tr><td style="padding:10px 12px 0 0;color:#888;white-space:nowrap">Name</td>
                <td style="padding:10px 0 0;color:#1A1A1A">${name}</td></tr>
            <tr><td style="padding:6px 12px 0 0;color:#888;white-space:nowrap">Phone</td>
                <td style="padding:6px 0 0;color:#1A1A1A"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><td style="padding:6px 12px 0 0;color:#888;white-space:nowrap">Location</td>
                <td style="padding:6px 0 0;color:#1A1A1A">${district}</td></tr>
            <tr><td style="padding:6px 12px 12px 0;color:#888;white-space:nowrap;vertical-align:top">Scope</td>
                <td style="padding:6px 0 12px;color:#1A1A1A">${scope}</td></tr>
            <tr><td colspan="2" style="padding:12px 0 0;border-top:1px solid #eee;font-size:11px;color:#aaa">
              ${new Date(msg.createdAt).toLocaleString('en-IN')}
            </td></tr>
          </table>
        `,
      })
    }

    return NextResponse.json({ success: true, id: msg.id })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
