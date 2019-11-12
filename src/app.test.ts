var should = require('should');
var request = require('supertest');
var server = require('./app');

describe('controllers', function() {

  beforeEach(async () => {
    jest.setTimeout(10000);
  });

  describe('GET /api/v1/status', function() {

    test('should return status healthy', function(done) {

      request(server)
        .get('/api/v1/status')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err: any, res: any) {

          res.text.should.eql('OK');
          done();
        });
      });
    });

    describe('GET /api/v1/messages', function() {

      test('should validate for mandatory params', function(done) {

        setTimeout(() => {
          done();
        }, 10000);

        request(server)
          .post('/api/v1/messages')
          .send({
            "mail_from": "xxx@gmail.com",
            "mail_to": ["xxx@gmail.com"]
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end(function(err: any, res: any) {
            done();
          });
        });
      });
});
