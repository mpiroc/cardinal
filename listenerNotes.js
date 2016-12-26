on login
  listen to user value

on view decks
  listen to userDecks collection
  optional: listen to each userDeck value

on view decks
  listen to userDeck value
  listen to deckCards collection
  optional: listen to each deckCard value

on view/edit/review card
  listen to deckCard value
