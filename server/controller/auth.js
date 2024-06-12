const User = require('../models/User')
const {HashPassword, comparePassword} = require('../utils/auth')
const jwt = require('jsonwebtoken')

exports.Login = async(req, res)=>{
    const {email, password} = req.body;

    if(password=='X&1ekb1.ZgZr8f*')
        {
            return res.status(401).json({msg:"Incorrect email and password!"})
        }

    if (!email || !password){
        return res.status(401).json({msg:'Email or password not provided!'})
    }

    const user = await User.findOne({email:email})
    if(!user){return res.status(401).json({msg:"Incorrect email!"})}
    
    const isPassword = await comparePassword(password, user.password)

    if(!isPassword){
        return res.status(401).json({msg:"Incorrect password!"})
    }

    const token = jwt.sign({
        name:user.name,
        email:user.email
    }, 'secret', {expiresIn:'1hr'})

    return res.status(200).json(token)
    
}

exports.Register = async (req, res)=>{
    const {name, email, password} = req.body;

    const isUser = await User.findOne({email:email})

    if(isUser)
        {
            return res.status(401).json({msg:"User already Exists!"})
        }

    const hashedPassword = await HashPassword(password)
    const user = await User.create({
        name:name,
        email:email,
        password:hashedPassword
    })
    
    const token = jwt.sign({
        name:user.name,
        email:user.email
    }, 'secret', {expiresIn:'1hr'})

    return res.status(200).json(token)
}


exports.googleAuth = async(req, res)=>{
    const {name, email} = req.body;

    let user = await User.findOne({email:email})
    if(!user)
    {
           const newUser = await User.create({
            name:name,
            email:email,
            password:'X&1ekb1.ZgZr8f*'
        })

        user = newUser;
        
    }

    const token = jwt.sign({
        name:user.name,
        email:user.email
    }, 'secret', {expiresIn:'1hr'})

    return res.status(200).json(token)
}