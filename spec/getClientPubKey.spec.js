const pool = require('../bin/pool')
const testData = require('./testpayload.js')
const getClientPubKey = require('../src/getClientPubKey')

const testPayload = testData.testPayload
const clientID = testPayload.payload.clientID

describe('getClientPubKey.js', () => {
  beforeEach((done) => {
    pool.connect().then((db) => {
      db.collection('clients').insertOne({
        _id: testPayload.payload.clientID,
        clientID: testPayload.payload.clientID,
        pubKey: testData.pubKey,
      })
      .then((res, err) => {
        if (err) return done.fail(err)
        return done()
      })
    })
  })
  afterEach((done) => {
    pool.connect().then((db) => {
      db.collection('clients').deleteOne({
        _id: testPayload.payload.clientID,
      })
      .then((res, err) => {
        if (err) return done.fail(err)
        return done()
      })
    })
  })
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
