import os
import requests
import json
import time
from tqdm import tqdm

DATA_ENDPOINT = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRI31S8kntucTwTSzaRAIdtxjw5FDo0QIoBGF6TN9JPUbMtn-Ve1XsrUwA_i_c4MWtCAGcyESr3XUgg/pub?gid=1528817214&single=true&output=csv'

resposta = requests.get(DATA_ENDPOINT)
dados = resposta.text

dados_parseados = [dado.split(',') for dado in dados.split('\r\n')[1:]]

erros = []
url = 'https://nominatim.openstreetmap.org/search'
for idx in tqdm(range(len(dados_parseados))):
    try:
        cidade = dados_parseados[idx][6].encode('latin1').decode('utf8')
        estado = dados_parseados[idx][3].encode('latin1').decode('utf8')

        tqdm.write("Cidade: {} e Estado: {}".format(cidade, estado))

        caminho = "{}?q={}+{}&format=json".format(url,
                                                  cidade.replace(' ', '+'), estado)
        tqdm.write('Caminho request: {}'.format(caminho))
        resposta = requests.get(caminho)
        tqdm.write('resposta: {}'.format(resposta.text))

        resposta = resposta.json()[0]

        lat, lon = resposta.get('lat'), resposta.get('lon')

        tqdm.write('lat {} | lon {}'.format(lat, lon))

        dados_parseados[idx][7] = lat
        dados_parseados[idx][8] = lon

        tqdm.write("Sleeping 1.5 secs")
        time.sleep(1.5)
    except Exception as erro:
        cidade = dados_parseados[idx][6]
        tqdm.write("Erro na cidade {}".format(cidade))
        erros.append((erro, dados_parseados[idx][6]))

with open('results.csv', 'w') as f:
    f.write('\n'.join([','.join(dados) for dados in dados_parseados]))
    print(dados_parseados)
