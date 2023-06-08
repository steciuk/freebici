import os
import pandas as pd
from tqdm import tqdm
import json
import click

@click.command()
@click.argument('input_path', type=click.Path(exists=True, dir_okay=True, file_okay=False))
@click.argument('output_file', type=click.Path(exists=True, dir_okay=False, file_okay=True))
def clean(input_path, output_file):
    cleaned = {}

    for file in tqdm(os.listdir(input_path)):
        if file.endswith('.csv'):
            df = pd.read_csv(os.path.join(input_path, file), sep=';')

            try:
                date_data = file.split('_')
                date = date_data[1].split('-')
                date = date[2] + '-' + date[1] + '-' + date[0]
                time = date_data[2].split('.')[0][:3]

                if not time.endswith('00'):
                    continue
 
                cleaned[date + '_' + time] = {}
                for row in df.iterrows():
                    row = row[1]

                    if 'number_' in row:
                        cleaned[date + '_' + time][row['number_']] = {
                            'open': row['open'],
                            'available': row['available'],
                            'total': row['total'],
                        }
                    else:
                        cleaned[date + '_' + time][row['Numero']] = {
                            'open': row['Activo'],
                            'available': row['Bicis_disponibles'],
                            'total': row['Espacios_totales'],
                        }
            except:
                print('Error with file: ' + file)

    keys = list(cleaned.keys())
    keys.sort()

    cleaned = {key: cleaned[key] for key in keys}

    with open(output_file, 'w') as f:
        json.dump(cleaned, f, indent=2)


if __name__ == '__main__':
    clean()