const express = require('express');
const router = express.Router();

// Bring in Article Model
const Article = require('../models/Article');

// Articles routes
router.get('/create', ensureAuthenticated, (req, res) => {
    res.render('./articles/create', {
        title: 'Add article'
    });
});

router.post('/create', ensureAuthenticated, (req, res) => {
    req.checkBody('title', 'Title is required and must be at least 3 characters long.').isLength({ min: 3 });
    req.checkBody('body', 'Content is required and must be at least 50 characters long').isLength({ min: 50 });

    let errors = req.validationErrors();

    if(errors) {
        res.render('./articles/create', {
            title: 'Add article',
            errors:errors
        })
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.user._id;
        article.body = req.body.body;

        article.save((err) => {
            if(err)
                console.log(err);
            else
                req.flash('success', 'Article added!');
            res.redirect('/');
        });
    }
});

// Show article
router.get('/:id', (req, res) => {
    Article.findById(req.params.id).populate('author').exec((err, article) => {
        if(err) {
            console.log(err);
        } else {
            res.render('./articles/show', {
                article: article
            });
        }
    });
});

// Edit article
router.get('/:id/edit', ensureAuthenticated, (req, res) => {
    Article.findById(req.params.id).populate('author').exec((err, article) => {
        if(article.author.id != req.user._id) {
            req.flash('danger', 'You are not the owner of this!');
            res.redirect('/articles/'+article.id);
        } else {
            if(err) {
                console.log(err);
            } else {
                res.render('./articles/edit', {
                    article: article
                });
            }
        }
    });
});

// Update article
router.post('/:id/edit', ensureAuthenticated, (req, res) => {
    let article = {}
    article.title = req.body.title;
    article.body = req.body.body;

    let query = {_id: req.params.id}

    Article.update(query, article, (err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article updated!');
            res.redirect('/articles/'+req.params.id);
        }
    })
});

router.delete('/:id', (req, res) => {
    let query = {_id: req.params.id};
    Article.remove(query, (err) => {
        if(err)
            console.log(err);
        else {
            req.flash('danger', 'Article deleted!');
            res.send('Success');
        }
    });
});


// Access control
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'You are not logged in!');
        res.redirect('/users/login');
    }
}

module.exports = router;