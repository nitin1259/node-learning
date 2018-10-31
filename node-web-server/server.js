const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3001;

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (input)=>{
    return input.toUpperCase();
})

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// middleware -  looks like works as interceptors

app.use((req, res, next)=>{
    const date = new Date().toString();
    const log = `${date} : method ${req.method} url ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', ()=>{
        console.log("Callback after saving the to log")
    });

    next(); // next is a function will we have to call after fininshing the intermediate operation otherwise process will not move further and we have to handle it manually.

})

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs')

// })

app.get('/', (req, res) => {
    // res.send('<h1>Hello Node Server </h1>');
    /* res.send({
        name: 'Nitin',
        DOB : '19/06/1989',
        likes : [
            'cricket',
            'swimming',
            'badminton'
        ]
    }) 
    */

    res.render('home', {
        pageContent: 'Node.js Dynamo',
        pageBody: 'Coming directly from server.js',
    })
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page dynamic content',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to find the located resouce',
        message: 'Bad Request'
    })
})

const server = app.listen(port, () => {
    const port = server.address().port;
    console.log('Server has been started on port:' + port)
});