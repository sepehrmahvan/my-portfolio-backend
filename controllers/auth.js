const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const User = require("../models/auth");

exports.signup = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({
                message: "Validation failed.",
                errors: errors.array(),
            })
        }

        const {phoneNumber, password} = req.body;

        const existingUser = await User.findOne({phoneNumber: phoneNumber});
        if(existingUser){
            return res.status(409).json({
                message: "A user with this phone number already exists.",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            phoneNumber,
            password: hashedPassword,
        })

        await user.save();

        res.status(200).json({message: "User created successfully!"})
    } catch(err){
        res.status(500).json({message: "server error"})
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try{
        const {phoneNumber, password} = req.body;
        const user = await User.findOne({phoneNumber: phoneNumber});
        if(!user){
            return res.status(401).json({message: "No user found with this phone number."})
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            return res.status(401).json({message: "Phone number found but password is incorrect."})
        }

        const token = jwt.sign(
            {
                phoneNumber: user.phoneNumber,
            },
            process.env.JWT_SECRET
        )

        res.status(200).json({token: token, userId: user._id.toString()})

    } catch(err){
        res.status(500).json({message: "server error"})
        next(err)
    }
}