import Header from '/components/core/Header'
import Router from '/utils/routing/Router'
import Footer from '/components/core/Footer'

import '/styles/base.css'

const App = (state) => {
  console.log('state', state)
  return (
    <main>
      <Header />
      <Router {...state} />
      <Footer {...state} />
    </main>
  )
}

export default App
