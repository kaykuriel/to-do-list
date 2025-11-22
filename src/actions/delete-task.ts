"use server"

import prisma from "@/utils/prisma";

const ButtonDeleteTask = async (id: number) => {
  try {
    if(!id) return

    const deletedtask = await prisma.tasks.delete({
      where: {
        id: id,
      },
    });
    if(!deletedtask) return;

    return deletedtask;

  }catch (error) {
    console.error("Error deleting task:", error);
  }
};
export default ButtonDeleteTask;