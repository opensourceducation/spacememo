class SpacingMemo:
    def __init__(self, config=[]):
        self._values_queue = []
        self._values_map = {}
        if isinstance(config, list):
            [self.insertValue(element) for element in config]
        else:
            self._values_queue = config['values_queue'] if config['values_queue'] else [
            ]
            self._values_map = config['values_map'] if config['values_map'] else {
            }

    def insertValue(self, valueId, optionalParams={'domain': 'beginner', 'initialPositionInQueue': None}):
        domain = optionalParams['domain']
        initialPositionInQueue = optionalParams['initialPositionInQueue']
        if initialPositionInQueue == None or initialPositionInQueue > len(self._values_queue):
            initialPositionInQueue = len(self._values_queue)
        if len(self._values_queue) == initialPositionInQueue:
            self._values_queue += [valueId]
        else:
            new_queue = self._values_queue[:initialPositionInQueue]
            half2 = self._values_queue[initialPositionInQueue:]
            new_queue.extend(valueId)
            new_queue.extend(half2)
            self._values_queue = new_queue
        if not valueId in list(self._values_map.keys()):
            self._values_map[valueId] = {
                'score': 15 if domain == 'medium' else 30 if domain == 'master' else 0,
                'needsRevisionScore': None,
                'implemented': False,
            }

    def getValue(self):
        return self._values_queue[0]

    def evaluate(self, goodOrBadResponseBoolean):
        evaluateElement = self._values_map[self._values_queue[0]]
        if goodOrBadResponseBoolean:
            evaluateElement['score'] += 1
            if evaluateElement['needsRevisionScore'] == 1:
                evaluateElement['needsRevisionScore'] = 3
            elif evaluateElement['needsRevisionScore'] == 3:
                evaluateElement['needsRevisionScore'] = 5
        else:
            evaluateElement['needsRevisionScore'] = 1
            if evaluateElement['score'] > 0:
                evaluateElement['score'] -= 1
        position = evaluateElement['needsRevisionScore'] or evaluateElement['score']
        element = self._values_queue.pop(0)
        self._values_queue.insert(position, element)

    def getSpaceMap(self):
        return {'values_queue': self._values_queue, 'values_map': self._values_map}
