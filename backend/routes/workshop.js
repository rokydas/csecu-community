const router = require('express').Router()
const mongoose = require('mongoose')
const Workshop = require("../model/workshopSchema")
const verify = require('../verifyToken')
const { workshopValidation } = require('../validation/workshopValidation')

// get all workshops
router.get('/all', verify, async (req, res) => {
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
})

// get a workshop
router.get('/:id', verify, async (req, res) => {
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
})

// post a workshop
router.post('/add', verify, async (req, res) => {
    const newWorkshop = new Workshop(req.body);
    try {
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
        res.status(400).send({
            success: false,
            msg: "Something went wrong. Please try again"
        })
    }
})

// update a workshop
router.put('/update/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            const error = workshopValidation(req.body)
            if (error) return res.status(400).send({
                success: false,
                msg: error.details[0].message
            })
            Workshop.findByIdAndUpdate(req.params.id, { $set: req.body }, () => {
                res.send({
                    success: true,
                    msg: "Workshop updated successfully"
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

// delete a workshop
router.delete('/delete/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            Workshop.findByIdAndDelete(req.params.id, () => {
                res.send({
                    success: true,
                    msg: "Workshop deleted successfully"
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