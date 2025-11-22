"use server";
import Prisma from "@/utils/prisma";

const getTasksFromBD = async () => {
  const tasks = await Prisma.tasks.findMany();

  try {
    if (!tasks) {
      return;
    }
    console.log(tasks);
    return tasks;
  } catch (error) {
    throw error;
  }
};

export default getTasksFromBD;
