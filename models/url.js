const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  random_url: { type: String, required: true },
  original_url: { type: String, required: true },
  invalid_url: { type: Boolean }
})

module.exports = mongoose.model('Url', urlSchema)