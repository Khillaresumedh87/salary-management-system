const employeeService = require("../services/employee.service");
const getAllEmployees = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;

const search = req.query.search || "";
const department = req.query.department || "";

const sortBy = req.query.sortBy || "id";
const order = req.query.order || "asc";

    const { employees, totalEmployees } =
  await employeeService.getAllEmployees(
    page,
    limit,
    search,
    department,
    sortBy,
    order
  );

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

const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById
};