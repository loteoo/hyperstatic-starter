import Input from '/src/components/ui/Input'
import utils from '/src/styles/utils.module.css'

// Initialize state
export const init = (state) => ({
  ...state,
  a: 1,
  b: 2
})

// Actions
const SetA = (state, ev) => ({ ...state, a: Number(ev.target.value) })
const SetB = (state, ev) => ({ ...state, b: Number(ev.target.value) })

// View
const HomePage = ({ a, b }) => (
  <div class={utils.container}>
    <h1>👋 Welcome to hyperstatic!</h1>
    <div class={utils.grid}>
      <Input type="number" name="a" value={a} onchange={SetA} />
      <Input type="number" name="b" value={b} onchange={SetB} />
    </div>
    <h2>
      {a} + {b} = {a + b}
    </h2>
  </div>
)

export default HomePage
