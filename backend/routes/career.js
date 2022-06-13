const router = require('express').Router()
const mongoose = require('mongoose')
const Career = require("../model/careerSchema")
const verify = require('../verifyToken')
const { careerValidation } = require('../validation/careerValidation')

// get all careers
router.get('/all', verify, async (req, res) => {
    const careers = await Career.find({})
    if (careers) {
        res.status(200).send({
            success: true,
            careers
        })
    } else {
        res.status(404).json({
            success: false,
            msg: "Not found"
        })
    }
})

router.get('/:email', verify, async (req, res) => {
    const email = req.params.email;
    const careers = await Career.find({email:email})
    if (careers) {
        res.status(200).send({
            success: true,
            careers
        })
    } else {
        res.status(404).json({
            success: false,
            msg: "Not found"
        })
    }
})

// get a career
router.get('/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const career = await Career.findOne({ _id: req.params.id })
        if (career) {
            res.status(200).send({
                success: true,
                career
            })
        } else {
            res.status(404).json({
                success: false,
                msg: "Not found"
            })
        }
    } else {
        res.status(400).send({
            success: false,
            msg: "Invalid Id"
        })
    }
})

// post a career
router.post('/add', verify, async (req, res) => {
    const newCareer = new Career(req.body);
    try {
        const error = careerValidation(req.body)
        if (error) return res.status(400).send({
            success: false,
            msg: error.details[0].message
        })
        newCareer.save()
        res.send({
            success: true,
            msg: "Career added successfully"
        })
    } catch (err) {
        res.status(400).send({
            success: false,
            msg: "Something went wrong. Please try again"
        })
    }
})

// update a career
router.put('/update/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            const error = careerValidation(req.body)
            if (error) return res.status(400).send({
                success: false,
                msg: error.details[0].message
            })
            Career.findByIdAndUpdate(req.params.id, { $set: req.body }, () => {
                res.send({
                    success: true,
                    msg: "Career updated successfully"
                })
            })

        } catch {
            res.status(400).send({
                success: false,
                msg: "Something went wrong. Please try again"
            })
        }
    } else {
        res.status(400).send({
            success: false,
            msg: "Invalid Id"
        })
    }
})

// delete a career
router.delete('/delete/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            Career.findByIdAndDelete(req.params.id, () => {
                res.send({
                    success: true,
                    msg: "Career deleted successfully"
                })
            })

        } catch {
            res.status(400).send({
                success: false,
                msg: "Something went wrong. Please try again"
            })
        }
    } else {
        res.status(400).send({
            success: false,
            msg: "Invalid Id"
        })
    }
})

module.exports = router;