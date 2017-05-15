const app = require('./routes/routes')

let port

if (process.env.PORT) port = process.env.PORT
else port = 8080

const server = app.listen(port)

server.on('listening', () => console.log(`listening on port ${port}`))
