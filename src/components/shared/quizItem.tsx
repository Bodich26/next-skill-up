import React from "react";
import { Label, RadioGroup } from "../ui";
import { RadioGroupItem } from "../ui/radio-group";
import { useFormContext } from "react-hook-form";
import { QuizAnswer } from "@prisma/client";

interface Props {
  numberQuestion: number;
  question: string;
  answerOptionItem: QuizAnswer[];
  quizId: number;
}

export const QuizItem: React.FC<Props> = ({
  numberQuestion,
  question,
  answerOptionItem,
  quizId,
}) => {
  const { register } = useFormContext();

  return (
    <div className="flex justify-between border-[1px] border-solid border-input bg-card rounded-lg p-4 w-[100%] gap-1">
      <div className="flex flex-col gap-3 basis-[55%]">
        <span>
          Номер: <b className="font-bold text-base">{numberQuestion}</b>
        </span>
        <span>
          Вопрос: <b className="font-bold text-base">{question}</b>
        </span>
      </div>
      <ul className="border-l-2 border-solid border-input basis-[45%]">
        <li className="ml-3 flex flex-col gap-4">
          <RadioGroup className="flex flex-col gap-4">
            {answerOptionItem.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <RadioGroupItem
                  value={item.text}
                  id={`${quizId}-${index}`}
                  {...register(`selectedAnswers.${quizId}`)}
                />
                <Label className=" leading-5" htmlFor={`${quizId}-${index}`}>
                  {item.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </li>
      </ul>
    </div>
  );
};

export default QuizItem;
