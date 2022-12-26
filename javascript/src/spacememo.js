export function SpacingMemo(config = []){
  this.valuesQueue = []
  ;this.valuesMap = {}
  if(Array.isArray(config)){
    config.forEach((element)=> insertValue(element))
  } else {
    this.valuesQueue = config.valuesQueue ? config.valuesQueue : []
    ;this.valuesMap = config.valuesMap ? config.valuesMap : {}
  }
  return {
    insertValue:(valueId, optionalParams = {domain: 'beginner', initialPositionInQueue: this.valuesQueue.length}) => {
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