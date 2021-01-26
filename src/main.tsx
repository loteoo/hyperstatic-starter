import { app } from 'hyperapp'

// Middlewares
import hyperstatic from './utils/routing/hyperstatic'

// Root view
import App from '/components/core/App'

// Global styles
import '/styles/base.css'

const routes = {
  '/': import('/pages/HomePage'),
  '/secondary': import('/pages/SecondaryPage'),
  '/counter': import('/pages/CounterPage'),
  '/*': import('/pages/NotFoundPage')
}

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
