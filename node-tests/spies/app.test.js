const expect = require('expect');

const rewire = require('rewire');

const app = rewire('./app');

describe('App', () => {


    const db = {
        saveUser: expect.createSpy()
    }

    app.__set__('db', db);

    it('should call the spy correctly', () => {
        const spy = expect.createSpy();
        spy();
        expect(spy).toHaveBeenCalled();
    })

    it('should call the spy correctly with parameter check', () => {
        const spy = expect.createSpy();
        spy('Nitin', 29);
        expect(spy).toHaveBeenCalled('Nitin', 29);
    })


    it('should update save user with user object', ()=>{
        const email = 'jaat.nitin19@gmail.com';
        const password = 'abc123';

        app.handleSignUp(email, password);

        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    })


});