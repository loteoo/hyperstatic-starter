import utils from '/styles/utils.css'
import { decodeNumberInput } from '/utils'

// Actions
export const Init = state => ({ ...state, a: 1, b: 2 })
const SetA = (state, a) => ({ ...state, a })
const SetB = (state, b) => ({ ...state, b })

// View
export default state => (
  <div>
    <h1>Do more with less</h1>
    <div class={utils.grid}>
      <input
        type="number"
        value={state.a}
        oninput={[SetA, decodeNumberInput]}
      />
      <input
        type="number"
        value={state.b}
        oninput={[SetB, decodeNumberInput]}
      />
    </div>
    <h2>
      {state.a} + {state.b} = {state.a + state.b}
    </h2>
  </div>
)
