const bcryptjs= require('bcryptjs');


const password = 'Password@123';

bcryptjs.genSalt(10, (err, salt)=>{
    bcryptjs.hash(password, salt, (err, hash)=>{
        console.log("hashed password: ", hash);
    })
});


const hashedPassword = '$2a$10$KYWnbDXHB4abmSA4Vwip2eOneVc7bhL7n5qBhMCudK/M2zMDBXqxu';


bcryptjs.compare(password, hashedPassword, (err, res)=>{
    console.log('result: ', res);
});