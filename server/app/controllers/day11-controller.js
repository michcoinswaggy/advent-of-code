'use strict';

const lineReader = require('line-reader');

function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

exports.getPartOne = (req, res, next) => {
    let grid = []
    lineReader.eachLine('./inputs/day11/day11.txt', function(line, last) {
        grid.push(line);
        if (last) {
            let hasChanged = true;
            while (hasChanged) {
                [hasChanged, grid] = getNewGrid(grid);
            }
            let finalOccupiedSeats = countOccupiedSeats(grid);
            return res.status(200).json({ message: finalOccupiedSeats });
        }
    });
}

function getNewGrid(grid) {
    let newGrid = [];
    let hasChanged = false;
    for (let i = 0; i < grid.length ; i++) {
        let line = grid[i];
        let newLine = grid[i];
        for (let j = 0; j < line.length; j++) {
            let position = line.charAt(j);
            if (position === ".") {
                continue;
            }

            if (position === "L") {
                if (countAdjacentType(grid, i, j, "#") === 0) {
                    newLine = replaceAt(newLine, j, "#");
                    hasChanged = true;
                }
            } else if (position === "#") {
                if (countAdjacentType(grid, i, j, "#")  >= 4) {
                    newLine = replaceAt(newLine, j, "L");
                    hasChanged = true;
                }
            }
        }
        newGrid.push(newLine);
    }

    return [hasChanged, newGrid];
}


function countAdjacentType(grid, originX, originY, type) {
    let countAdjacentType = 0;

    countAdjacentType += getAdjacentSeat(grid, originX, originY, originX - 1, originY - 1) === type ? 1 : 0;
    countAdjacentType += getAdjacentSeat(grid, originX, originY, originX - 1, originY) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, originX, originY, originX - 1, originY + 1) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, originX, originY, originX, originY - 1) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, originX, originY, originX, originY + 1) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, originX, originY, originX + 1, originY - 1) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, originX, originY, originX + 1, originY) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, originX, originY, originX + 1, originY + 1) === type ? 1: 0;

    return countAdjacentType;
}


function getAdjacentSeat(grid, originX, originY, indexX, indexY) {
    if (indexX < 0 || indexX > grid.length - 1 || indexY < 0 || indexY > grid[originX].length) {
        return false;
    }

    return grid[indexX].charAt(indexY);
}

function countOccupiedSeats(grid) {
    let occupiedSeats = 0;
    for (let i = 0; i < grid.length; i++) {
        let numberOccupiedSeatOfLine = grid[i].match(new RegExp('#', "g"));
        if (numberOccupiedSeatOfLine === null) {
            continue;
        }
        occupiedSeats += numberOccupiedSeatOfLine.length;
    }
    return occupiedSeats;
}

exports.getPartTwo = (req, res, next) => {
    let grid = [];
    lineReader.eachLine('./inputs/day11/day11.txt', function(line, last) {
        grid.push(line);
        if (last) {
            return res.status(200).json({ message: "coucou11" });
        }
    });
}
