<h1 align=center> spacememo </h1>

<p align="center">
  <img src="https://games.tactic.net/wp-content/uploads/2022/05/56312_1.jpg">
</p>

<p align=center>📘 A python nanolibrary for apply “spaced repetition” in learning purposes apps 📙 </p>

<br>
<br>

<p align="center">
  Ideal for quizzes, micro learning, and practical exercises what requires domain
</p>

<br>
<h2 align="center">Installation</h2>

```
pip install spacememo
```

<br>
<h2 align="center">Usage</h2>

```
from spacememo import SpacedMemo

let memo = SpacedMemo()

# insert new values with the id number or string of the excercise or question
memo.insertValue('idQuestion1');

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

## The purpose of this library

Spaced repetition algorithms based in queues gives lighter libraries and more easy to use

Any approach that you decide to implement a spaced repetition algorithm or library is good. The important thing of spaced repetition is:

- Estimulate the newest information more often than information with more domain
- Maintenance old knowledge distant little by little to avoid forget it
- Identify the question or skill with remember problems and review it

Happy learning! 📗
