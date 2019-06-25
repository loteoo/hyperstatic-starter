
import { Router, Link } from 'hyperapp-site-generator'

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
      <a href="https://github.com/loteoo/hyperapp-site-generator-starter" target="_blank" rel="noopener noreferrer">Boilerplate repository</a>
      <a href="https://github.com/loteoo/hyperapp-site-generator" target="_blank" rel="noopener noreferrer">Generator repository</a>
      <a href="https://hyperapp-site-generator-demo.netlify.com/" target="_blank" rel="noopener noreferrer">Generator demo site</a>
    </footer>
  </div>
)
