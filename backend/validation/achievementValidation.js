// validation
const Joi = require('@hapi/joi')

// achievementValidation 
const achievementValidation = (body) => {
    const schema = {
        title: Joi.string(),
        description: Joi.string(),
        img: Joi.string(),
        date: Joi.string(),
    }
    const {error} = Joi.validate(body, schema);
    return error
} 

module.exports.achievementValidation = achievementValidation