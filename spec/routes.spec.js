const request = require('supertest')

// routes.js is an express app
const app = require('../src/routes/routes.js')

const testData = require('./testpayload')

describe('endpoints', () => {
  describe('/ingest', () => {
    it('should return 200 OK', (done) => {
      request(app)
      .post('/ingest')
      .send(testData.testPayload)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) done.fail(res)
        return done()
      })
    })
    it('should save data to database', (done) => {
      request(app)
      .post('/ingest')
      .send(testData.testPayload)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) done.fail(err)
        expect(res.body).toEqual({ n: 1, ok: 1 })
        done()
      })
    })
    it('invalid sig should return 401 UNAUTHORIZED', (done) => {
      request(app)
      .post('/ingest')
      .send(testData.testPayloadWithBadSig)
      .set('Content-Type', 'application/json')
      .expect(401)
      .end((err, res) => {
        if (err) done.fail(err)
        expect(res.text).toEqual('invalid signature')
        done()
      })
    })
  })
})
