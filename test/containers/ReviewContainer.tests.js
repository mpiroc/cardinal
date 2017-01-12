import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, render, shallow } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import jsdomGlobal from 'jsdom-global'
import moment from 'moment'
import createStoreMock from '../testUtils/createStoreMock'
import ReviewContainer from '../../app/containers/Review/ReviewContainer'
import { authUser } from 'redux/modules/auth'
import { updateCard, updateCardHistory } from 'redux/modules/cards'
import { updateDeck, deckCardAddedReceived } from 'redux/modules/decks'

jsdomGlobal()
chai.use(chaiEnzyme())

describe('Review container', function() {
  let store
  beforeEach(function() {
    store = createStoreMock()

    store.dispatch(authUser('myUid'))
    store.dispatch(updateDeck('myDeckId', {
      deckId: 'myDeckId',
      name: 'myDeckName',
    }))
    store.dispatch(deckCardAddedReceived('myDeckId', 'myCardId'))
    store.dispatch(updateCard('myCardId', {
      cardId: 'myCardId',
      side1: 'mySideOne',
      side2: 'mySideTwo',
    }))
  })

  it('exists', function() {
    const wrapper = shallow(
      <Provider store={store}>
        <ReviewContainer params={{ deckId: 'myDeckId' }} />
      </Provider>
    )
    expect(wrapper).to.exist
  })

  it('selects correct card on mount', function(done) {
    const wrapper = mount(
      <Provider store={store}>
        <ReviewContainer params={{ deckId: 'myDeckId' }} />
      </Provider>
    )

    // This is a hack, because I haven't found a good way to await
    // ReviewContainer.componentDidMount
    setTimeout(() => {
      const review = store.getState().review
      expect(review.get('currentCardId')).to.equal('myCardId')

      done()
    }, 10)

  })

  it('does not select a card on mount if none are due', function(done) {
    store.dispatch(updateCardHistory('myCardId', {
      grade: 5,
      nextReviewMoment: moment([1980, 0, 1, 0, 0, 0, 0]).valueOf()
    }))

    const wrapper = mount(
      <Provider store={store}>
        <ReviewContainer params={{ deckId: 'myDeckId' }} />
      </Provider>
    )

    // This is a hack, because I haven't found a good way to await
    // ReviewContainer.componentDidMount
    setTimeout(() => {
      const review = store.getState().review
      expect(review.get('currentCardId')).to.equal('')

      done()
    }, 10)
  })

  it('does not select a card on mount if due cards exist, but are not in deck', function(done) {
    store.dispatch(updateCardHistory('myCardId', {
      grade: 5,
      nextReviewMoment: moment([1980, 0, 1, 0, 0, 0, 0]).valueOf()
    }))
    store.dispatch(updateDeck('myDeckId2', {
      deckId: 'myDeckId2',
      name: 'myDeckName2',
    }))

    const wrapper = mount(
      <Provider store={store}>
        <ReviewContainer params={{ deckId: 'myDeckId' }} />
      </Provider>
    )

    // This is a hack, because I haven't found a good way to await
    // ReviewContainer.componentDidMount
    setTimeout(() => {
      const review = store.getState().review
      expect(review.get('currentCardId')).to.equal('')

      done()
    }, 10)
  })
})