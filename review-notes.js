// View
{
  side1: string,
  side2: string,
  isAnswerVisible: bool,
  onGrade: func,
  onToggleAnswerVisible: func,
}

// Controller
import { showNextCard /* thunk */, gradeCard /* thunk */, toggleAnswerVisible /* dispatch-bopund action creator */ } from 'redux/modules/review'
componentDidMount() {
  showNextCard(this.props.params.deckId)
}
async handleGrade(grade) {
  await gradeCard(grad)
  showNextCard(this.props.params.deckId)
}
handleToggleAnswerVisible() {
  toggleAnswerVisible()
}
render() {
  const { side1, side2, isAnswerVisible } = this.props // from mapStateToProps
  return <Review side1={side1} side2={side2} isAnswerVisible={isAnswerVisible}
                 onGrade={this.handleGrade} onToggleAnswerVisible={handleToggleAnswerVisible} />
}
mapStateToProps(state, ownProps) {
  const { cards, review } = state
  const cardId = review.get('currentCardId')
  const card = cards.getIn(['cards', cardId])
  return {
    side1: card.get('side1'),
    side2: card.get('side2'),
    isAnswerVisible: review.get('isAnswerVisible'),
  }
}


// Redux
{
  cards: {
    [cardId]: {
      ...
      history: {
        grade: num,
        difficulty: num,
        repetitionCount : num,
        previousReviewMoment: moment,
        nextReviewMoment: moment,
      }
    }
  },
  review: {
    currentCardId: string,
    isAnswerVisible: bool,
  }
}

// Redux reducer
const initialState = Map({
  currentCardId: '',
  isAnswerVisible: false,
})
export default function review(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_CARD:
      return state
        .set('currentCardId', action.cardId)
        .set('isAnswerVisible', false)
    case TOGGLE_ANSWER_VISIBLE:
      return state.set('isAnswerVisible', !state.get('isAnswerVisible'))
    default:
      return state
  }
}

// Redux action creators/thunks
import { computeNewDifficulty, computeNewRepetitionCount, computeNextReviewMoment } from 'helpers/superMemo2'
import { saveCardHistory } from 'helpers/firebase'
showNextCard(deckId) {
  return (dispatch, getState, firebaseContext) => {
    const { cards, decks, review } = getState()

    const now = moment()
    const currentCardId = review.get('currentCardId')
    const cardIds = decks
      .getIn('decks', [deckId], 'cards')
      .keySeq()
      .filter(cardId =>
        cardId !== currentCardId && (
          cards.getIn(['cards', cardId, 'history', 'grade']) <= 2 ||
          moment(
            cards.getIn(['cards', cardId, 'history', 'nextReviewMoment']),
            'milliseconds'
          ).isBefore(now)
        )
      )
    const randomCardId = cardIds
      .skip(randInt(0, cardIds.size))
      .take(1)
      .first()

    dispatch(setCurrentCard(randomCardId))
    // Should result in:
      //review.set('currentCardId', randomCardId)
      //review.set('isAnswerVisible', false)

  }
}

async function gradeCard(uid, deckId, cardId, grade) {
  return (dispatch, getState, firebaseContext) => {
    dispatch(gradingCard())

    try {
      const { cards } = getState()
      const history = cards.getIn(['cards', cardId, 'history'])
      const oldDifficulty = history.get('difficulty')
      const oldRepetitionCount = history.get('repetitionCount')
      const oldPreviousReviewMoment = history.get('previousReviewMoment')

      const difficulty = computeNewDifficulty(oldDifficulty, grade)
      const repetitionCount = computeNewRepetitionCount(oldRepetitionCount, grade)
      const previousReviewMoment = moment()
      const nextReviewMoment = computeNextReviewMoment(previousReviewMoment, repetitionCount, difficulty, oldPreviousReviewMoment)

      await saveCardHistory(firebaseContext, uid, deckId, cardId, {
        grade,
        difficulty,
        repetitionCount,
        previousReviewMoment,
        nextReviewMoment,
      })

      dispatch(gradingCardSuccess())
    }
    catch (error) {
      dispatch(gradingCardFailure(error.message))
    }
  }
}

// Firebase
{
  cardHistory: {
    [uid]: {
      // Partitioning by deckId allows us to fetch all of the history for a deck with a single request.
      [deckId]: {
        [cardId]: {
          grade: num
          difficulty: num,
          repetitionCount : num,
          previousReviewMoment: moment
          nextReviewMoment: moment,
        }
      }
    }
  }
}

// Firebase helpers
function saveCardHistory(uid, deckId, cardId, {
    grade,
    difficulty,
    repetitionCount,
    previousReviewMoment,
    nextReviewMoment,
  }) {
  
  return ref
    .child(`cardHistory/${uid}/${deckId}/${cardId}`)
    .set({
      grade,
      difficulty,
      repetitionCount,
      previousReviewMoment,
      nextReviewMoment,
    })
}

function setCardHistoryAddedListener(uid, deckId, onSuccess, onFailure) {
  ref
    .child(`${uid}/${deckId}`)
    .on('child_added', snapshot => onSuccess(snapshot.val()), onFailure)
}

function setCardHistoryRemovedListener(uid, deckId, onSuccess, onFailure) {
  ref
    .child(`${uid}/${deckId}`)
    .on('child_removed', snapshot => onSuccess(snapshot.val()), onFailure)
}

function setCardHistoryValueListener(uid, deckId, cardId, onSuccess, onFailure) {
  ref
    .child(`${uid}/${deckId}/${cardId}`)
    .on('value', snapshot => onSuccess(snapshot.val()), onFailure)
}
  
// Super Memo 2
export function computeNewDifficulty(previousDifficulty, grade) {
  let result = previousDifficulty - 0.8 + 0.28 * grade - 0.02 * grade * grade
  result = result.toFixed(2)

  return Math.max(result, minimumDifficulty)
}

export function computeNewRepetitionCount(previousRepetitionCount, grade) {
  if (grade < 3) {
    return 0
  }

  return previousRepetitionCount + 1
}

export function computeNextReviewMoment(now, previousReviewMoment, repetitionCount, difficulty) {
  const interval = computeNewInterval(repetitionCount, difficulty, now.diff(previousReviewMoment))

  return now.add(interval)
}

function computeNewInterval(repetitionCount, difficulty, previousIntervalMs) {
  if (repetitionCount === 0) {
    return moment.duration(0, 'days')
  }

  if (repetitionCount === 1) {
    return moment.duration(1, 'days')
  }

  if (repetitionCount === 2) {
    return moment.duration(6, 'days')
  }

  return moment.duration(previousIntervalMs * difficulty)
}
