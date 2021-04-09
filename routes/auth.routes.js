const{Router} = require('express')
const bcrypt = require('bcryptjs')
const{check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')
// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'email false'). isEmail(),
        check('password', "password не прошёл").isLength({min:3})
    ], 
    async (req,res)=>{
    try{
        console.log(req.body)

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                messege:'Данные Говно'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email:email})

        if(candidate){
         return res.status(400).json({messege:"Занят"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const user =  new User({email:email, password:hashedPassword})

        await user.save()

        res.status(201).json({messege:"Готово"})

    }catch(e){
        res.status(500).json({messege:'Ошибка'})
        // console.log(e)
    }
})

// /api/auth/login
router.post(
    '/login',
[
check('email', 'email ne korektnii').normalizeEmail().isEmail(),
check('password', 'VVedite parol').exists()
],
async (req, res)=>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                messege:'Данные Говно'
            })
        }
        
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({messege:'netu takogo'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({messege:'nevirnii parol'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})
    }catch(e){
        res.status(500).json({messege:'Ошибка'})
        // console.log(e)
    }
})

module.exports = router