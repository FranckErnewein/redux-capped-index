function wrap(key, content) {
  const result = {};
  result[key] = content;
  return result;
}

function truncate(state) {
  while (state.list.length > state.size) {
    state = remove(state, state.list[0]);
  }
  return state;
}

export function create(size = 10) {
  return {
    size,
    index: {},
    list: []
  };
}

export function add({size, index, list} , item, id) {
  return truncate({
    size,
    index: Object.assign({}, index, wrap(id, item)),
    list: [...list, id]
  });
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

export function size(state, value) {
  return truncate(Object.assign({}, state, {
    size: value
  }));
}

export function toArray(state) {
  return state.list.map(id => state.index[id]);
}
