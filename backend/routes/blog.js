const router = require('express').Router()
const mongoose = require('mongoose')
const Blog = require("../model/blogSchema")
const verify = require('../verifyToken')
const { blogValidation } = require('../validation/blogValidation')

// get all blogs
router.get('/all', verify, async (req, res) => {
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
})

// get a blog
router.get('/:id', verify, async (req, res) => {
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
})

// post a blog
router.post('/add', verify, async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
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
        res.status(400).send({
            success: false,
            msg: "Something went wrong. Please try again"
        })
    }
})

// update a blog
router.put('/update/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            const error = blogValidation(req.body)
            if (error) return res.status(400).send({
                success: false,
                msg: error.details[0].message
            })
            Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, () => {
                res.send({
                    success: true,
                    msg: "Blog updated successfully"
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

// delete a blog
router.delete('/delete/:id', verify, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        try {
            Blog.findByIdAndDelete(req.params.id, () => {
                res.send({
                    success: true,
                    msg: "Blog deleted successfully"
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