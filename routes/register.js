var express = require("express");
var router = express.Router();
var registerModule = require('../module/registerModule');

router.post("/signup", registerModule.signup);
router.post("/signin", registerModule.signin);

module.exports = router;