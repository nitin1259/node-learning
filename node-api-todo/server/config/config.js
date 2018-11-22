const db_Env = process.env.NODE_ENV || 'dev';

if(db_Env && db_Env === 'dev'){
    process.env.MongoDB_URL  = 'mongodb://localhost:27017/TodoApp'
}else{
    process.env.MongoDB_URL  = 'mongodb://localhost:27017/TodoAppTest'
}