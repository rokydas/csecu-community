const router = require('express').Router()
const mongoose = require('mongoose')
const Achievement = require("../model/achievementSchema")
const verify = require('../verifyToken')
const { achievementValidation } = require('../validation/achievementValidation')

// get all achievements
router.get('/all', verify, async (req, res) => {
    const achievements = await Achievement.find({})
    if (achievements) {
        res.status(200).send({
            success: true,
            achievements
        })
    } else {
        res.status(404).json({
            success: false,
            msg: "Not found"
        })
    }
})

// get an achievement
router.get('/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const achievement = await Achievement.findOne({ _id: req.params.id })
        if (achievement) {
            res.status(200).send({
                success: true,
                achievement
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

// post an achievement
router.post('/add', verify, async (req, res) => {
    const newAchievement = new Achievement(req.body);
    try {
        const error = achievementValidation(req.body)
        if (error) return res.status(400).send({
            success: false,
            msg: error.details[0].message
        })
        newAchievement.save()
        res.send({
            success: true,
            msg: "Achievement added successfully"
        })
    } catch (err) {
        res.status(400).send({
            success: false,
            msg: "Something went wrong. Please try again"
        })
    }
})

// update an achievement
router.put('/update/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            const error = achievementValidation(req.body)
            if (error) return res.status(400).send({
                success: false,
                msg: error.details[0].message
            })
            await Achievement.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.send({
                success: true,
                msg: "Achievement updated successfully"
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

// delete an achievement
router.delete('/delete/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            await Achievement.findByIdAndDelete(req.params.id)
            res.send({
                success: true,
                msg: "Achievement deleted successfully"
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