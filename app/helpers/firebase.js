import firebase from 'firebase'
import { ref } from 'config/firebase'

export async function signInWithPopup() {
  const provider = new firebase.auth.GoogleAuthProvider()
  const result = await firebase.auth().signInWithPopup(provider)
  const { displayName, uid } = result.user

  return {
    displayName,
    uid,
  }
}

export function saveUser(user) {
  return ref
    .child(`users/${user.uid}`)
    .set(user)
}

export function saveNewDeck(deck) {
  const deckRef = ref
    .child('decks')
    .push()

  deck = {
    deckId: deckRef.key,
    ...deck,
  }

  return deckRef.set(deck)
}

export function saveNewCard(card) {
  const cardRef = ref
    .child('cards')
    .push()

  card = {
    cardId: cardRef.key,
    ...card,
  }

  return cardRef.set(card)
}

export function setDecksListener(onSuccess, onFailure) {
  return ref
    .child('decks')
    .on('value',
      (snapshot) => onSuccess(snapshot.val()),
      onFailure)
}

export function setCardsListener(onSuccess, onFailure) {
  return ref
    .child('cards')
    .on('value',
      (snapshot) => onSuccess(snapshot.val()),
      onFailure)
}