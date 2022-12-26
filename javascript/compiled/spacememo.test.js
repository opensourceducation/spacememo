"use strict";

var _spacememo = require("./spacememo.js");
test('insertValue should insert a new value in the queue and the map', function () {
  var spacingMemo = new _spacememo.SpacingMemo();
  spacingMemo.insertValue('value1');
  expect(spacingMemo.getSpaceMap().valuesQueue).toEqual(['value1']);
  expect(spacingMemo.getSpaceMap().valuesMap).toEqual({
    value1: {
      score: 0,
      needsRevisionScore: null,
      implemented: false
    }
  });
});
test('insertValue first in first out', function () {
  var spacingMemo = new _spacememo.SpacingMemo();
  spacingMemo.insertValue('value1');
  spacingMemo.insertValue('value2', {
    domain: 'beginner'
  });
  spacingMemo.insertValue('value3');
  expect(spacingMemo.getSpaceMap().valuesQueue).toEqual(['value1', 'value2', 'value3']);
  expect(spacingMemo.getSpaceMap().valuesMap).toEqual({
    value1: {
      score: 0,
      needsRevisionScore: null,
      implemented: false
    },
    value2: {
      score: 0,
      needsRevisionScore: null,
      implemented: false
    },
    value3: {
      score: 0,
      needsRevisionScore: null,
      implemented: false
    }
  });
});
test('getValue should return the first value in the queue', function () {
  var spacingMemo = new _spacememo.SpacingMemo();
  spacingMemo.insertValue('value1', {
    domain: 'beginner'
  });
  spacingMemo.insertValue('value2', {
    domain: 'beginner'
  });
  expect(spacingMemo.getValue()).toEqual('value1');
});
test('evaluate should increase the score and move the value to a higher position in the queue if goodOrBadResponseBoolean is true', function () {
  var spacingMemo = new _spacememo.SpacingMemo();
  spacingMemo.insertValue('value1', {
    domain: 'beginner'
  });
  spacingMemo.insertValue('value2', {
    domain: 'beginner'
  });
  expect(spacingMemo.getSpaceMap().valuesQueue).toEqual(['value1', 'value2']);
  spacingMemo.evaluate(true);
  expect(spacingMemo.getSpaceMap().valuesQueue).toEqual(['value2', 'value1']);
  expect(spacingMemo.getSpaceMap().valuesMap).toEqual({
    value1: {
      score: 1,
      needsRevisionScore: null,
      implemented: false
    },
    value2: {
      score: 0,
      needsRevisionScore: null,
      implemented: false
    }
  });
});
test('if evaluate score is mayor to queue length when is correct, evaluate value should span tha last position', function () {
  var spacingMemo = new _spacememo.SpacingMemo();
  spacingMemo.insertValue('value1', {
    domain: 'beginner'
  });
  spacingMemo.insertValue('value2', {
    domain: 'beginner'
  });
  expect(spacingMemo.getSpaceMap().valuesQueue).toEqual(['value1', 'value2']);
  spacingMemo.evaluate(true);
  spacingMemo.evaluate(true);
  spacingMemo.evaluate(true);
  spacingMemo.evaluate(true);
  spacingMemo.evaluate(true);
  expect(spacingMemo.getSpaceMap().valuesQueue).toEqual(['value2', 'value1']);
  expect(spacingMemo.getSpaceMap().valuesMap).toEqual({
    value1: {
      score: 3,
      needsRevisionScore: null,
      implemented: false
    },
    value2: {
      score: 2,
      needsRevisionScore: null,
      implemented: false
    }
  });
});
test('evaluate should decrease the score and move the value to a lower position in the queue if goodOrBadResponseBoolean is false', function () {
  var spacingMemo = new _spacememo.SpacingMemo();
  spacingMemo.insertValue('value1', {
    domain: 'beginner'
  });
  spacingMemo.insertValue('value2', {
    domain: 'beginner'
  });
  spacingMemo.evaluate(false);
  expect(spacingMemo.getSpaceMap().valuesQueue).toEqual(['value1', 'value2']);
  expect(spacingMemo.getSpaceMap().valuesMap).toEqual({
    value1: {
      score: 0,
      needsRevisionScore: 1,
      implemented: false
    },
    value2: {
      score: 0,
      needsRevisionScore: null,
      implemented: false
    }
  });
});
test('getSpaceMap should return the valuesQueue and valuesMap', function () {
  var spacingMemo = new _spacememo.SpacingMemo();
  spacingMemo.insertValue('value1', {
    domain: 'beginner'
  });
  spacingMemo.insertValue('value2', {
    domain: 'beginner'
  });
  expect(spacingMemo.getSpaceMap()).toEqual({
    valuesQueue: ['value1', 'value2'],
    valuesMap: {
      value1: {
        score: 0,
        needsRevisionScore: null,
        implemented: false
      },
      value2: {
        score: 0,
        needsRevisionScore: null,
        implemented: false
      }
    }
  });
});
test('Should instantiate SpacingMemo queue with preconfigured data', function () {
  var spacingMemo1 = new _spacememo.SpacingMemo();
  expect(spacingMemo1.getSpaceMap().valuesQueue).toEqual([]);
  expect(spacingMemo1.getSpaceMap().valuesMap).toEqual({});
});