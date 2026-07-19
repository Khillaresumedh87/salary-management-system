const prisma = require("../config/prisma");

const getAllEmployees = async () => {
  const employees = await prisma.employee.findMany({
    take: 10,
    orderBy: {
      id: "asc"
    }
  });

  return employees;
};

module.exports = {
  getAllEmployees
};