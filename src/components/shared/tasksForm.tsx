"use client";

import React from "react";
import { useSelector } from "react-redux";
import {
  setTaskDifficulty,
  setTaskName,
  addNewTaskToUser,
} from "../../redux/slices/tasksSlice";

import { useCurrentUser, useResetFilter } from "@/hooks";
import { Button, Input, Select } from "../ui";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Difficulty } from "@/type";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { toast } from "sonner";

interface Props {
  className?: string;
}

export const TasksForm: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const userCurrent = useCurrentUser();

  const { taskName, taskDifficulty } = useSelector(
    (state: any) => state.tasks.form
  );

  const { handleResetFilters } = useResetFilter([
    () => dispatch(setTaskName("")),
    () => dispatch(setTaskDifficulty("")),
  ]);

  const handleNameTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTaskName(e.target.value));
  };

  const handleDifficultyChange = (value: string) => {
    dispatch(setTaskDifficulty(value as Difficulty));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (taskName && taskDifficulty) {
      const loadingCreateTask = toast.loading("Загрузка...");

      const newTask = {
        userId: userCurrent!.id!,
        name: taskName,
        difficulty: taskDifficulty,
        completed: false,
      };

      try {
        await dispatch(addNewTaskToUser(newTask));
        toast.success("Задача успешно добавлена 😀");
        handleResetFilters();
      } catch (error) {
        toast.error("Ошибка при добавлении задачи 😞");
      } finally {
        toast.dismiss(loadingCreateTask);
      }
    }
  };

  return (
    <div>
      <h3 className="font-bold text-3xl text-center mb-6">Создать задачу</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center m-auto max-w-[250px]"
      >
        <Input
          value={taskName}
          onChange={(e) => handleNameTask(e)}
          placeholder="Введите название задачи"
          className="max-w-[100%]"
        />
        <Select value={taskDifficulty} onValueChange={handleDifficultyChange}>
          <SelectTrigger className="max-w-[100%]">
            <SelectValue placeholder="Выберите тип" />
          </SelectTrigger>
          <SelectContent>
            <span className="ml-2 text-primary">Вёрстка</span>
            <SelectItem value="Easy_layout">Легкая вёрстка</SelectItem>
            <SelectItem value="Medium_layout">Средняя вёрстка</SelectItem>
            <SelectItem value="Hard_layout">Тяжёлая вёрстка</SelectItem>
            <span className="ml-2 text-primary">Приложение</span>
            <SelectItem value="Easy_App">Легкое Приложение</SelectItem>
            <SelectItem value="Medium_App">Среднее Приложение</SelectItem>
            <SelectItem value="Hard_App">Тяжёлое Приложение</SelectItem>
            <span className="ml-2 text-primary">Изучение</span>
            <SelectItem value="Learning_Info">Изучение теории</SelectItem>
          </SelectContent>
        </Select>
        {(taskName || taskDifficulty) && (
          <Button
            variant="secondary"
            size="lg"
            className="text-lg h-9 inline"
            onClick={handleResetFilters}
          >
            Сбросить
          </Button>
        )}
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="text-lg h-9"
        >
          Добавить
        </Button>
      </form>
    </div>
  );
};
