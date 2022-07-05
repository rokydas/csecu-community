const Joi = require('@hapi/joi')

const researchValidation = (body) => {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        publisherId: Joi.string().required(),
        publisherName: Joi.string().required(),
        date: Joi.string().required(),
        file: Joi.string().required()
    }
    const {error} = Joi.validate(body, schema)
    return error
}

module.exports.researchValidation = researchValidation