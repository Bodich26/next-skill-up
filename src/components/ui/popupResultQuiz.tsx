"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

interface IProps {
  nameTechnology: string;
  correctAnswer: number;
  wrongAnswer: number;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PopupResultQuiz: React.FC<IProps> = ({
  nameTechnology,
  correctAnswer,
  wrongAnswer,
  className,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={className}>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className=" gap-1">
            <AlertDialogTitle className="font-bold text-3xl">
              Тесты по {nameTechnology}
            </AlertDialogTitle>
            <div className="w-[100%] h-[1px] bg-input rounded"></div>
            <AlertDialogDescription className="font-normal text-base">
              Правильных ответов : {correctAnswer} <br />
              Не правильных ответов : {wrongAnswer}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="w-[100%] mt-[2px]"
              type="submit"
              onClick={() => onClose()}
            >
              Подтвердить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
