import Button from '/components/ui/Button'
import utils from '/styles/utils.css'
import Link from '/utils/routing/Link'
import preload from '/utils/routing/preload'

import styles from './character-list.css'

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
  preload({
    // url: 'https://rickandmortyapi.com/api/character',
    url: '/characters.json',
    action: HandleCharacters,
    error: (state) => state
  })
]

// Fetch more characters
const LoadMore = (state) => [
  state,
  preload({
    // url: `https://rickandmortyapi.com/api/character?page=${
    //   Math.floor(state.characterlist.length / 20) + 1
    // }`,
    url: '/characters.json',
    action: HandleCharacters
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
          <h4 class={styles.cardTitle}>{character.name}</h4>
          <small>
            {/* {character.species} - {character.status} */}
          </small>
        </Link>
      ))}
    </div>
    <Button onclick={LoadMore}>Load more</Button>
  </div>
)

export default CharacterList
