const isObject = (obj) => typeof obj === 'object';
const isEmpty = (obj) => isObject(obj) && Object.keys(obj).length === 0;

const picker = (obj, keys = []) => {
  if (typeof obj !== 'object') {
    return {};
  }

  let result = {};
  for (const key of keys) {
    if (key && key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
};

export { isObject, isEmpty, picker };

export default {
  isObject,
  isEmpty,
  picker,
};
