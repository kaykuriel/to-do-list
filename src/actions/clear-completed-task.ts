'use server'
import { prisma } from "@/utils/prisma";

export const clearTasksCompleted = async () => {
  try {

      await prisma.tasks.deleteMany({
      where: {
        done: true,
      },
    });

    const allTask = await prisma.tasks.findMany();
    
    if (!allTask) return

    return allTask;
  } catch (error) {
    console.error("Error clearing completed tasks:", error);
  }
}
