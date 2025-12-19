
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";
import { Tasks } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { edittask } from "@/actions/edit-task";

type EditTaskProps = {
  task: Tasks;
  handleGetTasks: () => void;
};

const EditTask = ({ task, handleGetTasks }: EditTaskProps) => {
  const [editedTask, setEditedTask] = useState<string>(task.task);

  const handleeditTask = async () => {
   try{
     if (editedTask !== task.task) {
      toast.success("Tarefa editada com sucesso!");
    } else {
      toast.error("Nenhuma alteração feita na tarefa.");

      return;
    }
    await edittask({ idTask: task.id, NewTask: editedTask });

    handleGetTasks();
   } catch (error) {
    console.error("Error editing task:", error);
   }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <SquarePen size={17} className="cursor-pointer text-white" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Editar Tarefa</DialogTitle>
          <div className="flex items-center gap-2 mt-3">
            <Input
              placeholder="Adicione uma tarefa"
              className="bg-white text-black cursor-pointer"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <DialogClose asChild>
              <Button className="flex gap-1 cursor-pointer"
                onClick={handleeditTask}
              >Editar</Button>
            </DialogClose>

          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
