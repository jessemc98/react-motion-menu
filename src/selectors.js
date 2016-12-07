export function degreesToRadian(deg){
  return deg * Math.PI / 180
}
export function eqOfACircle(angle, radius, pos){
  return {
    x: Math.round((radius * Math.cos(degreesToRadian(angle)) + pos.x) * 1000000) / 1000000,
    y: Math.round((radius * Math.sin(degreesToRadian(angle)) + pos.y) * 1000000) / 1000000
  }
}
