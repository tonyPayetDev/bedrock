
# coding: utf-8

from ast import Raise
import sys
import os
from PIL import Image

folder_path = str(sys.argv[1])
format = str(sys.argv[2])
os.makedirs(sys.argv[1]+"_optimize", exist_ok=True)

for path, dirs, files in os.walk(folder_path):
    for filename in files:
        try:
            print(filename.encode("utf-8"))
        except:
            print("An exception occurred")
        im = Image.open(folder_path+"/"+filename)
        filenamesplit = filename.split(".")

        im.save(sys.argv[1]+"_optimize/"+filenamesplit[0] +
                "."+format, format, optimize=True, quality=30)
