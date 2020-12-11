'use strict';

const lineReader = require('line-reader');

exports.getPartOne = (req, res, next) => {
    let row = null;
    let col = null;
    let maxSeatId = 0;

    lineReader.eachLine('./inputs/day5/day5.txt', function(line, last) {
        row = getRowFromLine(line);
        col = getColFromLine(line);

        let seatId = row * 8 + col;
        if (seatId > maxSeatId) {
            maxSeatId = seatId;
        }
        if (last) {
            res.status(200).json({ message: maxSeatId });
        }
    });
}

exports.getPartTwo = (req, res, next) => {
    let row = null;
    let col = null;
    let seatIds = [];
    lineReader.eachLine('./inputs/day5/day5.txt', function(line, last) {
        row = getRowFromLine(line);
        col = getColFromLine(line);

        let seatId = row * 8 + col;
        seatIds.push(seatId);
        if (last) {
            seatIds.sort((a, b) => a - b);
            for (let i = 0; i < seatIds.length; i++) {
                if (!seatIds.includes(seatIds[i]+1)) {
                    return res.status(200).json({ message: seatIds[i]+1 });
                }
            }
        }
    });
}

function findPlaceFromInstructions(instructions, minBorder, maxBorder, lowerChar) {
    for (let i = 0; i < instructions.length ; i++) {
        let char = instructions.charAt(i);
        let newBorder = (minBorder + maxBorder) / 2;
        if (char === lowerChar) {
            maxBorder = Math.floor(newBorder);
        } else {
            minBorder = Math.ceil(newBorder);
        }
    }

    return maxBorder;
}

function getRowFromLine(line) {
    return findPlaceFromInstructions(line.substring(0, 7), 0, 127, "F");
}


function getColFromLine(line) {
    return findPlaceFromInstructions(line.substring(7), 0, 7, "L");
}
