const express = require("express");

const help = require("../controllers/help-controller");

const router = express.Router();

router.get("/all", help.getAllHelps);
router.get("/archive", help.getArchivedHelps);
router.get("/:id", help.getHelpById);

router.post("/add", help.addNewHelp);
router.post("/delete", help.deleteHelp);

router.get("/suggestions/:id", help.getHelpSuggestions);

module.exports = router;
