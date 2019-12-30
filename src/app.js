import { hyperstatic } from 'hyperstatic'

// App init imports
import routes from './app/routes'
import init from './app/init'
import Layout from './components/Layout'

// Initialize the app
hyperstatic({
  routes,
  init,
  view: Layout,
  node: document.getElementById('app')
})

// Enable the service worker when running the build command
if (process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register(`${window.location.origin}/sw.js`)
}
