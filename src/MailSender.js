const nodemailer = require('nodemailer');
const config = require('./utils/config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.address,
        pass: config.mail.password,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music Developer',
      to: targetEmail,
      subject: 'Playlist Export',
      text: 'Berikut ini kami lampirkan hasil ekspor playlist yang anda minta.',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
