import json
import time
import math
from profanity_check import predict_prob
from joke_quicksort import get_quicksort_time

input_file = open('/Users/jonathan/Downloads/jokeGenerator-main/joke-it/back-end/dataset/reddit_jokes.json')
json_array = json.load(input_file)
jokes = []

def insertion_sort(bucket):
    for i in range(1, len(bucket)):
        up = bucket[i]
        j = i - 1
        while j >= 0 and bucket[j]['score'] < up['score']:
            bucket[j + 1] = bucket[j]
            j -= 1
        bucket[j + 1] = up
    return bucket

def bucket_sort(jokes):
    max_score = max([joke['score'] for joke in jokes])
    bucket_size = max_score + 1
    buckets = [[] for _ in range(bucket_size)]

    for joke in jokes:
        index = joke['score']
        buckets[index].append(joke)

    sorted_jokes = []
    for i in range(bucket_size - 1, -1, -1):
        sorted_jokes.extend(insertion_sort(buckets[i]))

    return sorted_jokes

def get_bucketsort_time():
    for item in json_array:
        joke_details = {"title": None, "body": None, "score": None}
        joke_details['title'] = item['title']
        joke_details['body'] = item['body']
        joke_details['score'] = item['score']
        jokes.append(joke_details)

    t1 = time.perf_counter_ns()
    sorted_jokes = bucket_sort(jokes)
    t2 = time.perf_counter_ns()

    return t2 - t1

def perform_filtered_bucketsort(num_jokes, min_joke_length, max_joke_length, min_popularity, max_popularity, min_profanity, max_profanity):
    for item in json_array:
        joke_details = {"title": None, "body": None, "score": None}
        joke_details['title'] = item['title']
        joke_details['body'] = item['body']
        joke_details['score'] = item['score']
        jokes.append(joke_details)

    t1 = time.perf_counter_ns()
    sorted_jokes = bucket_sort(jokes)
    t2 = time.perf_counter_ns()

    filtered_jokes = []
    counter = 0
    for joke in sorted_jokes:
        if counter != num_jokes:
            if len(joke['title']) + len(joke['body']) >= min_joke_length and len(joke['title']) + len(joke['body']) <= max_joke_length:
                if joke['body'].lower().strip() not in ("[deleted]", "[removed]"):
                    if math.floor(predict_prob([joke['title'].strip() + joke['body'].strip()])[0] * 100) in range(min_profanity, max_profanity):
                        if joke['score'] >= min_popularity and joke['score'] <= max_popularity:
                            if joke not in filtered_jokes:
                                counter += 1
                                filtered_jokes.append(joke)
                            
    list = [{"num": i + 1, "title": joke['title'].strip(), "body": joke['body'].strip(), "score": joke['score'], "profanity": predict_prob([joke['title'].strip() + joke['body'].strip()])[0]} for i, joke in enumerate(filtered_jokes[:num_jokes])]
    return json.dumps({"bucketsort_time": t2 - t1, "quicksort_time": get_quicksort_time(), "jokes": list}, indent=4)

    # with open("/Users/Jonathan/Desktop/DSAProj3b/out.json", 'w') as outfile:
    #     list = [{"num": i + 1, "title": joke['title'].strip(), "body": joke['body'].strip(), "score": joke['score'], "profanity": predict_prob([joke['title'].strip() + joke['body'].strip()])[0]} for i, joke in enumerate(filtered_jokes[:num_jokes])]
    #     json.dump({"time": t2 - t1, "jokes": list}, outfile, indent=4)
