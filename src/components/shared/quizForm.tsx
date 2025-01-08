"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { QuizItem, SkeletonQuizItem } from "@/components/shared";
import { Button, PopupExitQuiz, PopupResultQuiz } from "@/components/ui";
import { QuizAnswer, Technology } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { QuizItemWithAnswers } from "@/type";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface IProps {
  filterQuiz: QuizItemWithAnswers[];
  technology: Technology;
}

export const QuizForm = ({ filterQuiz, technology }: IProps) => {
  const [arrayAnswers, setArrayAnswers] = React.useState<QuizAnswer[]>([]);
  const [correctAnswers, setCorrectAnswers] = React.useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = React.useState<number>(0);
  const [isPopupResultOpen, setIsPopupResultOpen] =
    React.useState<boolean>(false);
  const { statusQuiz } = useSelector((state: RootState) => state.quiz);
  const router = useRouter();

  const nameTechnology = technology
    ? technology.charAt(0).toUpperCase() + technology.slice(1)
    : "";

  const noQuestions = filterQuiz.length == 0;

  const handleExitTests = () => {
    router.push("/dashboard/tests");
  };

  const onAnswerSelect = (answerItem: QuizAnswer, quizItemId: number) => {
    let updatedAnswers = [...arrayAnswers];

    const existingAnswerIndex = updatedAnswers.findIndex(
      (answer) => answer.quizItemId === quizItemId
    );
    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex] = answerItem;
    } else {
      updatedAnswers.push(answerItem);
    }
    setArrayAnswers(updatedAnswers);

    const result = sortingSelectedAnswers(updatedAnswers);
    setCorrectAnswers(result.correctAnswers);
    setWrongAnswers(result.wrongAnswers);
  };

  const sortingSelectedAnswers = (filteredAnswers: QuizAnswer[]) => {
    let correctAnswers = 0;
    let wrongAnswers = 0;

    filteredAnswers.forEach((answer) => {
      answer.isCorrect ? (correctAnswers += 1) : (wrongAnswers += 1);
    });

    return { correctAnswers, wrongAnswers };
  };

  const isSubmitDisabled =
    statusQuiz === "loading" ||
    filterQuiz.length === 0 ||
    arrayAnswers.length !== filterQuiz.length;

  const handleOpenPopupResultQuiz = () => {
    setIsPopupResultOpen(true);
  };

  const handleClosePopupResultQuiz = () => {
    setIsPopupResultOpen(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setArrayAnswers([]);
  };

  return (
    <div className="border-[1px] border-solid border-input bg-card rounded-lg p-4 flex-grow">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          {noQuestions ? (
            <ChevronLeft
              width={32}
              height={32}
              className="cursor-pointer hover:text-primary duration-300 ease-in"
              onClick={() => handleExitTests()}
            />
          ) : (
            <PopupExitQuiz
              className="flex items-center"
              triggerButton={
                <ChevronLeft
                  width={32}
                  height={32}
                  className="cursor-pointer hover:text-primary transition-bg duration-300 ease-in-out"
                />
              }
              nameTechnology={nameTechnology}
            />
          )}
          <h3 className="font-bold text-3xl">Тесты по {nameTechnology}</h3>
        </div>
        <Button
          disabled={isSubmitDisabled}
          onClick={() => handleOpenPopupResultQuiz()}
          type="submit"
          variant="default"
          size="lg"
          className="text-lg h-9"
        >
          Завершить Тест
        </Button>
      </div>
      <div className="flex flex-col gap-5 overflow-y-auto max-h-[750px]">
        {noQuestions ? (
          <SkeletonQuizItem />
        ) : noQuestions ? (
          <p className="text-center text-xl">Вопросов нет 😞</p>
        ) : (
          filterQuiz.map((quiz) => (
            <QuizItem
              key={quiz.id}
              numberQuestion={quiz.number}
              question={quiz.description}
              answerOptionItem={quiz.optional}
              quizId={quiz.id}
              onAnswerSelect={onAnswerSelect}
            />
          ))
        )}
      </div>
      {isPopupResultOpen && (
        <PopupResultQuiz
          isOpen={isPopupResultOpen}
          onClose={handleClosePopupResultQuiz}
          className="flex items-center"
          nameTechnology={nameTechnology}
          correctAnswer={correctAnswers}
          wrongAnswer={wrongAnswers}
        />
      )}
    </div>
  );
};
