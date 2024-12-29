import { Label, RadioGroup } from "../ui";
import { RadioGroupItem } from "../ui/radio-group";

interface Props {
  answerOption: string;
  answerHtmlOption: string;
  idOption: string;
  valueOption: string;
}

export const QuizAnswer: React.FC<Props> = ({
  answerOption,
  idOption,
  valueOption,
  answerHtmlOption,
}) => {
  return (
    <div className=" border-l-2 border-solid border-input basis-[45%]">
      <div className="ml-3 ">
        <RadioGroup className="gap-3">
          <div className="flex items-center gap-2">
            <RadioGroupItem value={valueOption} id={idOption} />
            <Label htmlFor={answerHtmlOption}>{answerOption}</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default QuizAnswer;
