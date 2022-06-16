from pyexpat import model
from flask import Flask, render_template, request
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pickle

app = Flask(__name__, template_folder='template')

def load_model():
    with open('model_regressor.pkl', 'rb') as file:
        data = pickle.load(file)
    return data

model = load_model()

@app.route('/')
def index():
    
    return render_template('index.html')

#for prediksi
@app.route('/prediksi')
def prediksi():
    return render_template('prediksi.html')

@app.route('/prediksi/predict', methods=['POST'])
def predict():
    
    Year = float(request.form['Year'])
    Month = float(request.form['Month'])
    Day = float(request.form['Day'])
    Hour = float(request.form['Hour'])
    
    x = np.array([[Year, Month, Day, Hour]])
    
    prediction = model.predict(x)
    output = prediction
    
    if output >= 0.934:
        output = "Pasang"
    else:
        output = "Surut"
    
    return render_template('prediksi.html', hasil = output)

#sub agenda
@app.route('/wisata')
def wisata():
    return render_template('wisata/wisata.html')

@app.route('/wisata/gak')
def gak():
    return render_template('wisata/Pariwisata-GAK.html')

@app.route('/wisata/snorkeling')
def snorkeling():
    return render_template('wisata/Pariwisata-Snorkeling.html')

@app.route('/wisata/umang_umang')
def umang_umang():
    return render_template('wisata/Pariwisata-Umang Umang.html')


@app.route('/tentang')
def tentang():
    return render_template('tentang/tentang.html')

@app.route('/about_sebesi')
def about_sebesi():
    return render_template('tentang/about_sebesi.html')

if __name__ == '__main__':
    app.run(debug = True)
