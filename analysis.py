# Libraries

import pandas as pd
import numpy as np
import spacy
import sys

# Variables

nlp = spacy.load('en_core_web_lg')

# HAM Data

objects = pd.read_csv('Data/Object-2020-03-06.csv',
                      usecols=['ObjectID', 'Title'])
objects.columns = ['id', 'title']

text = pd.read_csv('Data/Object-Contextual-Text-2020-03-06.csv',
                   usecols=['ObjectID', 'Text'])
text.columns = ['id', 'text']

data = pd.merge(objects, text, on='id', how='inner')

# Reduction for testing purposes
random = data.sample(frac=.995)  # .99 corresponds to 14 rows
data = data.drop(random.index)

print(data)
print('Number of objects after creation:', data.shape[0])

# sys.exit()

# Tokens

array = []

for i, row in data.iterrows():
    value = nlp(row['title'] + ' ' + row['text'])
    array.append(value)

nlp = pd.DataFrame({'nlp': array})
print(nlp)
print('nlp rows', nlp.shape[0])

data = pd.DataFrame(np.hstack([data,nlp]))
data.columns = ['id', 'title', 'text', 'nlp']

# Cleaning

del data['text']
del data['title']
data['key'] = 'key'

print(data)
print('Number of objects after tokenization:', data.shape[0])

# sys.exit()

# Pairs

relations = pd.merge(data, data, on='key')
del relations['key']
relations = relations.loc[(relations.id_x < relations.id_y)]

print(relations)

sys.exit()

# Similarity

array = []

for i, row in relations.head(10).iterrows():
    # print(row['nlp_x'])
    # print(row['nlp_y'])
    value = row['nlp_x'].similarity(row['nlp_y'])
    array.append(value)
    print(i)

similarity = pd.DataFrame({'similarity': array})

relations = pd.concat([relations, similarity], axis=1)

print(relations.head(10))
# Computation


# >>> from itertools import product
# >>> pd.DataFrame(list(product(l1, l2)), columns=['l1', 'l2'])

# print(relations.dtypes)

# array = []

# for i, row in data.head(10).iterrows():
#     result = nlp(row['Title'] + ' ' + row['Text'])
#     array.append(result)
#     print(i)


# Filter
# relations = relations.filter(items=['doi', 'isni_x', 'isni_y'])
# relations.columns = ['doi', 'source', 'target']


# records = []  # element collector
# similarities = [] # similarity collector
# limit = 15000

# Tokenization

# merge.iterrows()

#     count -= 1
#     if i == limit:  # Limit check
#         break
#     records.append([i, record['text'], nlp(record['text'])])
#     print('Recording', f'{count:,}')


# # Similarity

# count = len(records) ** 2
# for i1, r1 in enumerate(records):
#     array = []
#     for i2, r2 in enumerate(records):

#         count -= 1
#         if i1 <= i2:
#             continue  # Skip

#         similarity = r1[2].similarity(r2[2])  # Computation
#         round = int(similarity*255) # scale to 255
#         array.append(round)
#         print('Comparing', f'#{count:,}', round)

#     similarities.append(array)


# # Writing files

# print('Files writing...')
# flatten = list(chain.from_iterable(similarities))
# nArray = numpy.array(flatten, dtype=numpy.uint8)
# # numpy.savetxt("links.csv", nArray)
# numpy.save("links.npy", nArray)


# import json
# import os
# from itertools import chain

# import sys

# if not sys.warnoptions:
#     import warnings
#     warnings.simplefilter("ignore")

# spacy.prefer_gpu()
# os.system('clear')

# with open('data/docs.json', 'r') as json_file:
#     data = json.load(json_file)['docs']  # Read file
