'use strict';

const lineReader = require('line-reader');

exports.getDayThreePartOne = (req, res, next) => {
    let position = 0;
    let isFirstLine = true;
    let numberOfTrees = 0;
    let lengthOfLine = 0;
    lineReader.eachLine('./inputs/day3.txt', function(line, last) {
        if (isFirstLine) {
            isFirstLine = false;
            lengthOfLine = line.length;
            position = (position + 3) % lengthOfLine;
        } else {
            if (line.charAt(position) === "#") {
                numberOfTrees = numberOfTrees + 1;
            }
            position = (position + 3) % lengthOfLine;
        }

        if (last) {
            res.status(200).json({message: numberOfTrees});
        }
    });
}

exports.getDayThreePartTwo = (req, res, next) => {

    let right = req.body.right;
    let down = req.body.down;

    let position = 0;
    let isFirstLine = true;
    let numberOfTrees = 0;
    let lengthOfLine = 0;
    let lineToInspect = 0;

    // Des if else car on ne peut pas faire de continue dans ce each, donc pas de early return
    lineReader.eachLine('./inputs/day3.txt', function(line, last) {
        if (isFirstLine) {
            isFirstLine = false;
            lengthOfLine = line.length;
            position = (position + right) % lengthOfLine;
            lineToInspect++;
        } else {

            if (lineToInspect === down) {
                if (line.charAt(position) === "#") {
                    numberOfTrees++;
                }
                lineToInspect = 0;
                position = (position + right) % lengthOfLine;
            }

            lineToInspect++;
        }

        if (last) {
            res.status(200).json({message: numberOfTrees});
        }
    });
}
