// const db_Env = process.env.NODE_ENV || 'dev';

// if(db_Env && db_Env === 'dev'){
//     process.env.MongoDB_URL  = 'mongodb://localhost:27017/TodoApp'
// }else{
//     process.env.MongoDB_URL  = 'mongodb://localhost:27017/TodoAppTest'
// }

const env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
    const config = require('./config.json');
    // console.log(config);
    var envConfig = config[env];

    Object.keys(envConfig).forEach(key =>{
        process.env[key] = envConfig[key];
    });
};