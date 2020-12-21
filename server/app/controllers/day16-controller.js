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
    let isFirstLine = false;
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
            // 32842
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
    if (value < borders[0] || value > borders[1]) {
        return false;
    }
    return true;
}

exports.getPartTwo = (req, res, next) => {
    let actualStep = 1;
    let rules = [];
    let isFirstLine = false;
    let myTicket = [];
    let orderOfRules = null;
    lineReader.eachLine('./inputs/day16/day16.txt', function(line, last) {
        if (!isFirstLine) {
            if (line === '') {
                actualStep++
                isFirstLine = true;
            } else {
                if (steps[actualStep] === "rules") {
                    addLineRules(line, rules);
                } else if (steps[actualStep] === "myTicket") {
                    orderOfRules = initOrderOfRules(rules);
                    myTicket = line.split(",");
                } else if (steps[actualStep] === "nearbyTickets") {
                    setOrderOfRules(line, rules, orderOfRules);
                }
            }
        } else {
            isFirstLine = false;
        }

        if (last) {
            let max = 0;
            while (max !== 1) {
                max = 0;
                getFinalOrderOfRules(orderOfRules)
                orderOfRules.forEach(function(a) {
                    if (a.length > max) {
                        max = a.length;
                    }
                });
            }


            let finalValue = getPartTwoDepartures(orderOfRules, myTicket);
            // 2628667251989
            return res.status(200).json({ message: finalValue });
        }
    });
}

function getPartTwoDepartures(orderOfRules, myTicket) {
    let finalValue = 1;
    for (let i = 0; i < orderOfRules.length; i++) {
        if (orderOfRules[i][0].includes("departure")) {
            finalValue = finalValue * parseInt(myTicket[i]);
        }
    }

    return finalValue;
}


function initOrderOfRules(rules) {
    let orderOfRules = new Array(rules.length);
    for (let i = 0; i < rules.length; i++) {
        orderOfRules[i] = [];
    }
    return orderOfRules;
}



function setOrderOfRules(ticket, rules, orderOfRules) {
    let ticketOrder = getTicketOrderOfRules(ticket, rules);
    if (ticketOrder === false) {
        return;
    }

    for (let i = 0; i < orderOfRules.length; i++) {
        if (orderOfRules[i].length === 0) {
            orderOfRules[i].push(...ticketOrder[i]);
            continue;
        }

        let newOrderRule = [];
        for (let j = 0; j < ticketOrder[i].length; j++) {
            if (orderOfRules[i].includes(ticketOrder[i][j])) {
                newOrderRule.push(ticketOrder[i][j]);
            }
        }
        orderOfRules[i] = newOrderRule;
    }

    return 0;
}

function getFinalOrderOfRules(orderOfRules) {
    let finalOrder = [];
    for (let i = 0; i < orderOfRules.length; i++) {
        if (orderOfRules[i].length === 1) {
            let valueToDelete = orderOfRules[i][0];
            for (let j = 0; j < orderOfRules.length; j++) {
                if (i === j) {
                    continue;
                }
                let indexToDelete = orderOfRules[j].indexOf(valueToDelete);
                if (indexToDelete > -1) {
                    orderOfRules[j].splice(indexToDelete, 1);
                }
            }
        }
    }

    return orderOfRules;
}


function getTicketOrderOfRules(ticket, rules) {
    let ticketOrder = [];
    ticket = ticket.split(",");
    for (let i = 0; i < ticket.length; i++) {
        let actualValueIsValid = false;
        ticketOrder[i] = [];
        for (let j = 0; j < rules.length; j++) {
            if (isValueInRange(parseInt(ticket[i]), rules[j][2]) ||
                isValueInRange(parseInt(ticket[i]), rules[j][1])
            ) {
                actualValueIsValid = true;
                ticketOrder[i].push(rules[j][0]);
            }
        }

        if (!actualValueIsValid) {
            return false;
        }
    }

    return ticketOrder;
}
