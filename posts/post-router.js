const e = require('express');
const express = require('express');
const router = express.Router();
const Posts = require('./post-model');

router.get('/', (req, res) => {
    Posts.get()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Unable to retrieve posts"
            })
        })
});

router.get('/:id', validatePostId, (req, res) => {
    Posts.getById(req.params.id)
        .then((posts) => {
            res.status(200).json(req.post)
        })
        .catch((error) => {
            res.status(500).json({
                message: "Unable to retrieve posts"
            })
        })
});



router.delete('/:id', validatePostId, (req, res) => {
    Posts.remove(req.params.id)
        .then(response => {res.status(200).json({message: 'The post has been deleted'})})
})

router.put('/:id', validatePostId, (req, res) => {
    Posts.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json({message: 'The post has been updated'})
        })
});

function validatePostId(req, res, next){
    const {id} = req.params
    Posts.getById(id)
        .then(post => {
            if(post){
                req.hub = post
                next()
            } else {
                res.status(404).json({
                    message: "Unable to find post with given ID"
                })
            }
        }) 
}

module.exports = router;