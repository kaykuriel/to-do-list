'use server'
import { prisma } from "@/utils/prisma"

type EditTaskProps = {
  idTask: number;
  NewTask: string;
}

export const edittask = async ({ idTask, NewTask }: EditTaskProps) => {

  try {
    if (!idTask || !NewTask) return

    const editedTask = await prisma.tasks.update({
      where: { id : idTask },
      data: { task: NewTask }
    });


    if(!editedTask) return;

  } catch (error) {
    throw error
  }
}

