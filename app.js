const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var cron = require('node-cron');

const services = require('./services/centerService')
const userService = require('./services/userService')
const centerService = require('./services/centerService')
const commService = require('./services/commService')
const utils = require('./utils/centerUtils')

app.use(express.static(__dirname + './public'));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

cron.schedule('59 * * * *', () => {
    userService.getAllUsers().then((users) => {
        users.forEach((user) => {
            centerService.getAllCenters(user.pin)
                .then((centers) => {
                if (centers && centers.length > 0) {
                    let availableCenters = utils.getAvailableCenters(centers, user.age)
                    console.log(availableCenters.length, user.name, user.phone)
                    if (availableCenters.length > 0) {
                        let freeCenters = []
                        let paidCenters = []
                        availableCenters.forEach((center) => {
                            if (center.fee_type == "Free") freeCenters.push(center.name)
                            else paidCenters.push(center.name)
                        })
                        commService.sendEmail(user.name, user.phone, freeCenters, paidCenters)
                    }
                }
            })
        })
    }).catch(error => {
            console.log('Some problem with API',error.message)
        }
    )
});

app.post('/ping', (req, res) => {
    res.send('pong')
})

app.post('/addUser', (req, res) => {
    userService.getAllUsers().then((users) => {
        let alreadyExists = users.find((user) => user.phone == req.body.phone)
        if (alreadyExists) {
            res.send({
                status: 200,
                error: 'User already exists'
            })
        } else {
            userService.addUser(req.body)
                .then(() => {
                    res.send({
                        status: 200,
                        msg: 'User added'
                    })
                })
        }
    })

})

app.get('/unsubsribe', (req, res) => {
    let email = req.query.u || ''
    userService.deleteUser(email).then(() => {
        res.send("Unsubsribed successfully")
    }).catch(() => {
        res.send("Error in unsubscribing")
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is up...")
})
