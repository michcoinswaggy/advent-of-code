const express = require('express');
const router = express.Router();

const day3 = require("../controllers/day3-controller.js");
const day4 = require("../controllers/day4-controller.js");
const day5 = require("../controllers/day5-controller.js");
const day6 = require("../controllers/day6-controller.js");
const day7 = require("../controllers/day7-controller.js");
const day8 = require("../controllers/day8-controller.js");
const day9 = require("../controllers/day9-controller.js");

const day11 = require("../controllers/day11-controller.js");

router.post("/3", day3.getDayThree);

router.get("/4part1", day4.getPartOne);
router.get("/4part2", day4.getPartTwo);

router.get("/5part1", day5.getPartOne);
router.get("/5part2", day5.getPartTwo);

router.get("/6part1", day6.getPartOne);
router.get("/6part2", day6.getPartTwo);

router.get("/7part1", day7.getPartOne);
router.get("/7part2", day7.getPartTwo);

router.get("/8part1", day8.getPartOne);
router.get("/8part2", day8.getPartTwo);

router.get("/9part1", day9.getPartOne);
router.get("/9part2", day9.getPartTwo);


router.get("/11part1", day11.getPartOne);
router.get("/11part2", day11.getPartTwo);

module.exports = router;
