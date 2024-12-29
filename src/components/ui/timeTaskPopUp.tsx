import React from "react";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import {
  fetchTasksList,
  setTimeValueCompleteTask,
} from "@/redux/slices/tasksSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks";

interface Props {
  className?: string;
  classNameTrigger: string;
  triggerButton: any;
  onClickConfirmPopUp: () => void;
}

interface IInput {
  time: number;
}

export const TimeTaskPopUp: React.FC<Props> = ({
  className,
  triggerButton,
  onClickConfirmPopUp,
  classNameTrigger,
}) => {
  const { formState, handleSubmit, register, reset } = useForm<IInput>();
  const [timeValue, setTimeValue] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isBlock, setIsBlock] = React.useState<boolean>(true);

  const userCurrent = useCurrentUser();

  const dispatch = useAppDispatch();
  const timeError = formState.errors.time?.message;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    reset();
    setIsOpen(false);
    setIsBlock(true);
  };

  React.useEffect(() => {
    if (!isOpen) {
      reset();
      setTimeValue("");
      setIsBlock(true);
    }
  }, [isOpen, reset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value.startsWith("0")) {
      value = value.slice(1);
    }

    setTimeValue(value);

    if (value && Number(value) > 0) {
      setIsBlock(false);
    } else {
      setIsBlock(true);
    }
  };

  const handleCompleteTask = async (data: IInput) => {
    console.log(data.time);

    const loadingToastId = toast.loading("Загрузка...");

    try {
      const resultTimeAction = await dispatch(
        setTimeValueCompleteTask({
          time: data.time,
          userId: userCurrent!.id!,
        })
      );

      if (setTimeValueCompleteTask.fulfilled.match(resultTimeAction)) {
        await dispatch(fetchTasksList());
        toast.success("Время изучения успешно обновлено 😀");
      } else if (setTimeValueCompleteTask.rejected.match(resultTimeAction)) {
        toast.error("Ошибка при добавлении времени 😞");
      }
    } catch (error) {
      toast.error("Произошла ошибка при добавлении времени 😞");
    } finally {
      toast.dismiss(loadingToastId);
    }
    handleClose();
  };

  return (
    <div className={className}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger onClick={handleOpen} className={classNameTrigger}>
          {triggerButton}
        </DialogTrigger>
        <DialogContent className="flex justify-between">
          <DialogHeader className="gap-1">
            <DialogTitle className="font-bold text-3xl">
              Сколько времени?
            </DialogTitle>
            <div className="h-[1px] bg-input rounded"></div>
            <DialogDescription className="font-normal text-base ">
              Введите количество времени, которое потребовалось для выполнения
              задачи!
            </DialogDescription>

            {timeError && <p className="text-primary">{timeError}</p>}
            <form
              className="flex gap-3 items-center justify-between"
              onSubmit={handleSubmit(handleCompleteTask)}
            >
              <Button
                disabled={isBlock}
                className="w-[150px] mt-4"
                type="submit"
                onClick={onClickConfirmPopUp}
              >
                Подтвердить
              </Button>

              <Input
                {...register("time", {
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || "Введите положительное значение",
                })}
                className="w-[309px] mt-4"
                type="text"
                placeholder="Введите количество часов"
                value={timeValue}
                onChange={handleInputChange}
              />
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
