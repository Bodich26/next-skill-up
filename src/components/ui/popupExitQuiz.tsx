"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";

interface IProps {
  triggerButton: React.ReactElement;
  nameTechnology: string;
  className?: string;
}

export const PopupExitQuiz: React.FC<IProps> = ({
  triggerButton,
  nameTechnology,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const router = useRouter();

  const handleExitTests = () => {
    handleClose();
    router.push("/dashboard/tests");
  };

  return (
    <div className={className}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger onClick={handleOpen}>{triggerButton}</DialogTrigger>
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
              Вы действительно хотите отменить тестирование?
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
