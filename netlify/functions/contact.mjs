import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const { name, email, phone, company, interest, message } = JSON.parse(event.body)

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

    await resend.emails.send({
      from: 'Contacto Web <onboarding@resend.dev>',
      to: 'palenkke.mkt@gmail.com',
      subject: `Nuevo contacto: ${name} — ${interest || 'General'}`,
      html,
      reply_to: email,
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error al enviar el mensaje. Intenta de nuevo.' }),
    }
  }
}
