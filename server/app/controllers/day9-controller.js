'use strict';

const lineReader = require('line-reader');
const preamble = 25;

exports.getPartOne = (req, res, next) => {
    let data = [];
    lineReader.eachLine('./inputs/day9/day9.txt', function(line, last) {
        data.push(line);
        if (last) {
            for (let index = preamble; index < data.length; index++) {
                if (!checkNumberIsOk(data, index)) {
                    return res.status(200).json({ message: data[index] });
                }
            }
            return res.status(400).json({ message: "error" });
        }
    });
}



exports.getPartTwo = (req, res, next) => {
    let data = [];
    lineReader.eachLine('./inputs/day9/day9.txt', function(line, last) {
        data.push(parseInt(line));
        if (last) {
            let xmasError = null;
            for (let index = preamble; index < data.length; index++) {
                if (!checkNumberIsOk(data, index)) {
                    xmasError = data[index];
                    let weakness = findEncryptionWeakness(xmasError, data, index);
                    return res.status(200).json({ message: weakness });
                }
            }
            return res.status(400).json({ message: "error" });
        }
    });
}

function findEncryptionWeakness(xmasError, data, index) {
    for (let i = 0; i < index - 1; i++) {

        let min = data[i];
        let max = data[i];
        let sum = data[i];

        for (let j = i + 1; j < index; j++) {
            sum += data[j];
            if (sum === xmasError) {
                return min + max;
            }

            if (sum > xmasError) {
                break;
            }

            if (data[j] > max) {
                max = data[j];
            } else if (data[j] < min) {
                min = data[j]
            }
        }
    }
}


function checkNumberIsOk(data, index) {
    let valueToFind = parseInt(data[index]);
    for (let i = index - preamble; i < index; i++) {
        for (let j = index - preamble - 1; j < index; j++) {
            if (data[i] !== data[j]) {
                let sum = parseInt(data[i]) + parseInt(data[j]);
                if (sum === valueToFind) {
                    return true;
                }
            }
        }
    }
    return false;
}
