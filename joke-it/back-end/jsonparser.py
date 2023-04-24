import json
from profanity_check import predict_prob

num_jokes = 10
max_joke_length = 50
profanity_threshold = 0.35
input_file = open('/Users/Jonathan/Desktop/DSAProj3b/dataset/reddit_jokes.json')
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


for item in json_array:
    joke_details = {"title": None, "body": None, "score": None}
    joke_details['title'] = item['title']
    joke_details['body'] = item['body']
    joke_details['score'] = item['score']
    jokes.append(joke_details)

sorted_jokes = bucket_sort(jokes)

filtered_jokes = [joke for joke in sorted_jokes if len(joke['title']) + len(joke['body']) <= max_joke_length and joke['body'].lower().strip() not in ("[deleted]", "[removed]") and predict_prob([joke['title'].strip() + joke['body'].strip()])[0] <= profanity_threshold]

for i, joke in enumerate(filtered_jokes[:num_jokes]):
    print(f"Joke {i+1}:")
    print("Title:", joke['title'].strip())
    print("Body:", joke['body'].strip())
    print("Score:", joke['score'])
    print(f"Profanity: {predict_prob([joke['title'].strip() + joke['body'].strip()])[0]}")
    print("\n---\n")
