class SpacedMemo:
    def __init__(self, config={'values_queue': [], 'values_map': {}}):
        self._values_queue = config['values_queue'] if config['values_queue'] else [
        ]
        self._values_map = config['values_map'] if config['values_map'] else {
        }

    def insert_value(self, valueId, optionalParams={'domain': 'b', 'initial_position_in_queue': None}):
        domain = optionalParams['domain']
        initial_position_in_queue = optionalParams['initial_position_in_queue']
        if initial_position_in_queue == None or initial_position_in_queue > len(self._values_queue):
            initial_position_in_queue = len(self._values_queue)
        if len(self._values_queue) == initial_position_in_queue:
            self._values_queue += [valueId]
        else:
            new_queue = self._values_queue[:initial_position_in_queue]
            half2 = self._values_queue[initial_position_in_queue:]
            new_queue.extend(valueId)
            new_queue.extend(half2)
            self._values_queue = new_queue
        if not valueId in list(self._values_map.keys()):
            self._values_map[valueId] = {
                'score': 15 if domain == 'medium' else 30 if domain == 'master' else 0,
                'needs_revision_score': None,
                'implemented': False,
            }

    def get_value(self):
        return self._values_queue[0]

    def evaluate(self, good_or_bad_response_boolean):
        evaluate_element = self._values_map[self._values_queue[0]]
        if good_or_bad_response_boolean:
            evaluate_element['score'] += 1
            if evaluate_element['needs_revision_score'] == 1:
                evaluate_element['needs_revision_score'] = 3
            elif evaluate_element['needs_revision_score'] == 3:
                evaluate_element['needs_revision_score'] = 5
        else:
            evaluate_element['needs_revision_score'] = 1
            if evaluate_element['score'] > 0:
                evaluate_element['score'] -= 1
        position = evaluate_element['needs_revision_score'] or evaluate_element['score']
        element = self._values_queue.pop(0)
        self._values_queue.insert(position, element)

    def get_space_map(self):
        return {'values_queue': self._values_queue, 'values_map': self._values_map}
