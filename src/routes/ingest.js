const saveData = require('../saveData.js')
const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

function route(req, res) {
  const body = req.body

  const payload = nacl.util.decodeUTF8(JSON.stringify(body.payload))
  const signature = nacl.util.decodeBase64(body.sig)
  const pubKey = nacl.util.decodeBase64('9C7QeifqyC3pse855R5bj0R13q0icOsWAwPoKTqOUuQ=')
  // check signature on payload
  const signed = nacl.sign.detached.verify(payload, signature, pubKey)
  if (signed === false) return res.status(401).send('invalid signature')
  // logs data to collection 'data'
  return saveData.save(body.payload)
  .then(dbRes => res.send(dbRes))
  .catch(err => res.send(err).status(500))
}

module.exports = route
