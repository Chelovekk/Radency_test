const {Router} = require('express')
const Counter = require('../models/Counter')
const auth = require('../middlware/auth.middleware')
const config = require('config')
const router = Router()

router.post('/generate', auth, async (req,res)=>{
    try{
        const {counter_data} = req.body


        const counter = new Counter({
            counter_data, owner:req.user.userId
        })
        await counter.save()
        res.status(201).json({counter})
    }catch(e){
        res.status(500).json({messege:'Ошибка'})
    }
})
router.get('/', auth, async (req,res)=>{
    try{
        const counter = await Counter.find({ owner:req.user.userId})
        res.json(counter)
    }catch(e){
        res.status(500).json({messege:'Ошибка'})
    }

})
// router.get('/:id', auth, async (req,res)=>{
//     try{
//         const link = await Link.findById( req.params.id)
//         res.json(link)

//     }catch(e){
//         res.status(500).json({messege:'Ошибка'})
//     }

// })

module.exports = router