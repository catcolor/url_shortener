const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const Url = require('./models/url')

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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function randomNumber() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  let collection = []

  collection = collection.concat(lowerCaseLetters.split(''), upperCaseLetters.split(''), numbers.split(''))

  let random = ''
  for (let i = 0; i < 5; i++) {
    random += sample(collection)
  }
  return random
}

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/new', (req, res) => {
  const random_url = randomNumber()
  const { original_url } = req.body

  return Url.findOne({ original_url })
    .then(urls => urls ? urls : Url.create({ original_url, random_url }))
    .then(urls => res.render('new', { original_url, random_url: urls.random_url }))
    .catch(error => console.log(error))
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  const { original_url } = req.body

  return Url.find({ random_url: id })
    .lean()
    .then(data => res.redirect(data[0].original_url))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log(`App is running on http://localhost:${port}`)
})