var express = require("express");
var router = express.Router();
var employeeModule = require('../module/employeeModule');
const authorise = require('../module/authorize');

router.get("/get", employeeModule.getEmployees);
router.get("/get/:id", employeeModule.getEmployee);
router.post("/create", authorise.isAdmin, employeeModule.createEmployee);
router.put("/update/:id", authorise.isAdmin, employeeModule.updateEmployee);
router.delete("/remove/:id", authorise.isAdmin, employeeModule.deleteEmployee);

module.exports = router;