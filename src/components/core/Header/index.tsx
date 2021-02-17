import Logo from '/components/core/Logo'
import { Link } from 'hyperstatic'

import utils from '/styles/utils.css'
import styles from './header.css'

const Header = () => (
  <header class={styles.header}>
    <div class={[utils.container, styles.inner]}>
      <Logo />
      <Link href="/secondary">Secondary page</Link>
      <Link href="/counter">Counter page</Link>
      <Link href="/characters">Character list</Link>
    </div>
  </header>
)

export default Header
