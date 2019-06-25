
import { Router, Link } from 'hyperapp-site-generator'

const container = {
  maxWidth: '640px',
  margin: '3rem auto',
  padding: '1rem'
}

// Root application view
export default (state) => (
  <div style={container}>
    <header>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/counter">Counter</Link>
        </ul>
      </nav>
    </header>
    <main>
      {Router(state)}
    </main>
    <footer>
      <a href="https://github.com/loteoo/hyperapp-site-generator-starter" target="_blank">Boilerplate</a>
      <a href="https://github.com/loteoo/hyperapp-site-generator" target="_blank">Generator</a>
      <a href="https://hyperapp-site-generator-demo.netlify.com/" target="_blank">Demo site</a>
    </footer>
  </div>
)
