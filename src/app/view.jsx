
import { Router, Link } from 'hyperstatic'

// Root application view
export default (state) => (
  <div class="container">
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/counter">Counter</Link>
    </header>
    <main>
      {Router(state)}
    </main>
    <footer>
      <a href="https://github.com/loteoo/hyperstatic-starter" target="_blank" rel="noopener noreferrer">Boilerplate repository</a>
      <a href="https://github.com/loteoo/hyperstatic" target="_blank" rel="noopener noreferrer">Generator repository</a>
      <a href="https://hyperstatic-demo.netlify.com/" target="_blank" rel="noopener noreferrer">Generator demo site</a>
    </footer>
  </div>
)
