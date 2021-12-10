const router = require('express').Router()
const mongoose = require('mongoose');
const Notification = require('../model/notificationSchema');
const ObjectID = require('mongodb').ObjectID;
const verify = require('../verifyToken');
const { addNotificationValidation } = require('../validation/notificationValidation')

// get all notifications
router.get('/all-notification', verify, async (req, res) => {
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
})

// get a Notification
router.get('/:id', verify, async (req, res) => {
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
})

// post a Notification
router.post('/add-notification', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const newNotification = new Notification(req.body);
        try {
            const error = addNotificationValidation(req.body)
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

// update a Notification
router.put('/update/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            const error = addNotificationValidation(req.body)
            if (error) return res.status(400).send({
                success: false,
                msg: error.details[0].message
            })
            const notification = await Notification.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.send(notification)
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

// post a Notification
router.delete('/deleteNotification/:id', verify, async (req, res) => {

})

module.exports = router;