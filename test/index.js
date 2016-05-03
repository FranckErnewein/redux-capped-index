import { expect } from 'chai';
import { create, add, remove, get } from '../src/';

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

  it('should add a remove the oldest cause of limit', () => {
    var state = create(5);
    for (let i = 1; i < 7; i++) {
      state = add(state, 'item ' + i, i);
    }
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
