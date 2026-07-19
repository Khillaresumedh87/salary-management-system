const express = require("express");
const router = express.Router();

const {
  getAllEmployees
} = require("../controllers/employee.controller");

// GET All Employees
router.get("/", getAllEmployees);

module.exports = router;