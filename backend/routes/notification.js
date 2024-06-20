const router = require('express').Router()
const mongoose = require('mongoose');
const Notification = require('../model/notificationSchema');
const verify = require('../verifyToken');
const { notificationValidation } = require('../validation/notificationValidation')

// get all notifications
router.get('/all', verify, async (req, res, next) => {
    try {
        const notifications = await Notification.find({})
        if (notifications) {
            res.status(200).send({
                success: true,
                notifications
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

// get a Notification
router.get('/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const notification = await Notification.findOne({ _id: req.params.id })
            if (notification) {
                res.status(200).send({
                    success: true,
                    notification
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

// post a Notification
router.post('/add', verify, async (req, res, next) => {
    try {
        const newNotification = new Notification(req.body);
        const error = notificationValidation(req.body)
        if (error) return res.status(400).send({
            success: false,
            msg: error.details[0].message
        })

        newNotification.save()
        res.send({
            success: true,
            msg: "Notification added successfully"
        })
    } catch (err) {
        next(err)
    }
})

// update a Notification
router.put('/update/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                const error = notificationValidation(req.body)
                if (error) return res.status(400).send({
                    success: false,
                    msg: error.details[0].message
                })
                await Notification.findByIdAndUpdate(req.params.id, { $set: req.body });
                res.send({
                    success: true,
                    msg: "Notification updated successfully"
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

// delete a Notification
router.delete('/delete/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                await Notification.findByIdAndDelete(req.params.id)
                res.send({
                    success: true,
                    msg: "Notification deleted successfully"
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