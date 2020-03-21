import { Link } from 'hyperstatic'

import styles from './header.css'

export default () => (
  <header class={styles.header}>
    <Link to="/">Home</Link>
    <Link to="/example-page">Example page</Link>
    <Link to="/counter">Counter</Link>
  </header>
)
