<h1 align=center> spacememo </h1>

<p align="center">
  <img src="https://games.tactic.net/wp-content/uploads/2022/05/56312_1.jpg">
</p>

<p align=center>📘 A javascript nanolibrary for apply “spaced repetition” in learning purposes apps 📙 </p>

<br>
<p align="center">
  Forget to logical process to know when to repeat the information for the optimal learning process of the user
</p>

<p align="center">
  Ideal for quizzes, micro learning, and practical exercises what requires domain
</p>

<br>

<br>
<h2 align="center">Installation</h2>

```
npm install spacememo
```

<br>
<h2 align="center">Usage</h2>

```
import { SpacedMemo } from "./spacememo.js"

let spacedRepetition = new SpacedMemo();

// insert new values with the id number or string of the excercise or question
spacedRepetition.insertValue('idQuestion1');

// multiple values
['id1', 'id2', 'id3'].forEach(id => spacedRepetition.insertValue(id))

// optionally you can config a level of previous expertise to decrease initial frecuency instead default 'beginner' value
spacedRepetition.insertValue('idQuestion6', {domain: 'medium'})
spacedRepetition.insertValue('idQuestion6', {domain: 'expert'})

// spacememo gives the question or excersice that you need to resolve
spacedRepetition.getValue() // returns an id

// evaluate the performance in last excersice or question with a boolean result
spacedRepetition.evaluate(false)

// you can extract the data to render the order list for the user
spacedRepetition.getSpaceMap().values_queue     // return an array of id elements

// and reorder the queue if user need to
let configValue = spacedRepetition.getSpaceMap().values_map

spacedRepetition = new SpacedMemo({
  values_queue: userReorderList,
  values_map: configValue
})

// or add in a persistent database and reuse in next sessions
let savedInDb = spacedRepetition.getSpaceMap() // return a config object for persistent saving

const myNewStudySession = new SpacedMemo(savedInDb)

// even you can change the default start position in queue based on your business requirements
spacedRepetition.insertValue('idQuestion6', {initialPositionInQueue: 0})
spacedRepetition.insertValue('idQuestion6', {initialPositionInQueue: 3, domain: 'medium'})
```

## The purpose of this library

Spaced repetition algorithms based in queues gives lighter libraries and more easy to use

Any approach that you decide to implement a spaced repetition algorithm or library is good. The important thing of spaced repetition is:

- Estimulate the newest information more often than information with more domain
- Maintenance old knowledge distant little by little to avoid forget it
- Identify the question or skill with remember problems and review it

Happy learning! 📗
