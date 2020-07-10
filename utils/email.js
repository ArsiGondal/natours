const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.from = `Muhammad Arsalan <${process.env.EMAIL_FROM}>`;
    this.url = url;
  }

  newTransporter() {
    if (process.env.NODE_ENV.includes('production')) {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // 2) Define email options
    let emailFrom;
    emailFrom = this.from;
    if (process.env.NODE_ENV.includes('production')) {
      emailFrom = process.env.EMAIL_FROM;
    }
    const mailOptions = {
      from: emailFrom,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    // 3) Create a transport and send email
    await this.newTransporter().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Natours');
  }
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token.(Only valid for 10 mins)'
    );
  }
};
