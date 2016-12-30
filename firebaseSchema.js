// This file is purely for reference, it is not used anywhere in the application, nor is it automatically kept up-to-date.

users
  [uid]
    uid: string
    name: string

userDecks
  [uid]
    [deckId]
      deckId: string
      name: string
      description: string

deckCards
  [uid]
    [deckId]
      [cardId]
        cardId: string
        side1: string
        side2: string