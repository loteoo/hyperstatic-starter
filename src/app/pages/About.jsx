// Just a view
export default (state) => (
  <div>
    <h2>About page</h2>
    <p>Lorem lorem lorem...</p>
    <h4>Here is the state of your site because why not:</h4>
    <pre><code>{JSON.stringify(state, null, 2)}</code></pre>
  </div>
)
