const employeeService = require("../services/employee.service");

const getAllEmployees = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { employees, totalEmployees } =
      await employeeService.getAllEmployees(page, limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / limit),
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