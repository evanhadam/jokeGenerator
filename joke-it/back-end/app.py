import math
from flask import Flask, jsonify, request
from flask_cors import CORS
from joke_bucketsort import perform_filtered_bucketsort
from joke_quicksort import get_quicksort_time

app = Flask(__name__)
CORS(app)
 
@app.route('/test', methods=['POST'])
def test():
   profanityMin = request.json['sliderMin1']
   profanityMax = request.json['sliderMax1']
   popularityMin = request.json['sliderMin2']
   popularityMax = request.json['sliderMax2']
   lengthMin = request.json['sliderMin3']
   lengthMax = request.json['sliderMax3']

   # 48526 is the best joke
   max_pop_n = math.floor(48526 * (int(popularityMax) / 100))
   min_pop_n = math.floor(48526 * (int(popularityMin) / 100))
   max_prof_n = int(profanityMax)
   min_prof_n = int(profanityMin)
   max_length_n = math.floor(10000 * (int(lengthMax) / 100))
   min_length_n = math.floor(10000 * (int(lengthMin) / 100))
   
   # print(min_length_n)
   # print(max_length_n)
   # print(min_pop_n)
   # print(max_pop_n)
   # print(min_prof_n)
   # print(max_prof_n)
   
   result = perform_filtered_bucketsort(10, min_length_n, max_length_n, min_pop_n, max_pop_n, min_prof_n, max_prof_n)
   result.headers.add('Access-Control-Allow-Origin', '*')
   return result

if __name__ == '__main__':
    app.run(debug = True)