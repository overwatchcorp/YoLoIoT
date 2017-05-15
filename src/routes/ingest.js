const pool = require('../../bin/pool')
const saveData = require('../saveData.js')
const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

function route(req, res) {
  const body = req.body

  const payload = nacl.util.decodeUTF8(JSON.stringify(body.payload))
  const signature = nacl.util.decodeBase64(body.sig)
  let pubKey
  // if client is impersonating another client, sig verifucation will fail
  pool.connect().then((db) => {
    const clientID = body.payload.clientID
    db.collection('clients').findOne({ clientID: { $eq: clientID } }, (err, getKeyRes) => {
      const clientPubKeyString = getKeyRes.pubKey
      pubKey = nacl.util.decodeBase64(clientPubKeyString)

      // now that we have pubkey, check sig
      const signed = nacl.sign.detached.verify(payload, signature, pubKey)
      if (signed === false) return res.status(401).send('invalid signature')
      // logs data to collection 'data'
      return saveData.save(body.payload)
      .then(dbRes => res.send(dbRes))
      .catch(saveErr => res.send(saveErr).status(500))
    })
  })
}

module.exports = route
