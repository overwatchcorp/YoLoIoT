const pool = require('../bin/pool')

function save(data) {
  return new Promise((resolve, reject) => {
    pool.connect().then((db) => {
      db.collection('data')
      .insertOne(data)
      .then((res) => {
        db.close()
        return resolve(res)
      })
      .catch(reject)
    })
  })
}

module.exports = {
  save,
}
