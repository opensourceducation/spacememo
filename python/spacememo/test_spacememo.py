import pytest
from spacememo import SpacedMemo


def test_insert_value():
    memo = SpacedMemo()
    memo.insert_value('a')
    assert memo.get_space_map()['values_queue'] == ['a']
    assert memo.get_space_map()['values_map'] == {
        'a': {'score': 0, 'needs_revision_score': None, 'implemented': False}}
    memo.insert_value(
        'b', {'domain': 'medium', 'initial_position_in_queue': 0})
    assert memo.get_space_map()['values_queue'] == ['b', 'a']
    assert memo.get_space_map()['values_map'] == {
        'a': {'score': 0, 'needs_revision_score': None, 'implemented': False},
        'b': {'score': 15, 'needs_revision_score': None, 'implemented': False}
    }


def test_get_value():
    memo = SpacedMemo()
    memo.insert_value('value1')
    memo.insert_value('value2')
    memo.insert_value('value3')
    assert memo.get_space_map()['values_queue'] == [
        'value1', 'value2', 'value3']
    assert memo.get_value() == 'value1'


def test_evaluate_positive():
    memo = SpacedMemo()
    memo.insert_value('value1')
    memo.insert_value('value2')
    assert memo.get_space_map()['values_queue'] == ['value1', 'value2']
    memo.evaluate(True)
    assert memo.get_space_map()['values_queue'] == ['value2', 'value1']
    # Queue shoudn´t paste the total lenght in reposition
    memo.evaluate(True)
    memo.evaluate(True)
    memo.evaluate(True)
    memo.evaluate(True)
    memo.evaluate(True)
    memo.evaluate(True)
    assert memo.get_space_map()['values_queue'] == ['value2', 'value1']


def test_evaluate_negative():
    memo = SpacedMemo()
    memo.insert_value('value1')
    memo.insert_value('value2')
    memo.insert_value('value3')
    assert memo.get_space_map()['values_queue'] == [
        'value1', 'value2', 'value3']
    memo.evaluate(False)
    assert memo.get_space_map()['values_queue'] == [
        'value2', 'value1', 'value3']
    assert memo.get_space_map()['values_map'] == {'value1': {'score': 0, 'needs_revision_score': 1, 'implemented': False}, 'value2': {
        'score': 0, 'needs_revision_score': None, 'implemented': False}, 'value3': {'score': 0, 'needs_revision_score': None, 'implemented': False}}
    memo.evaluate(True)
    assert memo.get_space_map()['values_queue'] == [
        'value1', 'value2', 'value3']
    memo.evaluate(True)
    assert memo.get_space_map()['values_queue'] == [
        'value2', 'value3', 'value1']
    assert memo.get_space_map()['values_map'] == {'value1': {'score': 1, 'needs_revision_score': 3, 'implemented': False}, 'value2': {
        'score': 1, 'needs_revision_score': None, 'implemented': False}, 'value3': {'score': 0, 'needs_revision_score': None, 'implemented': False}}
    memo.evaluate(True)
    assert memo.get_space_map()['values_queue'] == [
        'value3', 'value1', 'value2']
    memo.evaluate(True)
    assert memo.get_space_map()['values_queue'] == [
        'value1', 'value3', 'value2']
    memo.evaluate(True)
    # Queue shoudn´t paste the total lenght in reposition
    assert memo.get_space_map()['values_queue'] == [
        'value3', 'value2', 'value1']
    assert memo.get_space_map()['values_map'] == {'value1': {'score': 2, 'needs_revision_score': 5, 'implemented': False}, 'value2': {
        'score': 2, 'needs_revision_score': None, 'implemented': False}, 'value3': {'score': 1, 'needs_revision_score': None, 'implemented': False}}


def test_insert_value_any_value():
    memo = SpacedMemo()
    assert memo.get_space_map()['values_queue'] == []
    assert memo.get_space_map()['values_map'] == {}
    memo2 = SpacedMemo({'values_queue': ['value1'], 'values_map': {'value1': {'score': 2, 'needs_revision_score': 5, 'implemented': False}, 'value2': {
        'score': 2, 'needs_revision_score': None, 'implemented': False}, 'value3': {'score': 1, 'needs_revision_score': None, 'implemented': False}}})
    assert memo2.get_space_map() == {'values_queue': ['value1'], 'values_map': {'value1': {'score': 2, 'needs_revision_score': 5, 'implemented': False}, 'value2': {
        'score': 2, 'needs_revision_score': None, 'implemented': False}, 'value3': {'score': 1, 'needs_revision_score': None, 'implemented': False}}}


def test_spaced_memo_with_preconfigured_data():
    memo = SpacedMemo({
        'values_queue': ['value1', 'value2'],
        'values_map': {
            'value1': {'score': 0, 'needs_revision_score': None, 'implemented': False},
            'value2': {'score': 0, 'needs_revision_score': None, 'implemented': False},
        },
    })
    assert memo.get_space_map() == {
        'values_queue': ['value1', 'value2'],
        'values_map': {
            'value1': {'score': 0, 'needs_revision_score': None, 'implemented': False},
            'value2': {'score': 0, 'needs_revision_score': None, 'implemented': False},
        },
    }
