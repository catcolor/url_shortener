const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/url-shortener')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log(`App is running on http://localhost:${port}`)
})