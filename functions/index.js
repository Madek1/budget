const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')
const api = require('./routes')

const app = express()

app.use('/api/v1', api.v1)

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/'
  }
}
const nuxt = new Nuxt(config)

const handleRequest = (req, res) => {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  nuxt.renderRoute('/').then(result => {
    res.send(result.html)
  }).catch(e => {
    res.send(e)
  })
}
app.get('*', handleRequest)
exports.nuxt = functions.https.onRequest(app)