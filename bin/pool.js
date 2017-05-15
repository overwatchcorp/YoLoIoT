const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const dbURL = process.env.MONGODB_URI

function connect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbURL, (err, database) => {
      if (err) reject(err)
      resolve(database)
    })
  })
}

module.exports = {
  connect,
}
