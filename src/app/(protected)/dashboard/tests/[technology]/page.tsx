"use client";
import React from "react";
import { QuizForm } from "@/components/shared/quizForm";
import { usePathname } from "next/navigation";
import { Role } from "@prisma/client";
import { Technology } from "@/type";

const dataQuestions = [
  {
    id: "1",
    number: "1",
    description: "Что такое HTML?",
    role: [Role.FRONT_END],
    technology: "CSS",
    optional: [
      {
        answer: "Язык разметки, который задает структуру веб-страниц.",
        isCorrect: true,
      },
      {
        answer: "Язык который управляет визуальным оформлением веб-страниц.",
        isCorrect: false,
      },
      {
        answer: "Язык программирования который задает структуру веб-страницы.",
        isCorrect: false,
      },
      {
        answer: "Стиль разметки веб-страницы, который задает оптимизацию.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "2",
    number: "2",
    description: "Какую роль играет doctype в HTML-документе?",
    role: [Role.FRONT_END],
    technology: "HTML",
    optional: [
      {
        answer:
          "Задает тип страницы, чтобы браузер правильно отображал её контент.",
        isCorrect: true,
      },
      {
        answer: "Оптимизирует веб-страницу, для лучшей работы.",
        isCorrect: false,
      },
      {
        answer: "Задает страницу тип, для работы с серверной логикой.",
        isCorrect: false,
      },
      {
        answer: "Заменяет часть контента на веб-странице, для оптимизации.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "3",
    number: "3",
    description: "Что такое атрибуты в HTML?",
    role: [Role.FRONT_END],
    technology: "JS",
    optional: [
      {
        answer:
          "Доп-свойства, которые задают параметры и характеристики HTML-элементов.",
        isCorrect: true,
      },
      {
        answer:
          "Специальные теги, используемые для подключения внешних стилей и скриптов.",
        isCorrect: false,
      },
      {
        answer: "Инструменты для отладки HTML-кода в браузере.",
        isCorrect: false,
      },
      {
        answer:
          "Метки, определяющие взаимодействие пользователя с элементами веб-страницы.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "4",
    number: "4",
    description: "Какие глобальные атрибуты есть в HTML?",
    role: [Role.FRONT_END],
    technology: "HTML",
    optional: [
      {
        answer: "class, id, style, data-*, hidden.",
        isCorrect: true,
      },
      {
        answer: "src, href, alt, title, role",
        isCorrect: false,
      },
      {
        answer: "onclick, onmouseover, onkeydown, onchange, ondrag",
        isCorrect: false,
      },
      {
        answer: "type, value, name, placeholder, required",
        isCorrect: false,
      },
    ],
  },
];

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
  const pathname = usePathname();
  const technology = pathname.split("/").pop()?.toLowerCase();

  const filterDataQuestions = React.useMemo(() => {
    return dataQuestions.filter(
      (type) => type.technology.toLowerCase() === technology
    );
  }, [technology]);

  if (
    typeof technology === "string" &&
    !validTechnologies.includes(technology)
  ) {
    return <h1>404 - Страница не найдена</h1>;
  }

  return (
    <QuizForm
      filterDataQuestions={filterDataQuestions}
      technology={technology as Technology}
    />
  );
}
