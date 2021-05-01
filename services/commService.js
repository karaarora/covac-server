module.exports = {

    sendSms: (name, email, centers, paidCenters) => {
        console.log(paidCenters)
        const mailjet = require('node-mailjet')
            .connect('b746882ebbb8aced7403af0216866778', 'bc5a23f7b39e974231e4bcb5ae932e74')
        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": "karan.preet@hotmail.com",
                            "Name": "Karanpreet"
                        },
                        "To": [
                            {
                                "Email": email,
                                "Name": name
                            }
                        ],
                        "Subject": "Covovo | Vaccincation slot available",
                        "TextPart": "",
                        "HTMLPart": `<h3>Hi ${name}!</h3><div><h4>We found a few vaccination slots for you</h4><div><div><h6>Centers providing Free Vaccincation</h6><div>${centers.join('<br>')}</div><div><h6>Centers provoding paid Vaccinations:</h6><div>${paidCenters.join('<br>')}</div><div><h6>The spots run out very quickly. Please register your spot at <a href = "https://www.cowin.gov.in/">Cowin</a>. If it's no longer available, we'll notify you again!</h6></div><div>If you have already booked your slot and want to unsubsribe, please <a href="https://covovo.herokuapp.com/unsubsribe?u=${email}">click here</a></div>`,
                        "CustomID": "AppGettingStartedTest"
                    }
                ]
            })
        request
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            })

    }
}