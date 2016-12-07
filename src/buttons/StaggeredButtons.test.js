import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import StaggeredButtons from './StaggeredButtons'
import SmallButton from './smallButton'

const btn = {iconSrc: './test.svg', alt: 'test'}
describe("StaggeredButtons renders StaggeredMotion component", function () {
  it("with props.styles === props.getStaggeredStyles", function () {
    const func = function(){}
    const wrapper = shallow(<StaggeredButtons getStaggeredStyles={func} btnOffsets={[]}/>)

    expect(wrapper.prop('styles')).toEqual(func)
  });
  describe("", function () {
    it("with correct props.defaultStyles array depending on btnOffsets", function () {
      const btnOffsets = [1,2,3,4]
      const btns = [{iconSrc: ''},{iconSrc: ''},{iconSrc: ''},{iconSrc: ''}]
      const wrapper = shallow(<StaggeredButtons btnOffsets={btnOffsets} btns={btns}/>)

      const expected = [
        { progress: 0},
        { progress: 0},
        { progress: 0},
        { progress: 0}
      ]
      expect(wrapper.prop('defaultStyles')).toEqual(expected)
    });
  });
  describe("props.children function renders a SmallButton for each element in a given array ", function () {
    it("renders correct amount", function () {
      const listOfThree = [1,2,3]
      const btns = [btn,btn,btn]
      const wrapper = shallow(<StaggeredButtons btnOffsets={listOfThree} btns={btns}/>)
      const childFunc = wrapper.prop('children')

      const children = shallow(
        childFunc([{progress:0},{progress:0},{progress:0}])
      )
      const smallButtons = children.find(SmallButton)
      expect(smallButtons.length).toEqual(3)
    });
    it("maps props.defaultStyle to each buttons props", function () {
      const listOfOne = [{x:0,y:0}]
      const btns = [{iconSrc: ''}]
      const style = {top: 30, left: 20}
      const wrapper = shallow(
        <StaggeredButtons btns={btns} btnOffsets={listOfOne} defaultStyle={style}/>
      )
      const childFunc = wrapper.prop('children')

      const children = shallow(
        childFunc([{progress:0}])
      )

      const smallButton = children.find(SmallButton)
      expect(smallButton.prop('top')).toEqual(style.top)
      expect(smallButton.prop('left')).toEqual(style.left)
    });
    it("sets props.x of button[i] to equal progress[i] percent of btnOffsets[i].x", function () {
      const btnProg = [{progress: 0},{progress: 50},{progress: 100}]
      const btns = [btn,btn,btn]
      const btnOffsets = [{x: 100},{x: 200},{x: 300}]
      const expected = [
        0,    // 0 * (0/100) or 0% of 100
        100, // 200 * (50/100) or 50% of 200
        300 // 300 * (100/100) or 100% of 300
      ]
      const wrapper = shallow(<StaggeredButtons btns={btns} btnOffsets={btnOffsets} />)
      const childFunc = wrapper.prop('children')
      const children = shallow(childFunc(btnProg))

      const buttons = children.find(SmallButton)
      buttons.forEach((button, i) => {
        expect(button.prop('x')).toEqual(expected[i])
      })
    });

    it("sets props.x of button[i] to equal progress[i] percent of btnOffsets[i].x", function () {
      const btnProg = [{progress: 0},{progress: 50},{progress: 100}]
      const btns = [btn,btn,btn]
      const btnOffsets = [{y: 100},{y: 200},{y: 300}]
      const expected = [
        0,    // 0 * (0/100) or 0% of 100
        100, // 200 * (50/100) or 50% of 200
        300 // 300 * (100/100) or 100% of 300
      ]
      const wrapper = shallow(<StaggeredButtons btns={btns} btnOffsets={btnOffsets} />)
      const childFunc = wrapper.prop('children')
      const children = shallow(childFunc(btnProg))

      const buttons = children.find(SmallButton)
      buttons.forEach((button, i) => {
        expect(button.prop('y')).toEqual(expected[i])
      })
    });
    it("sets props.iconSrc of button[i] to equal props.btns[i].iconSrc", function () {
      const btnProg = [{progress: 100},{progress: 100}]
      const props = {
        btns: [
          {iconSrc: './icon.svg'},
          {iconSrc: './icon2.svg'}
        ],
        btnOffsets: [
          {x: 0, y: 0},
          {x: 0, y: 0}
        ]
      }
      const wrapper = shallow(<StaggeredButtons {...props} />)
      const childFunc = wrapper.prop('children')
      const children = shallow(childFunc(btnProg))

      const buttons = children.find(SmallButton)
      buttons.forEach((button, i) => {
        expect(button.prop('iconSrc')).toEqual(props.btns[i].iconSrc)
      })
    });
    it("sets props.alt of button[i] to equal props.btns[i].alt", function () {
      const btnProg = [{progress: 100},{progress: 100}]
      const props = {
        btns: [
          {iconSrc: './icon.svg', alt: 'icon'},
          {iconSrc: './icon2.svg', alt: 'icon2'}
        ],
        btnOffsets: [
          {x: 0, y: 0},
          {x: 0, y: 0}
        ]
      }
      const wrapper = shallow(<StaggeredButtons {...props} />)
      const childFunc = wrapper.prop('children')
      const children = shallow(childFunc(btnProg))

      const buttons = children.find(SmallButton)
      buttons.forEach((button, i) => {
        expect(button.prop('alt')).toEqual(props.btns[i].alt)
      })
    });
    it("sets props.onClick of button[i] to equal props.btns[i].onClick", function () {
      const btnProg = [{progress: 100},{progress: 100}]
      const props = {
        btns: [
          {iconSrc: './icon.svg', alt: 'icon', onClick: () => 1},
          {iconSrc: './icon2.svg', alt: 'icon2', onClick: () => 2}
        ],
        btnOffsets: [
          {x: 0, y: 0},
          {x: 0, y: 0}
        ]
      }
      const wrapper = shallow(<StaggeredButtons {...props} />)
      const childFunc = wrapper.prop('children')
      const children = shallow(childFunc(btnProg))

      const buttons = children.find(SmallButton)
      buttons.forEach((button, i) => {
        expect(button.prop('onClick')).toEqual(props.btns[i].onClick)
      })
    });
  });
});
