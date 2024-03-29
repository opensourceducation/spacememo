export function SpacedMemo(config = {}){
  this.valuesQueue = config.valuesQueue || []
  ;this.valuesMap = config.valuesMap || {}
  if(config){
    (!config.valuesQueue || !config.valuesQueue) && new Error('Your SpacedMemo config Object is broken. Please Review it: ' + config)
  } 
  return {
    insertValue:(valueId, optionalParams = {domain: 'b', initialPositionInQueue: this.valuesQueue.length}) => {
      let {domain, initialPositionInQueue} = optionalParams 
      initialPositionInQueue = initialPositionInQueue > this.valuesQueue.length || initialPositionInQueue == undefined ? this.valuesQueue.length : initialPositionInQueue
      if(this.valuesQueue.length == 0){
        this.valuesQueue.push(valueId)
      } else {
        this.valuesQueue.splice(initialPositionInQueue,0,valueId)
      }
      if(!this.valuesMap[valueId]){
        this.valuesMap[valueId] = {
          score: domain == 'medium' ? 15 : domain == 'master' ? 30 : 0,
          needsRevisionScore: null,
          implemented: false,
        }
      }
    },
    getValue:()=> this.valuesQueue[0],
    evaluate:(goodOrBadResponseBoolean)=>{
      const evaluateElement = this.valuesMap[this.valuesQueue[0]]
      if(goodOrBadResponseBoolean){
        evaluateElement.score++
        evaluateElement.needsRevisionScore == 1 ? evaluateElement.needsRevisionScore = 3 : evaluateElement.needsRevisionScore == 3 ? evaluateElement.needsRevisionScore = 5 : null
        let position = evaluateElement.needsRevisionScore || evaluateElement.score
        let element = this.valuesQueue.shift()
        this.valuesQueue.splice(position,0,element)
      }else{
        evaluateElement.needsRevisionScore = 1
        evaluateElement.score > 0 && evaluateElement.score--
      }
    },
    getSpaceMap:()=>{
      return {
        valuesQueue: this.valuesQueue,
        valuesMap: this.valuesMap
      }
    }
  }
}