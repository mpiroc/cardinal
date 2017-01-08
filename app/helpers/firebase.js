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
export function deleteDeck({ ref, all }, uid, deckId) {
  const deckCardRef = ref.child(`deckCards/${deckId}`)
  const userDeckRef = ref.child(`userDecks/${uid}/${deckId}`)

  return all([
    // TODO: Does this also trigger child_removed events on the deckCard's children?
    deckCardRef.remove(),
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
export function deleteCard({ ref, all }, uid, deckId, cardId) {
  const deckCardRef = ref.child(`deckCards/${uid}/${deckId}/${cardId}`)

  return all([
    deckCardRef.remove(),
    deleteCardHistory({ ref }, uid, deckId, cardId)
  ])
}

export function saveNewCard({ ref, all }, uid, deckId, { side1, side2 }) {
  const deckCardRef = ref.child(`deckCards/${uid}/${deckId}`).push()

  return all([
    deckCardRef.set({
      cardId: deckCardRef.key,
      side1,
      side2,
    }),
    saveCardHistory({ ref }, uid, deckId, deckCardRef.key, {
      grade: -1,
      difficulty: 2.5,
      repetitionCount: 0,
      previousReviewMoment: -1,
      nextReviewMoment: -1,
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
function deleteCardHistory({ ref }, uid, deckId, cardId) {
  const cardHistoryRef = ref.child(`cardHistory/${uid}/${deckId}/${cardId}`)

  return cardHistoryRef.remove()
}

export function saveCardHistory({ ref }, uid, deckId, cardId, {
  grade,
  difficulty,
  repetitionCount,
  previousReviewMoment,
  nextReviewMoment,
}) {
  const cardHistoryRef = ref.child(`cardHistory/${uid}/${deckId}/${cardId}`)

  return cardHistoryRef.set({
    grade,
    difficulty,
    repetitionCount,
    previousReviewMoment,
    nextReviewMoment,
  })
}

// Listener helpers
export function setUserValueListener({ ref }, uid, onSuccess, onFailure) {
  return ref.child(`users/${uid}`)
    .on('value', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setUserDeckAddedListener({ ref }, uid, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}`)
    .on('child_added', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setUserDeckRemovedListener({ ref }, uid, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}`)
    .on('child_removed', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setUserDeckValueListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}/${deckId}`)
    .on('value', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setDeckCardAddedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}`)
    .on('child_added', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setDeckCardRemovedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}`)
    .on('child_removed', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function setDeckCardValueListener({ ref }, uid, deckId, cardId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}/${cardId}`)
    .on('value', snapshop => onSuccess(snapshop.val()), onFailure)
}

export function removeUserValueListener({ ref }, uid, onSuccess, onFailure) {
  return ref.child(`users/${uid}`).off('value')
}

export function removeUserDeckAddedListener({ ref }, uid, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}`).off('child_added')
}

export function removeUserDeckRemovedListener({ ref }, uid, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}`).off('child_removed')
}

export function removeUserDeckValueListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return ref.child(`userDecks/${uid}/${deckId}`).off('value')
}

export function removeDeckCardAddedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}`).off('child_added')
}

export function removeDeckCardRemovedListener({ ref }, uid, deckId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}`).off('child_removed')
}

export function removeDeckCardValueListener({ ref }, uid, deckId, cardId, onSuccess, onFailure) {
  return ref.child(`deckCards/${uid}/${deckId}/${cardId}`).off('value')
}
