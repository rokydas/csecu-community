const Joi = require('@hapi/joi')

// addNotificationValidation 
const addNotificationValidation = (body) => {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        link: Joi.string().required(),
    }
    const {error} = Joi.validate(body, schema);
    return error
} 

module.exports.addNotificationValidation = addNotificationValidation