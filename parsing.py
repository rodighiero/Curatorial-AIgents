import os
from bs4 import BeautifulSoup
import csv

# Variables
basepath = "htmls/"
dir = os.listdir(basepath)
length = len(dir)
data = []
count = 0

with open("data.csv", "w+") as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=",")
    for entry in dir:

        count += 1
        print(count)

        # Limit
        # if count == 2:
        #     break

        

        # Settings
        path = os.path.join(basepath, entry)
        file = open(path, "r")
        html = file.read()
        soup = BeautifulSoup(html, "html.parser")

        # object
        meta = soup.find("meta", property="og:url")
        if meta == None:
            continue
        url = meta["content"]
        object = url[len(url.rstrip("0123456789")) :]

        # IIIF
        id = soup.find_all("div", "osd")
        if len(id) == 0:
            continue
        else:
            id = id[0]['id'].split("_", 1)[1]

        # URL
        # div = soup.find_all("div", "osd")
        # if len(div) == 0:
        #     url = ""
        # else:
        #     url = div[0]["data-initial-image-href"].split("?", 1)[0] + "?height=500&width=500" + '&apikey=cf26e390-3f74-11ea-bcd7-11dad6a174b9'
        url = 'https://ids.lib.harvard.edu/ids/view/' + id + '?width=500&height=500'

        # Title
        title = soup.find_all("span", "popup__artwork-info-title")[0].contents[0]

        # Dimension
        dimension = soup.find_all("dt", string="Dimensions")
        if len(dimension) == 0:
            dimension = ""
        else:
            dimension = dimension[0].find_next().contents[0]
        
        # Writing
        row = [object, id, url, title, dimension]

        
        csvWriter.writerow(row)