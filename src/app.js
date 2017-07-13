import renderApp from './render'
import proxy from 'http-proxy-middleware'

const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const feathers = require('feathers')
const logger = require('feathers-logger')
const configuration = require('feathers-configuration')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const socketio = require('feathers-socketio')

const express = require('express')

const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')

const postgres = require('./postgres')

const app = feathers()

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')))
// Enable CORS, security, compression, favicon and body parsing
app.configure(logger())
app.use(cors())
app.use(helmet())
app.use(compress())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
app.use('/static/js/', express.static(__dirname + '/../app/build/static/js'))
app.use(
  '/manifest.json',
  express.static(__dirname + '/../app/public/manifest.json')
)
// Set up Plugins and providers .
app.configure(hooks())
app.configure(postgres)
app.configure(rest())
app.configure(
  socketio(function(io) {
    // Registering Socket.io middleware
    io.use(function(socket, next) {
      // Exposing a request property to services and hooks
      socket.feathers.referrer = socket.request.referrer
      next()
    })
  })
)

app.use((req, res, next) => {
  req.feathers.cookies = req.cookies
  next()
})

app.configure(services)

const populateUser = async (req, res, next) => {
  const result = await req.app.authenticate('jwt')(req)
  let user = null

  if (result.data && result.data.payload) {
    user = await req.app.service('api/users').get(result.data.payload.sub, {})
  }

  req.user = user
  next()
}

if (process.env.NODE_ENV !== 'production') {
  app.use(
    proxy('/sockjs-node', {
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true
    })
  )
}

app.use('/', populateUser, renderApp)

// Configure middleware (see `middleware/index.js`) - always has to be last
app.configure(middleware)
app.hooks(appHooks)

module.exports = app
