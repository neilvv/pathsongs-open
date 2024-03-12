#!/bin/bash

directory="./geofabrik"
if [ ! -d "$directory" ]; then
	echo "./geofabrik directory does not exist"
	exit 1
fi

for file in "$directory"/*.poly; do
	if [ -f "$file" ]; then
		echo "processing $file to ${file%.poly}.geojson"
		node src/poly2geojson.js "$file"  > "${file%.poly}.geojson"
	fi
done



#node src/poly2geojson.js geofabrik/africa.poly > geofabrik/africa.geojson
#node src/poly2geojson.js geofabrik/antarctica.poly > geofabrik/antarctica.geojson
#node src/poly2geojson.js geofabrik/asia.poly > geofabrik/asia.geojson
#node src/poly2geojson.js geofabrik/australia-oceania.poly > geofabrik/australia-oceania.geojson
#node src/poly2geojson.js geofabrik/central-america.poly > geofabrik/central-america.geojson
#node src/poly2geojson.js geofabrik/europe.poly > geofabrik/europe.geojson
#node src/poly2geojson.js geofabrik/north-america.poly > geofabrik/north-america.geojson
#node src/poly2geojson.js geofabrik/south-america.poly > geofabrik/south-america.geojson

echo "combining files into > geofabrik/regions.json"
node src/combine-geojson.js geofabrik/*.geojson > geofabrik/regions.json
