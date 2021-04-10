const express = require('express')
const app = express()
const bodypanser = require('body-parser') 
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/LatihanArDil',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() =>{
  console.log('BERHASIL CONNECT KE DATABASE')
}).catch((e) =>{
  console.log(e)
  console.log('GAGAL !!!')
})

app.use(bodypanser.json({
    extends: true,
    limit: '20mb' 
}))

app.use(bodypanser.urlencoded({
    extends: true,
    limit: '20mb'
}))

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})
//req param
app.get('/Daerah/:NamaDaerah/:id', (req, res) => {
    const namadaerah = req.params.namadaerah
    const iddaerah = req.params.id
  res.send('Anda Tinggal Di : ' + namadaerah + ' Id Daerah : ' + iddaerah)  
})
 //req buddy
//app.post('/register', (req, res) =>{
//res.json(req.body)
//console.log(req.body)
//})
//const useRoutes = require('.')
app.use('/user/', require('./routes/User'))


app.listen(3000, () => {
    console.log('Server STARTED')
})
