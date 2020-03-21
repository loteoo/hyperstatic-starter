import { Router } from 'hyperstatic'
import Header from '../Header'
import Footer from '../Footer'

// Global styling
import '/styles/base.css'

// Utils
import utils from '/styles/utils.css'

// Root application view
export default state => (
  <div class={utils.container}>
    <Header />
    <main>{Router(state)}</main>
    <Footer />
  </div>
)
