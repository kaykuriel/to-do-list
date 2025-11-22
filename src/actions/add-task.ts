"use server"
import  Prisma  from "@/utils/prisma"


const NewTask = async(tarefa : string) => {
 
  try{
     if(!tarefa ) return;

  const newTask = await Prisma.tasks.create({
    data: {
      task: tarefa,
      done: false,
    },
  });

  if(!newTask) return;

  return newTask;
} catch (error) {
    console.log("Erro ao adicionar tarefa:", error);
    throw error;
  }
  }
 
export default  NewTask