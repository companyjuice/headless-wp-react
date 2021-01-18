const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
  sgMail.setApiKey(process.env.SGKEY)

  // const { email, message } = req.body

  // const content = {
  //   to: 'marty@companyjuice.com',
  //   from: email,
  //   subject: `New Message From - ${email}`,
  //   text: message,
  //   html: `<p>${message}</p>`
  // }

  try {
    await sgMail.send(req.body)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }
}