import React, { PropTypes } from 'react'
import SmallButton from './smallButton'
import { StaggeredMotion } from 'react-motion'

const StaggeredButtons = ({ btnOffsets, defaultStyle, getStaggeredStyles, btns }) => {
  return (
    <StaggeredMotion
      defaultStyles={btnOffsets.map((_, i) => ({progress: 0}))}
      styles={getStaggeredStyles}>
      {btnProgress =>
        <div>
          {btnProgress.map(({progress}, i) => (
            <SmallButton key={i} {...defaultStyle}
              x={(btnOffsets[i].x/100) * progress}
              y={(btnOffsets[i].y/100) * progress}
              {...btns[i]} />
          ))}
        </div>
      }
    </StaggeredMotion>
  )
}
StaggeredButtons.defaultProps = {
  btnOffsets: [],
  getStaggeredStyles: () => [],
  btns: []
}
StaggeredButtons.propTypes = {
  btnOffsets: PropTypes.array.isRequired,
  defaultStyle: PropTypes.object,
  getStaggeredStyles: PropTypes.func.isRequired,
  btns: PropTypes.array.isRequired
}
export default StaggeredButtons
