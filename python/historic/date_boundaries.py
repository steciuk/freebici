import os
import pandas as pd
from tqdm import tqdm
import json
import click


@click.command()
@click.argument(
    "input_file", type=click.Path(exists=True, dir_okay=False, file_okay=True)
)
def validate(input_file):
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    earliest_date = None
    earliest_time = None
    latest_date = None
    latest_time = None
    for date in tqdm(data.keys()):
        if earliest_date is None:
            earliest_date = date
            for time in data[date].keys():
                if earliest_time is None:
                    earliest_time = time
                elif time < earliest_time:
                    earliest_time = time
        elif date < earliest_date:
            earliest_date = date
            earliest_time = None
            for time in data[date].keys():
                if earliest_time is None:
                    earliest_time = time
                elif time < earliest_time:
                    earliest_time = time

        if latest_date is None:
            latest_date = date
            for time in data[date].keys():
                if latest_time is None:
                    latest_time = time
                elif time > latest_time:
                    latest_time = time
        elif date > latest_date:
            latest_date = date
            latest_time = None
            for time in data[date].keys():
                if latest_time is None:
                    latest_time = time
                elif time > latest_time:
                    latest_time = time

    print("Earliest date: ", earliest_date)
    print("Earliest time: ", earliest_time)
    print("Latest date: ", latest_date)
    print("Latest time: ", latest_time)


if __name__ == "__main__":
    validate()
