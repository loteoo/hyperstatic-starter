import { app } from 'hyperapp'

// Middlewares
import hyperstatic from './utils/routing/hyperstatic'

// Root view
import App from '/components/core/App'

// Global styles
import '/styles/base.css'

const routes = {}
const options = {}

// Initialize the app on the #app div
hyperstatic(
  app,
  routes,
  options
)({
  init: {},
  view: App,
  node: document.getElementById('app')
})
