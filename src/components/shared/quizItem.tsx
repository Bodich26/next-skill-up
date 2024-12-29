import { Label, RadioGroup } from "../ui";
import { RadioGroupItem } from "../ui/radio-group";
import QuizAnswer from "./quizAnswer";

interface Props {
  numberQuestion: number;
  question: string;
}

export const QuizItem: React.FC<Props> = ({ numberQuestion, question }) => {
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
      <QuizAnswer
        answerHtmlOption={"ffff"}
        answerOption={"ffff"}
        idOption={"fff"}
        valueOption={"fff"}
      />
    </div>
  );
};

export default QuizItem;
