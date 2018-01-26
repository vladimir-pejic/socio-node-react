const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

// MongoDB connection
mongoose.Promise = Promise;
mongoose.connect(config.database, (err) => {
    if(err)
        console.log('MongoDB error', err);
    else
        console.log('MongoDB - OK');
});


// Init App framework
const app = express();

// Bring in Article Model
const Article = require('./models/Article');


// Load template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Messages Middleware
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Express Session Middleware
app.use(session({
    secret: '3201djqddj21j83djqw8daqdq98djiadijadijjrtfsdaoi49r4ki94yht',
    resave: false,
    saveUninitialized: false
}));

// Passport config and middleware init
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Home route
app.get('/', (req, res) => {

    Article.find({}, (err, articles) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('index', {
                title: 'Vladjimir programiren Node!',
                articles: articles,
            });
        }
    });

});

// Load Route files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);


// Start server
app.listen('3000', () => {
    console.log('server started on 3000');
});