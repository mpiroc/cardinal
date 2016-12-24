import { Map } from 'immutable'

const UPDATE_USER_VALUE = 'UPDATE_USER_VALUE'
const ADD_USER_DECK = 'ADD_USER_DECK'
const REMOVE_USER_DECK = 'REMOVE_USER_DECK'

function updateUserValue(user) {
  return {
    type: UPDATE_USER_VALUE,
    user,
  }
}

function addUserDeck(uid, deckId) {
  return {
    type: ADD_USER_DECK,
    uid,
    deckId,
  }
}

function removeUserDeck(uid, deckId) {
  return {
    type: REMOVE_USER_DECK,
    uid,
    deckId,
  }
}

const initialUserState = Map({
  uid: '',
  name: '',
  decks: Map(),
})

function user(state = initialUserState, action) {
  switch(action.type) {
    case UPDATE_USER_VALUE:
      return state.merge(action.user)
    case ADD_USER_DECK:
      return state.setIn(['decks', action.deckId], true)
    case REMOVE_USER_DECK:
      return state.deleteIn(['decks', action.deckId])
    default:
      return state
  }
}

const initialState = Map({
  users: Map(),
})

export default function users(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER_VALUE:
      const path = ['users', action.user.uid]
      return state.setIn(path, user(state.getIn(path), action))
    case ADD_USER_DECK:
    case REMOVE_USER_DECK:
      return state.setIn(path, user(state.getIn(path), action))
      return state
    default:
      return state
  }
}
