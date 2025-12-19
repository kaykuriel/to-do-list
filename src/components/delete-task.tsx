import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";

type DeleteTaskProps = {
  clearCompletedTasks: () => void;
};

const DeleteTask: React.FC<DeleteTaskProps> = ({
  clearCompletedTasks,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Badge
          className="flex items-center gap-2 text-sm border border-[#ffffff4f] px-3 py-1 rounded-md cursor-pointer h-7"
          variant="outline"
        >
          <Trash size={17} />
          Limpar Tarefas concluídas
        </Badge>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            Tem certeza que deseja apagar as tarefas concluídas?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#181818] text-white border border-[#ffffff4f] hover:bg-black hover:text-white cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={clearCompletedTasks}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTask;
