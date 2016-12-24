import firebase from 'firebase'
import { ref } from 'config/firebase'

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

