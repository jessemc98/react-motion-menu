import React from 'react'
import { shallow } from 'enzyme'
import { Motion, spring } from 'react-motion'
import expect from 'expect'

import MainButton, { MainButtonIcon } from './MainButton'

describe("MainButton", function () {
  it("calls onClick when clicked", function () {
    const spy = expect.createSpy()
    const wrapper = shallow(<MainButton onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  });
  describe("renders a Motion component", function () {
    it("with the correct style when props.isOpen is true", function () {
      const wrapper = shallow(<MainButton isOpen={true} />)
      const motion = wrapper.find(Motion)

      const expected = {rotate: spring(135)}
      expect(motion.prop('style')).toEqual(expected)
    });
    it("with the correct style when props.isOpen is false", function () {
      const wrapper = shallow(<MainButton isOpen={false} />)
      const motion = wrapper.find(Motion)

      const expected = {rotate: spring(-90)}
      expect(motion.prop('style')).toEqual(expected)
    });
  });
    it("with MainButtonIcon as props.children", function () {
      const wrapper = shallow(<MainButton isOpen={false} />)
      const motion = wrapper.find(Motion)

      const childrenFunc = motion.prop('children')

      expect(childrenFunc).toEqual(MainButtonIcon)
  });
});

describe("MainButtonIcon", function () {
  it("renders a span", function () {
    const wrapper = shallow(<MainButtonIcon rotate={0}/>)
    expect(wrapper.is('span')).toBeTruthy()
  });
  it("renders with correct style transform rotate", function () {
    const inputs = [0, 10]
    const expected = [
      {transform: 'rotate(0deg)'},
      {transform: 'rotate(10deg)'}
    ]
    inputs.forEach((input, i) => {
      const wrapper = shallow(<MainButtonIcon rotate={input}/>)
      expect(wrapper.prop('style').transform)
        .toEqual(expected[i].transform)
    })
  });
  it("renders correct style when props change", function () {
    const wrapper = shallow(<MainButtonIcon rotate={0}/>)

    wrapper.setProps({rotate: 10})

    const expected = {transform: 'rotate(10deg)'}
    expect(wrapper.prop('style').transform).toEqual(expected.transform)
  });
});
