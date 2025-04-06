from bs4 import BeautifulSoup
import requests

userInput =  "soup"#input("What quote would you like?:");
url = "https://wisdomquotes.com/atomic-habits-quotes/";

page = requests.get(url)
soup = BeautifulSoup(page.text, "lxml");
#print(soup.prettify());

quotes = []

for blockquote in soup.find_all("blockquote"):
    quoteString = str(blockquote.p.string);
    split = quoteString.rsplit(".", 1); #assuming quotes end with a .
    quotes.append(split[0] + ".");

for quote in quotes:
    print(quote);


