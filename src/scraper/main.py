from bs4 import BeautifulSoup
import requests
import sqlite3

url = "https://wisdomquotes.com/atomic-habits-quotes/"

page = requests.get(url)
soup = BeautifulSoup(page.text, "lxml")

quotes = []

for blockquote in soup.find_all("blockquote"):
    quoteString = str(blockquote.p.string)
    split = quoteString.rsplit(".", 1); #assuming quotes end with a .
    quotes.append(split[0] + ".")
values = ""
author = "James Clear"
for quote in quotes:
    values+= "({quote},{author}),".format(quote=quote, author = author)

dbName = "quotes"
conn = sqlite3.connect(dbName+".db")
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS {dbName}
             (quote, autor)'''.format(dbName = dbName))

# Insert a row of data
cursor.execute("INSERT INTO {dbName} VALUES {values}".format(dbName = dbName, values= values))
conn.commit()
conn.close()