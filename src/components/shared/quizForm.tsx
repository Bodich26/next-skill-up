"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { QuizItem } from "@/components/shared";
import { Button, Form, PopupExitQuiz } from "@/components/ui";
import { useForm } from "react-hook-form";
import { quizSchema } from "@/components/shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Technology } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { QuizItemWithAnswers } from "@/type";

interface IProps {
  filterQuiz: QuizItemWithAnswers[];
  technology: Technology;
}

export const QuizForm = ({ filterQuiz, technology }: IProps) => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const quizPost = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      selectedAnswers: {},
    },
  });

  const handleSubmitQuiz = async (data: any) => {
    startTransition(async () => {
      try {
        console.log("Форма отправляется");
        console.log("Ответы на квиз:", data.selectedAnswers);
      } catch (error) {
        console.log("Ошибка на квиз:", error);
      }
    });
  };

  const nameTechnology = technology
    ? technology.charAt(0).toUpperCase() + technology.slice(1)
    : "";
  const noQuestions = filterQuiz.length == 0;

  const handleExitTests = () => {
    router.push("/dashboard/tests");
  };

  return (
    <>
      <Form {...quizPost}>
        <form onSubmit={quizPost.handleSubmit(handleSubmitQuiz)}>
          <div className="border-[1px] border-solid border-input bg-card rounded-lg p-4 ">
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
                <h3 className="font-bold text-3xl">
                  Тесты по {nameTechnology}
                </h3>
              </div>
              <Button
                disabled={isPending}
                type="submit"
                variant="default"
                size="lg"
                className="text-lg h-9"
                onClick={() => console.log("Кнопка нажата")}
              >
                Завершить Тест
              </Button>
            </div>
            <div className="h-[700px] overflow-y-auto">
              <div className="flex flex-col gap-5">
                <div className="flex flex-row overflow-y-auto gap-[28px] flex-wrap">
                  {noQuestions ? (
                    <h2>Нету Вопросов</h2>
                  ) : (
                    filterQuiz.map((quiz) => (
                      <QuizItem
                        key={quiz.id}
                        numberQuestion={quiz.number}
                        question={quiz.description}
                        answerOptionItem={quiz.optional}
                        quizId={quiz.id}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
