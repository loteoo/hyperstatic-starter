import utils from '/styles/utils.css'
import styles from './footer.css'

const Footer = (state) => (
  <footer class={styles.footer}>
    <div class={[utils.container, styles.inner]}>
      <a
        href="https://github.com/loteoo/hyperapp-starter"
        target="_blank"
        rel="noopener noreferrer"
      >
        [source code]
      </a>
      <a
        href="https://github.com/jorgebucaran/hyperapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        hyperapp
      </a>
    </div>
    <pre>
      <code>{`"state": ${JSON.stringify(state, null, 2)}`}</code>
    </pre>
  </footer>
)

export default Footer
