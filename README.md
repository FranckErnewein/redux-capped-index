# redux-capped-index
Reducers/Fonctions for Redux to manage a capped index

## Principe

Sometimes you want to managed un capped list of item with redux.
But you want to be able to access to your data by `id`.
Each method create a copy of the state insteadof mutate it.

## Usage

### Install

```
npm install redux-capped-index
```

### API

#### create(size: number = 10)

return formated structure:
```js
const state = create(5);
isDeepEqual(state, {
  size: 5,
  index: {},
  list: []
}); // => true
```
default size to 10.

#### add(state, newItem, itemId)

add a new item to the structure.
remove older items if structure is too big.

```js
var state = create(5);

state1 = add(state, 'John', 42);
isDeepEqual(state1, {
  size: 5,
  index: {
    '42': 'John'  
  },
  list: [42]
}); // => true

state2 = add(state1, 'Georges', 43);
isDeepEqual(state2, {
  size: 5,
  index: {
    '42': 'John'  
    '43': 'Georges'  
  },
  list: [42, 42]
}); // => true

state1 === state2; // => false
```

#### size(state, newSize: number)

set size and remove older item if new size is bigger than the current number of items in the state

#### remove(state, itemId)

remove an item from the state. 

## Example with redux



