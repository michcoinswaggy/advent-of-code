const express = require('express');
const router = express.Router();

const days = require("../controllers/days-controller.js");

router.get("/", days.getDayOne);
// router.get("/:id", days.getDayById);

module.exports = router;
