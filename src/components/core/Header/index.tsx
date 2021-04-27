import Logo from '/src/components/core/Logo'
import { Link } from 'hyperstatic'

import utils from '/src/styles/utils.module.css'
import styles from './header.module.css'

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
