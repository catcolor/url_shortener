const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const random = require('../../function/random')

router.post('/new', (req, res) => {
  const random_url = random
  const { original_url } = req.body

  return Url.findOne({ original_url })
    .then(urls => urls ? urls : Url.create({ original_url, random_url }))
    .then(urls => res.render('new', { original_url, random_url: urls.random_url }))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const { original_url } = req.body

  return Url.find({ random_url: id })
    .lean()
    .then(data => res.redirect(data[0].original_url))
    .catch(error => console.log(error))
})

module.exports = router