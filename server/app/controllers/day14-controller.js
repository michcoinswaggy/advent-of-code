'use strict';

const lineReader = require('line-reader');

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function bin2int(bin) {
    return parseInt(bin, 2);
}

function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

exports.getPartOne = (req, res, next) => {
    let mask = null;
    let memory = {};
    lineReader.eachLine('./inputs/day14/day14.txt', function(line, last) {
        let infos = line.split(" = ");

        if (infos[0] === 'mask') {
            mask = infos[1];
        } else {
            let address = infos[0].substring(4, infos[0].length - 1);
            let value = parseInt(infos[1]);

            value = getMask(mask, value, "X");
            memory[address] = value;
        }

        if (last) {
            let sum = 0;
            for (const [key, value] of Object.entries(memory)) {
                sum += bin2int(value);
            }

            // 8471403462063
            return res.status(200).json({ message: sum });
        }
    });

}

function getMask(mask, value, charToSkip) {
    value = dec2bin(value);
    let missingZeros = new Array(36 - value.length + 1).join("0");
    let maskToChange = missingZeros + value;

    for (let i = 0; i < mask.length; i++) {
        let maskBit = mask.charAt(i);
        if (maskBit === charToSkip) {
            continue;
        }

        maskToChange = replaceAt(maskToChange, i, maskBit);
    }

    return maskToChange;
}


exports.getPartTwo = (req, res, next) => {
    let mask = null;
    let memory = {};
    lineReader.eachLine('./inputs/day14/day14.txt', function(line, last) {
        let infos = line.split(" = ");

        if (infos[0] === 'mask') {
            mask = infos[1];
        } else {
            let address = infos[0].substring(4, infos[0].length - 1);
            let value = parseInt(infos[1]);

            let bitmask = getMask(mask, address, "0");
            let arrayOfBitMask = getPossibleBitMasks(bitmask, []);
            for (let i = 0; i < arrayOfBitMask.length; i++) {
                memory[bin2int(arrayOfBitMask[i])] = value;
            }
        }

        if (last) {
            let sum = 0;
            for (const [key, value] of Object.entries(memory)) {
                sum += value;
            }

            // 2667858637669
            return res.status(200).json({ message: sum });
        }
    });
}

function getPossibleBitMasks(mask, myArray) {
    let mask0 = replaceAt(mask, mask.indexOf("X"), "0");
    let mask1 = replaceAt(mask, mask.indexOf("X"), "1");

    if (mask0.includes("X")) {
        myArray.slice(getPossibleBitMasks(mask0, myArray));
        myArray.slice(getPossibleBitMasks(mask1, myArray));
    } else {
        myArray.push(mask0);
        myArray.push(mask1);
    }

    return myArray;
}
