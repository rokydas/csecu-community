const router = require('express').Router()
const mongoose = require('mongoose')
const Blog = require("../model/blogSchema")
const verify = require('../verifyToken')
const { blogValidation } = require('../validation/blogValidation')
const ObjectId = mongoose.Types.ObjectId;

// get all blogs
router.get('/all', verify, async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        if (blogs) {
            res.status(200).send({
                success: true,
                blogs
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

router.get('/blogByUser/:userId', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
            const userId = req.params.userId;
            const blogs = await Blog.find({ authorId: new ObjectId(userId) })
            if (blogs) {
                res.status(200).send({
                    success: true,
                    blogs
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

// get a blog
router.get('/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const blog = await Blog.findOne({ _id: req.params.id })
            if (blog) {
                res.status(200).send({
                    success: true,
                    blog
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

// post a blog
router.post('/add', verify, async (req, res, next) => {
    try {
        const newBlog = new Blog(req.body);
        const error = blogValidation(req.body)
        if (error) return res.status(400).send({
            success: false,
            msg: error.details[0].message
        })
        newBlog.save()
        res.send({
            success: true,
            msg: "blog added successfully"
        })
    } catch (err) {
        next(err)
    }
})

// update a blog
router.put('/update/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const error = blogValidation(req.body)
            if (error) return res.status(400).send({
                success: false,
                msg: error.details[0].message
            })
            await Blog.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.send({
                success: true,
                msg: "Blog updated successfully"
            })

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

// delete a blog
router.delete('/delete/:id', verify, async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            await Blog.findByIdAndDelete(req.params.id)
            res.send({
                success: true,
                msg: "Blog deleted successfully"
            })
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