import os
from html.parser import HTMLParser


class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        print("Encountered a start tag:", tag)

    def handle_endtag(self, tag):
        print("Encountered an end tag :", tag)

    def handle_data(self, data):
        print("Encountered some data  :", data)


parser = MyHTMLParser()

# List all files in a directory using os.listdir
basepath = "urls/"
for entry in os.listdir(basepath):
    path = os.path.join(basepath, entry)
    file = open(path,'r')
    # if os.path.isfile():
    parser.feed(file)
