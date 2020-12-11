'use strict';

const lineReader = require('line-reader');

exports.getPartOne = (req, res, next) => {
    let arrayOfActions = [];
    lineReader.eachLine('./inputs/day8/day8.txt', function(line, last) {
        let infos = line.split(" ");
        arrayOfActions.push({
            action: infos[0],
            value: infos[1],
            done: false
        });
        if (last) {
            return res.status(200).json({ message: getTotalAcc(arrayOfActions) });
        }
    });
}

exports.getPartTwo = (req, res, next) => {
    let arrayOfActions = [];
    lineReader.eachLine('./inputs/day8/day8.txt', function(line, last) {
        let infos = line.split(" ");
        arrayOfActions.push({
            action: infos[0],
            value: infos[1],
            done: false
        });
        if (last) {

            for (let i = 0; i < arrayOfActions.length ; i++) {

                if (arrayOfActions[i].action === "jmp" || arrayOfActions[i].action === "nop") {
                    let initAction = arrayOfActions[i].action;
                    let replaceBy = (arrayOfActions[i].action === "jmp") ? "nop" : "jmp";
                    arrayOfActions[i].action = replaceBy;

                    let [count, index] = getTotalAccPartTwo(arrayOfActions);
                    if (index === arrayOfActions.length - 1) {
                        return res.status(200).json({ message: count })
                    }
                    arrayOfActions[i].action = initAction;
                }
            }

            return res.status(400).json({ message: 'error' });
        }
    });
}


function getTotalAccPartTwo(myArray) {

    let counter = 0;
    var n = 0;
    let changedIndexDone = [];

    while (n < myArray.length-1 && myArray[n].done === false) {
        let nextIndex = null;
        let operande = myArray[n].value.charAt(0);
        let addValue = parseInt(myArray[n].value.substring(1));

        myArray[n].done = true;
        changedIndexDone.push(n);

        if (myArray[n].action === "acc") {
            counter = operande === "+" ? counter + addValue : counter - addValue;
            nextIndex = n + 1;
        } else if (myArray[n].action === "jmp") {
            nextIndex = operande === "+" ? n + addValue : n - addValue;
        } else {
            nextIndex = n + 1;
        }

        // On est arrivé au bout
        if (n === myArray.length - 1) {
            break;
        }

        n = nextIndex;
    }


    // On reset les done à false si on est entré dans une boucle infine
    if (n !== myArray.length - 1) {
        for (let i = 0; i < myArray.length; i++) {
            myArray[i].done = false;
        }
    }

    return [counter, n];
}








function getTotalAcc(arrayOfActions) {

    let counter = 0;
    var n = 0;

    while (arrayOfActions[n].done === false) {
        let operande = arrayOfActions[n].value.charAt(0);
        let addValue = parseInt(arrayOfActions[n].value.substring(1));

        arrayOfActions[n].done = true;

        if (arrayOfActions[n].action === "acc") {
            counter = operande === "+" ? counter + addValue : counter - addValue;
            n++
        } else if (arrayOfActions[n].action === "jmp") {
            n = operande === "+" ? n + addValue : n - addValue;
        } else {
            n++
        }

    }

    return counter;
}
