const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// import routes
const ingestRoute = require('./ingest')

app.post('/ingest', ingestRoute)

module.exports = app
