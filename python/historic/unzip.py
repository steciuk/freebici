import shutil
import click
import os
from tqdm import tqdm

@click.command()
@click.argument('input_path', type=click.Path(exists=True, dir_okay=True, file_okay=False))
@click.argument('output_path', type=click.Path(exists=True, dir_okay=True, file_okay=False))
def unzip(input_path, output_path):
    """
    Unzips all files in input_path and puts them in output_path
    """
    for file in tqdm(os.listdir(input_path)):
        if file.endswith(".zip"):
            shutil.unpack_archive(os.path.join(input_path, file), output_path, "zip")


if __name__ == "__main__":
    unzip()
