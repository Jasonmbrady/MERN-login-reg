const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

module.exports = {
    register: (req, res) => {
        User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);
            res.cookie("usertoken", userToken, {httpOnly: true}).json({message: "Success!"});
        })
            .catch( err => res.status(400).json(err));
    },

    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then( user => {
                if( user === null){
                    res.Status(400).json({message: "Invalid Credentials"});
                }

                if(!bcrypt.compare(req.body.password, user.password)){
                    res.Status(400).json({message: "Invalid Credentials"});
                }

                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY)
                res.cookie("usertoken", userToken, {httpOnly: true}).json({message: "Success!"});
            })
    },

    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}