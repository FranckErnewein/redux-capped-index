import {create, add, remove, size} from '../';

function lastPeopleReducer(state = create(5), action) {
  
  switch(action.type) {
    case 'ADD_USER':
      return add(state, action.newUser, action.newUser.id);
    case 'REMOVE_USER':
      return remove(state, action.userIdToRemove);
    case 'SET_SIZE':
      return size(state, action.newSize);
    default:
      return state;
  }

}
