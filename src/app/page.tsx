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
import { toast } from "sonner";
import { updateTaskStatus } from "@/actions/toggle-done";

export default function Home() {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // opcional, evita comportamento padrão do Enter
      handleAddTask(); // adiciona a tarefa
      setTask(""); // limpa o input
    }
  };

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
    try {
      if (task.length === 0 || !task) {
        return;
      }

      const myNewTask = await NewTask(task);

      if (!myNewTask) return;
      console.log(myNewTask);
      await handleGetTasks();
      setTask("");
      toast.success(`Atividade adicionada com sucesso`);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      if (!id) return;
      const deletedtask = await ButtonDeleteTask(id);

      if (!deletedtask) return;
      console.log(deletedtask);
      await handleGetTasks();
      toast.warning(`Atividade deletada com sucesso`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleTask = async (taskId: number) => {
    console.log(taskList);

    const previousTask = [...taskList];

    try {
      setTaskList((prev) => {
        const updatedTask = prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });

        return updatedTask;
      });

      const getFromDb = await updateTaskStatus(taskId);
      console.log(getFromDb);
    } catch (error) {
      setTaskList(previousTask);
      console.error("Error updating task status:", error);
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
            value={task}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // evita comportamento padrão do Enter
                handleAddTask();
                setTask("");
              }
            }}
          />
          <Button
            className="flex gap-1"
            variant="default"
            onClick={() => {
              handleAddTask();
              setTask("");
            }}
          >
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
              {/* Barra colorida */}
              <div
                className={`w-2 h-full ${
                  task.done ? "bg-red-500" : "bg-green-500"
                }`}
              />

              {/* Texto da tarefa */}
              <p
                className={`ml-3 text-sm flex-1 cursor-pointer hover:text-gray-400 ${
                  task.done ? "line-through text-gray-400" : ""
                }`}
                onClick={() => handleToggleTask(task.id)}
              >
                {task.task}
              </p>

              {/* Botões */}
              <div className="flex items-center px-2 gap-1">
                <EditTask />

                <Trash
                  size={17}
                  className="cursor-pointer"
                  onClick={() => handleDeleteTask(task.id)}
                />
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
