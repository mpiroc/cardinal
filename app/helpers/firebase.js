// Sign in helpers
export async function signInWithPopup({ auth }) {
  const provider = new auth.GoogleAuthProvider()
  const result = await auth().signInWithPopup(provider)
  const { displayName, uid } = result.user

  return {
    name: displayName,
    uid,
  }
}

export function signOut({ auth }) {
  return auth().signOut()
}

export function setAuthStateChangedListener({ auth }, onAuthStateChanged) {
  auth().onAuthStateChanged(onAuthStateChanged) 
}

// user create/update/delete helpers
export function saveUser({ ref }, { uid, name }) {
  return ref.child(`users/${uid}`).set({
    uid,
    name,
  })
}

// deck create/update/delete helpers
export function deleteDeck({ ref }, uid, deckId) {
  const deckCardRef = ref.child(`deckCards/${uid}/${deckId}`)
  const cardHistoryRef = ref.child(`cardHistory/${uid}/${deckId}`)
  const userDeckRef = ref.child(`userDecks/${uid}/${deckId}`)

  return Promise.all([
    deckCardRef.remove(),
    cardHistoryRef.remove(),
    userDeckRef.remove(),
  ])
}

export function saveNewDeck({ ref }, uid, { name, description }) {
  const userDeckRef = ref.child(`userDecks/${uid}`).push()
  return userDeckRef.set({
    deckId: userDeckRef.key,
    name,
    description,
  })
}

export function saveExistingDeck({ ref }, uid, { deckId, name, description }) {
  return ref.child(`userDecks/${uid}/${deckId}`).set({
    deckId,
    name,
    description,
  })
}

// card create/update/delete helpers
export function deleteCard({ ref }, uid, deckId, cardId) {
  const deckCardRef = ref.child(`deckCards/${uid}/${deckId}/${cardId}`)

  return Promise.all([
    deckCardRef.remove(),
    deleteCardHistory({ ref }, uid, deckId, cardId)
  ])
}

export function saveNewCard({ ref }, uid, deckId, { side1, side2 }) {
  const deckCardRef = ref.child(`deckCards/${uid}/${deckId}`).push()

  return Promise.all([
    deckCardRef.set({
      cardId: deckCardRef.key,
      side1,
      side2,
    }),
    saveCardHistory({ ref }, uid, deckId, deckCardRef.key, {
      grade: 0,
      difficulty: 2.5,
      repetitionCount: 0,
    })
  ])
}

export function saveExistingCard({ ref }, uid, deckId, { cardId, side1, side2 }) {
  return ref.child(`deckCards/${uid}/${deckId}/${cardId}`).set({
    cardId,
    side1,
    side2,
  })
}

// cardHistory create/update/delete helpers
export function deleteCardHistory({ ref }, uid, deckId, cardId) {
  const cardHistoryRef = ref.child(`cardHistory/${uid}/${deckId}/${cardId}`)

  return cardHistoryRef.remove()
}

export function saveCardHistory({ ref }, uid, deckId, cardId, history) {
  const cardHistoryRef = ref.child(`cardHistory/${uid}/${deckId}/${cardId}`)

  return cardHistoryRef.set(history)
}

// One-time fetch of history for all cards in a deck
export async function fetchDeckHistory({ ref }, uid, deckId) {
  const snapshot = await ref.child(`cardHistory/${uid}/${deckId}`).once('value')

  return snapshot.val()
}

// Path helpers
function getUserPath(uid) {
  return `users/${uid}`
}

function getUserDeckCollectionPath(uid) {
  return `userDecks/${uid}`
}

function getUserDeckPath(uid, deckId) {
  return `${getUserDeckCollectionPath(uid)}/${deckId}`
}

function getDeckCardCollectionPath(uid, deckId) {
  return `deckCards/${uid}/${deckId}`
}

function getDeckCardPath(uid, deckId, cardId) {
  return `${getDeckCardCollectionPath(uid, deckId)}/${cardId}`
}

function getCardHistoryCollectionPath(uid, deckId) {
  return `cardHistory/${uid}/${deckId}`
}

function getCardHistoryPath(uid, deckId, cardId) {
  return `${getCardHistoryCollectionPath(uid, deckId)}/${cardId}`
}

// Listener helpers
function setDataListener(ref, event, path, onSuccess, onFailure) {
  return ref.child(path).on(
    event,
    snapshot => onSuccess(
      snapshot.val(),
      snapshot.key),
    onFailure)
}

export function setUserValueListener({ ref }, uid, onSuccess, onFailure) {
  return setDataListener(ref, 'value', getUserPath(uid), onSuccess, onFailure)
}

export function setUserDeckAddedListener({ ref }, uid, onSuccess, onFailure) {
  return setDataListener(ref, 'child_added', getUserDeckCollectionPath(uid), onSuccess, onFailure)
}

export function setUserDeckRemovedListener({ ref }, uid, onSuccess, onFailure) {
  return setDataListener(ref, 'child_removed', getUserDeckCollectionPath(uid), onSuccess, onFailure)
}

export function setUserDeckValueListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return setDataListener(ref, 'value', getUserDeckPath(uid, deckId), onSuccess, onFailure)
}

export function setDeckCardAddedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return setDataListener(ref, 'child_added', getDeckCardCollectionPath(uid, deckId), onSuccess, onFailure)
}

export function setDeckCardRemovedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return setDataListener(ref, 'child_removed', getDeckCardCollectionPath(uid, deckId), onSuccess, onFailure)
}

export function setDeckCardValueListener({ ref }, uid, deckId, cardId, onSuccess, onFailure) {
  return setDataListener(ref, 'value', getDeckCardPath(uid, deckId, cardId), onSuccess, onFailure)
}

export function setCardHistoryAddedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return setDataListener(ref, 'child_added', getCardHistoryCollectionPath(uid, deckId), onSuccess, onFailure)
}

export function setCardHistoryValueListener({ ref }, uid, deckId, cardId, onSuccess, onFailure) {
  return setDataListener(ref, 'value', getCardHistoryPath(uid, deckId, cardId), onSuccess, onFailure)
}

function removeDataListener(ref, event, path) {
  return ref.child(path).off(event)
}

export function removeUserValueListener({ ref }, uid, onSuccess, onFailure) {
  return removeDataListener(ref, 'value', getUserPath(uid))
}

export function removeUserDeckAddedListener({ ref }, uid, onSuccess, onFailure) {
  return removeDataListener(ref, 'child_added', getUserDeckCollectionPath(uid))
}

export function removeUserDeckRemovedListener({ ref }, uid, onSuccess, onFailure) {
  return removeDataListener(ref, 'child_removed', getUserDeckCollectionPath(uid))
}

export function removeUserDeckValueListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return removeDataListener(ref, 'value', getUserDeckPath(uid, deckId))
}

export function removeDeckCardAddedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return removeDataListener(ref, 'child_added', getDeckCardCollectionPath(uid, deckId))
}

export function removeDeckCardRemovedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return removeDataListener(ref, 'child_removed', getDeckCardCollectionPath(uid, deckId))
}

export function removeDeckCardValueListener({ ref }, uid, deckId, cardId, onSuccess, onFailure) {
  return removeDataListener(ref, 'value', getDeckCardPath(uid, deckId, cardId))
}

export function removeCardHistoryAddedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return removeDataListener(ref, 'child_added', getCardHistoryCollectionPath(uid, deckId))
}

export function removeCardHistoryValueListener({ ref }, uid, deckId, cardId, onSuccess, onFailure) {
  return removeDataListener(ref, 'value', getCardHistoryPath(uid, deckId, cardId))
}