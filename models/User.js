const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('../models/Article');

// User Schema
const UserSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
});


const User = module.exports = mongoose.model('User', UserSchema);
exports.getArticles = function() {
    return Article.find({author: User._id}, (err, articles) => {
        if(err)
            console.log(err);
        else
            return articles;
    });
}

