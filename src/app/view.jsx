
import { Router, Link } from 'hyperapp-site-generator'

const container = {
  maxWidth: '640px',
  margin: '3rem auto'
}

// Root application view
export default (state) => (
  <div style={container}>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/counter">Counter</Link></li>
      </ul>
    </nav>
    <main>
      {Router(state)}
    </main>
  </div>
)
