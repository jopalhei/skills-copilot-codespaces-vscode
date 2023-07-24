// Create web server
var express = require('express');
var router = express.Router();

// Get the comments model
var Comments = require('../models/comments');

// GET handler for /comments
router.get('/', function (req, res, next) {
    // Use the comments model to query the db for all comments
    Comments.find(function (err, comments) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // Load the comments page and pass the query result
            res.render('comments', {
                title: 'Comments',
                comments: comments,
                user: req.user
            });
        }
    });
});

// POST handler for /comments
router.post('/', function (req, res, next) {
    // Get the text parameter from the request body
    var text = req.body.text;

    // Create a new document in the comments collection
    Comments.create({
        text: text
    }, function (err, Comments) {
        if (err) {
            console.log(err);
            res.render('error', { title: 'Error' });
        }
        else {
            // Redirect to /comments
            res.redirect('/comments');
        }
    });
});

// Make public
module.exports = router;