import React from "react";
import { Label, RadioGroup } from "../ui";
import { RadioGroupItem } from "../ui/radio-group";
import { useFormContext } from "react-hook-form";

interface AnswerOptionItem {
  answer: string;
  isCorrect: boolean;
}

interface Props {
  numberQuestion: string;
  question: string;
  answerOptionItem: AnswerOptionItem[];
  quizId: string;
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
          <RadioGroup>
            {answerOptionItem.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <RadioGroupItem
                  value={item.answer}
                  id={`${quizId}-${index}`}
                  {...register(`selectedAnswers.${quizId}`)}
                />
                <Label htmlFor={`${quizId}-${index}`}>{item.answer}</Label>
              </div>
            ))}
          </RadioGroup>
        </li>
      </ul>
    </div>
  );
};

export default QuizItem;
