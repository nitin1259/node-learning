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
});


it('should expect some values', ()=>{
    // expect(12).toNotBe(11);

    // to be does work well for objects and arrays
    // expect({name: 'Nitin'}).toBe({name:'Nitin'})

    expect({name:'Kapil'}).toEqual({name:'Kapil'})
    expect({name:'Kapil'}).toNotEqual({name:'Kapil1'})

    expect([1,2,3]).toInclude(2);
    expect([1,2,4,6]).toExclude(5);

    expect({
        name: 'Nitin',
        age: 29,
        location:'Hyderabad',
    }).toInclude({
        age:29
    });

    expect({
        name: 'Nitin',
        age: 29,
        location:'Hyderabad',
    }).toExclude({
        age:22
    });
});


// should verify first and last names are set
it('should set first name and last name', ()=>{
    const user = {age: 29, location: 'Hyderabad' };
    const returnUser = utils.setName(user, 'Nitin');
    expect(returnUser).toEqual(user);
    expect(returnUser).toInclude({firstName: 'Nitin', lastName: undefined});

})

// Testing async code;
it('should async add two numbers',(done)=>{
    utils.asyncAdd(4, 3, (sum)=>{
        expect(sum).toBe(7).toBeA('number')
        done(); // if you dont do this this will fail with timeout sec exceeded. 
    });
    
});