import { app } from 'hyperapp'

// Hyperstatic
import hyperstatic from './utils/routing/hyperstatic'

// Root view
import Loader from '/components/core/Loader'
import App from '/components/core/App'

// Global styles
import '/styles/base.css'

const routes = {
  '/': import('./pages/HomePage'),
  '/secondary': import('./pages/SecondaryPage'),
  '/counter': import('./pages/CounterPage'),
  '/:splat*': import('./pages/NotFoundPage')
}

// All of these are optional
const options = {
  baseUrl: '/', // Path prefix
  loader: Loader // Custom loading indicator in case of slow networks
}

hyperstatic(
  app,
  routes,
  options
)({ init: {}, view: App, node: document.getElementById('app') })
