const mongoose = require('mongoose')
const Url = require('../url')

mongoose.connect('mongodb://localhost/url-shortener')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Url.create({ name: 'name-' + i })
  }
  console.log('done')
})