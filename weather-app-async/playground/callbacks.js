const getuser = (id, callback) =>{
    const user  = {
        id: id,
        name: 'Andrew'
    }

    callback(user);
}

getuser(3, (user)=>{
    console.log(user)
})



const getuserWithTimeOut = (id, callback) =>{
    const user  = {
        id: id,
        name: 'Katherine'
    }

    setTimeout(() => {
        callback(user);
    }, 3000);
}

getuserWithTimeOut(54, (userObject)=>{
    console.log(userObject)
})