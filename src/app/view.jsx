import { Router, Link } from 'hyperstatic'

// Root application view
export default (state) => (
  <div class="container">
    <header>
      <Link to="/">Home</Link>
      <Link to="/example-page">Example page</Link>
      <Link to="/counter">Counter</Link>
    </header>
    <main>
      {Router(state)}
    </main>
    <footer>
      <a href="https://github.com/loteoo/hyperstatic-starter" target="_blank" rel="noopener noreferrer">Starter repository</a>
      <a href="https://github.com/loteoo/hyperstatic" target="_blank" rel="noopener noreferrer">Hyperstatic repository</a>
      <a href="https://hyperstatic.dev/" target="_blank" rel="noopener noreferrer">Hyperstatic demo site</a>
    </footer>
  </div>
)
