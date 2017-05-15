const testData = require('./testpayload.js')
const getClientPubKey = require('../src/getClientPubKey')

const clientID = testData.testPayload.clientID

describe('getClientPubKey.js', () => {
  // save data to database
  it('should get clients public key based off of client id', (done) => {
    getClientPubKey.getKey(clientID)
    .then((res) => {
      expect(res).toEqual(testData.pubKey)
      done()
    })
  })
  it('should reject if client id does not exist')
})
