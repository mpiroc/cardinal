import { Map } from 'immutable'

// actions
const TOGGLE_NAV_DRAWER = 'TOGGLE_NAV_DRAWER'
const HIDE_NAV_DRAWER = 'HIDE_NAV_DRAWER'

// action creators
export function toggleNavDrawer() {
  return {
    type: TOGGLE_NAV_DRAWER,
  }
}

export function hideNavDrawer() {
  return {
    type: HIDE_NAV_DRAWER,
  }
}

// reducers
const initialState = Map({
  isActive: false,
})

export default function navDrawer(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_NAV_DRAWER:
      return state.set('isActive', !state.get('isActive'))
    case HIDE_NAV_DRAWER:
      return state.set('isActive', false)
    default:
      return state
  }
}