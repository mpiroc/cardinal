function handleEnter(nextState) {
  const destinationPath = nextState.location.pathname
  const isAuthed = store.getState().auth.get('isAuthed')

  if (isAuthed == true && (destinationPath === '/' || destinationPath === '/login')) {
    dispatch(replace('/decks'))
  }

  if (isAuthed === false) {
    if (destinationPath === '/') {
      dispatch(replace('/login'))
    }
    else if (destinationPath !== '/login') {
      dispatch(setLoginRedirect(destinationPath))
      dispatch(replace('/login'))
    }
  }
}

function redirectFromAuthResult() {
  return (getState, dispatch, firebaseContext) => {
    const { auth, loginRedirect, routing } = getState()
    const isAuthed = auth.get('isAuthed')
    const loginRedirectPath = loginRedirect.get('redirect')
    const currentPath = routing.getIn['locationBeforeTransitions', 'pathname']

    if (isAuthed === undefined) {
      throw Error('isAuthed must be set before redirectFromAuthResult is called')
    }

    if (isAuthed === false) {
      if (loginRedirectPath !== undefined) {
        dispatch(replace(loginRedirectPath))
        dispatch(clearLoginRedirect())
      }
      else {
        dispatch(replace('/decks'))
      }
    }
    else if (currentPath !== '/login') {
      if (loginRedirectPath === undefined) {
        dispatch(setLoginRedirect(currentPath))
      }

      dispatch(replace('/login'))
    }
  }
}