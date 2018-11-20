const request = require('supertest');
const expect = require('expect');

const { ToDos } = require('./../models/toDo');
const { app } = require('./../server');

// instead of empty ToDos we initially add 2 todos and then start testing

const todos = [{
    text: 'first test todo'
}, {
    text: 'second test todo'
}];

beforeEach(done => {
    ToDos.deleteMany({}).then(() => {
        return ToDos.insertMany(todos)
    }).then(() => done());
});

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

                ToDos.find({text}).then(todos => {
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
            .send({ text })
            .expect(400)
            .expect(res => {
                expect(res.body._message).toBe('ToDos validation failed')
            })
            .end((err, res) => {
                if (err) return done(err);

                ToDos.find().then(todo => {
                    expect(todo.length).toBe(2)
                    done();
                }).catch(err => done(err))
            })
    })
});

describe('GET /ToDos', ()=>{
    it('should list all the todos', done =>{
        request(app)
        .get('/ToDos')
        .expect(200)
        .expect(res=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    })
})