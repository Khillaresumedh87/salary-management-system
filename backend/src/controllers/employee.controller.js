const employeeService = require("../services/employee.service");

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees
};