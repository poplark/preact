export function isClassComponent(type) {
  return typeof type === 'function' && type.prototype.constructor === type;
}
export function isFunctionComponent(type) {
  return typeof type === 'function';
}

