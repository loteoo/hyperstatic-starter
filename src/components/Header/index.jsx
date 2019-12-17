import { Link } from 'hyperstatic'

import './style.css'

export default () => (
  <header>
    <Link to="/">Home</Link>
    <Link to="/example-page">Example page</Link>
    <Link to="/counter">Counter</Link>
  </header>
)
