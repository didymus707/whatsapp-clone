import { PrismaClient } from "@prisma/client";

let prismaInstance = null;

const getPrismaInstance = () => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
};

export default getPrismaInstance;
