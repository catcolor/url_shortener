const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const random = require('../../function/random')
const isUrl = require('is-url')

router.post('/new', (req, res) => {
  const random_url = random()
  const { original_url } = req.body

  if (!isUrl(original_url)) {
    return res.render('index', { invalid_url: true })
  }

  Url.findOne({ original_url })

    .then(data => data ? data : Url.create({ original_url, random_url }))
    .then(data => res.render('new', { random_url: data.random_url, original_url }))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  Url.findOne({ random_url: id })
    .lean()
    .then(data => {
      if (!data) {
        return res.render('error', {
          errorMsg: "Can't found the URL",
          errorUrl: 'http://localhost:3000/' + id
        })
      }
      res.redirect(data.original_url)
    })
    .catch(error => console.log(error))
})

module.exports = router
