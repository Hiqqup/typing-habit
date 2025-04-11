from flask import Flask, redirect,url_for, render_template
from flask_cors import CORS
import sqlite3
import json
import os


dbName = "quotes"
def fetchQuote():
    conn = sqlite3.connect(dbName+".db")
    cur = conn.cursor()
    cur.execute( "select * from {dbName} order by random()".format(dbName= dbName))
    row = cur.fetchone()
    return row

app = Flask(__name__)


CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/')
def index():
    return render_template("index.html")



@app.route('/ping')
def quote():
    quote = fetchQuote()
    return json.dumps({"quote": quote[0], "author": quote[1]})

