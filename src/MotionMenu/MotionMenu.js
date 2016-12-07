import React from 'react'
import { spring } from 'react-motion'

import { eqOfACircle } from '../selectors'

import MainButton from '../buttons/MainButton'
import StaggeredButtons from '../buttons/StaggeredButtons'

import defaultProps from './defaultProps'
import propTypes from './propTypes'
import './MotionMenu.css'

class MotionMenu extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      isOpen: false
    }
    this.updateProps(props)

    this.getBtnOffset = this.getBtnOffset.bind(this)
    this.getStaggeredStyles = this.getStaggeredStyles.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  updateProps(props, forceRender){
    //angle of first btn
    this.baseAngle = this.getBaseAngle(props)
    //offsets of each button when state.isOpen
    this.btnOffsets = props.btns.map((_, i) => {
      return this.getBtnOffset(i, props)
    })
    //default small button style
    this.defaultStyle = {
      left: props.mainBtnRadius - props.btnRadius,
      top: props.mainBtnRadius - props.btnRadius,
      width: props.btnRadius * 2,
      height: props.btnRadius * 2
    }
    if (forceRender) this.forceUpdate()
  }
  componentWillReceiveProps(newProps){this.updateProps(newProps)}
  toggle(){this.setState({isOpen: !this.state.isOpen})}
  getBaseAngle({ btns, angle, angleOffset }){
    //returns angle of first button
    return -(btns.length - 1) * (angle / 2) - (90 + angleOffset)
  }
  getBtnOffset(i, props){
    const { angle, btnRadius, mainBtnRadius, spaceBetween } = props || this.props
    return eqOfACircle(
      //calculated angle of btn i in degrees
      this.baseAngle + i * angle,
      //distance from mainBtn center to smallBtn center
      mainBtnRadius + btnRadius + spaceBetween,
      {x: 0, y: 0} //starting point of transform
    )
  }
  getStaggeredStyles(prevStyles){
    const { springConfig } = this.props
    return prevStyles.map((_, i) => {
      if (!this.state.isOpen) return {progress: spring(0, springConfig.close)}
      return i === 0
        ?{progress: spring(100, springConfig.open)}
        :{progress: spring(prevStyles[i - 1].progress.val || prevStyles[i - 1].progress, springConfig.open)}
    })
  }
  render () {
    const { mainBtnRadius, className, btns } = this.props
    return (
      <div className={`MotionMenu ${className || ''}`}
        style={{width: mainBtnRadius * 2 + 'px', height: mainBtnRadius * 2 + 'px'}}>
        <MainButton
          onClick={this.toggle}
          isOpen={this.state.isOpen} />
        <StaggeredButtons
          getStaggeredStyles={this.getStaggeredStyles}
          btnOffsets={this.btnOffsets}
          btns={btns}
          defaultStyle={this.defaultStyle} />
      </div>
    )
  }
}
MotionMenu.defaultProps = defaultProps
MotionMenu.propTypes = propTypes
export default MotionMenu;
