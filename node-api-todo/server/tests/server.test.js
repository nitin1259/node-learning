const request = require('supertest');
const expect = require('expect');

const { ToDos } = require('./../models/toDo');
const { app } = require('./../server');

beforeEach(done => {
    ToDos.deleteMany({}).then(() => {
        done();
    })
})

describe('Test the post /ToDos', () => {
    it('should create a new to do', done => {
        const text = 'Test the TODO'
        request(app)
            .post('/ToDos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                ToDos.find().then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(err => done(err));

            })
    });

    it('should not create a todo with empty body', done => {
        const text = ''
        request(app)
        .post('/ToDos')
        .send({text})
        .expect(400)
        .expect(res =>{
            expect(res.body._message).toBe('ToDos validation failed')
        })
        .end( (err, res)=>{
            if(err) return done(err);

            ToDos.find().then(todo =>{
                expect(todo.length).toBe(0)
                done();
            }).catch(err => done(err))
        })
    })
});