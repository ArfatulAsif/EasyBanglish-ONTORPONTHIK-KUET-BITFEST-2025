const { PrismaClient } = require("@prisma/client");

// Create a global instance to prevent multiple PrismaClient instances
const globalForPrisma = global; // Use the global object to store the Prisma instance.

const prisma = globalForPrisma.prisma || new PrismaClient();

// Attach the instance to the global object in non-production environments
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
