var AWS = require('aws-sdk');
const config = require('../config/config.json');
AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: config.aws.region
});
let ses = new AWS.SES();

module.exports = {
    sendEmail: (name, email, centers, paidCenters) => {
        let emailParams = {
            Destination: {
                ToAddresses: [email] // todo group emails addresses on the basis of pin code.
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: `<h3>Hi ${name}!</h3><div><h4>We found a few vaccination slots for you</h4><div><div><h6>Centers providing Free Vaccincation</h6><div>${centers.join('<br>')}</div><div><h6>Centers provoding paid Vaccinations:</h6><div>${paidCenters.join('<br>')}</div><div><h6>The spots run out very quickly. Please register your spot at <a href = "https://www.cowin.gov.in/">Cowin</a>. If it's no longer available, we'll notify you again!</h6></div><div>If you have already booked your slot and want to unsubscribe, please <a href="https://covovo.herokuapp.com/unsubsribe?u=${email}">click here</a></div>`,

                    },
                    Text: {
                        Data: `<h3>Hi ${name}!</h3><div><h4>We found a few vaccination slots for you</h4><div><div><h6>Centers providing Free Vaccincation</h6><div>${centers.join('<br>')}</div><div><h6>Centers provoding paid Vaccinations:</h6><div>${paidCenters.join('<br>')}</div><div><h6>The spots run out very quickly. Please register your spot at <a href = "https://www.cowin.gov.in/">Cowin</a>. If it's no longer available, we'll notify you again!</h6></div><div>If you have already booked your slot and want to unsubsribe, please <a href="https://covovo.herokuapp.com/unsubsribe?u=${email}">click here</a></div>`,
                        Charset: 'UTF-8'
                    }
                },
                Subject: {
                    Data: 'Covovo | Vaccincation slot available',
                    Charset: 'UTF-8'
                }
            },
            Source: config.email.sender
        };

        ses.sendEmail(emailParams, function (err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log("SES successful");
                console.log(data);
            }
        });
    }
}
