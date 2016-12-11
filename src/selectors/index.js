const _Math = Math
export function degreesToRadian(deg){
  return deg * _Math.PI / 180
}
export function eqOfACircle(angle, radius, pos){
  return {
    x: _Math.round((radius * _Math.cos(degreesToRadian(angle)) + pos.x) * 1000000) / 1000000,
    y: _Math.round((radius * _Math.sin(degreesToRadian(angle)) + pos.y) * 1000000) / 1000000
  }
}
