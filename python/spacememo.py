class SpacingMemo:
  def __init__(self, config = []):
    self.values_queue = []
    self.values_map = {}
    if isinstance(config, list):
      [self.insertValue(element) for element in config]
    else:
      self.values_queue = config['values_queue'] if config['values_queue'] else []
      self.values_map = config['values_map'] if config['values_map'] else {}

  def insertValue(self, valueId, domain = 'beginner', initialPositionInQueue = None):  
      print(valueId in list(self.values_map.keys()))
      if initialPositionInQueue == None or initialPositionInQueue > len(self.values_queue):
        initialPositionInQueue = len(self.values_queue) 
      if len(self.values_queue) == initialPositionInQueue:
        self.values_queue +=  [valueId]
      else:
        half1 = self.values_queue[:initialPositionInQueue]
        half2 = self.values_queue[initialPositionInQueue:]
        self.values_queue = half1 + valueId + half2 
      if not valueId in list(self.values_map.keys()) :
        value = {'beginner':0, 'medium':15, 'master':30}
        self.values_map[valueId] = {
          'score': value[domain],
          'needsRevisionScore': None,
          'implemented': False,
        }

  def getValue(self):
    return self.values_queue[0]

  def evaluate(self,goodOrBadResponseBoolean):
    evaluateElement = self.values_map[self.values_queue[0]]
    if goodOrBadResponseBoolean:
      evaluateElement.score+1
      #evaluateObject = {'2':3, '3':5}
      # si existe el key en el objeto de arriba toma ese valor, si no es un None

  def getSpaceMap(self):
    return { 'values_queue': self.values_queue, 'values_map': self.values_map }


