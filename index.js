
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./config/route')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors())
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: {}
    })
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

const port = 8000

router.route(app)
app.listen(port, () => console.log(`Example app listening on port ${port}`))

module.exports = app
