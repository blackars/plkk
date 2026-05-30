import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.static(join(__dirname, '..', 'dist')))

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, interest, message } = req.body

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return res.status(500).json({ error: 'Email service not configured' })
    }

    const html = `
      <h2>Nuevo mensaje desde palenkke.org</h2>
      <table>
        <tr><td><strong>Nombre:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Teléfono:</strong></td><td>${phone || '—'}</td></tr>
        <tr><td><strong>Empresa:</strong></td><td>${company || '—'}</td></tr>
        <tr><td><strong>Interés:</strong></td><td>${interest || '—'}</td></tr>
      </table>
      <hr/>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contacto Web <onboarding@resend.dev>',
        to: 'palenkke.mkt@gmail.com',
        subject: `Nuevo contacto: ${name} — ${interest || 'General'}`,
        html,
        reply_to: email,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Resend error:', err)
      return res.status(500).json({ error: 'Error al enviar el mensaje. Intenta de nuevo.' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Error al enviar el mensaje. Intenta de nuevo.' })
  }
})

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
