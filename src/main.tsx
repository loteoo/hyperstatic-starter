import { app } from 'hyperapp'

// Hyperstatic
import hyperstatic from './utils/routing/hyperstatic'

// Root view
import view from '/components/core/App'

// Global styles
import '/styles/base.css'

const routes = {
  '/': import('./pages/HomePage'),
  '/secondary': import('./pages/SecondaryPage'),
  '/counter': import('./pages/CounterPage'),
  '/:splat*': import('./pages/NotFoundPage')
}

const options = {}

const init = {
  a: 1,
  b: 2
}

const node = document.getElementById('app')

hyperstatic(app, routes, options)({ init, view, node })
