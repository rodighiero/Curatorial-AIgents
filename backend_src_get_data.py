import json

import certifi
import pandas as pd
import urllib3
from tqdm import trange

from api_key import ham_api_key
from settings import DATA_PATH


def save_data():
    http = urllib3.PoolManager(
        cert_reqs='CERT_REQUIRED',
        ca_certs=certifi.where())

    features_list = ['objectid', 'objectnumber', 'accessionyear', 'dated', 'datebegin', 'dateend', 'classification',
                     'classificationid', 'technique', 'techniqueid', 'century', 'culture', 'department', 'imagecount',
                     'mediacount', 'peoplecount', 'titlescount', 'publicationcount', 'exhibitioncount', 'relatedcount',
                     'colorcount', 'markscount', 'contextualtextcount', 'totalpageviews', 'totaluniquepageviews',
                     'verificationlevel', 'accessionmethod', 'rank', 'primaryimageurl', 'title']

    page_req = http.request('GET', 'https://api.harvardartmuseums.org/object',
                            fields={
                                'apikey': ham_api_key,
                                'size': 100,
                                'classification': 23,
                                'hasimage': 1,
                            })

    page_parsed_data = json.loads(page_req.data)
    data = page_parsed_data['info']['next']

    num_pages = page_parsed_data['info']['pages']

    df = pd.DataFrame()

    for i in trange(1, num_pages + 1):
        for val in page_parsed_data['records']:
            object_req = http.request('GET', 'https://api.harvardartmuseums.org/object/{}'.format(val['id']),
                                      fields={
                                          'apikey': ham_api_key
                                      })
            object_parsed_data = json.loads(object_req.data)
            if object_parsed_data['verificationlevel'] in [2, 3, 4] and object_parsed_data['imagepermissionlevel'] == 0:
                object_data_to_append = {item: object_parsed_data[item] for item in features_list}
                df = df.append(object_data_to_append, ignore_index=True)

        page_req = http.request('GET', data)
        page_parsed_data = json.loads(page_req.data)

        if i < num_pages - 1:
            data = page_parsed_data['info']['next']

    df.to_csv(DATA_PATH + 'metadata-large.csv', index=False)


if __name__ == '__main__':
    save_data()
