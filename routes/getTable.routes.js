const {Router} = require('express')
const router = Router()
const fs = require('fs')
const csv = require('csv-parser')
const { resolve } = require('path')
const { info } = require('console')


router.get('/', async (req, res) =>{
    const results = [];

    try {
        //Parse CSV 
        await fs.createReadStream('table.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            //add ID field
        results.map((result, index)=>{
            result.id=index+1
        })
        //COMPARE EMAIL
        for(let i=0;i<results.length;i++){
            for(let j=0;j<results.length;j++){
                try {
                    if((results[i].email.toLowerCase() == results[j].email.toLowerCase() || results[i].phone == results[j].phone )&& results[i].id!=results[j].id){
                        results[i].duplicate_with = results[j].id
                        results[j].duplicate_with = results[i].id
                        break
                    }
                } catch (e) {
                    console.log(e)    
                }
            }
        }

        results.map((result)=>{
        //Phone cheking
            let phoneNumber = result.phone
            if(phoneNumber.substr(0,2) != '+1'){
                if(phoneNumber.length == 11 && phoneNumber[0]=='1'){
                    result.phone = '+' + result.phone
                } else if(phoneNumber.length == 10 && phoneNumber.substr(0,2)!='+1'){
                    result.phone = '+1' + result.phone
                }else(result.phoneMistake = true)
            }
        //IF Full name, phone or email empty //костыль
            if(result.full_name.length == 0 || result.phone.length == 0 || result.email.length == 0){
                results[0].error = true
            }
        //IF children existing is not true/false
        if(result.has_children.length == 0){
            result.has_children = 'false'
        }

        let temp = result.license.split(' ')
        result.license=''
        temp.map(someState=>{
            result.license+=someState.slice(0,2) + ' '
        })
        result.license = result.license.toUpperCase()
        })
        // console.log(results)
     res.json(results)
  });
    } catch (e) {
        res.status(500).json({messege:'Что-то не так'})
    }
})


module.exports = router