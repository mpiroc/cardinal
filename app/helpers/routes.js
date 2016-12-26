export function redirectIfNecessary(isAuthed, path, replace) {
  if (path === '/') {
    if (isAuthed === true) {
      replace('/decks')
    }
  }
  else {
    if (isAuthed !== true) {
      replace('/')
    }
  }
}