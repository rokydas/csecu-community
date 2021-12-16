const Joi = require('@hapi/joi')

const workshopValidation = (body) => {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        instructorId: Joi.string().required(),
        instructorName: Joi.string().required(),
        topic: Joi.string().required(),
        date: Joi.string().required(),
        img: Joi.string().required(),
        videoLink: Joi.string().required(),
        img: Joi.string().required(), 
        status: Joi.string().required(),
    }
    const {error} = Joi.validate(body, schema)
    return error
}

module.exports.workshopValidation = workshopValidation