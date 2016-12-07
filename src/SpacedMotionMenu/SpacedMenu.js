import React from 'react'
import MotionMenu from '../MotionMenu/MotionMenu'

const SpacedMotionMenu = props => (
  <MotionMenu {...props} angle={360/props.btns.length} />
)

export default SpacedMotionMenu
