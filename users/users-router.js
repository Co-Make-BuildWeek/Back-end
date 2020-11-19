const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/post-model');
const router = express.Router();

router.post("/", validateUser, (req, res) => {
    Users.insert(req.body)
      .then(user => {
        console.log(user);
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  });

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
    Posts.insert({ ...req.body, user_id: req.params.id })
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });

router.get('/', (req, res) => {
    Users.get(req.query)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'The user information cannot be retrieved'
            })
        })
});

router.get('/:id', (req, res) => {
    Users.getById(req.params.id)
        .then(users => {
            if(users){
                res.status(200).json(users)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'The user information could not be retrieved'
            })
        })
})

router.get('/:id/posts', validateUserId, (req, res) => {
    Users.getUserPosts(req.params.id)
      .then(users => {
        if(users){
          res.status(200).json(users)
        }else{
          res.status(404).json({
            message: 'The user with the specified ID does not exist'
          })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          error: 'The post information could not be retrieved.'
        })
      })
  });

router.delete('/:id', validateUserId, (req, res) => {
    Users.remove(req.params.id)
        .then(users => {
            if(users){
                res.status(200).json({
                    message: "The user has been deleted"
                })
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: 'The user could not be removed'
            })
        })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
    if(!req.body.name){
        return res.status(400).json({
            errorMessage: 'Please provide a username'
        })
    }

    Users.update(req.params.id, req.body)
        .then(users => {
            if(users){
                res.status(200).json(users)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: 'The user information could not be modified'
            })
        })
});

async function validateUserId(req, res, next) {
    const { id } = req.params;
    try {
      const user = await Users.getById(id);
      if (user) {
        req.user = user;
        next();
      } else {
        next({ code: 400, message: "invalid user id" });
      }
    } catch (error) {
      next({ code: 500, message: error.message });
    }
  }

function validateUser(req, res, next) {
    if (!req.body) {
      next({ code: 400, message: "missing user data" });
    } else if (!req.body.name || typeof req.body.name !== "string") {
      next({ code: 400, message: "missing required name field" });
    } else {
      next();
    }
  }

function validatePost(req, res, next) {
    if (!req.body) {
      next({ code: 400, message: "missing post data" });
    } else if (!req.body.description || typeof req.body.description !== "string") {
      next({ code: 400, message: "missing required description field" });
    } else {
      next();
    }
  }

module.exports = router;