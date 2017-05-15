const saveData = require('../src/saveData')

const testData = require('./testpayload').testPayload

describe('saveData.js', () => {
  // save data to database
  it('should save data to database', (done) => {
    saveData.save(testData)
    .then((res) => {
      expect(res.result.n).toEqual(1)
      expect(res.result.ok).toEqual(1)
      expect(res.insertedCount).toEqual(1)
      expect(res.ops[0]).toEqual(testData)
      done()
    })
    .catch(done.fail)
  })
})
