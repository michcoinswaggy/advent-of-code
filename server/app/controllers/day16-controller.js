'use strict';

const lineReader = require('line-reader');

const steps = {
    1: "rules",
    2: "myTicket",
    3: "nearbyTickets"
}

exports.getPartOne = (req, res, next) => {
    let actualStep = 1;
    let rules = [];
    let isFirstLine = false; //
    let ticketScanningErrorRate = 0;
    lineReader.eachLine('./inputs/day16/day16.txt', function(line, last) {
        if (!isFirstLine) {
            if (line === '') {
                actualStep++
                isFirstLine = true;
            } else {
                if (steps[actualStep] === "rules") {
                    addLineRules(line, rules);
                } else if (steps[actualStep] === "nearbyTickets") {
                    ticketScanningErrorRate += getErrorRateOfTicket(line, rules);
                }
            }
        } else {
            isFirstLine = false;
        }

        if (last) {
            console.log(ticketScanningErrorRate);
            return res.status(200).json({ message: ticketScanningErrorRate });
        }
    });
}

function addLineRules(line, rules) {
    let infos = line.split(": ");
    let ruleType = infos[0];
    let newRule = [];
    newRule.push(ruleType)

    infos = infos[1].split(" or ");
    newRule.push(infos[0]);
    newRule.push(infos[1]);

    rules.push(newRule);
}

function getErrorRateOfTicket(ticket, rules) {
    ticket = ticket.split(",")
    for (let i = 0; i < ticket.length; i++) {

        let actualValueIsValid = false;

        for (let j = 0; j < rules.length; j++) {
            if (isValueInRange(parseInt(ticket[i]), rules[j][2]) ||
                isValueInRange(parseInt(ticket[i]), rules[j][1])
            ) {
                actualValueIsValid = true;
                break;
            }
        }

        if (!actualValueIsValid) {
            return parseInt(ticket[i]);
        }

    }
    return 0;
}

function isValueInRange(value, borders) {
    borders = borders.split("-");
    for (let i = borders[0]; i <= borders[1]; i++) {
        if (value === i) {
            return true;
        }
    }
    return false;
}

exports.getPartTwo = (req, res, next) => {
    lineReader.eachLine('./inputs/day16/day16.txt', function(line, last) {
        if (last) {
            return res.status(200).json({ message: "coucou16" });
        }
    });
}
