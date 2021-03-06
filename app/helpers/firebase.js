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
  return ref.child(getUserPath(uid)).set({
    uid,
    name,
  })
}

// deck create/update/delete helpers
export function deleteDeck({ ref }, uid, deckId) {
  const deckCardRef = ref.child(getDeckCardCollectionPath(uid, deckId))
  const cardHistoryRef = ref.child(getCardHistoryCollectionPath(uid, deckId))
  const cardContentRef = ref.child(getCardContentCollectionPath(uid, deckId))
  const userDeckRef = ref.child(getUserDeckPath(uid, deckId))

  return Promise.all([
    deckCardRef.remove(),
    cardHistoryRef.remove(),
    cardContentRef.remove(),
    userDeckRef.remove(),
  ])
}

export function saveNewDeck({ ref }, uid, { name, description }) {
  const userDeckRef = ref.child(getUserDeckCollectionPath(uid)).push()
  return userDeckRef.set({
    deckId: userDeckRef.key,
    name,
    description,
  })
}

export function saveExistingDeck({ ref }, uid, { deckId, name, description }) {
  return ref.child(getUserDeckPath(uid, deckId)).set({
    deckId,
    name,
    description,
  })
}

// card create/update/delete helpers
export function deleteCard({ ref }, uid, deckId, cardId) {
  const deckCardRef = ref.child(getDeckCardPath(uid, deckId, cardId))

  return Promise.all([
    deckCardRef.remove(),
    deleteCardHistory({ ref }, uid, deckId, cardId),
    deleteCardContent({ ref }, uid, deckId, cardId),
  ])
}

export function saveNewCard({ ref }, uid, deckId, { side1, side2 }) {
  const deckCardRef = ref.child(getDeckCardCollectionPath(uid, deckId)).push()

  return Promise.all([
    deckCardRef.set({
      cardId: deckCardRef.key,
      deckId,
    }),
    saveCardHistory({ ref }, uid, deckId, deckCardRef.key, {
      grade: 0,
      difficulty: 2.5,
      repetitionCount: 0,
    }),
    saveCardContent({ ref }, uid, deckId, deckCardRef.key, {
      side1,
      side2,
    }),
  ])
}

// cardHistory create/update/delete helpers
export function deleteCardHistory({ ref }, uid, deckId, cardId) {
  const cardHistoryRef = ref.child(getCardHistoryPath(uid, deckId, cardId))

  if (cardHistoryRef) {
    return cardHistoryRef.remove()
  }

  return Promise.resolve()
}

export function saveCardHistory({ ref }, uid, deckId, cardId, history) {
  const cardHistoryRef = ref.child(getCardHistoryPath(uid, deckId, cardId))

  return cardHistoryRef.set(history)
}

// cardContent create/update/delete helpers
export function deleteCardContent({ ref }, uid, deckId, cardId) {
  const cardContentRef = ref.child(getCardContentPath(uid, deckId, cardId))

  if (cardContentRef) {
    return cardContentRef.remove()
  }

  return Promise.resolve()
}

export function saveCardContent({ ref }, uid, deckId, cardId, content) {
  const cardContentRef = ref.child(getCardContentPath(uid, deckId, cardId))

  return cardContentRef.set(content)
}

// One-time fetch of history for all cards in a deck
export async function fetchDeckHistory({ ref }, uid, deckId) {
  const snapshot = await ref.child(getCardHistoryCollectionPath(uid, deckId)).once('value')

  return snapshot.val()
}

// Listener helpers
export function setDataListener({ ref }, path, event, onSuccess, onFailure) {
  return ref.child(path).on(
    event,
    snapshot => onSuccess(
      snapshot.val(),
      snapshot.key),
    onFailure)
}

export function removeDataListener({ ref }, path, event) {
  ref.child(path).off(event)
}

// Path helpers
export function getUserPath(uid) {
  return `users/${uid}`
}

export function getUserDeckCollectionPath(uid) {
  return `userDecks/${uid}`
}

export function getUserDeckPath(uid, deckId) {
  return `${getUserDeckCollectionPath(uid)}/${deckId}`
}

export function getDeckCardCollectionPath(uid, deckId) {
  return `deckCards/${uid}/${deckId}`
}

export function getDeckCardPath(uid, deckId, cardId) {
  return `${getDeckCardCollectionPath(uid, deckId)}/${cardId}`
}

export function getCardHistoryCollectionPath(uid, deckId) {
  return `cardHistory/${uid}/${deckId}`
}

export function getCardHistoryPath(uid, deckId, cardId) {
  return `${getCardHistoryCollectionPath(uid, deckId)}/${cardId}`
}

export function getCardContentCollectionPath(uid, deckId) {
  return `cardContent/${uid}/${deckId}`
}

export function getCardContentPath(uid, deckId, cardId) {
  return `${getCardContentCollectionPath(uid, deckId)}/${cardId}`
}
