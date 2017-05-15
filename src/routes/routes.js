const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// import routes
const ingestRoute = require('./ingest')
const registerRoute = require('./register')

app.post('/ingest', ingestRoute)
app.post('/register', registerRoute)

module.exports = app
