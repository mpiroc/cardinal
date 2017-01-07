import { ref, auth, FirebasePromise } from 'config/firebase'

// Sign in helpers
export async function signInWithPopup() {
  const provider = new auth.GoogleAuthProvider()
  const result = await auth().signInWithPopup(provider)
  const { displayName, uid } = result.user

  return {
    name: displayName,
    uid,
  }
}

export function signOut() {
  return auth().signOut()
}

export function setAuthStateChangedListener(onAuthStateChanged) {
  auth().onAuthStateChanged(onAuthStateChanged) 
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

  return FirebasePromise.all([
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

export function deleteCard(uid, deckId, cardId) {
  const deckCardRef = ref.child(`deckCards/${uid}/${deckId}/${cardId}`)

  return deckCardRef.remove()
}

export function saveNewCard(uid, deckId, { side1, side2 }) {
  const deckCardRef = ref.child(`deckCards/${uid}/${deckId}`).push()
  return deckCardRef.set({
    cardId: deckCardRef.key,
    side1,
    side2,
  })
}

export function saveExistingCard(uid, deckId, { cardId, side1, side2 }) {
  return ref.child(`deckCards/${uid}/${deckId}/${cardId}`).set({
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

export function setDeckCardAddedListener(uid, deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}`)
    .on('child_added', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setDeckCardRemovedListener(uid, deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}`)
    .on('child_removed', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setDeckCardValueListener(uid, deckId, cardId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}/${cardId}`)
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

export function removeDeckCardAddedListener(uid, deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}`).off('child_added')
}

export function removeDeckCardRemovedListener(uid, deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}`).off('child_removed')
}

export function removeDeckCardValueListener(uid, deckId, cardId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}/${cardId}`).off('value')
}
