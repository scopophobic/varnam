import nodemailer from 'nodemailer'

interface MailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

export async function sendMail({ to, subject, text, html }: MailOptions) {
  const user = process.env.MAIL_USER
  const pass = process.env.MAIL_PASS

  if (!user || !pass) {
    console.warn('MAIL_USER or MAIL_PASS not set — skipping email')
    return
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `"Varnam Website" <${user}>`,
    to,
    subject,
    text,
    html,
  })
}
