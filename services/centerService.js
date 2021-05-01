const utils = require('../utils/centerUtils')
const axios = require('axios')

module.exports = {
    getAllCenters: (pinCode) => {
        let date = new Date()
        let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        console.log(url)
        return axios.get(url).then(({data}) => {
           return data.centers
        })
        .catch((error) => {
            return error
        })
    }
}