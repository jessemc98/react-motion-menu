import expect from 'expect'
import * as selectors from './'

describe("degreesToRadian", function () {
  const { degreesToRadian } = selectors
  it("returns angle in radians when given input angle in degrees", function () {
    expect(Math.round(degreesToRadian(45)*1000000)/1000000).toEqual(0.785398)
  });
});

describe("eqOfACircle", function () {
  const { eqOfACircle } = selectors
  it(`returns the point where a line going from center of circle at given angle
    meets the perimeter rounded to 6 decimal points`, function () {
    const circle = {radius: 50, pos: {x: 0, y: 0}}
    const angle = 45 //specified in degrees

    const expectedIntersect = {
      x: 35.355339,
      y: 35.355339
    }

    expect(eqOfACircle(angle, circle.radius, circle.pos)).toEqual(expectedIntersect)
  });
  it(`works when input angle is negative, returns the point where a line going from center
    of circle at given angle meets the perimeter rounded to 6 decimal points`, function () {
    const circle = {radius: 50, pos: {x: 0, y: 0}}
    const angle = -45 //specified in degrees

    const expectedIntersect = {
      x: 35.355339,
      y: -35.355339
    }

    expect(eqOfACircle(angle, circle.radius, circle.pos)).toEqual(expectedIntersect)
  });
});
