const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userSchema = require('./schema')

app.use(express.json())

const dbUrl = 'mongodb+srv://nirupamadas:<password>@nirupamacluster.q1z7w.mongodb.net/prograd5622'

mongoose.connect(dbUrl)
.then(()=>console.log('Db connected'))
.catch((err)=>console.log(err))

app.get('/celebrities',async function(req,res){

    try{
        const result = await userSchema.find()
        res.send(result)
    }
    catch(err){
        console.log(err)
    }

})
app.post('/celebrities',async function(req,res){

    try{
        const result = await userSchema.create(req.body)
        res.send('Data Inserted')
    }
    catch(err){
        console.log(err)
    }

})
app.get('/celebrities/:id',async function(req,res){

    try{
        const ID = parseInt(req.params.id)
        const result = await userSchema.findOne({celeb_id:ID})
        res.send(result)
    }
    catch(err){
        console.log(err)
    }

})
app.put('/celebrities/:id', async function(req,res){
    
    const ID = parseInt(req.params.id)
    try{
       
        const user = await userSchema.findOne({celeb_id:ID})
        if(user){
            let updatedUser = await userSchema.updateMany({prograd_id:ID},{$set:{name:req.body.name}})
            res.json({
                message: 'Record Updated',
                
            })
        }
        else{
            res.json({
                message: 'Record not found',
            })
        }
    }
    catch(err)
    {
        console.log(err)
    }
})

app.delete('/celebrities/delete/:id', async function(req,res){
    
    const ID = parseInt(req.params.id)
    try{
       
        const user = await userSchema.findOne({celeb_id:ID})
        if(user){
            let updatedUser = await userSchema.deleteOne({prograd_id:ID})
            res.json({
                message: 'Record Deleted',
                
            })
        }
        else{
            res.json({
                message: 'Record not found',
            })
        }
    }
    catch(err)
    {
        console.log(err)
    }
})

app.listen(5000,()=>console.log('Server Running'))