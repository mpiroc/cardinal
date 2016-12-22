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
    .child(`users/users/${user.uid}`)
    .set(user)
}

export function saveNewDeck(deck) {
  const deckRef = ref
    .child(`decks/decks`)
    .push()

  deck = {
    deckId: deckRef.key,
    ...deck,
  }

  return deckRef.set(deck)
}