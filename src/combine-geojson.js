// combine all geojson files into one file with an array of feature collections

import fs from 'fs';

let files = process.argv.slice(2);

let collections = [];

for (let file of files) {
    let data
    try {
        data = fs.readFileSync(file, 'utf8');
    } catch (e) {
        console.error("Error reading file", file, e);
        continue;
    }
    let collection = JSON.parse(data);
    collections.push(collection);
}

let combined = {
    type: 'FeatureCollection',
    features: [],
};

for (let collection of collections) {
    combined.features.push(collection);
}

console.log(JSON.stringify(combined, null, 2));