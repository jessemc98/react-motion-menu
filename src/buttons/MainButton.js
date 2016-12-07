import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'

export const MainButtonIcon = ({ rotate }) => (
  <span style={{transform: `rotate(${rotate}deg)`}} />
)
MainButtonIcon.propTypes = {
  rotate: PropTypes.number.isRequired
}

const MainButton = ({isOpen, onClick}) => (
  <button className="MotionMenu_MainBtn"
    onClick={onClick}>
    <Motion style={{rotate: spring(isOpen?135:-90)}}>
      {MainButtonIcon}
    </Motion>
  </button>
)
MainButton.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func
}
export default MainButton
