export function isClassComponent(type) {
  // return typeof type === 'function' && type.prototype.constructor === type;
  return typeof type === 'function' && type.isClassComponent === true;
}
export function isFunctionComponent(type) {
  return typeof type === 'function';
}

