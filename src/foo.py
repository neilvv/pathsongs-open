import os.path
import subprocess

planet_file = '/media/neil/sata/maps/data/planet-v1.40.osm.pbf'
poly_dir = './geofabrik'


## see if the file already exists



if os.path.exists(planet_file):
  print("File exists")
else:
  ## exec curl command to download file
  subprocess.run(['curl', '-o', planet_file, 'http://download.geofabrik.de/europe/great-britain-latest.osm.pbf'])


  

