---
redux
  users
    isFetching
    error
    users
      [uid]
        name
        decks
          [deckId]: true
  decks
    isFetching
    error
    decks
      [deckId]
        uid
        name
        cards
          [cardId]: true
  cards
    isFetching
    error
    cards
      [cardId]
        cardId
        deckId
        side1
        side2

---
firebase
  users
    [uid]
      uid
      name
  userDecks
    [uid]
      [deckId]
        deckId
        name
  deckCards
    [deckId]
      [cardId]
        cardId
        side1
        side2

listeners:
  users/[uid].on('value')

  userDecks/[uid].on('child_removed')
  userDecks/[uid].on('child_added')
  userDecks/[uid]/[deckId].on('value')

  deckCards/[deckId].on('child_removed')
  deckCards/[deckId].on('child_added')
  deckCards/[deckId]/[cardId].on('value')
