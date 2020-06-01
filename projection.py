import networkx as nx
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

relations = pd.read_csv('relations.csv')

G=nx.from_pandas_edgelist(relations, 'id_1', 'id_2',  ['similarity'])
pos = nx.spring_layout(G)
nx.draw(G, pos, with_labels=False, node_size=2000)
# publications = [i['similarity']*2 for i in dict(G.edges).values()]
# nx.draw_networkx_edge_labels(G, pos, width=publications, font_color='red')
# plt.show()
plt.savefig('HAM.png')