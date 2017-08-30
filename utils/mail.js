const Config = require('../config').mailgun;
const mailgun = require('mailgun-js')({apiKey: Config.apiKey, domain: Config.domain});

class Mail {
    async sendMail({recipient, subject, body}) {
        let data = {
            from: 'fju-app-service <fju-app-service@fju.service>',
            to: recipient,
            subject: subject,
            text: body,
        };

        return new Promise((resolve, reject) => {
            mailgun.messages().send(data, function (error, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }
}

module.exports = Mail;