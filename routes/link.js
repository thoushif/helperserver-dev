const express = require("express");

const link = require("../controllers/link-controller");

const router = express.Router();

router.get("/all", link.getAllLinks);
router.post("/add", link.addNewGiveLink);

module.exports = router;
