import 'babel-polyfill'
import chai, { expect } from 'chai'
import moment from 'moment'
import { computeNewDifficulty, computeNewRepetitionCount, computeNextReviewMoment } from 'helpers/superMemo2'

describe('SuperMemo 2 helpers', function() {
  describe('computeNewDifficulty', function() {
    const minimumDifficulty = 1.3

    it('should exist', function() {
      expect(computeNewDifficulty).to.exist
    })

    it('should not fall below the minimum', function() {
      expect(computeNewDifficulty(1.3, 0)).to.equal(1.3)
    })

    it('should throw on a previousDifficulty below the miminum', function() {
      expect(() => computeNewDifficulty(1.2, 0)).to.throw(Error)
    })

    it('should throw on non-integer grades', function() {
      expect(() => computeNewDifficulty(2.5, 1.5)).to.throw(Error)
    })

    it('should throw on grades outside of the allowable range (0-5)', function() {
      expect(() => computeNewDifficulty(2.5, -1)).to.throw(Error)
      expect(() => computeNewDifficulty(2.5, 6)).to.throw(Error)
    })

    it('should compute correct difficulty for allowable answers', function() {
      expect(computeNewDifficulty(2.75, 0)).to.equal(1.95)
      expect(computeNewDifficulty(2.5, 1)).to.equal(1.96)
      expect(computeNewDifficulty(2.25, 2)).to.equal(1.93)
      expect(computeNewDifficulty(2, 3)).to.equal(1.86)
      expect(computeNewDifficulty(1.75, 4)).to.equal(1.75)
      expect(computeNewDifficulty(1.5, 5)).to.equal(1.6)
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

  describe('computeNextReviewMoment', function() {
    const previousReviewMoment = moment([2017, 0, 1, 0, 0, 0, 0])
    const now = moment([2017, 0, 5, 0, 0, 0, 0])

    it('should exist', function() {
      expect(computeNextReviewMoment).to.exist
    })

    it('should throw if \'now\' does not have a value', function() {
      expect(() => computeNextReviewMoment(null, previousReviewMoment.clone(), 2, 1.5)).to.throw(Error)
      expect(() => computeNextReviewMoment(undefined, previousReviewMoment.clone(), 8, 5.6)).to.throw(Error)
    })
    
    it('should throw if \'previousReviewMoment\' does not have a value', function() {
      expect(() => computeNextReviewMoment(now.clone(), null, 2, 1.5)).to.throw(Error)
      expect(() => computeNextReviewMoment(now.clone(), undefined, 8, 5.6)).to.throw(Error)
    })

    it('should throw on negative repetition count', function() {
      expect(() => computeNextReviewMoment(now.clone(), previousReviewMoment.clone(), -1, 2.5)).to.throw(Error)
    })

    it('should throw on non-integer repetition count', function() {
      expect(() => computeNextReviewMoment(now.clone(), previousReviewMoment.clone(), 1.5, 2.5)).to.throw(Error)
    })

    it('should throw if difficulty is below minimum', function() {
      expect(() => computeNextReviewMoment(now.clone(), previousReviewMoment.clone(), 2, 1.2)).to.throw(Error)
    })

    it('should throw if previousReviewMoment is not before now', function() {
      const badPreviousReviewMoment = now.clone().add(1, 'days')
      expect(() => computeNextReviewMoment(now.clone(), badPreviousReviewMoment.clone(), 2, 2.5)).to.throw(Error)
    })
    
    it('should reschedule for today on memory lapse', function() {
      expect(
        computeNextReviewMoment(
          now.clone(),
          previousReviewMoment.clone(),
          0,
          1.5
        ).valueOf()
      ).to.equal(now.clone().valueOf())
    })

    it('should schedule for tomorrow on first correct answer', function() {
      expect(
        computeNextReviewMoment(
          now.clone(),
          previousReviewMoment.clone(),
          1,
          2
        ).valueOf()
      ).to.equal(now.clone().add(1, 'days').valueOf())
    })

    it('should schedule for six days from now on second correct answer', function() {
      expect(
        computeNextReviewMoment(
          now.clone(),
          previousReviewMoment.clone(),
          2,
          2.5
        ).valueOf()
      ).to.equal(now.clone().add(6, 'days').valueOf())
    })

    it('should schedule for $previousInterval * $difficulty on three or more correct answers', function() {
      const difficulty = 2.5

      expect(
        computeNextReviewMoment(
          now.clone(),
          previousReviewMoment.clone(),
          3,
          2.5
        ).valueOf()
      ).to.equal(now.clone().add(10, 'days').valueOf())
      
      expect(
        computeNextReviewMoment(
          now.clone(),
          previousReviewMoment.clone(),
          5,
          3
        ).valueOf()
      ).to.equal(now.clone().add(12, 'days').valueOf())
      
      expect(
        computeNextReviewMoment(
          now.clone(),
          previousReviewMoment.clone(),
          9,
          2
        ).valueOf()
      ).to.equal(now.clone().add(8, 'days').valueOf())
    })
  })
})
