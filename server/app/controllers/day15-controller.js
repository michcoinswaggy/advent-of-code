'use strict';

const lineReader = require('line-reader');
const performance = require('performance');

const test1 = [0,3,6];
const test2 = [1,3,2];
const test3 = [2,1,3];
const test4 = [1,2,3];
const test5 = [2,3,1];
const test6 = [3,2,1];
const test7 = [3,1,2];

const prod = [1,2,16,19,18,0];

exports.getPartOne = (req, res, next) => {
    let startingNumbers = prod;
    let numbersSpoken = {};
    for (let i = 0; i < startingNumbers.length; i++) {
        numbersSpoken[startingNumbers[i]] = [i+1];
    }
    let previousSpoken = startingNumbers[startingNumbers.length -1];

    for (let i = startingNumbers.length + 1; i <= 2020; i++) {
        let turnNumber = null;

        if (numbersSpoken[previousSpoken].length === 1) {
            turnNumber = 0; // le previous a été dit pour la premiere fois
        } else {
            let len = numbersSpoken[previousSpoken].length;
            turnNumber = parseInt(numbersSpoken[previousSpoken][len-1]) - parseInt(numbersSpoken[previousSpoken][len-2])
        }

        if (!numbersSpoken.hasOwnProperty(turnNumber)) {
            numbersSpoken[turnNumber] = [];
        }
        numbersSpoken[turnNumber].push(i);
        previousSpoken = turnNumber;
    }

    // console.log(previousSpoken);
    // console.log("------------------------------------------------------------");
    // 536
    return res.status(200).json({ message: previousSpoken });
}



exports.getPartTwo = (req, res, next) => {
    let startingNumbers = prod;
    let numbersSpoken = {};
    for (let i = 0; i < startingNumbers.length; i++) {
        numbersSpoken[startingNumbers[i]] = [i+1];
    }
    let previousSpoken = startingNumbers[startingNumbers.length -1];

    for (let i = startingNumbers.length + 1; i <= 2020; i++) { // test
    // for (let i = startingNumbers.length + 1; i <= 30000000; i++) { // prod
        let turnNumber = null;

        if (numbersSpoken[previousSpoken].length === 1) {
            turnNumber = 0; // le previous a été dit pour la premiere fois
        } else {
            let len = numbersSpoken[previousSpoken].length;
            turnNumber = parseInt(numbersSpoken[previousSpoken][len-1]) - parseInt(numbersSpoken[previousSpoken][len-2])
        }

        // obligé
        let arrayOfTurnNumber = numbersSpoken[turnNumber];

        if (typeof arrayOfTurnNumber === 'undefined') {
            numbersSpoken[turnNumber] = [];
            numbersSpoken[turnNumber].push(i);
        } else if (arrayOfTurnNumber.length === 1) {
            numbersSpoken[turnNumber].push(i);
        } else {
            numbersSpoken[turnNumber][0] = numbersSpoken[turnNumber][1];
            numbersSpoken[turnNumber][1] = i;
        }

        previousSpoken = turnNumber;
        //
        // if (i % 100000 === 0) {
        //     console.log(i);
        // }
    }

    // 24065124
    // someFunction: 11:57.841 (m:ss.mmm)
    return res.status(200).json({ message: previousSpoken });
}
