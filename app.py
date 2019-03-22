import os
import json

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, desc

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

df = pd.read_csv('db/hurdat.csv')

#----------------------------------------------
# Return the homepage.

@app.route("/")
def home():
#    return '<h1> App started ... </h1>'
    return render_template("home.html")

#----------------------------------------------
# Return the heatmap page.

@app.route("/heatmap")
def heatmap():
#    return '<h1> App started ... </h1>'
    return render_template("heatmap.html")

#----------------------------------------------
# Return data points for East Pacific 

@app.route("/epdata")
def epdata():

    dftmp = df[df['Location']=='East Pacific']

    pts = {'points':[]}

    for i in range(0,dftmp.shape[0]) :
        pts['points'].append([dftmp.iloc[i]['Latitude'],dftmp.iloc[i]['Longitude']])

    return jsonify(pts)

#----------------------------------------------
# Return data points for Central Pacific 

@app.route("/cpdata")
def cpdata():
    
    dftmp = df[df['Location']=='Central Pacific']

    pts = {'points':[]}

    for i in range(0,dftmp.shape[0]) :
        pts['points'].append([dftmp.iloc[i]['Latitude'],dftmp.iloc[i]['Longitude']])

    return jsonify(pts)

#----------------------------------------------
# Return data points for Atlantic 

@app.route("/aldata")
def aldata():
    
    dftmp = df[df['Location']=='Atlantic']

    pts = {'points':[]}

    for i in range(0,dftmp.shape[0]) :
        pts['points'].append([dftmp.iloc[i]['Latitude'],dftmp.iloc[i]['Longitude']])

    return jsonify(pts)

if __name__ == "__main__":
    app.run(debug=True)


