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
    return render_template("landing.html")


#Connect and Load data from csv into db:
from sqlalchemy import create_engine, ForeignKey
from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.ext.declarative import declarative_base
engine = create_engine('sqlite:///db/Hurricane.sqlite', echo=False)
con = engine.connect()
con.execute('''CREATE TABLE IF NOT EXISTS Hurricanes(
                ID integer not null primary key, 
                Name Varchar (100),
                Time integer not null,
                Event Varchar (100),
                Status Varchar (100),
                Latitude integer not null,
                Longitude integer not null,
                Wind integer not null,
                Pressure integer not null,
                ISODate Varchar (100),
                Location Varchar (100)
                )''')
csv_df = pd.read_csv('db/hurdat.csv', index_col=0)
csv_df.to_sql('Hurricanes', engine, if_exists='replace', index=True, index_label="id")

# returns a list of all events with start date, end date and max wind speed
from getFromDb import getEvents
@app.route("/events")
def events():
    allEvents = getEvents(engine)
    print(allEvents)
    return render_template("timeline.html", events=jsonify(allEvents))

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


