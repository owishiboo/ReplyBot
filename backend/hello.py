# from flask import Flask, request, jsonify

# app = Flask(__name__)

# # Define your endpoints here
# @app.route('/api',methods=['POST','GET'])
# def index():
#     return {"message":'Hello, World!'}

# # Define more endpoints here as needed

# # Run the app
# if __name__ == '__main__':
#     app.run()

from flask import Flask
from flask_cors import CORS,cross_origin
import numpy as np
import tensorflow as tf
import tflearn
import random
import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()
nltk.download('punkt')
import json
import pickle
import warnings
warnings.filterwarnings("ignore")

api = Flask(__name__)

cors = CORS(api, resources={r"/api": {"origins": "*"}})
api.config['CORS_HEADERS'] = 'Content-Type'

@api.route('/api/profile')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

    


data = pickle.load( open( "training_data", "rb" ) )
words = data['words']
classes = data['classes']
train_x = data['train_x']
train_y = data['train_y']
net = tflearn.input_data(shape=[None, len(train_x[0])])
net = tflearn.fully_connected(net, 8, restore=False)
net = tflearn.fully_connected(net, 8, restore=False)
net = tflearn.fully_connected(net, len(train_y[0]), activation='softmax', restore=False)
net = tflearn.regression(net)
model = tflearn.DNN(net, tensorboard_dir='tflearn_logs')
print("Loading the Model......")
# load our saved model
model.load('./model.tflearn')

with open('intents.json') as json_data:
    intents = json.load(json_data)
    



def clean_up_sentence(sentence):
    # It Tokenize or Break it into the constituents parts of Sentense.
    sentence_words = nltk.word_tokenize(sentence)
    # Stemming means to find the root of the word.
    sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
    return sentence_words

# Return the Array of Bag of Words: True or False and 0 or 1 for each word of bag that exists in the Sentence
def bow(sentence, words, show_details=False):
    sentence_words = clean_up_sentence(sentence)
    bag = [0]*len(words)
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print ("found in bag: %s" % w)
    return(np.array(bag))

ERROR_THRESHOLD = 0.25
print("ERROR_THRESHOLD = 0.25")

def classify(sentence):
    # Prediction or To Get the Posibility or Probability from the Model
    results = model.predict([bow(sentence, words)])[0]
    # Exclude those results which are Below Threshold
    results = [[i,r] for i,r in enumerate(results) if r>ERROR_THRESHOLD]
    # Sorting is Done because heigher Confidence Answer comes first.
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append((classes[r[0]], r[1])) #Tuppl -> Intent and Probability
    return return_list


def response(sentence, userID='123', show_details=False):
    results = classify(sentence)
    # That Means if Classification is Done then Find the Matching Tag.
    if results:
        # Long Loop to get the Result.
        while results:
            for i in intents['intents']:
                # Tag Finding
                if i['tag'] == results[0][0]:
                    # Random Response from High Order Probabilities
                    print("this is random"+random.choice(i['responses']))
                    return str(random.choice(i['responses']))

            results.pop(0)    

@api.route('/api/response')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def my_response():
    return response("Thanks")

