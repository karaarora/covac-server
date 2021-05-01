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

cron.schedule('* * * * *', () => {
    userService.getAllUsers().then((users) => {
        users.forEach((user) => {
            centerService.getAllCenters(user.pin).then((centers) => {
                let availableCenters = utils.getAvailableCenters(centers, user.age)
                if (availableCenters.length == 0) {
                    commService.sendSms(user.name, user.phone)
                }
            })
        })
    })
});

app.get('/centers', (req, res) => {
    services.getAllCenters('143001').then((data) => {
        res.send(utils.getAvailableCenters(data, 45))
    })
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

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up...")
})