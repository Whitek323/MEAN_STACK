const express = require('express')
const app = express()

const bookRoute = express.Router()
let Book = require('../model/Book')

bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error);
        });

})

//Get all boook
bookRoute.route('/').get((req, res) => {
    Book.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error);
        });
})
//Get book by id
bookRoute.route('/read-book/:id').get((req, res) => {
    Book.findById(req.params.id)
    .then(data=>{
        res.json(data)
    }).catch(error=>{
        next(error)
    })
    // Book.findById(req.params.id, (error, data) => {
    //     if (error) {
    //         return next(error);
    //     } else {
    //         res.json(data)
    //     }

    // })
})
//Update book
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {$set:req.body})
  .then(doc => {
    console.log(`Document with ID ${doc._id} updated successfully.`);
    res.json(doc);
  })
  .catch(err => {
    console.error(err);
    return next(err);
  });
    // Book.findByIdAndUpdate(req.params.id, {
    //     $set: req.body
    // }, (error, data) => {
    //     if (error) {
    //         return next(error)
    //     } else {
    //         res.json(data);
    //         console.log('Book Updated Successfully')
    //     }
    // })
})
//Delete Book
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id)
        .then(data => {
            res.status(200).json({
                msg: data
            });
        })
        .catch(error => {
            next(error);
        });

})

module.exports = bookRoute