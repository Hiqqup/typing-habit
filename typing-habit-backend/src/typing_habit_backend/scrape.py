from bs4 import BeautifulSoup
import requests
import sqlite3
import flask

def scrape():
    url = "https://wisdomquotes.com/atomic-habits-quotes/"
    
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "lxml")
    
    quotes = []
    
    for blockquote in soup.find_all("blockquote"):
        quoteString = str(blockquote.p.string)
        split = quoteString.rsplit(".", 1); #assuming quotes end with a .
        quotes.append(split[0] + ".")
    return quotes

def createDatabase(quotes):
    values = ""
    author = "James Clear"
    for quote in quotes:
        values+= '("{quote}","{author}"),'.format(quote=quote, author = author)
    values = values[:-1]
    values+= ';'
    
    dbName = "quotes"
    conn = sqlite3.connect(dbName+".db")
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS {dbName}(
                        quote STRING,
                        author STRING,
                        UNIQUE(quote, author)
                        );
                 '''.format(dbName = dbName))
    
    # Insert a row of data
    sql = "INSERT OR IGNORE INTO {dbName} VALUES {values}".format(dbName = dbName, values= values)
    cursor.execute(sql)
    conn.commit()
    conn.close()




def run():
    quotes = scrape()
    createDatabase(quotes)
    print("success")

