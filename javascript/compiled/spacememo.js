"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacingMemo = SpacingMemo;
function SpacingMemo() {
  var _this = this;
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  this.valuesQueue = [];
  this.valuesMap = {};
  if (Array.isArray(config)) {
    config.forEach(function (element) {
      return insertValue(element);
    });
  } else {
    this.valuesQueue = config.valuesQueue ? config.valuesQueue : [];
    this.valuesMap = config.valuesMap ? config.valuesMap : {};
  }
  return {
    insertValue: function insertValue(valueId) {
      var optionalParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        domain: 'beginner',
        initialPositionInQueue: _this.valuesQueue.length
      };
      var domain = optionalParams.domain,
        initialPositionInQueue = optionalParams.initialPositionInQueue;
      initialPositionInQueue = initialPositionInQueue > _this.valuesQueue.length || initialPositionInQueue == undefined ? _this.valuesQueue.length : initialPositionInQueue;
      if (_this.valuesQueue.length == 0) {
        _this.valuesQueue.push(valueId);
      } else {
        _this.valuesQueue.splice(initialPositionInQueue, 0, valueId);
      }
      if (!_this.valuesMap[valueId]) {
        _this.valuesMap[valueId] = {
          score: domain == 'medium' ? 15 : domain == 'master' ? 30 : 0,
          needsRevisionScore: null,
          implemented: false
        };
      }
    },
    getValue: function getValue() {
      return _this.valuesQueue[0];
    },
    evaluate: function evaluate(goodOrBadResponseBoolean) {
      var evaluateElement = _this.valuesMap[_this.valuesQueue[0]];
      if (goodOrBadResponseBoolean) {
        evaluateElement.score++;
        evaluateElement.needsRevisionScore == 1 ? evaluateElement.needsRevisionScore = 3 : evaluateElement.needsRevisionScore == 3 ? evaluateElement.needsRevisionScore = 5 : null;
        var position = evaluateElement.needsRevisionScore || evaluateElement.score;
        var element = _this.valuesQueue.shift();
        _this.valuesQueue.splice(position, 0, element);
      } else {
        evaluateElement.needsRevisionScore = 1;
        evaluateElement.score > 0 && evaluateElement.score--;
      }
    },
    getSpaceMap: function getSpaceMap() {
      return {
        valuesQueue: _this.valuesQueue,
        valuesMap: _this.valuesMap
      };
    }
  };
}