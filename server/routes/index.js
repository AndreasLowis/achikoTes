const route = require('express').Router()
const userRoute = require('./userRoute')

route.get('/', function (req, res) {
    res.send({status_code: 200, message: 'Hello World!'})
})

route.use('/users', userRoute)

module.exports = route