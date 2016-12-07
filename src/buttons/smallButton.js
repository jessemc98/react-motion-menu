import React, { PropTypes } from 'react'

const SmallButton = ({ iconSrc, alt, left, top, width, height, x, y, onClick }) => (
  <button
  className="MotionMenu_smallBtn"
  style={{
    left, top, width, height,
    transform: `translate3d(${x}px, ${y}px, 0)`
  }}
  onClick={onClick} >
    <div className="MotionMenu_smallBtn_img">
      <img src={iconSrc} alt={alt} />
    </div>
  </button>
)
SmallButton.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
}
export default SmallButton
