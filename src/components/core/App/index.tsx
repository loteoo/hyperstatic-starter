import '/styles/base.css'

import Header from '/components/core/Header'
import Router from '/utils/routing/Router'
import Footer from '/components/core/Footer'

const App = (state) => {
  console.log(state)
  return (
    <main>
      <Header />
      <Router {...state} />
      <Footer {...state} />
    </main>
  )
}

export default App
