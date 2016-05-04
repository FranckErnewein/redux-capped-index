import { expect } from 'chai';
import { create, add, remove, get, size, toArray, sort } from '../src/';

function popupate(state, n) {
  for (let i = 1; i < n + 1; i++) {
    state = add(state, 'item ' + i, i);
  }
  return state;
}

describe('create', () => {

  it('should be a function', () => expect(create).to.be.an.instanceOf(Function));

  it('should return the default struct', () => {
    expect(create()).to.be.deep.equal({
      size: 10,
      index: {},
      list: []
    });
  });

  it('should init with size', () => expect(create(1).size).to.be.equal(1));

});

describe('add', () => {

  it('should be a function', () => expect(add).to.be.an.instanceOf(Function));

  it('should add one item', () => {
    expect(add(create(1), 'test', 1)).to.be.deep.equal({
      size: 1,
      index: {
        '1': 'test'
      },
      list: [1]
    });
  });

  it('should add 2 items', () => {
    var state = create(5);
    state = add(state, 'john', 1);
    state = add(state, 'mike', 2);
    expect(state).to.be.deep.equal({
      size: 5,
      index: {
        '1': 'john',
        '2': 'mike'
      },
      list: [1, 2]
    });
  });

  it('should add after the limit', () => {
    var state = create(5);
    state = popupate(state, 6);
    expect(state.index).to.not.have.property('1');
    expect(state.index).to.have.property('2');
    expect(state.index).to.have.property('6');
    expect(state.list).to.be.deep.equal([2, 3, 4, 5, 6]);
  });

});

describe('get', () => {

  it('should be a function', () => expect(get).to.be.an.instanceOf(Function));

  it('should return an item', () => expect(get(add(create(5), 'mike', 42), 42)).to.be.equal('mike'));

});


describe('remove', () => {

  it('should be a function', () => expect(remove).to.be.an.instanceOf(Function));

  it('should remove an item', () => {
    var state = add(create(5), 'mike', 42);
    expect(state.index).to.have.property('42');
    state = remove(state, 42);
    expect(state.index).to.not.have.property('42');
    expect(state.list).to.have.lengthOf(0);
  });

  it('should remove an item in several', () => {
    var state = add(create(5), 'mike', 42);
    state = add(state, 'john', 5);
    state = add(state, 'boby', 1);
    state = remove(state, 5);
    expect(state).to.be.deep.equal({
      size: 5,
      index: {
        '1': 'boby',
        '42': 'mike'
      },
      list: [42, 1]
    });
  });

});

describe('size', () => {

  it('should be a function', () => expect(size).to.be.an.instanceOf(Function));

  it('should set size', () => expect(size(create(5), 42).size).to.be.equal(42));

  it('should truncate', () => {
    var state = create(5);
    state = popupate(state, 5);
    state = size(state, 3);
    expect(state).to.be.deep.equal({
      size: 3,
      index: {
        '3': 'item 3',
        '4': 'item 4',
        '5': 'item 5'
      },
      list: [3, 4, 5]
    });
  });

});

describe('toArray', () => {

  it('should be a function', () => expect(toArray).to.be.an.instanceOf(Function));

  it('should return an array of item', () => {
    var state = create(5);
    state = popupate(state, 3);
    expect(toArray(state)).to.be.deep.equal(['item 1', 'item 2', 'item 3']);
  });

});

describe.skip('sort', () => {

  it('should be a function', () => expect(sort).to.be.an.instanceOf(Function));

  it('should sort with default JS method on id', () => {
    var state = create(5);
    state = add(state, 'Marc', 5);
    state = add(state, 'Oliver', 4);
    state = add(state, 'Stark', 2);
    state = add(state, 'Brian', 3);
    expect(state.list).to.be.deep.equal([5, 4, 2, 3]);
    const sorted = sort(state);
    expect(sorted.list).to.be.deep.equal([2, 3, 4, 5]);
    expect(state).to.not.be.equal(sorted);
  });

  it('should return the same state if sort didnt chaneg anything', () => {
    var state = create(5);
    state = add(state, 'Marc', 1);
    state = add(state, 'Oliver', 2);
    state = add(state, 'Stark', 3);
    expect(state).to.be.equal(sort(state));
  });
});
