users
  isFetching
  isAuthing
  authedId
  error
  users
    [uid]
      name

decks
  isFetching
  error
  decks
    [deckId]
      name
      cards (order by nextReviewDate?)
        [cardId]: true

cards
  isFetching
  error
  cards
    [cardId]
      side1
      side2
      lastAnswer
      nextReviewDate
      difficulty

review
  deckId
  cardId
  isAnswerVisible

addDeckModal
  isSaving
  error
  name

addCardModal
  isSaving
  error
  deckId
  side1
  side2
