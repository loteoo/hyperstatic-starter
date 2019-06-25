import { app } from 'hyperapp'
import { LocationChanged, ParseUrl, getInitialState } from 'hyperapp-site-generator'

// Import best-practices css defaults
import 'sanitize.css'
import 'sanitize.css/typography.css'
import 'sanitize.css/forms.css'

// Global styling
import './global.css'

// App init imports
import routes from './app/routes'
import init from './app/init'
import view from './app/view'

// Initialize the app
app({
  init: getInitialState(routes, init), // Get initiated state
  view,
  subscriptions: () => [
    LocationChanged({ action: ParseUrl }) // Hook up router
  ],
  node: document.getElementById('app')
})

// Enable the service worker when running the build command
if (process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register(`${window.location.origin}/sw.js`)
}
