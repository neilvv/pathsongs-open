# Creating regional pmtiles files

## Methodology for world basemap

1. No need for pbf file, everything comes from shapefiles
2. Create world for zooms 1-14



## Methodology for regions
1. Pull pbf file and poly from geofabrik
2. Create regional basemap (coastlines, admin etc) from shp files
3. Create full detail map usig tilemaker and then merge using tilemaker to producce full regional map


Example:

```
tilemaker --output basemap-berlin-pso.mbtiles --bbox 13.082830,52.334460,13.762245,52.678300 --process process-coastline.lua --config config-coastline.json --store ./store --shard-stores

tilemaker --input ~/sata_maps/data/berlin-latest.osm.pbf --output basemap-berlin-pso.mbtiles --merge

```






### NB.

1. Need to remove basemap layers from detailed processing - i.e. oceans, glacier etc.
2. Need to validate approach for administrative boundaries.  MAybe ignore for now.


### TODO

1. Write scripts to streamline this process.






