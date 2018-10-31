const square = num => num* num

console.log(square(6));


var user = {
    name: 'Nitin',
    sayHi: () => {
        console.log(arguments) // this will pass the global argument passing.
        console.log(`Hi! I am ${this.name}`)
    },
    sayHiAlt(){
        console.log(arguments)// this will print the function argument passing
        console.log(`Hi! I am ${this.name}`)
    }

}

user.sayHi(2,3,4)
user.sayHiAlt(2, 3, 4)