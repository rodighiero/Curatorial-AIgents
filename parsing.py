import os
from html.parser import HTMLParser
import csv


# define data
basepath = "htmls/"
dir = os.listdir(basepath)
length = len(dir)
# data = numpy.asarray([[0, 0, 0]])
data = []
count = 0


class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        if (tag == "div") & (len(attrs) == 7):
            if attrs[4][0] == "data-initial-image-href":
                data[count][0] = count
                data[count][1] = attrs[5][1]
                data[count][2] = (
                    "https://ids.lib.harvard.edu/ids/view/"
                    + attrs[5][1]
                    + "?height=500&width=500"
                )
        # if (tag == "div") 


parser = MyHTMLParser()

for entry in dir:
    data.append([0, 0, 0])
    path = os.path.join(basepath, entry)
    file = open(path, "r")
    html = file.read()
    parser.feed(html)
    count += 1

with open("data.csv", "w+") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=",")
    csvWriter.writerows(data)
