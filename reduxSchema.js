users
  isFetching: bool
  error: string
  users
    [uid]
      name: string
      decks
        [deckId]: true

decks
  isFetching: bool
  error: string
  decks
    [deckId]
      name: string
      cards
        [cardId]: true

cards
  isFetching: bool
  error: string
  cards
    [cardId]
      cardId: string
      side1: string
      side2: string

listeners
  users
    [uid]: true
  userDecks
    [uid]
      added: bool
      removed: bool
      decks
        [deckId]: true
  deckCards
    [deckId]
      added: bool
      removed: bool
      cards
        [cardId]: true

auth
  isAuthing: bool
  authedUid: string
  authError: string

newDeckModal
  isOpen: bool
  isSaving: bool
  name: string
  error: string

newCardModal
  isOpen: bool
  isSaving: bool
  error: string
  side1: string
  side2: string
