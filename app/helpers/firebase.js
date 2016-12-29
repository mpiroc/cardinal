import firebase from 'firebase'
import { ref } from 'config/firebase'

// Sign in helpers
export async function signInWithPopup() {
  const provider = new firebase.auth.GoogleAuthProvider()
  const result = await firebase.auth().signInWithPopup(provider)
  const { displayName, uid } = result.user

  return {
    name: displayName,
    uid,
  }
}

export function signOut () {
  return firebase.auth().signOut()
}

// Save item helpers
export function saveUser({ uid, name }) {
  return ref.child(`users/${uid}`).set({
    uid,
    name,
  })
}

export function deleteDeck(uid, deckId) {
  const deckCardRef = ref.child(`deckCards/${deckId}`)
  const userDeckRef = ref.child(`userDecks/${uid}/${deckId}`)

  return firebase.Promise.all([
    // TODO: Does this also trigger child_removed events on the deckCard's children?
    deckCardRef.remove(),
    userDeckRef.remove(),
  ])
}

export function saveNewDeck(uid, { name, description }) {
  const userDeckRef = ref.child(`userDecks/${uid}`).push()
  return userDeckRef.set({
    deckId: userDeckRef.key,
    name,
    description,
  })
}

export function saveExistingDeck(uid, { deckId, name, description }) {
  return ref.child(`userDecks/${uid}/${deckId}`).set({
    deckId,
    name,
    description,
  })
}

export function deleteCard(deckId, cardId) {
  const deckCardRef = ref.child(`deckCards/${deckId}/${cardId}`)

  return deckCardRef.remove()
}

export function saveNewCard(deckId, { side1, side2 }) {
  const deckCardRef = ref.child(`deckCards/${deckId}`).push()
  return deckCardRef.set({
    cardId: deckCardRef.key,
    side1,
    side2,
  })
}

export function saveExistingCard(deckId, { cardId, side1, side2 }) {
  return ref.child(`deckCards/${deckId}/${cardId}`).set({
    cardId,
    side1,
    side2,
  })
}

// Listener helpers
export function setUserValueListener(uid, onSuccess, onFailure) {
  return ref.child(`users/${uid}`)
    .on('value', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setUserDeckAddedListener(uid, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}`)
    .on('child_added', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setUserDeckRemovedListener(uid, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}`)
    .on('child_removed', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setUserDeckValueListener(uid, deckId, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}/${deckId}`)
    .on('value', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setDeckCardAddedListener(deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${deckId}`)
    .on('child_added', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setDeckCardRemovedListener(deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${deckId}`)
    .on('child_removed', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setDeckCardValueListener(deckId, cardId, onSuccess, onFailure) {
  return ref.child(`deckCards/${deckId}/${cardId}`)
    .on('value', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function removeUserValueListener(uid, onSuccess, onFailure) {
  return ref.child(`users/${uid}`).off('value')
}

export function removeUserDeckAddedListener(uid, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}`).off('child_added')
}

export function removeUserDeckRemovedListener(uid, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}`).off('child_removed')
}

export function removeUserDeckValueListener(uid, deckId, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}/${deckId}`).off('value')
}

export function removeDeckCardAddedListener(deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${deckId}`).off('child_added')
}

export function removeDeckCardRemovedListener(deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${deckId}`).off('child_removed')
}

export function removeDeckCardValueListener(deckId, cardId, onSuccess, onFailure) {
  return ref.child(`deckCards/${deckId}/${cardId}`).off('value')
}
