"use client";
import React from "react";
import { QuizForm } from "@/components/shared/quizForm";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Technology } from "@prisma/client";
import { QuizItemWithAnswers } from "@/type";
import { fetchQuizItems } from "@/redux/slices/quizSlice";

const validTechnologies = [
  "html",
  "css",
  "js",
  "react",
  "ts",
  "next",
  "web",
  "security",
];

export default function TechnologyTestPage() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const technology = pathname.split("/").pop()?.toLowerCase();
  const { quiz, statusQuiz, errorQuiz } = useSelector(
    (state: RootState) => state.quiz
  );

  React.useEffect(() => {
    if (statusQuiz === "idle") {
      dispatch(fetchQuizItems());
    }
  }, [statusQuiz, dispatch]);

  const filterDataQuiz = React.useMemo(() => {
    return quiz.filter((type) => type.technology.toLowerCase() === technology);
  }, [technology, quiz]);

  if (
    typeof technology === "string" &&
    !validTechnologies.includes(technology)
  ) {
    return <h1>404 - Страница не найдена</h1>;
  }

  return (
    <QuizForm
      filterQuiz={filterDataQuiz as QuizItemWithAnswers[]}
      technology={technology as Technology}
    />
  );
}
