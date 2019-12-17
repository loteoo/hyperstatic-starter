import { Router } from 'hyperstatic'
import Header from '../Header'
import Footer from '../Footer'

// Import best-practices css defaults
import 'sanitize.css'
import 'sanitize.css/typography.css'
import 'sanitize.css/forms.css'

// Global styling
import './global.css'

// Utility classes
import './utils.css'

// Root application view
export default (state) => (
  <div class="container">
    <Header />
    <main>
      {Router(state)}
    </main>
    <Footer />
  </div>
)
