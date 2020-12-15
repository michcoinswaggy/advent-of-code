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
                [hasChanged, grid] = getNewGrid(grid, false);
            }
            let finalOccupiedSeats = countOccupiedSeats(grid); // 2319
            return res.status(200).json({ message: finalOccupiedSeats });
        }
    });
}

function getNewGrid(grid, isPartTwo) {
    let newGrid = [];
    let hasChanged = false;
    let minOccupiedSeatToSwitchToEmpty = isPartTwo ? 5 : 4;
    for (let i = 0; i < grid.length ; i++) {
        let line = grid[i];
        let newLine = grid[i];
        for (let j = 0; j < line.length; j++) {
            let position = line.charAt(j);
            if (position === ".") {
                continue;
            }

            if (position === "L") {
                if (countAdjacentType(grid, i, j, "#", isPartTwo) === 0) {
                    newLine = replaceAt(newLine, j, "#");
                    hasChanged = true;
                }
            } else if (position === "#") {
                if (countAdjacentType(grid, i, j, "#", isPartTwo)  >= minOccupiedSeatToSwitchToEmpty) {
                    newLine = replaceAt(newLine, j, "L");
                    hasChanged = true;
                }
            }
        }
        newGrid.push(newLine);
    }

    return [hasChanged, newGrid];
}


function countAdjacentType(grid, originX, originY, type, isPartTwo) {
    let countAdjacentType = 0;

    countAdjacentType += getAdjacentSeat(grid, isPartTwo, originX, originY, originX - 1, originY - 1) === type ? 1 : 0;
    countAdjacentType += getAdjacentSeat(grid, isPartTwo, originX, originY, originX - 1, originY) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, isPartTwo, originX, originY, originX - 1, originY + 1) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, isPartTwo, originX, originY, originX, originY - 1) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, isPartTwo, originX, originY, originX, originY + 1) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, isPartTwo, originX, originY, originX + 1, originY - 1) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, isPartTwo, originX, originY, originX + 1, originY) === type ? 1: 0;
    countAdjacentType += getAdjacentSeat(grid, isPartTwo, originX, originY, originX + 1, originY + 1) === type ? 1: 0;

    return countAdjacentType;
}


function getAdjacentSeat(grid, isPartTwo, originX, originY, indexX, indexY) {
    if (indexX < 0 || indexX > grid.length - 1 || indexY < 0 || indexY > grid[originX].length) {
        return false;
    }

    let adjacentSeat = grid[indexX].charAt(indexY);
    if (!isPartTwo) {
        return adjacentSeat;
    }

    // Seulement pour la partie 2
    if (adjacentSeat === ".") {
        if (indexX < originX) {
            indexX--;
        } else if (indexX > originX) {
            indexX++;
        }

        if (indexY < originY) {
            indexY--;
        } else if (indexY > originY) {
            indexY++;
        }

        return getAdjacentSeat(grid, isPartTwo, originX, originY, indexX, indexY);
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
    let grid = []
    lineReader.eachLine('./inputs/day11/day11.txt', function(line, last) {
        grid.push(line);
        if (last) {
            let hasChanged = true;
            while (hasChanged) {
                [hasChanged, grid] = getNewGrid(grid, true);
            }
            let finalOccupiedSeats = countOccupiedSeats(grid); // 2117
            return res.status(200).json({ message: finalOccupiedSeats });
        }
    });
}
