users
  [uid]
    name
    decks
      [deckId]
        name

decks
  [deckId]
    uid
    name
    cards
      [cardId]
        lastAnswer
        nextReviewDate

cards
  [cardId]
    uid
    deckId
    side1
    side2
    difficulty

