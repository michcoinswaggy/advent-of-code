'use strict';

const lineReader = require('line-reader');

exports.getPartOne = (req, res, next) => {
    let numberOfPassportOk = 0;
    let passport = newPassport();

    lineReader.eachLine('./inputs/day4/day4.txt', function(line, last) {
        if (line === "") {
            if (isPassportOk(passport)) {
                numberOfPassportOk++;
            }
            passport = newPassport();
        } else {
            let passportElements = line.split(" ");
            passportElements.forEach(element => {
                passport[element.split(":")[0]] = true;
            });
        }

        if (last) {
            if (isPassportOk(passport)) {
                numberOfPassportOk++;
            }
            res.status(200).json({message: numberOfPassportOk});
        }
    });
}

exports.getPartTwo = (req, res, next) => {
    let numberOfPassportOk = 0;
    let passport = newPassport();

    lineReader.eachLine('./inputs/day4/day4.txt', function(line, last) {
        if (line === "") {
            if (isPassportOkv2(passport)) {
                numberOfPassportOk++;
            }
            passport = newPassport();
        } else {
            let passportElements = line.split(" ");
            passportElements.forEach(element => {
                let item = element.split(":");
                passport[item[0]] = item[1];
            });
        }

        if (last) {
            if (isPassportOkv2(passport)) {
                numberOfPassportOk++;
            }
            res.status(200).json({message: numberOfPassportOk});
        }
    });
}

function newPassport() {
    let newPassport = {
        byr: false,
        iyr: false,
        eyr: false,
        hgt: false,
        hcl: false,
        ecl: false,
        pid: false,
        cid: false
    }
    return newPassport;
}

function isPassportOk(passport) {
    for (let [key, value] of Object.entries(passport)) {
        if (value === false && key !== "cid") {
            return false;
        }
    }
    return true;
}

function isPassportOkv2(passport) {
    for (let [key, value] of Object.entries(passport)) {
        if (value === false && key !== "cid") {
            return false;
        }
        if (key === "byr" && !isBirthdayYearOk(value)) {
            return false;
        } else if (key === "iyr" && !isIssueYearOk(value)) {
            return false;
        } else if (key === "eyr" && !isExpirationYearOk(value)) {
            return false;
        } else if (key === "hgt" && !isHeightOk(value)) {
            return false;
        } else if (key === "hcl" && !isHairColorOk(value)) {
            return false;
        } else if (key === "ecl" && !isEyeColorOk(value)) {
            return false;
        } else if (key === "pid" && !isPidOk(value)) {
            return false;
        }
    }
    return true;
}

function isBirthdayYearOk(year) {
    if (year.length !== 4 || year < 1920 || year > 2002) {
        return false;
    }
    return true;
}

function isIssueYearOk(year) {
    if (year.length !== 4 || year < 2010 || year > 2020) {
        return false;
    }
    return true;
}

function isExpirationYearOk(year) {
    if (year.length !== 4 || year < 2020 || year > 2030) {
        return false;
    }
    return true;
}

function isHeightOk(height) {
    if (height.includes("cm")) {
        let heightCm = height.split("c")[0];
        if (heightCm < 150 || heightCm > 193) {
            return false;
        }
    } else if (height.includes("in")) {
        let heightIn = height.split("i")[0];
        if (heightIn < 59 || heightIn > 76) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}

function isHairColorOk(color) {
    let regex = RegExp('#{1}[0-9a-f]{6}');
    if (!regex.test(color)) {
        return false
    }

    return true;
}

function isEyeColorOk(color) {
    let possibleColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    if (!possibleColors.includes(color)) {
        return false;
    }
    return true;
}

function isPidOk(pid) {
    if (pid.length !== 9) {
        return false;
    }
    return true;
}
