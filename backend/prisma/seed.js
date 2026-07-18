const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const countries = require("./data/countries");
const departments = require("./data/departments");
const designations = require("./data/designations");

const prisma = new PrismaClient();

/**
 * Returns a random item from an array
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Returns salary based on designation
 */
function getSalary(designation) {
  switch (designation) {
    case "Software Engineer":
      return faker.number.int({ min: 600000, max: 1200000 });

    case "Senior Software Engineer":
      return faker.number.int({ min: 1200000, max: 1800000 });

    case "Tech Lead":
      return faker.number.int({ min: 1800000, max: 2500000 });

    case "Engineering Manager":
      return faker.number.int({ min: 2500000, max: 4000000 });

    case "Director":
      return faker.number.int({ min: 4000000, max: 6000000 });

    default:
      return faker.number.int({ min: 500000, max: 1500000 });
  }
}

async function main() {
  console.log("Deleting existing employees...");

  // Delete child table first because of foreign key relationship
  await prisma.salaryHistory.deleteMany();

  await prisma.employee.deleteMany();

  console.log("Generating employee data...");

  const employees = [];

  for (let i = 1; i <= 10000; i++) {
    const country = getRandomItem(countries);
    const department = getRandomItem(departments);
    const designation = getRandomItem(designations);

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    employees.push({
      employeeCode: `EMP${String(i).padStart(5, "0")}`,
      firstName,
      lastName,
      email: `emp${i}@company.com`,
      department,
      designation,
      country: country.country,
      currency: country.currency,
      salary: getSalary(designation),
      joiningDate: faker.date.between({
        from: "2018-01-01",
        to: "2026-01-01",
      }),
    });
  }

  console.log("Inserting employees...");

  await prisma.employee.createMany({
    data: employees,
  });

  console.log("==================================");
  console.log("Seed completed successfully!");
  console.log(`Inserted ${employees.length} employees`);
  console.log("==================================");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });