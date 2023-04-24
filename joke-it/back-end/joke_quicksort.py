import json
import time
import profanity_check as pc

with open('reddit_jokes.json', 'r') as file:
    
    data = json.load(file)

jokes = []

for item in data:
    joke_details = {"title": None, "body": None, "body_length": None, "score": None, "pscore": None}
    joke_details['title'] = item['title']
    joke_details['body'] = item['body']
    joke_details['body_length'] = len(item['body'])
    joke_details['score'] = item['score']
    #joke_details['pscore'] = pc.predict_prob([item['body']])
    jokes.append(joke_details)

t1 = time.perf_counter_ns()

# Sorts ints
def quick_sort(arr, param):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2][param]
    left = [x for x in arr if x[param] < pivot]
    middle = [x for x in arr if x[param] == pivot]
    right = [x for x in arr if x[param] > pivot]

    return quick_sort(left, param) + middle + quick_sort(right, param)

t2 = time.perf_counter_ns()

def profanity_filter(list, prof_percent, num_jokes):
    filtered_jokes = []
    counter = 0
    for item in list: 
        if pc.predict_prob([item['body']]) < prof_percent and pc.predict_prob([item['title']]) < prof_percent :
            filtered_jokes.append(item)
            counter += 1
        if (counter >= num_jokes):
            break
    return filtered_jokes
        
#testing stuffs
sorted_score_list = quick_sort(jokes, "score")
filtered_jokes = profanity_filter(sorted_score_list, .1, 3)
print(t2 - t1)
for i in filtered_jokes:
    print(i['title'], "\n", i['body'])

