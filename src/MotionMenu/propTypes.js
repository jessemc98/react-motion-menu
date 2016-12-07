import { PropTypes } from 'react'
export default {
  mainBtnRadius: PropTypes.number,
  smallBtnRadius: PropTypes.number,
  spaceBetween: PropTypes.number, //margin between small btns and main btn
  angle: PropTypes.number, //seperation angle of small buttons in degrees
  angleOffset: PropTypes.number, //offset angle of middle button
  springConfig: PropTypes.shape({
    open: PropTypes.object.isRequired,
    close: PropTypes.object.isRequired
  }),
  btns: PropTypes.arrayOf(
    PropTypes.shape({
      iconSrc: PropTypes.string,
      onClick: PropTypes.function,
      alt: PropTypes.string
    })
  )
}
