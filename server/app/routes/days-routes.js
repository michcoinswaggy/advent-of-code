const express = require('express');
const router = express.Router();

const days = require("../controllers/days-controller.js");

router.get("/3part1", days.getDayThreePartOne);
router.post("/3part2", days.getDayThreePartTwo);

module.exports = router;
