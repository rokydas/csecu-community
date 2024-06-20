const router = require('express').Router()
const mongoose = require('mongoose')
const Research = require("../model/researchSchema")
const verify = require('../verifyToken')
const uploadFile = require('../middleware/upload')
const { researchValidation } = require('../validation/researchValidation')
const ObjectId = mongoose.Types.ObjectId;

// get all researches
router.get('/all', verify, async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err)
    }
})

router.get('/:email', verify, async (req, res, next) => {
    try {
        const email = req.params.email;
        const researches = await Research.find({ email: email })
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
    } catch (err) {
        next(err)
    }
})

// get a research
router.get('/single/:id', verify, async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err)
    }
})

// post a research
router.post('/add', verify, uploadFile, async (req, res, next) => {
    try {
        req.body.file = req.file.filename
        const newResearch = new Research(req.body);
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
        next(err)
    }
})

// update a research
router.put('/update/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                const error = researchValidation(req.body)
                if (error) return res.status(400).send({
                    success: false,
                    msg: error.details[0].message
                })
                await Research.findByIdAndUpdate(req.params.id, { $set: req.body })
                res.send({
                    success: true,
                    msg: "Research updated successfully"
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
    } catch (err) {
        next(err)
    }
})

// delete a research
router.delete('/delete/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                await Research.findByIdAndDelete(req.params.id)
                res.send({
                    success: true,
                    msg: "Research deleted successfully"
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
    } catch (err) {
        next(err)
    }
})

router.get('/researchByUser/:userId', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
            const userId = req.params.userId;
            const researches = await Research.find({ authorId: new ObjectId(userId) })
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
        }
        else {
            res.status(400).send({
                success: false,
                msg: "Invalid Id"
            })
        }
    } catch (err) {
        next(err)
    }
})


module.exports = router;