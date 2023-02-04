const difference = (originalArray = [], newArray = []) => {
  const added = [];
  newArray.forEach((item) => {
    if (!originalArray.includes(item)) {
      added.push(item);
    }
  });

  const removed = [];
  originalArray.forEach((item) => {
    if (!newArray.includes(item)) {
      removed.push(item);
    }
  });

  return {
    added,
    removed,
  };
};

export { difference };
export default { difference };
