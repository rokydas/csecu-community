const Joi = require('@hapi/joi')

const careerValidation = (body) => {
    const schema = {
        type: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        link: Joi.string().required(),
        deadline: Joi.string().required()
    }
    const {error} = Joi.validate(body, schema)
    return error
}

module.exports.careerValidation = careerValidation