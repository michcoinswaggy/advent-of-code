'use strict';

const lineReader = require('line-reader');

const cardinalPoint = ["E", "S", "W", "N"];

exports.getPartOne = (req, res, next) => {
    let shipFacing = "E";
    let positionX = 0;
    let positionY = 0;
    lineReader.eachLine('./inputs/day12/day12.txt', function(line, last) {
        let instruction = line.charAt(0);
        let units = parseInt(line.substring(1));

        if (instruction === "N" || (instruction === "F" && shipFacing === "N")) {
            positionY += units;
        } else if (instruction === "S" || (instruction === "F" && shipFacing === "S")) {
            positionY -= units;
        } else if (instruction === "E" || (instruction === "F" && shipFacing === "E")) {
            positionX += units;
        } else if (instruction === "W" || (instruction === "F" && shipFacing === "W")) {
            positionX -= units;
        } else if (instruction === "R" || instruction === "L") {
            shipFacing = rotate(shipFacing, instruction, units);
        }

        if (last) {
            let manhattanDistance = Math.abs(positionX) + Math.abs(positionY);
            return res.status(200).json({ message: manhattanDistance });
        }
    });
}


function rotate(actualFacing, turn, rotationDegree) {
    let indexOfNewCardinalPoint = null;
    if (turn === "R") {
        indexOfNewCardinalPoint = (cardinalPoint.indexOf(actualFacing) + (rotationDegree / 90)) % 4;
    } else {
        indexOfNewCardinalPoint = (cardinalPoint.indexOf(actualFacing) - (rotationDegree / 90)) % 4;
        if (indexOfNewCardinalPoint < 0) {
            indexOfNewCardinalPoint += 4;
        }
    }

    return cardinalPoint[indexOfNewCardinalPoint];
}


exports.getPartTwo = (req, res, next) => {
    lineReader.eachLine('./inputs/day12/day12.txt', function(line, last) {
        if (last) {
            return res.status(200).json({ message: "coucou" });
        }
    });
}
