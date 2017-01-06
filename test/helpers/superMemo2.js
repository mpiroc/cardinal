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
    it('should exist', function() {
      expect(computeNextReviewMoment).to.exist
    })
  })

  describe
})
