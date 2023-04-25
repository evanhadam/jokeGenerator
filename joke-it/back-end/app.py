from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
 
@app.route('/test', methods =['POST'])
def test():
   profanityMin = request.json['sliderMin1']
   profanityMax = request.json['sliderMax1']
   popularityMin = request.json['sliderMin2']
   popularityMax = request.json['sliderMax2']
   lengthMin = request.json['sliderMin3']
   lengthMax = request.json['sliderMax3']

   # need json file of 10 titles and jokes, along with the times taken for quick and bucket sort
   return jsonify({"Result": "Welcome to GeeksForGeeks" +request.json['sliderMin1'] + request.json['sliderMax1'] + request.json['sliderMin2'] + request.json['sliderMax2'] + request.json['sliderMin3'] + request.json['sliderMax3']})
 
if __name__ == '__main__':
    app.run(debug = True)