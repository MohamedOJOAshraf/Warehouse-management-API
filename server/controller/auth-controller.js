const userModel = require('../model/user-model');

const bcrypt = require('bcryptjs');

const {userValidation_register,userValidation_login} = require('../validation/auth-validation')

const text = require('../utils/statusText.');

const generateToken = require('../jwt/generateToken');
const statusText = require('../utils/statusText.');

const register = async (req,res) => {
    try{
        
        // validation data of user
        await userValidation_register.validate(req.body)

        const {name,email,password,role} = req.body;

        const user = await userModel.findOne({email:email});

        // check if user is found
        if(user)
            return res.status(409).json("This user is found")

        // hashing password
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword,
            role,
        })

        //generate token
       const token = await generateToken({email:newUser.email,role:newUser.role})

        await newUser.save()

        return res.status(201).json({statusText:text.SUCCESS,data:newUser,token})
    }catch(err){
        res.status(500).json({statusText:text.ERROR,data:err})
    }
}

const login = async (req,res) => {
    try{
        const {email,password} = req.body;

        // validation data of user
        await userValidation_login.validate(req.body);

        const user = await userModel.findOne({email:email});

        if(!user)
            return res.status(404).json("Email or password is wrong")

        const matchedPassword = await bcrypt.compare(password,user.password)

        if(!matchedPassword)
            return res.status(404).json("Email or password is wrong")

        // generate token
       const token = await generateToken({email:user.email,role:user.role})

        res.status(200).json({statusText:text.SUCCESS,data:user,token})

    }catch(err){
        res.status(500).json({statusText:text.ERROR,data:err})
    }
}

module.exports = {
    register,
    login
}