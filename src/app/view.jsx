
import { Router, Link } from 'hyperapp-site-generator'

// Root application view
export default (state) => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/counter">Counter</Link>
    </nav>
    {Router(state)}
  </div>
)
