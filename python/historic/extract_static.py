import os
import pandas as pd
from tqdm import tqdm
import json
import click


@click.command()
@click.argument(
    "input_path", type=click.Path(exists=True, dir_okay=True, file_okay=False)
)
@click.argument("output_file", type=click.Path(dir_okay=False, file_okay=True))
def extract(input_path: str, output_file: str):
    extracted = {}

    for file in tqdm(os.listdir(input_path)):
        if file.endswith(".csv"):
            df = pd.read_csv(os.path.join(input_path, file), sep=";")

        try:
            for row in df.iterrows():
                row = row[1]

                if "number_" in row:
                    if row["number_"] not in extracted:
                        extracted[row["number_"]] = {
                            "address": row["address"],
                            "position": row["geo_point_2d"].split(","),
                        }
                else:
                    if row["Numero"] not in extracted:
                        extracted[row["Numero"]] = {
                            "address": row["Direccion"],
                            "position": row["geo_point_2d"].split(","),
                        }
        except:
            print("Error with file: " + file)

    print("Num stations: ", len(extracted.keys()))

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(extracted, f)


if __name__ == "__main__":
    extract()
