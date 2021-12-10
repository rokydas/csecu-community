const router = require('express').Router()
const mongoose = require('mongoose');
const Notice = require('../model/noticeSchema');
const ObjectID = require('mongodb').ObjectID;
const verify = require('../verifyToken');
const {addNoticeValidation} = require('../validation/noticeValidation')

// get all notices
router.get('/all-notice', verify, async (req, res) => {
    const notices = await Notice.find({})
    if (notices) {
        res.status(200).send({
            success: true,
            notices
        })
    } else {
        res.status(404).json({
            success: false,
            msg: "Not found"
        })
    }
})

// get a notice
router.get('/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const notice = await Notice.findOne({ _id: req.params.id })
        if (notice) {
            res.status(200).send({
                success: true,
                notice
            })
        } else {
            res.status(404).json({
                success: false,
                msg: "Not found"
            })
        }
    } else {
        res.status(404).json({
            success: false,
            msg: "Object id not found"
        })
    }
})

// post a notice
router.post('/add-notice', verify, async (req, res) => {
    const newNotice = new Notice(req.body);
    try {
        const error = addNoticeValidation(req.body)
        if (error) return res.status(400).send({ 
            success: false,
            msg: error.details[0].message
        })

        newNotice.save()
        res.send({
            success: true,
            msg: "Notice added successfully"
        })
    } catch(err) {
        res.status(400).send({
            success: false,
            msg: "Something went wrong. Please try again"
        })
    }

})

// update a notice
router.put('/updateNotice/:id', verify, async (req, res) => {

})

// post a notice
router.delete('/deleteNotice/:id', verify, async (req, res) => {

})

module.exports = router;