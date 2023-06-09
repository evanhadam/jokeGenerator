import json
import time
import math
from profanity_check import predict_prob

input_file = open('./back-end/dataset/reddit_jokes.json')
json_array = json.load(input_file)
jokes = []

# Quick sorts the entire input list by using list comprehension
# pivot will always be set to the middle item in the list
# must pass in a parameter to sort by
def quick_sort(arr, param):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2][param]
    left = [x for x in arr if x[param] < pivot]
    middle = [x for x in arr if x[param] == pivot]
    right = [x for x in arr if x[param] > pivot]

    return quick_sort(left, param) + middle + quick_sort(right, param)

# Returns the time it takes to quick sort the json
def get_quicksort_time():
    for item in json_array:
        # Convert input json file to array
        joke_details = {"title": None, "body": None, "score": None}
        joke_details['title'] = item['title']
        joke_details['body'] = item['body']
        joke_details['score'] = item['score']
        jokes.append(joke_details)

    # Get time taken to perform sort
    t1 = time.perf_counter_ns()
    sorted_jokes = quick_sort(jokes, "score")
    t2 = time.perf_counter_ns()

    return t2 - t1

# Returns the sorted json given a json of jokes and parameters
# This function is not used in our final implementation, as we only perform one (visible) sort on the data,
# but end up using get_quicksort_time() to get the time it takes for quicksort to run
def perform_filtered_quicksort(num_jokes, min_joke_length, max_joke_length, min_popularity, max_popularity, min_profanity, max_profanity):
    for item in json_array:
        # Convert input json file to array
        joke_details = {"title": None, "body": None, "score": None}
        joke_details['title'] = item['title']
        joke_details['body'] = item['body']
        joke_details['score'] = item['score']
        jokes.append(joke_details)

    # Get time taken to perform sort
    t1 = time.perf_counter_ns()
    sorted_jokes = quick_sort(jokes, "score")
    t2 = time.perf_counter_ns()

    filtered_jokes = []
    counter = 0
    # Long chain of ifs that finds a number of jokes in the sorted file that fits the input parameters
    for joke in sorted_jokes:
        if counter != num_jokes:
            if len(joke['title']) + len(joke['body']) >= min_joke_length and len(joke['title']) + len(joke['body']) <= max_joke_length:
                if joke['body'].lower().strip() not in ("[deleted]", "[removed]"):
                    if math.floor(predict_prob([joke['title'].strip() + joke['body'].strip()])[0] * 100) in range(min_profanity, max_profanity):
                        if joke['score'] >= min_popularity and joke['score'] <= max_popularity:
                            # We had to implement some custom stop words as the profanity checker missed these sometimes
                            stopwords = ['nsfw', 'NSFW', 'r/jokes', 'reddit', 'Reddit', 'www', 'Edit', 'edit', 'E:', 'EDIT', 'bitch', 'fuck', 'shit', 'pussy', 'blowjob', 'r/', 'erection']
                            stopwordInJoke = False
                            for word in stopwords:
                                if word in joke['title'] or word in joke['body']:
                                    stopwordInJoke = True
                            if joke not in filtered_jokes and not stopwordInJoke:
                                counter += 1
                                filtered_jokes.append(joke)
    # Creates and returns the sorted json of jokes that meet the parameters
    list = [{"num": i + 1, "title": joke['title'].strip(), "body": joke['body'].strip(), "score": joke['score'], "profanity": predict_prob([joke['title'].strip() + joke['body'].strip()])[0]} for i, joke in enumerate(filtered_jokes[:num_jokes])]
    return json.dumps({"time": t2 - t1, "jokes": list}, indent=4)
