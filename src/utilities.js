export function capitalize(string) {
  return string[0].toUpperCase() + string.substr(1);
}

export function flattenScoreToArray(playerScoreObject) {
  return Object.values(playerScoreObject).map(frame => Object.values(frame)).flat()
}