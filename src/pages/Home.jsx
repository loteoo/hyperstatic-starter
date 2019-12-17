// Actions
export const Init = (state) => ({ ...state, a: 1, b: 2 })
const SetA = (state, a) => ({ ...state, a })
const SetB = (state, b) => ({ ...state, b })

// Decoder
const decodeInput = event => parseInt(event.target.value || 0)

// View
export default state => (
  <div>
    <h1>Do more with less</h1>
    <input type="number" value={state.a} oninput={[SetA, decodeInput]} />
    <input type="number" value={state.b} oninput={[SetB, decodeInput]} />
    <h2>{state.a} + {state.b} = {state.a + state.b}</h2>
  </div>
)
