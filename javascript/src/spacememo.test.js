import { SpacedMemo } from "./spacememo.js";

test('insertValue should insert a new value in the queue and the map', () => {
  const spacedRepetition = new SpacedMemo();
  spacedRepetition.insertValue('value1');
  expect(spacedRepetition.getSpaceMap().valuesQueue).toEqual(['value1']);
  expect(spacedRepetition.getSpaceMap().valuesMap).toEqual({value1: {score: 0, needsRevisionScore: null, implemented: false}});
});

test('insertValue first in first out', () => {
  const spacedRepetition = new SpacedMemo();
  spacedRepetition.insertValue('value1');
  spacedRepetition.insertValue('value2', {domain: 'beginner'});
  spacedRepetition.insertValue('value3');
  expect(spacedRepetition.getSpaceMap().valuesQueue).toEqual([ 'value1', 'value2', 'value3' ]);
  expect(spacedRepetition.getSpaceMap().valuesMap).toEqual({
    value1: { score: 0, needsRevisionScore: null, implemented: false },
    value2: { score: 0, needsRevisionScore: null, implemented: false },
    value3: { score: 0, needsRevisionScore: null, implemented: false }
  });
});

test('getValue should return the first value in the queue', () => {
  const spacedRepetition = new SpacedMemo();
  spacedRepetition.insertValue('value1', {domain: 'beginner'});
  spacedRepetition.insertValue('value2', {domain: 'beginner'});
  expect(spacedRepetition.getValue()).toEqual('value1');
});

test('evaluate should increase the score and move the value to a higher position in the queue if goodOrBadResponseBoolean is true', () => {
  const spacedRepetition = new SpacedMemo();
  spacedRepetition.insertValue('value1', {domain: 'beginner'});
  spacedRepetition.insertValue('value2', {domain: 'beginner'});
  expect(spacedRepetition.getSpaceMap().valuesQueue).toEqual(['value1', 'value2']);
  spacedRepetition.evaluate(true);
  expect(spacedRepetition.getSpaceMap().valuesQueue).toEqual(['value2', 'value1']);
  expect(spacedRepetition.getSpaceMap().valuesMap).toEqual({
    value1: {score: 1, needsRevisionScore: null, implemented: false},
    value2: {score: 0, needsRevisionScore: null, implemented: false},
  });
});

test('if evaluate score is mayor to queue length when is correct, evaluate value should span tha last position', () => {
  const spacedRepetition = new SpacedMemo();
  spacedRepetition.insertValue('value1', {domain: 'beginner'});
  spacedRepetition.insertValue('value2', {domain: 'beginner'});
  expect(spacedRepetition.getSpaceMap().valuesQueue).toEqual(['value1', 'value2']);
  spacedRepetition.evaluate(true);
  spacedRepetition.evaluate(true);
  spacedRepetition.evaluate(true);
  spacedRepetition.evaluate(true);
  spacedRepetition.evaluate(true);
  expect(spacedRepetition.getSpaceMap().valuesQueue).toEqual(['value2', 'value1']);
  expect(spacedRepetition.getSpaceMap().valuesMap).toEqual({
    value1: {score: 3, needsRevisionScore: null, implemented: false},
    value2: {score: 2, needsRevisionScore: null, implemented: false},
  });
});

test('evaluate should decrease the score and move the value to a lower position in the queue if goodOrBadResponseBoolean is false', () => {
  const spacedRepetition = new SpacedMemo();
  spacedRepetition.insertValue('value1', {domain: 'beginner'});
  spacedRepetition.insertValue('value2', {domain: 'beginner'});
  spacedRepetition.evaluate(false);
  expect(spacedRepetition.getSpaceMap().valuesQueue).toEqual(['value1', 'value2']);
  
  expect(spacedRepetition.getSpaceMap().valuesMap).toEqual({
    value1: {score: 0, needsRevisionScore: 1, implemented: false},
    value2: {score: 0, needsRevisionScore: null, implemented: false},
  });
});

test('getSpaceMap should return the valuesQueue and valuesMap', () => {
  const spacedRepetition = new SpacedMemo();
  spacedRepetition.insertValue('value1', {domain: 'beginner'});
  spacedRepetition.insertValue('value2', {domain: 'beginner'});
  expect(spacedRepetition.getSpaceMap()).toEqual({
    valuesQueue: ['value1', 'value2'],
    valuesMap: {
      value1: {score: 0, needsRevisionScore: null, implemented: false},
      value2: {score: 0, needsRevisionScore: null, implemented: false},
    },
  });
}); 

test('Should instantiate SpacingMemo queue with preconfigured data', () => {
  const spacedRepetition1 = new SpacedMemo();
  expect(spacedRepetition1.getSpaceMap().valuesQueue).toEqual([]);
  expect(spacedRepetition1.getSpaceMap().valuesMap).toEqual({});
  const spacedRepetition2 = new SpacedMemo({
    valuesQueue: ['value1', 'value2'],
    valuesMap: {
      value1: {score: 0, needsRevisionScore: null, implemented: false},
      value2: {score: 0, needsRevisionScore: null, implemented: false},
    },
  });
  expect(spacedRepetition2.getSpaceMap()).toEqual({
    valuesQueue: ['value1', 'value2'],
    valuesMap: {
      value1: {score: 0, needsRevisionScore: null, implemented: false},
      value2: {score: 0, needsRevisionScore: null, implemented: false},
    },
  })
})
