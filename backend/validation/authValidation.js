// validation
const Joi = require('@hapi/joi')

// registerValidation 
const registerValidation = (body) => {
    const schema = {
        varsityId: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        session: Joi.string().required(),
        userType: Joi.string().required(),
        isAdmin: Joi.boolean(),
        img: Joi.string().required(),
        designation: Joi.string().required(),
        address: Joi.string().required(),
        isVerified: Joi.boolean(),
        facebook: Joi.string(),
        youtube: Joi.string(),
        github: Joi.string(),
        medium: Joi.string(),
        linkedin: Joi.string(),
        mobileNumber: Joi.string()
    }
    const {error} = Joi.validate(body, schema);
    return error
} 

const loginValidation = (body) => {
    const schema = {
        email: Joi.string().min(5).required(),
        password: Joi.string().min(3).required()
    }
    const {error} = Joi.validate(body, schema);
    return error
} 

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation