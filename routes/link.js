const express = require("express");

const link = require("../controllers/link-controller");

const router = express.Router();

router.get("/give/all", link.getAllGiveLinks);
router.get("/give/all/:id", link.getGiveLinkById);
router.post("/give/add", link.addNewGiveLink);
router.get("/ask/all", link.getAllAskLinks);
router.get("/ask/all/:id", link.getAskLinkById);
router.post("/ask/add", link.addNewAskLink);

router.get("/checkLinkExists/:linktype/:itemid/:userid", link.checkLinkExists);
module.exports = router;
