import { Map } from 'immutable'

const DRILL_DECK = 'DRILL_DECK'
const GRADE_CARD = 'GRADE_CARD'
const SHOW_ANSWER = 'SHOW_ANSWER'


const initalCardState = Map({
  side1: '',
  side2: '',
  isMemorized: false,
})

function card(state = initalCardState, action) {

}

const initialState = Map({
  cards: Map({}),
  currentCard: card(undefined, { type: undefined }),
  isAnswerVisible: false,
})

function review(state = initialState, action) {
  switch(action.type) {
    case DRILL_DECK:
      let result = state
      for (card in action.cards) {
        result = result.setIn(['cards', card.cardId], card())
      }
      return state.set(cards, action.cards)
  }
}