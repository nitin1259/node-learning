const request = require('supertest');

const expect = require('expect');

const app = require('./server').app;

it('should return hello world response', (done) => {
    request(app).get('/').expect(200).expect('Hello world !').end(done);
})

// it('should return hello world response error return one', (done)=>{
//     request(app).get('/').expect(200).expect('Hello world !!!').end(done);
// })

// it('should return hello world response error status one', (done)=>{
//     request(app).get('/').expect(404).expect('Hello world !').end(done);
// })

it('should return Testing one with erro code 404', (done) => {
    request(app).get('/test1').expect(404).expect('Testing one !').end(done);
})

it('should return Testing one with error object', (done) => {
    request(app).get('/test2').expect(404).expect({
        error: 'page not found'
    }).end(done);
})


it('should return Testing one ! check assertion with expect library ', (done) => {
    request(app).get('/test3').expect(404).expect((res) => {
        expect(res.body).toInclude({ name: 'Todo app v1.0' })
    }).end(done);
})


it('should return my user object', (done) => {
    request(app).get('/users').expect(200).expect((res) => {
        expect(res.body).toInclude({ name: 'Nitin', age: 30 });
    }).end(done);
})