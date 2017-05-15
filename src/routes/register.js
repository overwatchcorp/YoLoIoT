const registerNewClient = require('../registerNewClient')

function route(req, res) {
  const body = req.body
  const inputs = body.inputs
  if (inputs === undefined) return res.status(400).send('no inputs specified')

  return registerNewClient.register({
    inputs,
  })
  .then((newClient) => {
    res.send(newClient)
  })
  .catch(err => res.send(err).status(500))
}

module.exports = route
