import pytest
from spacememo import SpacingMemo


def test_insert_value():
    memo = SpacingMemo()
    memo.insertValue('a')
    assert memo.getSpaceMap()['values_queue'] == ['a']
    assert memo.getSpaceMap()['values_map'] == {
        'a': {'score': 0, 'needsRevisionScore': None, 'implemented': False}}
    memo.insertValue('b', {'domain': 'medium', 'initialPositionInQueue': 0})
    assert memo.getSpaceMap()['values_queue'] == ['b', 'a']
    assert memo.getSpaceMap()['values_map'] == {
        'a': {'score': 0, 'needsRevisionScore': None, 'implemented': False},
        'b': {'score': 15, 'needsRevisionScore': None, 'implemented': False}
    }


def test_get_value():
    memo = SpacingMemo()
    memo.insertValue('value1')
    memo.insertValue('value2')
    memo.insertValue('value3')
    assert memo.getSpaceMap()['values_queue'] == ['value1', 'value2', 'value3']
    assert memo.getValue() == 'value1'


def test_evaluate_positive():
    memo = SpacingMemo()
    memo.insertValue('value1')
    memo.insertValue('value2')
    assert memo.getSpaceMap()['values_queue'] == ['value1', 'value2']
    memo.evaluate(True)
    assert memo.getSpaceMap()['values_queue'] == ['value2', 'value1']
    # Queue shoudn´t paste the total lenght in reposition
    memo.evaluate(True)
    memo.evaluate(True)
    memo.evaluate(True)
    memo.evaluate(True)
    memo.evaluate(True)
    memo.evaluate(True)
    assert memo.getSpaceMap()['values_queue'] == ['value2', 'value1']


def test_evaluate_negative():
    memo = SpacingMemo()
    memo.insertValue('value1')
    memo.insertValue('value2')
    memo.insertValue('value3')
    assert memo.getSpaceMap()['values_queue'] == ['value1', 'value2', 'value3']
    memo.evaluate(False)
    assert memo.getSpaceMap()['values_queue'] == ['value2', 'value1', 'value3']
    assert memo.getSpaceMap()['values_map'] == {'value1': {'score': 0, 'needsRevisionScore': 1, 'implemented': False}, 'value2': {
        'score': 0, 'needsRevisionScore': None, 'implemented': False}, 'value3': {'score': 0, 'needsRevisionScore': None, 'implemented': False}}
    memo.evaluate(True)
    assert memo.getSpaceMap()['values_queue'] == ['value1', 'value2', 'value3']
    memo.evaluate(True)
    assert memo.getSpaceMap()['values_queue'] == ['value2', 'value3', 'value1']
    assert memo.getSpaceMap()['values_map'] == {'value1': {'score': 1, 'needsRevisionScore': 3, 'implemented': False}, 'value2': {
        'score': 1, 'needsRevisionScore': None, 'implemented': False}, 'value3': {'score': 0, 'needsRevisionScore': None, 'implemented': False}}
    memo.evaluate(True)
    assert memo.getSpaceMap()['values_queue'] == ['value3', 'value1', 'value2']
    memo.evaluate(True)
    assert memo.getSpaceMap()['values_queue'] == ['value1', 'value3', 'value2']
    memo.evaluate(True)
    # Queue shoudn´t paste the total lenght in reposition
    assert memo.getSpaceMap()['values_queue'] == ['value3', 'value2', 'value1']
    assert memo.getSpaceMap()['values_map'] == {'value1': {'score': 2, 'needsRevisionScore': 5, 'implemented': False}, 'value2': {
        'score': 2, 'needsRevisionScore': None, 'implemented': False}, 'value3': {'score': 1, 'needsRevisionScore': None, 'implemented': False}}
