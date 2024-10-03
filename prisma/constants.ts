import { Prisma } from "@prisma/client";

export const rewards: Prisma.RewardCreateManyInput[] = [
  {
    name: "HTML",
    icon: "https://imgur.com/WasM7ZN.png",
    description:
      "HTML (HyperText Markup Language) — это основа веб-разработки, позволяющая создавать структуры страниц и контент. Изучение HTML открывает двери в мир веб-разработки.",
    points: 400,
    role: "FRONT_END",
  },
  {
    name: "CSS",
    icon: "https://imgur.com/Im8BFm1.png",
    description:
      "CSS (Cascading Style Sheets) позволяет стилизовать ваши веб-страницы, делая их более привлекательными и удобными для пользователя. Умение работать с CSS значительно улучшает ваш веб-дизайн.",
    points: 600,
    role: "FRONT_END",
  },
  {
    name: "JavaScript",
    icon: "https://imgur.com/WjuaQjE.png",
    description:
      "JavaScript — это язык программирования, который делает ваши веб-страницы интерактивными. Знание JavaScript позволяет создавать динамичные и отзывчивые интерфейсы.",
    points: 1000,
    role: "FRONT_END",
  },
  {
    name: "React",
    icon: "https://imgur.com/ckTBU7X.png",
    description:
      "React — это библиотека JavaScript для создания пользовательских интерфейсов. Она позволяет разрабатывать многоразовые компоненты, что упрощает процесс разработки.",
    points: 1200,
    role: "FRONT_END",
  },
  {
    name: "TypeScript",
    icon: "https://imgur.com/uhiiopP.png",
    description:
      "TypeScript — это надстройка над JavaScript, добавляющая статическую типизацию. Она помогает предотвращать ошибки на этапе компиляции и улучшает читаемость кода.",
    points: 600,
    role: "FRONT_END",
  },
  {
    name: "Redux",
    icon: "https://imgur.com/GhF8a6p.png",
    description:
      "Redux — это библиотека для управления состоянием приложения. Она упрощает обмен данными между компонентами и делает приложение более предсказуемым.",
    points: 600,
    role: "FRONT_END",
  },
  {
    name: "Next.js",
    icon: "https://imgur.com/QrMzB16.png",
    description:
      "Next.js — это фреймворк для React, который позволяет создавать серверные рендеринговые приложения и статические сайты с улучшенной производительностью.",
    points: 700,
    role: "FRONT_END",
  },
  {
    name: "Node.js",
    icon: "https://imgur.com/MzLkOxU.png",
    description:
      "Node.js — это среда выполнения JavaScript на сервере. Она позволяет разрабатывать масштабируемые сетевые приложения с высокой производительностью.",
    points: 1400,
    role: "FRONT_END",
  },
  {
    name: "UI/UX Design",
    icon: "https://imgur.com/rSTIlTA.png",
    description:
      "UI/UX дизайн — это процесс создания интуитивно понятных интерфейсов и положительного пользовательского опыта. Знание принципов дизайна помогает создавать привлекательные приложения.",
    points: 700,
    role: "FRONT_END",
  },
  {
    name: "WordPress",
    icon: "https://imgur.com/b9XEVxL.png",
    description:
      "WordPress — это популярная система управления контентом (CMS), которая позволяет быстро и легко создавать и управлять веб-сайтами без необходимости программирования.",
    points: 700,
    role: "FRONT_END",
  },
  {
    name: "Git",
    icon: "https://imgur.com/idlj4BO.png",
    description:
      "Git — это система контроля версий, позволяющая отслеживать изменения в коде и совместно работать над проектами. Она является незаменимым инструментом для разработчиков.",
    points: 550,
    role: "FRONT_END",
  },
  {
    name: "API",
    icon: "https://imgur.com/wyQH1qJ.png",
    description:
      "API (Application Programming Interface) позволяет различным приложениям взаимодействовать друг с другом. Знание работы с API существенно расширяет возможности ваших проектов.",
    points: 650,
    role: "FRONT_END",
  },
  {
    name: "Python",
    icon: "https://imgur.com/wyQH1qJ.png",
    description:
      "Python — это мощный и универсальный язык программирования, который позволяет создавать самые разные приложения. Знание Python существенно расширяет возможности ваших проектов.",
    points: 1360,
    role: "BACK_END",
  },
];
