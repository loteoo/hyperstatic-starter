import Button from '/src/components/ui/Button'

import utils from '/src/styles/utils.module.css'

// Initialize state
export const init = (state) => ({
  ...state,
  counter: 0
})

// Actions
const Increment = (state) => ({ ...state, counter: state.counter + 1 })
const Decrement = (state) => ({ ...state, counter: state.counter - 1 })

// View
const CounterPage = (state) => (
  <div class={utils.container}>
    <h2>Counter</h2>
    <h1>{state.counter}</h1>
    <Button onclick={Decrement}>-</Button>
    <Button onclick={Increment}>+</Button>
  </div>
)

export default CounterPage
