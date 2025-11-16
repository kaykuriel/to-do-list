"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  List,
  Check,
  CircleEllipsis,
  SquarePen,
  Trash,
  ListChecks,
  Sigma,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Home() {
  return (
    <main className="w-full h-screen bg-[#0a0a0a] flex justify-center items-center">
      <Card className="w-lg bg-[#181818] border-[#ffffff4f]">
        {/* INPUT + BOTÃO */}
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicione uma tarefa" className="text-[#A1A1A5]" />
          <Button className="flex gap-1">
            <Plus />
            Cadastrar
          </Button>
        </CardHeader>

        {/* FILTROS */}
        <CardHeader className="flex flex-wrap gap-2">
          <Separator className="bg-[#ffffff49] mb-4" />

          <Badge className="cursor-pointer" variant="default">
            <List /> Todos
          </Badge>

          <Badge className="cursor-pointer" variant="outline">
            <CircleEllipsis /> Não Finalizados
          </Badge>

          <Badge className="cursor-pointer" variant="outline">
            <Check /> Concluídos
          </Badge>
        </CardHeader>

        {/* LISTA */}
        <CardContent className="text-white">
          <div className="flex justify-between items-center rounded-xs overflow-hidden h-14 gap-2 border border-[#ffffff4f] mb-1">
            <div className="w-2 h-full bg-green-300" />

            <p className="ml-3 text-sm flex-1">Estudar React</p>

            <div className="flex items-center px-2 gap-1">
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
                      <Button className=" flex gap-1 cursor-pointer">
                        Editar
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Trash size={17} className="cursor-pointer" />
            </div>
          </div>
        </CardContent>

        {/* FOOTER - CONTAGEM */}
        <CardFooter className="text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ListChecks size={17} />
            <p className="text-sm">tarefas concluídas (3/3)</p>
          </div>

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
        </CardFooter>

        {/* PROGRESS BAR */}
        <CardFooter className="px-6">
          <div className="bg-[#2f2f2fab] h-3 w-full rounded-sm overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: "50%" }} />
          </div>
        </CardFooter>

        {/* RODAPÉ */}
        <CardFooter className="text-white flex justify-end items-center">
          <p className="flex text-sm gap-1 items-center">
            <Sigma size={18} />3 Tarefas no Total
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
