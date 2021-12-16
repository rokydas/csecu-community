// validation
const Joi = require('@hapi/joi')

// achievementValidation 
const achievementValidation = (body) => {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        img: Joi.string().required(),
        date: Joi.string().required(),
    }
    const {error} = Joi.validate(body, schema);
    return error
} 

module.exports.achievementValidation = achievementValidation