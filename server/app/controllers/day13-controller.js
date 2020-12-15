'use strict';

const lineReader = require('line-reader');

exports.getPartOne = (req, res, next) => {
    let earliestDepart = null;
    let bus = [];
    lineReader.eachLine('./inputs/day13/day13.txt', function(line, last) {
        if (last) {
            bus.push(...line.split(","));
            let answer = findEarliestBusAnswer(earliestDepart, bus)
            return res.status(200).json({ message: answer });
        } else {
            earliestDepart = parseInt(line);
        }
    });
}

function findEarliestBusAnswer(earliestDepart, bus) {
    let minWaitingTime = null;
    let busIdMinWaitingTime = null;

    for (let i = 0; i < bus.length; i++) {
        if (bus[i] === "x") {
            continue;
        }

        let busId = bus[i]
        let nextBusForId = parseInt(busId);
        while (nextBusForId < earliestDepart) {
            nextBusForId += parseInt(busId);
        }

        let waitingTime = nextBusForId - earliestDepart;
        if (waitingTime < minWaitingTime || minWaitingTime === null) {
            minWaitingTime = waitingTime;
            busIdMinWaitingTime = busId;
        }

    }

    return busIdMinWaitingTime * minWaitingTime;
}


exports.getPartTwo = (req, res, next) => {
    lineReader.eachLine('./inputs/day13/day13.txt', function(line, last) {
        if (last) {
            return res.status(200).json({ message: "coucou13" });
        }
    });
}
