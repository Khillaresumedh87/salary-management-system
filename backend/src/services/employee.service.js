const prisma = require("../config/prisma");

const getAllEmployees = async (page, limit) => {
  const skip = (page - 1) * limit;

  const employees = await prisma.employee.findMany({
    skip,
    take: limit,
    orderBy: {
      id: "asc"
    }
  });

  const totalEmployees = await prisma.employee.count();

  return {
    employees,
    totalEmployees
  };
};

module.exports = {
  getAllEmployees
};