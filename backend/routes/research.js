const router = require('express').Router()
const mongoose = require('mongoose')
const Research = require("../model/researchSchema")
const verify = require('../verifyToken')
const { researchValidation } = require('../validation/researchValidation')

// get all researches
router.get('/all', verify, async (req, res) => {
    const researches = await Research.find({})
    if (researches) {
        res.status(200).send({
            success: true,
            researches
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
    const researches = await Research.find({email:email})
    if (researches) {
        res.status(200).send({
            success: true,
            researches
        })
    } else {
        res.status(404).json({
            success: false,
            msg: "Not found"
        })
    }
})

// get a research
router.get('/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const research = await Research.findOne({ _id: req.params.id })
        if (research) {
            res.status(200).send({
                success: true,
                research
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

// post a research
router.post('/add', verify, async (req, res) => {
    const newResearch = new Research(req.body);
    try {
        const error = researchValidation(req.body)
        if (error) return res.status(400).send({
            success: false,
            msg: error.details[0].message
        })
        newResearch.save()
        res.send({
            success: true,
            msg: "Research added successfully"
        })
    } catch (err) {
        res.status(400).send({
            success: false,
            msg: "Something went wrong. Please try again"
        })
    }
})

// update a research
router.put('/update/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            const error = researchValidation(req.body)
            if (error) return res.status(400).send({
                success: false,
                msg: error.details[0].message
            })
            Research.findByIdAndUpdate(req.params.id, { $set: req.body }, () => {
                res.send({
                    success: true,
                    msg: "Research updated successfully"
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

// delete a research
router.delete('/delete/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            Research.findByIdAndDelete(req.params.id, () => {
                res.send({
                    success: true,
                    msg: "Research deleted successfully"
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