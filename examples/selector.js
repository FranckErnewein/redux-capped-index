const createSelector = require('reselect').createSelector;
const {toArray, create, add, get} = require('../');


const getLastPeople = state => state.lastUsers;

const userList = createSelector([getLastPeople], lastUsers => toArray(lastUsers));

const userListSortedByLastName = createSelector([
  getLastPeople
], function(lastUsers) {
  return lastUsers.list.concat().sort((id1, id2) => {
    return get(lastUsers, id1).lastName.toLowerCase() <= get(lastUsers, id2).lastName.toLowerCase() ? -1 : 1;
  }).map(id => get(lastUsers, id));
});

var state = create(5);
state = add(state, {
  lastName: 'Peter'
}, 1);
state = add(state, {
  lastName: 'Arnold'
}, 2);
state = add(state, {
  lastName: 'Michael'
}, 3);
state = add(state, {
  lastName: 'Zoe'
}, 4);
state = add(state, {
  lastName: 'Jenny'
}, 5);

console.log(state);
console.log(userList({lastUsers: state}));
console.log(userListSortedByLastName({lastUsers: state}));

