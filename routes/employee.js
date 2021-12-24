var express = require("express");
var router = express.Router();
var employeeModule = require('../module/employeeModule');

router.get("/get", employeeModule.getEmployees);
router.get("/get/:id", employeeModule.getEmployee);
router.post("/create", employeeModule.createEmployee);
router.put("/update/:id", employeeModule.updateEmployee);
router.delete("/remove/:id", employeeModule.deleteEmployee);

module.exports = router;
