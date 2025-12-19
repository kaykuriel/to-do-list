"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as lucideReact from "lucide-react";
import EditTask from "@/components/edit-task";
import getTasksFromBD from "@/actions/get-tasks-from-bd";
import { useEffect, useState } from "react";
import type { Tasks } from "@prisma/client";
import NewTask from "@/actions/add-task";
import ButtonDeleteTask from "@/actions/delete-task";
import { toast } from "sonner";
import { updateTaskStatus } from "@/actions/toggle-done";
import { Filter } from "@/components/filter";
import { FilterType } from "@/components/filter";
import DeleteTask from "@/components/delete-task";
import { clearTasksCompleted } from "@/actions/clear-completed-task";


export default function Home() {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

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
    setLoading(true);
    try {
      if (task.length === 0 || !task) {
        toast.error("Por favor, insira uma tarefa");
        setLoading(false);
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
    setLoading(false);
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

  const clearCompletedTasks = async () => {
    const deletedTask = await clearTasksCompleted();

    if (!deletedTask) return;
    setTaskList(deletedTask || []);
    toast.warning(`Tarefas concluídas apagadas com sucesso`);

  }


  useEffect(() => {
    async function fetchTasks() {
      await handleGetTasks();
    }

    fetchTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList)
        break
      case "pending":
        setFilteredTasks(taskList.filter(task => !task.done))
        break
      case "completed":
        setFilteredTasks(taskList.filter(task => task.done))
        break
    }
  }, [currentFilter, taskList])

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
            {loading ? <lucideReact.LoaderCircle className="animate-spin" /> : <lucideReact.Plus />}
            Cadastrar
          </Button>
        </CardHeader>


        <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

        {/* LISTA */}
        <CardContent className="text-white h-75 overflow-y-scroll">
          {taskList.length === 0 && <p>Voce não tem tarefas Cadastradas </p>}
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center rounded-xs overflow-hidden h-14 gap-2 border border-[#ffffff4f] mb-1"
            >
              {/* Barra colorida */}
              <div
                className={`w-2 h-full ${task.done ? "bg-green-500" : "bg-gray-500"
                  }`}
              />

              {/* Texto da tarefa */}
              <p
                className={`ml-3 text-sm flex-1 cursor-pointer hover:text-gray-400 ${task.done ? "line-through text-gray-400" : ""
                  }`}
                onClick={() => handleToggleTask(task.id)}
              >
                {task.task}
              </p>

              {/* Botões */}
              <div className="flex items-center px-2 gap-1">

                <EditTask task={task} handleGetTasks={handleGetTasks} />

                <lucideReact.Trash
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
            <lucideReact.ListChecks size={17} />
            <p className="text-sm">tarefas concluídas ({filteredTasks.filter(task => task.done).length}/{taskList.length})</p>
          </div>
          <DeleteTask clearCompletedTasks={clearCompletedTasks} />
        </CardFooter>

        {/* PROGRESS BAR */}
        <CardFooter className="px-6">
          <div className="bg-[#2f2f2fab] h-3 w-full rounded-sm overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${(filteredTasks.filter(task => task.done).length / (taskList.length || 1)) * 100}%` }} />
          </div>
        </CardFooter>

        {/* RODAPÉ */}
        <CardFooter className="text-white flex justify-end items-center">
          <p className="flex text-sm gap-1 items-center">
            <lucideReact.Sigma size={18} />{taskList.length} Tarefas no Total
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
