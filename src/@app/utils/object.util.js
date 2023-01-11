const isObject = (obj) => typeof obj === 'object';
const isEmpty = (obj) => isObject(obj) && Object.keys(obj).length === 0;

export { isObject, isEmpty };

export default {
  isObject,
  isEmpty,
};
