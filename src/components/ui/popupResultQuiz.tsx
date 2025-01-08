"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";

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
  const router = useRouter();

  const handleExitTests = () => {
    onClose();
    router.push("/dashboard/tests");
  };

  return (
    <div className={className}>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex justify-between flex-col-reverse ">
          <Button
            className=" mt-[30px]"
            type="submit"
            onClick={() => handleExitTests()}
          >
            Подтвердить
          </Button>
          <DialogHeader className=" gap-1">
            <DialogTitle className="font-bold text-3xl">
              Тесты по {nameTechnology}
            </DialogTitle>
            <div className="w-[477px] h-[1px] bg-input rounded"></div>
            <DialogDescription className="font-normal text-base max-w-[477px]">
              Правильных ответов : {correctAnswer} <br />
              Не правильных ответов : {wrongAnswer}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
