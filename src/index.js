function wrap(key, content) {
  const result = {};
  result[key] = content;
  return result;
}

export function create(size = 10) {
  return {
    size,
    index: {},
    list: []
  };
}

export function add(state, item, id) {
  const {size, index, list} = state;
  var result = Object.assign({
    size,
    index: Object.assign({}, index, wrap(id, item)),
    list: [...list, id]
  });
  while (result.list.length > size) {
    result = remove(result, result.list[0]);
  }
  return result;
}

export function get(state, id) {
  return state.index[id];
}

export function remove(state, id) {
  if (get(state, id)) {
    let {size, index, list} = state;
    return list.reduce((memo, itemId) => {
      if (itemId !== id) {
        memo.index[itemId] = index[itemId];
        memo.list.push(itemId);
      }
      return memo;
    }, create(size));
  } else {
    return state;
  }
}
