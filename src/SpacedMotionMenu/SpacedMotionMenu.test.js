import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'

import SpacedMotionMenu from './'
import MotionMenu from '../MotionMenu/'

describe("SpacedMotionMenu", function () {
  it("renders a MotionMenu with the given props except for props.angle", function () {
    const props = {
      mainBtnRadius: 35,
      btnRadius: 25,
      spaceBetween: 40,
      angleOffset: 0,
      btns: []
    }
    const wrapper = shallow(<SpacedMotionMenu {...props} />)
    const motion = wrapper.find(MotionMenu)
    expect(motion.prop('mainBtnRadius')).toEqual(props.mainBtnRadius)
    expect(motion.prop('btnRadius')).toEqual(props.btnRadius)
    expect(motion.prop('spaceBetween')).toEqual(props.spaceBetween)
    expect(motion.prop('angleOffset')).toEqual(props.angleOffset)
    expect(motion.prop('btns')).toEqual(props.btns)
  });
  it("renders MotionMenu with props.angle === 360/props.btns.length", function () {
    const btns = [{iconSrc: '1'},{iconSrc: '2'},{iconSrc: '3'},{iconSrc: '4'}]
    const wrapper = shallow(<SpacedMotionMenu btns={btns} />)
    const motion = wrapper.find(MotionMenu)

    expect(motion.prop('angle')).toEqual(90)
  });
});
