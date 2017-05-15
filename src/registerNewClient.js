const pool = require('../bin/pool')
const randomstring = require('randomstring')
const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

function register(clientConfig) {
  return new Promise((resolve, reject) => {
    pool.connect().then((db) => {
      // clientID is permemant id of device, matches pubkey
      const clientID = randomstring.generate({
        length: 32,
        charset: 'alphanumeric',
      })
      const keyPair = nacl.sign.keyPair()
      const pubKey = nacl.util.encodeBase64(keyPair.publicKey)
      const secretKey = nacl.util.encodeBase64(keyPair.secretKey)
      const newClient = {
        id: clientID,
        inputs: clientConfig.inputs,
        pubKey,
        secretKey,
      }
      // secret key is not inserted into DB, just sent to client once
      db.collection('clients')
      .insertOne({
        _id: newClient.id,
        clientID: newClient.id,
        inputs: newClient.inputs,
        pubKey: newClient.pubKey,
      }).then((res, err) => {
        if (err) return reject(err)
        return resolve(newClient)
      })
    })
  })
}

module.exports = {
  register,
}
