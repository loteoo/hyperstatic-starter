// Hyperstatic runtime
import { hyperstatic, onRouteChanged, onRouteChangeStart, Options } from 'hyperstatic'

// Root view
import Loader from '/src/components/core/Loader'
import App from '/src/components/core/App'

const routes = {
  '/': import('./pages/HomePage'),
  '/secondary': import('./pages/SecondaryPage'),
  '/counter': import('./pages/CounterPage'),
  '/characters': import('./pages/CharacterList'),
  '/characters/:id': import('./pages/CharacterDetails'),
}

// All of these are optional
const options: Options = {
  baseUrl: '/', // Path prefix
  loader: Loader, // Custom loading indicator in case of slow networks
  fastClicks: true,
  navigationDelay: 250,
}

hyperstatic({
  routes,
  options,
  init: {},
  view: App,
  subscriptions: (state) => [
    onRouteChangeStart({
      action: (state) => ({ ...state, navigationInProgress: true })
    }),
    onRouteChanged({
      action: (state) => ({ ...state, navigationInProgress: false })
    }),
  ]
})
