"use client";
import React from "react";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { Input, Toaster } from "../ui";
import { TaskItem } from "./taskItem";

import { useFilterName } from "@/hooks";
import { RootState } from "@/redux/store";
import {
  completedUserTask,
  fetchTasksList,
  removeUserTask,
} from "@/redux/slices/tasksSlice";
import { cn } from "@/lib/utils";
import { SkeletonTask } from "./skeletonTask";
import { toast } from "sonner";

interface Props {}

export const TasksList: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { filterName, handleFilterName } = useFilterName("");
  const { data: tasks, statusTasksList } = useSelector(
    (state: RootState) => state.tasks
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const loadingTasks = async () => {
      setIsLoading(true);
      await dispatch(fetchTasksList());
      setIsLoading(false);
    };
    loadingTasks();
  }, [dispatch]);

  const handleDeleteTask = async (idTask: string) => {
    const loadingToastId = toast.loading("Loading...");

    try {
      const resultAction = await dispatch(removeUserTask({ idTask }));

      if (removeUserTask.fulfilled.match(resultAction)) {
        await dispatch(fetchTasksList());
        toast.success("Task remove successfully!");
      } else if (removeUserTask.rejected.match(resultAction)) {
        toast.error("Error removing task 😞");
      }
    } catch (error) {
      toast.error("An error occurred while removing the task 😞");
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  const handleCompleteTask = async (idTask: string, completed: boolean) => {
    const loadingToastId = toast.loading("Loading...");

    try {
      const resultAction = await dispatch(
        completedUserTask({ idTask, completed })
      );

      if (completedUserTask.fulfilled.match(resultAction)) {
        await dispatch(fetchTasksList());
        toast.success("Task completed successfully!");
      } else if (completedUserTask.rejected.match(resultAction)) {
        toast.error("Error while executing task 😞");
      }
    } catch (error) {
      toast.error("An error occurred while completed the task 😞");
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className="basis-[75%] border-[1px] border-solid border-input bg-card row-span-2 rounded-lg p-4">
      <div className=" flex items-center justify-between">
        <h3 className="font-bold text-3xl">Tasks List</h3>
        <div className="flex items-center gap-3">
          <Search />
          <Input
            value={filterName}
            onChange={handleFilterName}
            placeholder="Search by task name"
            className="w-[250px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto min-h-[704px] max-h-[704px] mt-7">
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, index) => <SkeletonTask key={index} />)
        ) : statusTasksList === "failed" ? (
          <p className="text-center text-xl">Error loading tasks 😞</p>
        ) : tasks.length === 0 ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <p className="text-center text-xl">You don't have any tasks 😞</p>
        ) : (
          Array.isArray(tasks) &&
          tasks
            .filter((task) => task.name.toLowerCase().includes(filterName))
            .map((task) => (
              <TaskItem
                key={task.idTask}
                taskName={task.name}
                taskPoints={task.points}
                taskDifficulty={task.difficulty}
                deleteTask={() => handleDeleteTask(task.idTask)}
                onClickConfirmPopUpBtn={() =>
                  handleCompleteTask(task.idTask, task.completed)
                }
                className={cn({ "line-through": task.completed })}
                classBtnComplete={cn({ hidden: task.completed })}
              />
            ))
        )}
      </div>
      <Toaster position="bottom-left" expand={false} />
    </div>
  );
};
