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
