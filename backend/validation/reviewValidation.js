const Joi = require('@hapi/joi')

const reviewValidation = (body) => {
    const schema = {
        rating: Joi.string().required(),
        description: Joi.string().required(),
        isApproved: Joi.boolean().required(),
        teacherId: Joi.string().required(),
        teacherName: Joi.string().required(),
        teacherImg: Joi.string().required(),
        researchId: Joi.string().required(),
    }
    const {error} = Joi.validate(body, schema)
    return error
}

module.exports.reviewValidation = reviewValidation