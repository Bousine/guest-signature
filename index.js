 const express = require('express')
 const parseurl = require('parseurl')
 const bodyParser = require('body-parser')
 const path = require('path')
 const expressValidator = require('express-validator')
 const mongoose = require('mongoose')
 const Signature = require('./models/signature.js')
 const app = express()
 const url = 'mongodb+srv://bousine:assholl@cluster0-elpvc.mongodb.net/test?retryWrites=true&w=majority'
 app.use(bodyParser.json())

 app.get('/', (req,res) => {
   res.json('you did it')
 })
 app.get('/api/signatures', (req,res) => {
   Signature.find({}).then(eachOne => {
     res.json(eachOne)
   })
 })
 app.post('/api/signatures',(req,res)=>{
   Signature.create({
     guestSignature: req.body.SignatureOfGuest,
     message: req.body.MessageOfGuest,
   }).then(signature => {
     res.json(signature)
   })
 })

 mongoose.connect(url, (err,db)=>{
   if(err){
     console.log('Unable to connect to mongoDB. Error:',err)
   }else{
     console.log('Connection established to', url)
   }
 })

 app.listen(3000, ()=>console.log('Listening on port 3000'))
