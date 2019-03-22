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

#----------------------------------------------
# Return the homepage.

@app.route("/")
def home():
#    return '<h1> App started ... </h1>'
    return render_template("home.html")



# returns a list of all events with start datem, end date and max wind speed
from getFromDb import getEvents
@app.route("/events")
def events():
    allEvents = getEvents()
    return jsonify(allEvents)

if __name__ == "__main__":
    app.run(debug=True)
