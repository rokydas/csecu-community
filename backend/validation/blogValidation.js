const Joi = require('@hapi/joi')

const blogValidation = (body) => {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        link: Joi.string().required()
    }
    const {error} = Joi.validate(body, schema)
    return error
}

module.exports.blogValidation = blogValidation