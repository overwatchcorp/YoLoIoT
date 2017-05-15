const request = require('supertest')

// routes.js is an express app
const app = require('../src/routes/routes.js')

const testData = require('./testpayload')

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
        expect(res.body.n).toEqual(1)
        expect(res.body.ok).toEqual(1)
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
  describe('/register', () => {
    it('should send back pub/private keys and id on register', (done) => {
      request(app)
      .post('/register')
      .send(newClient)
      .expect(200)
      .end((err, res) => {
        if (err) return done.fail(err)
        const body = res.body
        expect(body.id).toEqual(jasmine.any(String))
        expect(body.id.length).toEqual(32)
        expect(body.pubKey).toEqual(jasmine.any(String))
        expect(body.pubKey.length).toEqual(44)
        expect(body.secretKey).toEqual(jasmine.any(String))
        expect(body.secretKey.length).toEqual(88)
        expect(body.inputs).toEqual(newClient.inputs)
        return done()
      })
    })
    it('400 BAD REQUEST if no inputs are specified', (done) => {
      request(app)
      .post('/register')
      .end((err, res) => {
        expect(res.status).toEqual(400)
        expect(res.text).toEqual('no inputs specified')
        return done()
      })
    })
  })
})
