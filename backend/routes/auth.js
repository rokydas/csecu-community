const router = require('express').Router()
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation/authValidation')
const verify = require('../verifyToken')

router.post('/register', async (req, res) => {

    // validation before making user
    const error = registerValidation(req.body)
    if (error) return res.status(400).send({ 
        success: false,
        msg: error.details[0].message
    })

    // checking if the user's email exists in the db
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(409).send({ 
        success: false,
        msg: "User is already registered" 
    })

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // adding user
    const user = new User({...req.body, password: hashedPassword})
    try {
        const savedUser = (await user.save()).toObject()
        delete savedUser.password
        const token = jwt.sign({_id: savedUser._id, email: savedUser.email}, process.env.TOKEN_SECRET)
        res.send({
            user: savedUser,
            success: true,
            msg: "Registration successful",
            token
        })
    } catch (err) {
        res.status(400).send({
            success: false,
            msg: "Something went wrong. Please try again." 
        })
    }
})

router.post('/login', async (req, res) => { 

    // validation before making user
    const error = loginValidation(req.body)
    if (error) return res.status(400).send({
        success: false,
        msg: error.details[0].message
    })

    // checking if the user's email exists in the db
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(409).send({
        success: false,
        msg: "User not found"
    })

    // password checking
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send({
        success: false,
        msg: "Incorrect Password"
    })

    // create and assign a token
    const token = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_SECRET)
    // res.header('auth-token', token).send(user)
    delete user._doc.password
    res.send({
        success: true,
        msg: "Login successful",
        user: user._doc, 
        token
    })
    
    // successful login
    // res.send({msg: 'Logged in'})
})

router.get("/me", verify, async(req, res) => {
    const user = await User.findOne({ email: req.user.email, _id: req.user._id })
    if(user) {
        res.send(user)
    } else {
        res.status(400).send({ success: false, msg: "No logged in"})
    }
})

module.exports = router