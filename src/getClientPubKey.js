const pool = require('../bin/pool')

function getKey(clientID) {
  return new Promise((resolve, reject) => {
    const query = {
      clientID: { $eq: clientID },
    }
    pool.connect().then((db) => {
      db.collection('clients')
      .findOne(query, (err, res) => {
        if (err) return reject(err)
        return resolve(res.pubKey)
      })
    })
    .catch(reject)
  })
}

module.exports = {
  getKey,
}
