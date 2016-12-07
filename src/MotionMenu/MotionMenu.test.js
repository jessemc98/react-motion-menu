import React from 'react'
import { spring } from 'react-motion'
import { shallow, mount } from 'enzyme'
import expect from 'expect'

import MotionMenu from './MotionMenu'
import defaultProps from './defaultProps'
import MainButton from '../buttons/MainButton'
import StaggeredButtons from '../buttons/StaggeredButtons'

function menuWithBtns(numOfBtns){
  const btn = {iconSrc: '/random', href: '#', alt: 'random button'}
  const btns = []
  for(numOfBtns; btns.length < numOfBtns; btns.push(btn)){}

  return shallow(<MotionMenu btns={btns} />)
}
describe("MotionMenu", function () {
  describe("render", function () {
    it("with a className equal to props.className", function () {
      const wrapper = shallow(<MotionMenu className="testClassName"/>)

      expect(wrapper.hasClass('testClassName')).toBeTruthy()
    });
    it("with a className of MotionMenu", function () {
      const wrapper = shallow(<MotionMenu />)

      expect(wrapper.hasClass('MotionMenu')).toBeTruthy()
    });
    it("without className of undefined if props.className === undefined", function () {
      const wrapper = shallow(<MotionMenu />)

      expect(wrapper.hasClass('undefined')).toBeFalsy()
    });
    it("with correct width and height based on props.mainBtnRadius", function () {
      const wrapper = shallow(<MotionMenu mainBtnRadius={50} />)
      const style = wrapper.prop('style')

      expect(style.width).toEqual('100px')
      expect(style.height).toEqual('100px')
    });
    describe("MainButton", function () {
      it("calls toggle when clicked", function () {
        const wrapper = mount(<MotionMenu />)
        const mainBtn = wrapper.find(MainButton)
        const spy = expect.spyOn(wrapper.instance(), 'toggle')
        wrapper.setState({})

        mainBtn.simulate('click')

        expect(spy).toHaveBeenCalled()
      });
      it("rendered with props.isOpen === true when state.isOpen", function () {
        const wrapper = mount(<MotionMenu />)
        const mainBtn = wrapper.find(MainButton)

        wrapper.setState({isOpen: true})

        expect(mainBtn.prop('isOpen')).toBeTruthy()
      });
      it("rendered with props.isOpen === false when state.isOpen is false", function () {
        const wrapper = mount(<MotionMenu />)
        const mainBtn = wrapper.find(MainButton)

        wrapper.setState({isOpen: false})

        expect(mainBtn.prop('isOpen')).toBeFalsy()
      });
    });
    describe("StaggeredButtons", function () {
      it("rendered with props.getStaggeredStyles equal to this.getStaggeredStyles", function () {
        const wrapper = shallow(<MotionMenu />)
        const staggered = wrapper.find(StaggeredButtons)
        const { getStaggeredStyles } = wrapper.instance()

        expect(staggered.prop('getStaggeredStyles')).toEqual(getStaggeredStyles)
      });
      it("rendered with props.btns equal to this.btns", function () {
        const btns = [{},{},{}]
        const wrapper = shallow(<MotionMenu btns={btns}/>)
        const staggered = wrapper.find(StaggeredButtons)

        expect(staggered.prop('btns')).toEqual(btns)
      });
      describe("renders with correct props.defaultStyle", function () {
        it("based on given props", function () {
          const props = {mainBtnRadius: 150, btnRadius: 25}
          const wrapper = shallow(<MotionMenu {...props} />)
          const staggered = wrapper.find(StaggeredButtons)

          const expected = {
            left: 125,
            top: 125,
            width: 50,
            height: 50
          }
          expect(staggered.prop('defaultStyle')).toEqual(expected)
        });
        it("based on given props when props change after initial render", function () {
          const initialProps = {mainBtnRadius: 5050, btnRadius: 2525}
          const wrapper = mount(<MotionMenu {...initialProps} />)
          const staggered = wrapper.find(StaggeredButtons)

          wrapper.setProps({mainBtnRadius: 150, btnRadius: 25})

          const expected = {
            left: 125,
            top: 125,
            width: 50,
            height: 50
          }
          expect(staggered.prop('defaultStyle')).toEqual(expected)
        });
        it("renders with correct btnOffsets for given props", function () {
          const btns = [{},{},{},{}]
          const wrapper = shallow(
            <MotionMenu
              btns={btns}
              angle={90}
              angleOffset={45}
              spaceBetween={10}
              mainBtnRadius={10}
              btnRadius={10} />)
          const staggered = wrapper.find(StaggeredButtons)

          const expected = [
            {x: 0, y: 30},
            {x: -30, y: 0},
            {x: 0, y: -30},
            {x: 30, y: 0}
          ]

          expect(staggered.prop('btnOffsets')).toEqual(expected)
        });
      });
      describe("renders with correct btnOffsets for given props", function () {
        it("based on given props", function () {
          const btns = [{},{},{},{}]
          const wrapper = shallow(
            <MotionMenu
              btns={btns}
              angle={90}
              angleOffset={45}
              spaceBetween={10}
              mainBtnRadius={10}
              btnRadius={10} />)
          const staggered = wrapper.find(StaggeredButtons)

          const expected = [
            {x: 0, y: 30},
            {x: -30, y: 0},
            {x: 0, y: -30},
            {x: 30, y: 0}
          ]

          expect(staggered.prop('btnOffsets')).toEqual(expected)
        });
        it("based on given props when props change after initial render", function () {
          const props = {
            btns: [{}],
            angle: 90,
            angleOffset: 45,
            spaceBetween: 10,
            mainBtnRadius: 10,
            btnRadius: 10
          }
          const wrapper = mount(<MotionMenu {...props}/>)
          const staggered = wrapper.find(StaggeredButtons)

          wrapper.setProps({...props, btns: [{},{},{},{}]})
          const expected = [
            {x: 0, y: 30},
            {x: -30, y: 0},
            {x: 0, y: -30},
            {x: 30, y: 0}
          ]

          expect(staggered.prop('btnOffsets')).toEqual(expected)
        });
      });
    });
  });
  describe('getBaseAngle', function () {
    // -90 is north 0 is east
    const wrapper = shallow(<MotionMenu />)
    const getBaseAngle = wrapper.instance().getBaseAngle

    it("returns correct starting angle based on input", function () {
      const inputs = [
        {btns: [{}],angle: 90,angleOffset: 0},
        {btns: [{},{}],angle: 90,angleOffset: 0},
        {btns: [{},{},{}],angle: 90,angleOffset: 0}
      ]
      const outputs = [-90, -135, -180]
      inputs.forEach((input, i) => {
        expect(getBaseAngle(input)).toEqual(outputs[i])
      })
    });
  })
  describe("getBtnOffset", function () {
    let getBtnOffset
    beforeEach(function () {
      const wrapper = shallow(<MotionMenu />).instance()
      wrapper.baseAngle = -90
      getBtnOffset = wrapper.getBtnOffset
    });
    it("returns transform of button[i] based on given props", function () {
      const props = {
        angle: 90,
        mainBtnRadius: 10,
        btnRadius: 10,
        spaceBetween: 10
      }
      expect(getBtnOffset(0, props)).toEqual({x: 0, y: -30})
      expect(getBtnOffset(1, props)).toEqual({x: 30, y: 0})
      expect(getBtnOffset(2, props)).toEqual({x: 0, y: 30})
      expect(getBtnOffset(3, props)).toEqual({x: -30, y: 0})
    });
  });
  describe("toggle", function () {
    let wrapper, toggle
    beforeEach(function () {
      wrapper = shallow(<MotionMenu />)
      toggle = wrapper.instance().toggle
    });
    it("sets state.isOpen to false when it is true", function () {
      wrapper.setState({isOpen: true})

      toggle()

      expect(wrapper.state().isOpen).toBeFalsy()
    });
    it("sets state.isOpen to true when it is false", function () {
      wrapper.setState({isOpen: false})

      toggle()

      expect(wrapper.state().isOpen).toBeTruthy()
    });
  });
  describe("updateProps", function () {
    let wrapper, instance, updateProps
    beforeEach(function () {
      wrapper = shallow(<MotionMenu />)
      instance = wrapper.instance()
      updateProps = instance.updateProps
    });
    it("calls getBaseAngle and sets instance.baseAngle to the return value", function () {
      const spy = expect.spyOn(instance, 'getBaseAngle')
        .andReturn(45)

      updateProps.call(instance, defaultProps)

      expect(spy).toHaveBeenCalledWith(defaultProps)
      expect(instance.baseAngle).toEqual(45)
    });
    it(`calls getBtnOffset(index) for each array index in props.btns
        and sets instance.btnOffsets to an array of those values`, function () {
      const returnIndex = i => i
      const spy = expect.spyOn(instance, 'getBtnOffset')
        .andCall(returnIndex)
      const props = {
        btns: [{},{},{}],
        angle: 90,
        angleOffset: 45,
        spaceBetween: 10,
        mainBtnRadius: 10,
        btnRadius: 10
      }

      updateProps.call(instance, props)

      props.btns.forEach((btn, i) => {
        expect(spy).toHaveBeenCalledWith(i, props)
      })

      expect(instance.btnOffsets).toEqual([0,1,2])
    });
    it("calls forceUpdate if second argument evaluates to true", function () {
      const spy = expect.spyOn(instance, 'forceUpdate')

      updateProps.call(instance, defaultProps, true)

      expect(spy).toHaveBeenCalled()
    });
    it("sets instance.defaultStyle based on props argument", function () {
      const props = {
        ...defaultProps,
        mainBtnRadius: 50,
        btnRadius: 10
      }

      updateProps.call(instance, props)

      const expected = {
        left: 40, top: 40, //mainBtnRadius - btnRadius
        width: 20, height: 20 // btnRadius * 2
      }
      expect(instance.defaultStyle).toEqual(expected)
    });
  });
  describe("getStaggeredStyles", function () {
    describe("when props.springConfig is not defined", function () {
      let wrapper, instance, getStaggeredStyles
      beforeEach(function () {
        wrapper = shallow(<MotionMenu />)
        instance = wrapper.instance()
        getStaggeredStyles = instance.getStaggeredStyles
      });
      it(`given an array of prevStyles returns an array of the same length filled with:
        correct spring objects with default springConfig when state.isOpen is false`, function () {
        const prevStyles = [
          {progress: spring(100, {stiffness: 240, damping: 10})},
          {progress: spring(96, {stiffness: 240, damping: 10})},
          {progress: spring(88, {stiffness: 240, damping: 10})}
        ]
        wrapper.setState({isOpen: false})

        const expected = [
          {progress: spring(0, defaultProps.springConfig.close)},
          {progress: spring(0, defaultProps.springConfig.close)},
          {progress: spring(0, defaultProps.springConfig.close)}
        ]
        expect(getStaggeredStyles(prevStyles)).toEqual(expected)
      });
      it(`given an array of prevStyles returns an array of styles mapped to the
          previous array value with the correct springConfig when state.isOpen is true`, function () {
        const prevStyles = [
          {progress: spring(50, {stiffness: 200, damping: 20})},
          {progress: spring(40, {stiffness: 200, damping: 20})},
          {progress: spring(30, {stiffness: 200, damping: 20})},
          {progress: spring(20, {stiffness: 200, damping: 20})},
          {progress: spring(10, {stiffness: 200, damping: 20})}
        ]

        wrapper.setState({isOpen: true})

        const expected = [
          {progress: spring(100, defaultProps.springConfig.open)},
          {progress: spring(50,  defaultProps.springConfig.open)},
          {progress: spring(40,  defaultProps.springConfig.open)},
          {progress: spring(30,  defaultProps.springConfig.open)},
          {progress: spring(20,  defaultProps.springConfig.open)}
        ]
        expect(getStaggeredStyles(prevStyles)).toEqual(expected)
      });
    });
    describe("when props.springConfig is defined", function () {
      let wrapper, instance, getStaggeredStyles
      beforeEach(function () {
        const conf = {
          open: {stiffness: 100, damping: 10},
          close: {stiffness: 150, damping: 50}
        }
        wrapper = shallow(<MotionMenu springConfig={conf}/>)
        instance = wrapper.instance()
        getStaggeredStyles = instance.getStaggeredStyles
      });
      it(`given an array of prevStyles returns an array of the same length filled with:
        correct spring objects with default springConfig when state.isOpen is false and springConfig is not defined`, function () {
        const prevStyles = [
          {progress: spring(100, {stiffness: 240, damping: 10})},
          {progress: spring(96, {stiffness: 240, damping: 10})},
          {progress: spring(88, {stiffness: 240, damping: 10})}
        ]
        wrapper.setState({isOpen: false})

        const expected = [
          {progress: spring(0, {stiffness: 150, damping: 50})},
          {progress: spring(0, {stiffness: 150, damping: 50})},
          {progress: spring(0, {stiffness: 150, damping: 50})}
        ]
        expect(getStaggeredStyles(prevStyles)).toEqual(expected)
      });
      it(`given an array of prevStyles returns an array of styles mapped to the
          previous array value when state.isOpen is true`, function () {
        const prevStyles = [
          {progress: spring(50, {stiffness: 200, damping: 20})},
          {progress: spring(40, {stiffness: 200, damping: 20})},
          {progress: spring(30, {stiffness: 200, damping: 20})},
          {progress: spring(20, {stiffness: 200, damping: 20})},
          {progress: spring(10, {stiffness: 200, damping: 20})}
        ]

        wrapper.setState({isOpen: true})

        const expected = [
          {progress: spring(100, {stiffness: 100, damping: 10})},
          {progress: spring(50,  {stiffness: 100, damping: 10})},
          {progress: spring(40,  {stiffness: 100, damping: 10})},
          {progress: spring(30,  {stiffness: 100, damping: 10})},
          {progress: spring(20,  {stiffness: 100, damping: 10})}
        ]
        expect(getStaggeredStyles(prevStyles)).toEqual(expected)
      });
    });
  });
});
