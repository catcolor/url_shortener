const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const Url = require('./models/url')

const routes = require('./routes')

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
app.use(routes)

app.listen(3000, () => {
  console.log(`App is running on http://localhost:${port}`)
})