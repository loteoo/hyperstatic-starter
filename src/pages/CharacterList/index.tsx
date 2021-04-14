import utils from '/styles/utils.module.css'
import { Link, loadStatic } from 'hyperstatic'

import styles from './character-list.module.css'

const HandleCharacters = (state, data) => ({
  ...state,
  characterlist: state.characterlist.concat(data.results)
})

// Fetch characters
export const init = (state) => [
  {
    ...state,
    characterlist: []
  },
  loadStatic({
    loader: async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character`)
      const data = await response.json()
      return data
    },
    action: HandleCharacters,
    error: (state) => state
  })
]

// View
const CharacterList = (state) => (
  <div class={utils.container}>
    <h2>Data fetching example</h2>
    <h4>Rick and Morty characters</h4>
    <div class={utils.grid}>
      {state.characterlist.map((character) => (
        <Link class={styles.card} href={`/characters/${character.id}`}>
          {({ status }) => (
            <span>
              <h4 class={styles.cardTitle}>{character.name}</h4>
              <small>
                {character.species} - {character.status} - {status}
              </small>
            </span>
          )}
        </Link>
      ))}
    </div>
  </div>
)

export default CharacterList
