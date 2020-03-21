import styles from './footer.css'

export default () => (
  <footer class={styles.footer}>
    <a
      href="https://github.com/loteoo/hyperstatic-starter"
      target="_blank"
      rel="noopener noreferrer"
    >
      Starter repository
    </a>
    <a
      href="https://github.com/loteoo/hyperstatic"
      target="_blank"
      rel="noopener noreferrer"
    >
      Hyperstatic repository
    </a>
    <a
      href="https://hyperstatic.dev/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Hyperstatic demo site
    </a>
  </footer>
)
