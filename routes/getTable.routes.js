const {Router} = require('express')
const router = Router()
const fs = require('fs')
const csv = require('csv-parser')
const { resolve } = require('path')


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
        //COMPARE email
        for(let i=0;i<results.length;i++){
            for(let j=0;j<results.length;j++){
                if((results[i].email.toLowerCase() == results[j].email.toLowerCase() || results[i].phone == results[j].phone )&& results[i].id!=results[j].id){
                    results[i].duplicate_with = results[j].id
                    results[j].duplicate_with = results[i].id
                    break
                }
            }
        }
        //Phone cheking
        results.map((result)=>{
            
        })
        console.log(results)
     res.json(results)
  });
    } catch (e) {
        res.status(500).json({messege:'Шото не то'})
    }
})


module.exports = router