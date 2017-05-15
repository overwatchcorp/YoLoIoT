const pool = require('../bin/pool')
const registerNewClient = require('../src/registerNewClient')

const newClient = {
  inputs: [
    {
      temperature: {
        type: 'integer',
        units: 'celcius',
      },
    },
    {
      relativeHumidity: {
        type: 'integer',
        units: 'percent',
      },
    },
  ],
}

describe('registerNewClient.js', () => {
  // save data to database
  it('should create a client and save it to db', (done) => {
    registerNewClient.register(newClient)
    .then((res) => {
      expect(res.id).toEqual(jasmine.any(String))
      expect(res.id.length).toEqual(32)
      expect(res.pubKey).toEqual(jasmine.any(String))
      expect(res.pubKey.length).toEqual(44)
      expect(res.secretKey).toEqual(jasmine.any(String))
      expect(res.secretKey.length).toEqual(88)
      expect(res.inputs).toEqual(newClient.inputs)
      // check to make sure secret key has not been inserted
      pool.connect().then((db) => {
        db.collection('clients').findOne({ clientID: { $eq: res.id } }, (err, testForSecretRes) => {
          expect(testForSecretRes.secretKey).toEqual(undefined)
          done()
        })
      })
    })
    .catch(done.fail)
  })
})
