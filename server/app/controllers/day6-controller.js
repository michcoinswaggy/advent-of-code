'use strict';

const lineReader = require('line-reader');

exports.getPartOne = (req, res, next) => {
    let finalSum = 0;
    let countLineYes = [];
    lineReader.eachLine('./inputs/day6/day6.txt', function(line, last) {
        if (line === "") {
            finalSum = finalSum + countLineYes.length;
            countLineYes = [];
        } else {
            for (let i = 0; i < line.length ; i++) {
                let answerToInspect = line.charAt(i);
                if (!countLineYes.includes(answerToInspect)) {
                    countLineYes.push(answerToInspect);
                }
            }
        }

        if (last) {
            finalSum = finalSum + countLineYes.length;
            return res.status(200).json({ message: finalSum });
        }
    });
}


exports.getPartTwo = (req, res, next) => {
    let finalSum = 0;
    let countLineYes = [];
    let isFirstOfGroup = true;
    lineReader.eachLine('./inputs/day6/day6.txt', function(line, last) {
        if (line === "") {
            finalSum = finalSum + countLineYes.length;
            countLineYes = [];
            isFirstOfGroup = true;
        } else {
            if (isFirstOfGroup) {
                countLineYes = line.split("");
                isFirstOfGroup = false;
            } else {
                let temp = [];
                for (let i = 0; i < line.length ; i++) {
                    let answerToInspect = line.charAt(i);
                    if (countLineYes.includes(answerToInspect)) {
                        temp.push(answerToInspect);
                    }
                }
                countLineYes = temp;
            }
        }

        if (last) {
            finalSum = finalSum + countLineYes.length;
            return res.status(200).json({ message: finalSum });
        }
    });
}
