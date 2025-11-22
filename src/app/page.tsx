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
  Plus,
  List,
  Check,
  CircleEllipsis,
  Trash,
  ListChecks,
  Sigma,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EditTask from "@/components/edit-task";
import getTasksFromBD from "@/actions/get-tasks-from-bd";
import React, { useEffect, useState } from "react";
import { Tasks } from "@prisma/client";
import NewTask from "@/actions/add-task";
import DeleteTask from "@/components/ui/delete-task";
import ButtonDeleteTask from "@/actions/delete-task";
import prisma from "@/utils/prisma";

export default function Home() {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

  const handleGetTasks = async () => {
  try {
    const tasks = await getTasksFromBD();
    if (!tasks) return;
    setTaskList(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};


  const handleAddTask = async () => {
   try{
     if (task.length === 0 || !task) {
      return;
    }

    const myNewTask = await NewTask(task);

    if (!myNewTask) return;
    console.log(myNewTask);
    await handleGetTasks();
   } catch (error) {
    console.error("Error adding task:", error);
   }
  };

  const handleDeleteTask = async ( id: number) => {

 
   try {
    if(!id) return;
    const deletedtask = await ButtonDeleteTask(id);

    if (!deletedtask) return;
    console.log(deletedtask);
    await handleGetTasks();
   } catch (error) {
    console.error("Error deleting task:", error);
   }
  };

  useEffect(() => {
  async function fetchTasks() {
    await handleGetTasks();
  }

  fetchTasks();
}, []);


  return (
    <main className="w-full h-screen bg-[#0a0a0a] flex justify-center items-center">
      <Card className="w-lg bg-[#181818] border-[#ffffff4f]">
        {/* INPUT + BOTÃO */}
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicione uma tarefa"
            className="text-[#A1A1A5]"
            onChange={(e) => setTask(e.target.value)}
          />
          <Button className="flex gap-1"  variant="default" onClick={handleAddTask}>
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
          {taskList.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center rounded-xs overflow-hidden h-14 gap-2 border border-[#ffffff4f] mb-1"
            >
              <div className="w-2 h-full bg-green-300" />

              <p className="ml-3 text-sm flex-1">{task.task}</p>

              <div className="flex items-center px-2 gap-1">
                <EditTask />

                <Trash size={17} className="cursor-pointer" onClick={() => handleDeleteTask(task.id)}/>
              </div>
            </div>
          ))}
        </CardContent>

        {/* FOOTER - CONTAGEM */}
        <CardFooter className="text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ListChecks size={17} />
            <p className="text-sm">tarefas concluídas (3/3)</p>
          </div>
          <DeleteTask />
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
