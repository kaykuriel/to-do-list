
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";

const deleteTask = () => {
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
          <AlertDialogTitle>
            Tem certeza que deseja apagar X itens?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default deleteTask;
