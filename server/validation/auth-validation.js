const {object,string} = require('yup');

const userValidation_register = object({
    name:string().min(3).max(100).required(),
    email:string().email().required(),
    password:string().min(8).max(100).required(),
    role:string().default('User').notRequired()
})

const userValidation_login = object({
    email:string().email().required(),
    password:string().min(8).max(100).required(),
})

module.exports = {
    userValidation_login,
    userValidation_register
}

