const router = require('express').Router()
const mongoose = require('mongoose')
const Workshop = require("../model/workshopSchema")
const verify = require('../verifyToken')
const { workshopValidation } = require('../validation/workshopValidation')

// get all workshops
router.get('/all', verify, async (req, res, next) => {
    try {
        const workshops = await Workshop.find({})
        if (workshops) {
            res.status(200).send({
                success: true,
                workshops
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

// get a workshop
router.get('/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const workshop = await Workshop.findOne({ _id: req.params.id })
            if (workshop) {
                res.status(200).send({
                    success: true,
                    workshop
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

// post a workshop
router.post('/add', verify, async (req, res, next) => {
    try {
        const newWorkshop = new Workshop(req.body);
        const error = workshopValidation(req.body)
        if (error) return res.status(400).send({
            success: false,
            msg: error.details[0].message
        })
        newWorkshop.save()
        res.send({
            success: true,
            msg: "Workshop added successfully"
        })
    } catch (err) {
        next(err)
    }
})

// update a workshop
router.put('/update/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                const error = workshopValidation(req.body)
                if (error) return res.status(400).send({
                    success: false,
                    msg: error.details[0].message
                })
                await Workshop.findByIdAndUpdate(req.params.id, { $set: req.body })
                res.send({
                    success: true,
                    msg: "Workshop updated successfully"
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

// delete a workshop
router.delete('/delete/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                await Workshop.findByIdAndDelete(req.params.id)
                res.send({
                    success: true,
                    msg: "Workshop deleted successfully"
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

router.patch('/change-status/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                await Workshop.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } })
                res.send({
                    success: true,
                    msg: "Workshop updated successfully"
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

module.exports = router;