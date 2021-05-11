import Header from '/src/components/core/Header'
import { Router } from 'hyperstatic'
import Footer from '/src/components/core/Footer'

import utils from '/src/styles/utils.module.css'

import '/src/styles/base.module.css'

const App = (state) => {
  return (
    <main>
      <Header />
      <div
        class={{
          [utils.fadeIn]: !state.navigationInProgress,
          [utils.fadeOut]: state.navigationInProgress
        }}
      >
        <Router />
      </div>
      <Footer />
    </main>
  )
}

export default App
