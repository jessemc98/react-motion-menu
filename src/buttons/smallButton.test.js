import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import SmallButton from './smallButton'

describe("SmallButton", function () {
  it("renders an element with class .MotionMenu_smallBtn", function () {
    const wrapper = shallow(<SmallButton />)
    expect(wrapper.hasClass('MotionMenu_smallBtn')).toBeTruthy()
  });
  it("calls props.onClick when clicked", function () {
    const spy = expect.createSpy()
    const wrapper = shallow(<SmallButton onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  });
  describe("renders correct style from props", function () {
    it("left, top, width, height", function () {
      const props = {
        top: 10,
        left: 20,
        width: 30,
        height: 40
      }
      const wrapper = shallow(<SmallButton {...props}/>)
      const style = wrapper.prop('style')

      expect(style.top).toEqual(props.top)
      expect(style.left).toEqual(props.left)
      expect(style.width).toEqual(props.width)
      expect(style.height).toEqual(props.height)
    });
  });
  it("transform translate3d", function () {
    const props = {
      x: 50,
      y: 100
    }
    const wrapper = shallow(<SmallButton {...props}/>)
    const style = wrapper.prop('style')

    const expected = `translate3d(50px, 100px, 0)`
    expect(style.transform).toEqual(expected)
  });
  it("renders an img element with src of props.iconSrc", function () {
    const wrapper = shallow(<SmallButton iconSrc="./test.svg" />)
    const img = wrapper.find('img')

    expect(img.prop('src')).toEqual('./test.svg')
  });
  it("renders an img element with alt of props.alt", function () {
    const wrapper = shallow(<SmallButton alt="test" />)
    const img = wrapper.find('img')

    expect(img.prop('alt')).toEqual('test')
  });
});
