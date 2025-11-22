
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";

const EditTask = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <SquarePen size={17} className="cursor-pointer text-white" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <div className=" flex items-center gap-2 mt-3">
            <Input
              placeholder="Adicione uma tarefa"
              className="bg-white text-black cursor-pointer"
            />
            <Button className=" flex gap-1 cursor-pointer">Editar</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
