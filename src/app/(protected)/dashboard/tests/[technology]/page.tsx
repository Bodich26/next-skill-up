"use client";

import { QuizItem } from "@/components/shared";
import { Button, Checkbox, Label, RadioGroup } from "@/components/ui";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { usePathname, useSearchParams } from "next/navigation";
import { number, optional } from "zod";

interface Question {
  id: number;
  description: string;
  role: "frontend" | "backend" | "design";
  technology:
    | "Html"
    | "Css"
    | "Js"
    | "React"
    | "Ts"
    | "Next"
    | "Web"
    | "Security";
  correctAnswer: string;
  wrongAnswers: string[];
}

interface IProps {
  questions: Question[];
}

const dataQuestions = [
  {
    id: 1,
    number: "1",
    description: "Что такое HTML?",
    role: "FRONT_END",
    technology: "HTML",
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
    id: 2,
    number: "2",
    description: "Какую роль играет doctype в HTML-документе?",
    role: "FRONT_END",
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
    id: 3,
    number: "3",
    description: "Что такое атрибуты в HTML?",
    role: "FRONT_END",
    technology: "HTML",
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
    id: 4,
    number: "4",
    description: "Какие глобальные атрибуты есть в HTML?",
    role: "FRONT_END",
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

export default function TechnologyTestPage({ questions }: IProps) {
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
  const pathname = usePathname();
  const technology = pathname.split("/").pop();

  if (
    typeof technology === "string" &&
    !validTechnologies.includes(technology)
  ) {
    return <h1>404 - Страница не найдена</h1>;
  }
  return (
    <div className="border-[1px] border-solid border-input bg-card rounded-lg p-4 min-h-[806px] max-h-[806px]">
      <div className=" flex items-center justify-between mb-7">
        <h3 className="font-bold text-3xl">
          Тесты по {""}
          {technology
            ? technology.charAt(0).toUpperCase() + technology.slice(1)
            : ""}
        </h3>
        <Button variant="default" size="lg" className="text-lg h-9 ">
          Завершить Тест
        </Button>
      </div>
      <div className="h-[700px] overflow-y-auto">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row overflow-y-auto gap-[64px] flex-wrap">
            <QuizItem numberQuestion={1} question={"dddd"} />
          </div>
        </div>
      </div>
    </div>
  );
}
