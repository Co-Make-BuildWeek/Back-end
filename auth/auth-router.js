const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require("../users/users-model");
const {isValid} = require("../users/users-service");
const {jwtSecret} = require('./secrets');

router.post("/register", (req, res) => {
    const credentials = req.body;

    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.insert(credentials)
            .then(user => {
                res.status(201).json({data: user});
            })
            .catch(error => {
                res.status(500).json({message: error.message})
            });
    } else {
        res.status(400).json({
            message: "Please provide username and password"
        });
    }
});

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    if(isValid(req.body)){
        Users.findBy({username: username})
            .then(([user]) => {
                if(user && bcryptjs.compareSync(password, user.password)){
                    const token = makeToken(user)
                    res.status(200).json({message: "Welcome", token});
                } else {
                    res.status(401).json({message: "Invalid credentials"});
                }
            })
            .catch(error => {
                res.status(500).json({message: error.message})
            })
    } else {
        res.status(400).json({
            message: "Please provide username and password"
        })
    }
});

function makeToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
    };
    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;