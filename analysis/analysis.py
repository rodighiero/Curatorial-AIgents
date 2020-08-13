# Libraries and Variables

import pandas as pd
import numpy
import spacy
import sys

nlp = spacy.load("en_core_web_lg")

# HAM Data

objects = pd.read_csv("Data/Object-2020-03-06.csv", usecols=["ObjectID", "Title"])
text = pd.read_csv(
    "Data/Object-Contextual-Text-2020-03-06.csv", usecols=["ObjectID", "Text"]
)

objects.columns = ["id", "title"]
text.columns = ["id", "text"]

data = pd.merge(objects, text, on="id", how="inner")

# Reduction for testing / .995 corresponds to 7 rows
# random = data.sample(frac=.8)
# data = data.drop(random.index)

# Tokens

array = []

for i, row in data.iterrows():
    value = nlp(row["title"] + " " + row["text"])
    array.append(value)

dataFrame = pd.DataFrame({"nlp": array})
data = pd.DataFrame(numpy.hstack([data, dataFrame]))
data.columns = ["id", "title", "text", "nlp"]

# Cleaning

del data["text"]
del data["title"]
data["key"] = "key"

# Pairs

relations = pd.merge(data, data, on="key")
del relations["key"]
relations = relations.loc[(relations.id_x < relations.id_y)]

# Similarity

array = []

for i, row in relations.iterrows():
    value = row["nlp_x"].similarity(row["nlp_y"])
    array.append(value)

dataFrame = pd.DataFrame({"similarity": array})
relations = pd.DataFrame(numpy.hstack([relations, dataFrame]))
relations.columns = ["id_1", "nlp_1", "id_2", "nlp_2", "similarity"]
del relations["nlp_1"]
del relations["nlp_2"]

print(relations)

relations.to_csv("relations.csv")

