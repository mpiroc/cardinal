import React, { PropTypes } from 'react'
import { NavDrawer } from 'react-toolbox/lib/layout'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

export default function MainNavDrawer(props) {
  const {
    onNavHome,
    onNavDecks,
  } = props

  return (
    <NavDrawer pinned={true}>
      <List selectable={true}>
        <ListItem leftIcon='home' caption={'Home'} onClick={onNavHome} />
        <ListItem leftIcon='view_module' caption={'Decks'} onClick={onNavDecks} />
      </List>
    </NavDrawer>
  )
}

MainNavDrawer.propTypes = {
  onNavHome: PropTypes.func.isRequired,
  onNavDecks: PropTypes.func.isRequired,
}