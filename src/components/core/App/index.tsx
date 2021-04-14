import Header from '/components/core/Header'
import { Router } from 'hyperstatic'
import Footer from '/components/core/Footer'

import '/styles/base.module.css'

const App = (_state) => {
  return (
    <main>
      <Header />
      <Router />
      <Footer />
    </main>
  )
}

export default App
