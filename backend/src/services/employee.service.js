const prisma = require("../config/prisma");

const getAllEmployees = async (
  page,
  limit,
  search,
  department,
  sortBy,
  order
) => {
  const skip = (page - 1) * limit;

  const where = {};

  if (department) {
    where.department = department;
  }

  if (search) {
    where.OR = [
      {
        firstName: {
          contains: search
        }
      },
      {
        lastName: {
          contains: search
        }
      },
      {
        email: {
          contains: search
        }
      },
      {
        employeeCode: {
          contains: search
        }
      }
    ];
  }

  const employees = await prisma.employee.findMany({
  where,
  skip,
  take: limit,
  orderBy: {
    [sortBy]: order
  }
});

  const totalEmployees = await prisma.employee.count({
    where
  });

  return {
    employees,
    totalEmployees
  };
};

const getEmployeeById = async (id) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: Number(id)
    }
  });

  return employee;
};

module.exports = {
  getAllEmployees,
  getEmployeeById
};