import fs from "fs";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

// given an x y z tile, we want to find the lat lon of the centre point
// then given a collection of polgons find the ones that contain the point

function tile2latlon(x, y, z) {
    let n = 2.0 ** z;
    let lon = x / n * 360.0 - 180.0;
    let lat = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n)));
    lat = (lat * 180.0) / Math.PI;
    return { lat, lon };
}


let [z, x, y] = process.argv.slice(2).map(Number);

console.log("x, y, z", x, y, z);
console.log("y", y);

let latlon = tile2latlon(x, y, z);

let point = {
    type: 'Point',
    coordinates: [latlon.lon, latlon.lat],
};

console.log("point", point);

console.time("load file");
let file = fs.readFileSync(process.argv[5], 'utf8');

let all_collections = JSON.parse(file);
console.timeEnd("load file");
let results = [];
console.time("point in polygon");

// file is in format of a feature collection of feature collections of polygons
// all features will indicate the parent collection in the properties

console.log("all_collections", all_collections.features.length);
for (let featureCollection of all_collections.features) {
    for (let feature of featureCollection.features) {
    if (booleanPointInPolygon(point, feature)) {
        results.push(feature.properties.parent);
    }
}
}
console.timeEnd("point in polygon");

console.log(results.join('\n'));