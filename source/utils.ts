import csv from 'csv-parser';
import fs from 'fs';

import { EventToMatched } from './types'

const getEvents = () => {

    return new Promise<EventToMatched[]>((resolve, reject) => {

        const results: EventToMatched[] = [];
        fs.createReadStream('public/events.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', function () {
                resolve(results);
            })
    });
}

export default { getEvents }