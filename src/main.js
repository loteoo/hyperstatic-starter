import { hyperstatic } from 'hyperstatic'

// App init imports
import routes from '/routes'
import init from '/init'
import Layout from '/components/Layout'

// Initialize the app
hyperstatic({
  routes,
  init,
  view: Layout,
  subscriptions: () => [],
  node: document.getElementById('app')
})
