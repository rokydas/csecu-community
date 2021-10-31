const router = require('express').Router()
const mongoose = require('mongoose');
const Notice = require('../model/noticeSchema');
const ObjectID = require('mongodb').ObjectID;

// get all notices
router.get('/notices', async (req, res) => {
    await Notice.find({}, (err, result) => {
        if (err) {
            res.status(404).json({
                success: false,
                msg: "not found"
            })
        } else {
            res.status(200).json(result)
        }
    })
})

// get a notice
router.get('/notice/:id', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        await Notice.find({ _id: req.params.id }, (err, result) => {
            if (err) {
                res.status(404).json({
                    success: false,
                    msg: "not found"
                })
            } else {
                res.status(200).json(result)
            }
        })
    } else {
        res.status(404).json({
            success: false,
            msg: "object id not found"
        })
    }

})

// post a notice
router.post('/addNotice', async (req, res) => {
    const newNotice = new Notice(req.body);
    await newNotice.save((err) => {
        if (err) {
            res.status(500).json({
                success: false,
                msg: "There was a server side error"
            })
        } else {
            res.status(200).json({
                success: true,
                msg: "Todo was inserted successfully"
            })
        }
    })

})

// update a notice
router.put('/updateNotice/:id', async (req, res) => {

})

// post a notice
router.delete('/deleteNotice/:id', async (req, res) => {

})

module.exports = router;