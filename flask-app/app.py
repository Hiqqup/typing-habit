from flask import Flask, redirect,url_for, render_template, request
from flask_cors import CORS
import sqlite3
import json
import os



quoteDb = "quotes"
def fetchQuote():
    conn = sqlite3.connect(quoteDb+".db")
    cur = conn.cursor()
    cur.execute( "select * from {dbName} order by random()".format(dbName= quoteDb))
    row = cur.fetchone()
    return row


resultDb = "leaderboard"

def fetchLeaderboard():
    conn = sqlite3.connect(resultDb+".db")
    cur = conn.cursor()
    cur.execute( "select * from {dbName} order by wpm desc".format(dbName= resultDb))
    res = cur.fetchmany(10)
    return res

def submitResults(data):
    conn = sqlite3.connect(resultDb+".db")
    cursor = conn.cursor()
    #create table if not exists
    cursor.execute('''CREATE TABLE IF NOT EXISTS {dbName}(
                        user STRING,
                        wpm INTEGER,
                        UNIQUE(user, wpm)
                        );
                 '''.format(dbName = resultDb))
    #check wether data should be inserted
    cursor.execute( 'select * from {dbName} WHERE user ="{userName}";'.format(dbName= resultDb, userName = data['lbName']))
    wpmPersonalBest = None
    try:
        wpmPersonalBest = cursor.fetchone()[1]
    except:
        pass
    if (wpmPersonalBest == None or wpmPersonalBest < data['wpm']): 
        #delete old data
        sql = 'delete from {dbName} where user="{userName}"'.format(dbName = resultDb,  userName = data['lbName'])
        cursor.execute(sql)
        #insert new
        values = '("{user}", "{wpm}");'.format(user = data['lbName'], wpm = data['wpm'])
        sql = "INSERT OR IGNORE INTO {dbName} VALUES {values}".format(dbName = resultDb, values= values)
        cursor.execute(sql)
        conn.commit()

app = Flask(__name__)


CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/')
def index():
    return render_template("index.html")



@app.route('/getQuote', methods=['GET'])
def quote():
    quote = fetchQuote()
    return json.dumps({"quote": quote[0], "author": quote[1]})

@app.route('/getLeaderboard', methods=['GET'])
def leaderboard():
    res = fetchLeaderboard()
    return json.dumps(res)


@app.route('/submitResults', methods=['POST'])
def submit():
    submitResults( json.loads(request.data.decode('utf-8')))
    return json.dumps({"success": "success"})