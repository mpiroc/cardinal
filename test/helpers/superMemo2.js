import 'babel-polyfill'
import chai, { expect } from 'chai'
import moment from 'moment'
import {
  computeNewDifficulty,
  computeNewRepetitionCount,
  computeNextReviewMs,
} from 'helpers/superMemo2'

describe('SuperMemo 2 helpers', function() {
  describe('computeNewDifficulty', function() {
    const minimumDifficulty = 1.3

    it('should exist', function() {
      expect(computeNewDifficulty).to.exist
    })

    it('should not fall below the minimum', function() {
      expect(computeNewDifficulty(1.3, 3, 0)).to.equal(1.3)
    })

    it('should throw on a previousDifficulty below the miminum', function() {
      expect(() => computeNewDifficulty(1.2, 3, 0)).to.throw(Error)
    })

    it('should throw on non-integer grades', function() {
      expect(() => computeNewDifficulty(2.5, 3, 1.5)).to.throw(Error)
    })

    it('should throw on grades outside of the allowable range (0-5)', function() {
      expect(() => computeNewDifficulty(2.5, 3, -1)).to.throw(Error)
      expect(() => computeNewDifficulty(2.5, 3, 6)).to.throw(Error)
    })

    it('should not change difficulty on successive incorrect answers', function() {
      expect(computeNewDifficulty(2.75, 2, 0)).to.equal(2.75)
      expect(computeNewDifficulty(2.5,  2, 1)).to.equal(2.5)
      expect(computeNewDifficulty(2.25, 2, 2)).to.equal(2.25)
      expect(computeNewDifficulty(2,    2, 3)).to.equal(2)
      expect(computeNewDifficulty(1.75, 2, 4)).to.equal(1.75)
      expect(computeNewDifficulty(1.5,  2, 5)).to.equal(1.5)
    })

    it('should compute correct difficulty for allowable answers', function() {
      expect(computeNewDifficulty(2.75, 3, 0)).to.equal(1.95)
      expect(computeNewDifficulty(2.5,  3, 1)).to.equal(1.96)
      expect(computeNewDifficulty(2.25, 3, 2)).to.equal(1.93)
      expect(computeNewDifficulty(2,    3, 3)).to.equal(1.86)
      expect(computeNewDifficulty(1.75, 3, 4)).to.equal(1.75)
      expect(computeNewDifficulty(1.5,  3, 5)).to.equal(1.6)
    })
  })

  describe('computeNewRepetitionCount', function() {
    it('should exist', function() {
      expect(computeNewRepetitionCount).to.exist
    })

    it('should throw on non-integer grades', function() {
      expect(() => computeNewRepetitionCount(0, 1.5)).to.throw(Error)
    })

    it('should throw on grades outside of the allowable range (0-5)', function() {
      expect(() => computeNewRepetitionCount(0, -1)).to.throw(Error)
      expect(() => computeNewRepetitionCount(0, 6)).to.throw(Error)
    })

    it('should throw on negative repetition count', function() {
      expect(() => computeNewRepetitionCount(-1, 0)).to.throw(Error)
    })

    it('should throw on non-integer repetition count', function() {
      expect(() => computeNewRepetitionCount(0.5, 0)).to.throw(Error)
    })

    it('should be 0 for grades 0-2', function() {
      expect(computeNewRepetitionCount(3, 0)).to.equal(0)
      expect(computeNewRepetitionCount(6, 1)).to.equal(0)
      expect(computeNewRepetitionCount(8, 2)).to.equal(0)
    })

    it('should increment for grades 3-5', function() {
      expect(computeNewRepetitionCount(2, 3)).to.equal(3)
      expect(computeNewRepetitionCount(5, 4)).to.equal(6)
      expect(computeNewRepetitionCount(7, 5)).to.equal(8)
    })
  })

  describe('computeNextReviewMs', function() {
    const previousReviewMs = moment([2017, 0, 1, 0, 0, 0, 0]).valueOf()
    const nowMs = moment([2017, 0, 5, 0, 0, 0, 0]).valueOf()

    it('should exist', function() {
      expect(computeNextReviewMs).to.exist
    })

    it('should throw if \'now\' does not have a value', function() {
      expect(() => computeNextReviewMs(null, previousReviewMs, 2, 1.5)).to.throw(Error)
      expect(() => computeNextReviewMs(undefined, previousReviewMs, 8, 5.6)).to.throw(Error)
    })
    
    it('should throw on negative repetition count', function() {
      expect(() => computeNextReviewMs(nowMs, previousReviewMs, -1, 2.5)).to.throw(Error)
    })

    it('should throw on non-integer repetition count', function() {
      expect(() => computeNextReviewMs(nowMs, previousReviewMs, 1.5, 2.5)).to.throw(Error)
    })

    it('should throw if difficulty is below minimum', function() {
      expect(() => computeNextReviewMs(nowMs, previousReviewMs, 2, 1.2)).to.throw(Error)
    })

    it('should throw if previousReviewMs is not before nowMs', function() {
      const badPreviousReviewMs = moment(nowMs).add(1, 'days').valueOf()
      expect(() => computeNextReviewMs(nowMs, badPreviousReviewMs, 3, 2.5)).to.throw(Error)
    })
    
    it('should reschedule for today on memory lapse', function() {
      expect(computeNextReviewMs(nowMs, previousReviewMs, 0, 1.5)).to.equal(nowMs)
    })

    it('should schedule for tomorrow on first correct answer', function() {
      const tomorrowMs = moment(nowMs).add(1, 'days').valueOf()
      expect(computeNextReviewMs(nowMs, previousReviewMs, 1, 2)).to.equal(tomorrowMs)
    })

    it('should schedule for six days from now on second correct answer', function() {
      const sixDaysFromNowMs = moment(nowMs).add(6, 'days').valueOf()
      expect(computeNextReviewMs(nowMs, previousReviewMs, 2, 2.5)).to.equal(sixDaysFromNowMs)
    })

    it('should schedule for $previousInterval * $difficulty on three or more correct answers', function() {
      let resultMs

      const tenDaysFromNowMs = moment(nowMs).add(10, 'days').valueOf()
      resultMs = computeNextReviewMs(nowMs, previousReviewMs, 3, 2.5)
      expect(resultMs).to.equal(tenDaysFromNowMs)
      
      const twelveDaysFromNowMs = moment(nowMs).add(12, 'days').valueOf()
      resultMs = computeNextReviewMs(nowMs, previousReviewMs, 5, 3)
      expect(resultMs).to.equal(twelveDaysFromNowMs)
      
      const eightDaysFromNowMs = moment(nowMs).add(8, 'days').valueOf()
      resultMs = computeNextReviewMs(nowMs, previousReviewMs, 9, 2)
      expect(resultMs).to.equal(eightDaysFromNowMs)
    })
  })
})
