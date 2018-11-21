const request = require('supertest');
const expect = require('expect');

const { ToDos } = require('./../models/toDo');
const { app } = require('./../server');
const { ObjectID } = require('mongodb');

// instead of empty ToDos we initially add 2 todos and then start testing

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo'
}, {
    _id: new ObjectID(),
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
            .post('/todos')
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
            .post('/todos')
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

describe('GET /todos', ()=>{
    it('should list all the todos', done =>{
        request(app)
        .get('/ToDos')
        .expect(200)
        .expect(res=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    })
});

describe('GET /todos/:id', ()=>{
    it('should return the passed todo', done=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect(res=>{
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done);
    });


    it('should validate for invalid Id', done=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}xyz`)
        .expect(404)
        .expect(res=>{
            expect(res.body.msg).toBe('Not a valid id')
        })
        .end(done);
    });

    it('should validate non existing id', done=>{
        const id = new ObjectID().toHexString(); //'5bf43c4da8d7bd4ba4e1581b'
        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .expect(res=>{
            expect(res.body.msg).toBe('document not available with id: '+id)
        })
        .end(done);
    });

    describe('DELETE /todos/:id', ()=>{
        
        it('should delete the todo', done =>{
            const id = todos[0]._id.toHexString();
            request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect(res =>{
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end((err, res)=>{
                if(err){
                    done(err);
                }

                ToDos.findById(id).then(todo =>{
                    expect(todo).toBe(null);
                    done();
                }).catch(err=>{
                    done(err);
                });
            });
        });

        it('should return 404 if id is not found', done=>{
            const id = new ObjectID().toHexString();
            request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .expect(res =>{
                expect(res.body.msg).toBe('Id not found');
            }).end(done);
        });

        it('should return 403 id is not valid', done=>{
            const id = new ObjectID().toHexString();
            request(app)
            .delete(`/todos/${id}xyz`)
            .expect(403).expect(res =>{
                expect(res.body.msg).toBe('Id is not valid');
            }).end(done);
        });
    });


});