const Joi = require('@hapi/joi')

const blogValidation = (body) => {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        img: Joi.string().required(),
        authorId: Joi.string().required(),
        authorName: Joi.string().required(),
        date: Joi.string().required(),
    }
    const {error} = Joi.validate(body, schema)
    return error
}

module.exports.blogValidation = blogValidation