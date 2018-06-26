const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('unable to log to server.log');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.get('/', (req, res) => {
    // res.send('<h1>Hello World!</h1>');
    res.render('home.hbs',{
        welcomeMessage:'You are welcome to this page',
        likes:['biking', 'cities']
        
    });
});

hbs.registerHelper('getCurrentYear', () =>{
 return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/about', (req, res) =>{
    res.render('about.hbs',{
        pageTitle:'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Bad request bro'
    });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))