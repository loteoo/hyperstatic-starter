import Header from '/components/core/Header'
import { Router } from 'hyperstatic'
import Footer from '/components/core/Footer'

import '/styles/base.css'

const App = (state) => {
  return (
    <main>
      <Header />
      <Router />
      <Footer />
    </main>
  )
}

export default App
