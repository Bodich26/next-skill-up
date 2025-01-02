import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import Image from "next/image";
import { PlusItemBox } from "./plusItemBox";

interface Props {
  className?: string;
  onClick: () => void;
  point: number;
  nameAward: string;
  descAward: string;
  imgAward: string;
}

export const AddAwardPopUp: React.FC<Props> = ({
  className,
  onClick,
  point,
  nameAward,
  descAward,
  imgAward,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleReceiveClick = () => {
    onClick();
    handleClose();
  };

  return (
    <div className={className}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger onClick={handleOpen}>
          {<PlusItemBox nameAward={nameAward} point={point} />}
        </DialogTrigger>
        <DialogContent className="flex justify-between max-w-[699px] min-h-[270px]">
          <div className="flex flex-col">
            <Image src={imgAward} width={149} height={149} alt="IconAward" />
            <Button
              className=" mt-[30px]"
              type="submit"
              onClick={handleReceiveClick}
            >
              Получить
            </Button>
          </div>
          <DialogHeader className=" gap-1">
            <DialogTitle className="font-bold text-3xl">
              {nameAward}
            </DialogTitle>
            <div className="w-[477px] h-[1px] bg-input rounded"></div>
            <DialogDescription className="font-normal text-base max-w-[477px]">
              {descAward}
            </DialogDescription>
            <strong className="font-bold text-2xl text-right text-current">
              + {point} Очков к рейтингу!
            </strong>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
