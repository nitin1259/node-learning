const utils = require('./utils');
const expect = require('expect');

it('should add two number', () => {
    const res = utils.add(55, 22);
    expect(res).toBe(77).toBeA('number')
    // if(res !== 77) throw new Error(`expected 77, but getting ${res}`);
})

it('should square the input', ()=>{
    // if(utils.square(6) !== 36) throw new Error(`Not doing the square ???`)

    expect(utils.square(6)).toBe('36').toBeA('string')
})