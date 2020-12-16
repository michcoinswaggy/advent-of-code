'use strict';

const lineReader = require('line-reader');

exports.getPartOne = (req, res, next) => {
    let adapters = [];
    let countDiffOneJolt = 0;
    let countDiffThreeJolt = 0;
    let chargingOutlet = 0;
    lineReader.eachLine('./inputs/day10/day10.txt', function(line, last) {
        adapters.push(parseInt(line));
        if (last) {
            adapters.sort((a, b) => a - b);

            for (let i = 0; i < adapters.length; i++) {
                if (adapters[i] - chargingOutlet === 1) {
                    countDiffOneJolt++;
                } else if (adapters[i] - chargingOutlet) {
                    countDiffThreeJolt++;
                }
                chargingOutlet = adapters[i];
            }

            countDiffThreeJolt++; // car le device built in est toujours 3 jolts supp que le max des adapters
            let result = countDiffOneJolt * countDiffThreeJolt
            return res.status(200).json({ message: result });
        }
    });
}


exports.getPartTwo = (req, res, next) => {
    lineReader.eachLine('./inputs/day10/day10.txt', function(line, last) {
        if (last) {
            return res.status(200).json({ message: "coucou10" });
        }
    });
}
