const router = require('express').Router()
const mongoose = require('mongoose')
const Review = require("../model/reviewSchema")
const verify = require('../verifyToken')
const { reviewValidation } = require('../validation/reviewValidation')
const ObjectId = require('mongodb').ObjectID;

// get all reviews
router.get('/all', verify, async (req, res, next) => {
    try {
        const reviews = await Review.find({})
        if (reviews) {
            res.status(200).send({
                success: true,
                reviews
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

// get a review
router.get('/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const review = await Review.findOne({ _id: req.params.id })
            if (review) {
                res.status(200).send({
                    success: true,
                    review
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

// post a review
router.post('/add', verify, async (req, res, next) => {
    try {
        const newReview = new Review(req.body);
        const error = reviewValidation(req.body)
        if (error) return res.status(400).send({
            success: false,
            msg: error.details[0].message
        })
        newReview.save()
        res.send({
            success: true,
            msg: "review added successfully"
        })
    } catch (err) {
        next(err)
    }
})

// update a review
router.put('/update/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                const error = reviewValidation(req.body)
                if (error) return res.status(400).send({
                    success: false,
                    msg: error.details[0].message
                })
                await Review.findByIdAndUpdate(req.params.id, { $set: req.body })
                res.send({
                    success: true,
                    msg: "review updated successfully"
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

// delete a review
router.delete('/delete/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                await Review.findByIdAndDelete(req.params.id)
                res.send({
                    success: true,
                    msg: "review deleted successfully"
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