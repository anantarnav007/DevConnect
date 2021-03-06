const express = require('express')
const User = require('../../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const UserMongo = require('./UserMongo')
const passport = require('passport')
const jwt = require('jsonwebtoken')


// loadInputValidation
const validateRegisterInput = require('../../../validation/register')
const validateLoginInput = require('../../../validation/login')

const keys = require('../../../config/keys')


const router = express.Router()



router.get('/test', (req,res)=>{
    res.json({message : 'user method GET works'})
})

router.post('/register',  async (req,res)=>{
    const { isValid , errors } = validateRegisterInput(req.body)

    // check validation
    if(!isValid){
        return res.status(400).json({messageError : errors})
    }

    const userBoolean = await UserMongo.findUserByEmail(req,true)

    if(!userBoolean){
        
        const avatar = gravatar.url(req.body.email, {
            s : '200',
            r : 'pg',
            d : 'mm'
        })
    
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            avatar 
        })
    
        bcrypt.genSalt(10,(err, salt)=>{
            
            bcrypt.hash(newUser.password, salt , async (err,hash)=>{
                if(err) throw err
                newUser.password = hash
                try{
                    const createdUser = await newUser.save()
                    res.status(200).json(createdUser)
                }catch(err){
                    console.log('err :', err.message);
                }
                        
            })
        })
    }else {
        res.status(400).json({email : 'email already exists'})
    }
    
})
router.post('/login', async (req,res)=>{

    const { isValid , errors } = validateLoginInput(req.body)
    // check validation
    if(!isValid){
        return res.status(400).json({messageError : errors})
    }

    const email = req.body.email
    const password = req.body.password

    const userBoolean = await UserMongo.findUserByEmail(req,true)
    if(!userBoolean){
        return res.status(400).json({messageError :{email : 'user email not found'}})
    }
    //USER FOUND
    console.log('password :', password);
    console.log('userBoolean.password :', userBoolean.password);
    const isMatch = await bcrypt.compare(password, userBoolean.password)

    if(isMatch){
        // user matched 
        const payload = {id : userBoolean.id,name : userBoolean.name,avatar : userBoolean.avatar}
        jwt.sign(payload, keys.secretOrKey, {expiresIn : 3600}, (err,token)=>{
            res.json({
                success : true,
                token : 'Bearer ' + token
            })
        })
    }else {
        
        return res.status(400).json({messageError :{password : 'password incorrect, please try again'}})
    }
    
})

router.get('/current', passport.authenticate('jwt', {session : false}), (req,res)=>{
    res.json({id : req.user.id, name : req.user.name , email : req.user.email})
})


module.exports = router