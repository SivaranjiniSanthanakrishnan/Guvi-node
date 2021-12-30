var express = require("express");
var router = express.Router();
var studentModule = require('../module/studentModule');

router.get("/get", studentModule.getStudent);
router.post("/create", studentModule.createStudent);
// router.put("/update/:id", authorise.isAdmin, employeeModule.updateEmployee);
// router.delete("/remove/:id", authorise.isAdmin, employeeModule.deleteEmployee);

module.exports = router;