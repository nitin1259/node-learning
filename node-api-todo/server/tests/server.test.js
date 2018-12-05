const request = require('supertest');
const expect = require('expect');

const { ToDos } = require('./../models/toDo');
const { User } = require('./../models/user')
const { app } = require('./../server');
const { ObjectID } = require('mongodb');
const { todos, populateTodos, users, populateUsers} = require('./seed/seed');
// instead of empty ToDos we initially add 2 todos and then start testing

console.log('----Node env----', process.env.NODE_ENV)

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /toDos', () => {
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

    describe('PATCH /todos/:id', ()=>{
        it('should update the todo completeAt', done=>{
            const id = todos[0]._id.toHexString();
            request(app)
            .patch(`/todos/${id}`)
            .send({completed: true})
            .expect(200)
            .expect(res =>{
                expect(res.body.todo.completed).toBe(true);
                // expect(res.body.todo.completeAt).toBeA('number');
            }).end((err, res)=>{
                if(err) return done(err);

                ToDos.findById(id).then(todo=>{
                    expect(todo.completed).toBe(true);
                    done();
                }).catch(err=> done(err))
            })
        });

        it('should update the todo non complete', done=>{
            const id = todos[1]._id.toHexString();
            request(app)
            .patch(`/todos/${id}`)
            .send({completed: false})
            .expect(200)
            .expect(res =>{
                expect(res.body.todo.completed).toBe(false);
            }).end((err, res)=>{
                if(err) return done(err);

                ToDos.findById(id).then(todo=>{
                    expect(todo.completeAt).toBe(null);
                    done();
                }).catch(err=> done(err))
            })
        });
    });

describe('GET /users/me', ()=>{

    it('should return user if autheticatied', (done)=>{
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect(res=>{
            expect(res.body._id).toBe(users[0]._id.toHexString())
            expect(res.body.email).toBe(users[0].email)
        })
        .end(done);
    });


    it('should return 401 if authetication failed', (done)=>{
        request(app)
        .get('/users/me')
        .expect(401)
        .expect(res=>{
            expect(res.body).toEqual({})
        })
        .end(done);
    });

});


describe('POST /users', ()=>{
    it('should create a user', done =>{
        const email = 'kapil.kumar@ca.com';
        const password = 'Pass@123!';
        request(app)
        .post('/users')
        .send({email, password})
        .expect(200)
        .expect(res =>{
            expect(res.body.email).toBe(email);
        })
        .end(err =>{
            if(err){
                done(err);
            }
            User.findOne({email}).then(user=>{
                expect(user.email).toBe(email);
                done();
            }).catch(err=>{
                done(err);
            })
        });

    });

    it('should return valid errors if request invalid', done =>{
        const email= 'joe';
        const password= 'pass';

        request(app)
        .post('/users')
        .send({email, password})
        .expect(400)
        .end(done);
    });

    it('should not create user if email is in use', done =>{
        const email = 'nitin.singh@ca.com';
        const password = 'Pass@123!';
        request(app)
        .post('/users')
        .send({email, password})
        .expect(400)
        .end(done);
    });
});