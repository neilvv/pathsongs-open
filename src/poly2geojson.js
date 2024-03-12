//import type { Feature, Polygon} from 'geojson';
import { Cipher } from 'crypto';
import fs from 'fs';
import bbox from '@turf/bbox';

/* 
read the poly file given as the first argument
first line of the file is the name of the collection
subsequent polygons are separated by a line containing only the word "END"
each polygon is a list of points, each point is a pair of numbers separated by a space
the last point is the same as the first point
the last polygon is followed by a line containing only the word "END"
the last line of the file is the word "END"
the output is a GeoJSON FeatureCollection with a Feature for each polygon
each Feature has a Polygon geometry and a properties object with a name property
the name property is the name of the collection
*/

const file = fs.readFileSync(process.argv[2], 'utf8');

const lines = file.split('\n');

const collectionName = lines[0];

let polygons = [];

let polygon = [];

let state = 'entering';

let polygon_name = '';

let featureCollection = {
    type: 'FeatureCollection',
    features: [],
    properties: {
        name: collectionName,
    },
    };


for (let line of lines.slice(1)) {
  //console.log("Got a line ", line, state);
  if (line === 'END' && state === 'entering') {
    //console.log("Got the end of the file");
    break;
  } else if (state === 'entering') {
    state = 'processing';
    polygon = [];
    polygon_name = line;
    //console.log("Got a polygon ", polygon_name);
    
  } else if (state === 'processing' && line.trim() === 'END') {
    //console.log("Got the end of the polygon");
    if (polygon.length > 0) {
        let poly = {
            type: 'Feature',
            properties: {
            name: polygon_name,
            parent: collectionName,
            },
            geometry: {
            type: 'Polygon',
            coordinates: [polygon],
            },
        };
      // add the bbox to the polygon to help with filtering later
      poly.bbox = bbox(poly);
      featureCollection.features.push(poly);
      polygon = [];
    }
    state = 'entering';
  } else {
    //console.log("Got a line of coords ", line.trim());
    let [x, y] = line.trim().split(/[\s]+/).map(Number);
    //console.log("Got a point ", x, y);
    polygon.push([x, y]);
  }
}



console.log(JSON.stringify(featureCollection));




