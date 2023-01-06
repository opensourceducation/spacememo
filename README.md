<h1 align=center> spacememo </h1>

<p align="center">
  <img src="https://games.tactic.net/wp-content/uploads/2022/05/56312_1.jpg">
</p>

<p align=center>📘 A python/javascript nanolibrary for apply “spaced repetition” in learning purposes apps 📙 </p>

<br>
<p align="center">
  <a href="https://badge.fury.io/js/spacememo"><img src="https://badge.fury.io/js/spacememo.svg" alt="npm version" height="18"></a>
  <img src="https://github.com/opensourceducation/spacememo/actions/workflows/npm_deploy.yml/badge.svg">
</p>

<p align="center">
  <a href="https://badge.fury.io/py/spacememo"><img src="https://badge.fury.io/py/spacememo.svg" alt="PyPI version" height="18"></a>
    <img src="https://github.com/opensourceducation/spacememo/actions/workflows/pip_deploy.yml/badge.svg">
  </p>
</p>

<br>

Forget to logical process to know when to repeat the information for the optimal learning process of the user

Ideal for quizzes, micro learning, and practical exercises what requires domain

<br>
<h2 align="center">Installation</h2>
<h4 align="center">Python</h4>

```
pip install spacememo
```

<br>
<h4 align="center">Javascript</h4>

```
npm install spacememo
```

<br>
<h2 align="center">Usage</h2>
<h4 align="center">Python</h4>

```
from spacememo import SpacedMemo

let memo = SpacedMemo()

# insert new values with the id number or string of the excercise or question
spacedRepetition.insertValue('idQuestion1');

# multiple values
[memo.insert_value(id) for id in ['id1', 'id2', 'id3']]

# optionally you can config a level of previous expertise to decrease initial frecuency instead default 'beginner' value
memo.insert_value('id_question6', {'domain': 'medium'})
memo.insert_value('id_question6', {'domain': 'expert'})


# spacememo gives the question or excersice that you need to resolve
memo.get_value() # returns an id

# evaluate the performance in last excersice or question with a boolean result
memo.evaluate(False)

# you can extract the data to render the order list for the user
memo.get_space_map()['values_queue']  # return an array of id elements

# and reorder the queue if user need to
config_value = memo.get_space_map().values_map

memo = SpacedMemo({
    'values_queue': user_reorder_list,
    'values_map': config_value
})



# or add in a persistent database and reuse in next sessions
saved_in_db = memo.get_space_map()  # return a config object for persistent saving

my_new_study_session = SpacedMemo(saved_in_db)


# even you can change the default start position in queue based on your business requirements
memo.insert_value('idQuestion6', {'initial_position_in_queue': 0})
memo.insert_value('idQuestion6', {'initial_position_in_queue': 3, 'domain': 'medium'})
```

<br>
<h4 align="center">Javascript</h4>

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
