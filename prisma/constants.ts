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

export const quizQuestions: Prisma.QuizItemCreateInput[] = [
  {
    number: 1,
    description: "Что такое HTML?",
    roles: ["FRONT_END"],
    technology: "HTML",
    optional: {
      create: [
        {
          text: "Язык разметки, который задает структуру веб-страниц.",
          isCorrect: true,
        },
        {
          text: "Язык, который управляет визуальным оформлением веб-страниц.",
          isCorrect: false,
        },
        {
          text: "Язык программирования который задает структуру веб-страницы.",
          isCorrect: false,
        },
        {
          text: "Стиль разметки веб-страницы, который задает оптимизацию.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 2,
    description: "Какую роль играет doctype в HTML-документе?",
    roles: ["FRONT_END"],
    technology: "HTML",
    optional: {
      create: [
        {
          text: "Задает тип страницы, чтобы браузер правильно отображал её контент.",
          isCorrect: true,
        },
        {
          text: "Оптимизирует веб-страницу, для лучшей работы.",
          isCorrect: false,
        },
        {
          text: "Задает страницу тип, для работы с серверной логикой.",
          isCorrect: false,
        },
        {
          text: "Заменяет часть контента на веб-странице, для оптимизации.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 3,
    description: "Что такое атрибуты в HTML?",
    roles: ["FRONT_END"],
    technology: "HTML",
    optional: {
      create: [
        {
          text: "Доп-свойства, которые задают параметры и характеристики HTML-элементов.",
          isCorrect: true,
        },
        {
          text: "Специальные теги, используемые для подключения внешних стилей и скриптов.",
          isCorrect: false,
        },
        {
          text: "Инструменты для отладки HTML-кода в браузере.",
          isCorrect: false,
        },
        {
          text: "Метки, определяющие взаимодействие пользователя с элементами веб-страницы.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 4,
    description: "Какие глобальные атрибуты есть в HTML?",
    roles: ["FRONT_END"],
    technology: "HTML",
    optional: {
      create: [
        {
          text: "src, href, alt, title, role",
          isCorrect: false,
        },
        {
          text: "onclick, onmouseover, onkeydown, onchange, ondrag",
          isCorrect: false,
        },
        {
          text: "class, id, style, data-*, hidden.",
          isCorrect: true,
        },
        {
          text: "type, value, name, placeholder, required",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 5,
    description: "Объясните разницу между тегами `<span>` и `<div>`?",
    roles: ["FRONT_END"],
    technology: "HTML",
    optional: {
      create: [
        {
          text: "<span> используется для группировки блоков и является блочным элементом, а <div> нужен для выделения текста и является строчным элементом.",
          isCorrect: false,
        },
        {
          text: "<span> используют для выделения текста, является строчным элементом, а <div> нужен для группировки блоков, и является блочным.",
          isCorrect: true,
        },
        {
          text: "<span> используется для выделения текста и является блочным элементом, а <div> нужен для группировки блоков и является строчным элементом.",
          isCorrect: false,
        },
        {
          text: "<span> используется для выделения текста и является блочным элементом, а <div> нужен для выделения текста и является строчным элементом.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 6,
    description: "Что такое CSS и для чего он используется?",
    roles: ["FRONT_END"],
    technology: "CSS",
    optional: {
      create: [
        {
          text: "CSS — это язык программирования для создания веб-страниц и используется для организации структуры данных.",
          isCorrect: false,
        },
        {
          text: "CSS — это система управления базами данных, используемая для хранения информации о веб-страницах.",
          isCorrect: false,
        },
        {
          text: "CSS — это каскадная таблица стилей, которая описывает внешний вид страницы.",
          isCorrect: true,
        },
        {
          text: "CSS — это инструмент для программирования серверной логики и используется для взаимодействия с пользователем через базу данных.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 7,
    description: "Чем отличается внутренний, внешний и инлайновый CSS?",
    roles: ["FRONT_END"],
    technology: "CSS",
    optional: {
      create: [
        {
          text: "Внутренний CSS пишется внутри HTML странице в теге <style>, внешний подключается в head странице через link, а инлайновый в атребуте style к каждому элементу.",
          isCorrect: true,
        },
        {
          text: "Внутренний CSS — это стили, написанные в HTML-элементах, внешний CSS применяется только к тексту, а инлайновый CSS не влияет на страницы.",
          isCorrect: false,
        },
        {
          text: "Внутренний CSS используется для стилизации изображений, внешний CSS — для текста, а инлайновый CSS — для фонов.",
          isCorrect: false,
        },
        {
          text: "Внутренний CSS задается на сервере, внешний CSS — в базе данных, а инлайновый CSS работает только в браузере.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 8,
    description: "Что такое селекторы в CSS? Приведите примеры.",
    roles: ["FRONT_END"],
    technology: "CSS",
    optional: {
      create: [
        {
          text: "Селекторы в CSS — это теги, которые задают только цвет фона элементов.",
          isCorrect: false,
        },
        {
          text: "Селекторы используются для выбора только классов элементов, но не для идентификаторов или тегов.",
          isCorrect: false,
        },
        {
          text: "Селекторы нужны для того что бы задать элементам стили, через class, id, или через сам тег.",
          isCorrect: true,
        },
        {
          text: "Селекторы — это элементы, которые добавляют шрифты и изображения на веб-страницу.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 9,
    description: "Как изменить цвет текста с помощью CSS?",
    roles: ["FRONT_END"],
    technology: "CSS",
    optional: {
      create: [
        {
          text: "Используя тег <color>.",
          isCorrect: false,
        },
        {
          text: "Используя атрибут background-color.",
          isCorrect: false,
        },
        {
          text: "Через свойство color.",
          isCorrect: true,
        },
        {
          text: "Изменяя свойство font-size.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 10,
    description: "Как изменить размер шрифта на странице?",
    roles: ["FRONT_END"],
    technology: "CSS",
    optional: {
      create: [
        {
          text: "Используя свойство font-color.",
          isCorrect: false,
        },
        {
          text: "Через свойство font-size.",
          isCorrect: true,
        },
        {
          text: "Используя атрибут font-size в HTML.",
          isCorrect: false,
        },
        {
          text: "Используя свойство text-size.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 11,
    description: "Что такое Js?",
    roles: ["FRONT_END"],
    technology: "JS",
    optional: {
      create: [
        {
          text: "Js — это язык программирования который используется для создания интерактивных и динамических элементов на странице.",
          isCorrect: true,
        },
        {
          text: "JS — это язык разметки, используемый для структурирования веб-страниц.",
          isCorrect: false,
        },
        {
          text: "JS — это тип файла, который содержит изображения для веб-страниц.",
          isCorrect: false,
        },
        {
          text: "JS — это система управления базами данных для серверов.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 12,
    description: "Типы данных в JS",
    roles: ["FRONT_END"],
    technology: "JS",
    optional: {
      create: [
        {
          text: "Существует 10 типов данных, включая Date и RegExp.",
          isCorrect: false,
        },
        {
          text: "Типы данных ограничиваются только числом, строкой и объектом.",
          isCorrect: false,
        },
        {
          text: "Существует только 5 типов данных: String, Number, Boolean, Object и Null.",
          isCorrect: false,
        },
        {
          text: "Существует 8 типов данных такие как: String, Number, Boolean, Object, Null, Undefiend, Symbol, BigInt.",
          isCorrect: true,
        },
      ],
    },
  },
  {
    number: 13,
    description: "Разница между == и ===",
    roles: ["FRONT_END"],
    technology: "JS",
    optional: {
      create: [
        {
          text: "Строгое сравнение проверяет тип данных и значение, а не строгое сравнение — только значение.",
          isCorrect: false,
        },
        {
          text: "Не строгое сравнение сравнивает объекты по ссылке, а строгое всегда возвращает false.",
          isCorrect: false,
        },
        {
          text: "Разница в том что не строгое сравнение просто сравнивает операнды, а строгое дополнительно сравнивает на тип данных.",
          isCorrect: true,
        },
        {
          text: "Строгое сравнение используется для слабого сравнения, а не строгое — для сильного.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 14,
    description: "Разница между null и undefiend?",
    roles: ["FRONT_END"],
    technology: "JS",
    optional: {
      create: [
        {
          text: "Они обозначают отсутствие данных, Undefiend когда переменные небыли объявлены, функции которое ничего не возвращает, несуществующего свойства объекта. Null явное отсутствие данных.",
          isCorrect: true,
        },
        {
          text: "undefined — это объект, а null — это тип данных.",
          isCorrect: false,
        },
        {
          text: "null означает отсутствие значения, а undefined — это просто пустое значение.",
          isCorrect: false,
        },
        {
          text: "undefined — это значение, которое присваивается переменной, а null — это результат ошибки.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 15,
    description: "Что такое Strict mode в JavaScript?",
    roles: ["FRONT_END"],
    technology: "JS",
    optional: {
      create: [
        {
          text: "Это режим, который позволяет использовать устаревшие методы и функции JavaScript.",
          isCorrect: false,
        },
        {
          text: "Это режим, который разрешает использование глобальных переменных без объявления.",
          isCorrect: false,
        },
        {
          text: "Это режим, который делает код менее производительным для браузеров.",
          isCorrect: false,
        },
        {
          text: "Это строгий режим который более строго относится к написанному коду, был добавлен в ES6",
          isCorrect: true,
        },
      ],
    },
  },
  {
    number: 16,
    description: "Что такое компонент в React?",
    roles: ["FRONT_END"],
    technology: "REACT",
    optional: {
      create: [
        {
          text: "Компонент — это самостоятельная часть пользовательского интерфейса, которая может быть функциональной или классовой, и возвращает JSX.",
          isCorrect: true,
        },
        {
          text: "Компонент — это просто HTML-код, который используется в React.",
          isCorrect: false,
        },
        {
          text: "Компонент — это функция, которая вызывает методы React.",
          isCorrect: false,
        },
        {
          text: "Компонент — это глобальная переменная, которая доступна везде в приложении.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 17,
    description: "Что такое JSX в React?",
    roles: ["FRONT_END"],
    technology: "REACT",
    optional: {
      create: [
        {
          text: "JSX — это синтаксическое расширение JavaScript, которое позволяет писать HTML-подобный код внутри JavaScript-функций.",
          isCorrect: true,
        },
        {
          text: "JSX — это специальная библиотека для создания компонентов в React.",
          isCorrect: false,
        },
        {
          text: "JSX — это тип данных, используемый только в React.",
          isCorrect: false,
        },
        {
          text: "JSX — это синтаксис, который заменяет JavaScript в React.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 18,
    description:
      "Какой метод используется для обновления состояния компонента в React?",
    roles: ["FRONT_END"],
    technology: "REACT",
    optional: {
      create: [
        {
          text: "Метод setState() используется для обновления состояния в классовых компонентах, а в функциональных компонентах для этого используется хук useState().",
          isCorrect: true,
        },
        {
          text: "Метод updateState() используется для обновления состояния в React.",
          isCorrect: false,
        },
        {
          text: "Метод render() используется для обновления состояния компонента.",
          isCorrect: false,
        },
        {
          text: "Метод changeState() используется для обновления состояния.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 19,
    description: "Что такое хук useEffect в React?",
    roles: ["FRONT_END"],
    technology: "REACT",
    optional: {
      create: [
        {
          text: "useEffect используется для управления состоянием компонента.",
          isCorrect: false,
        },
        {
          text: "useEffect позволяет создавать компоненты в React.",
          isCorrect: false,
        },
        {
          text: "useEffect — это хук, который позволяет выполнять побочные эффекты, такие как запросы к серверу или манипуляции с DOM, после рендеринга компонента.",
          isCorrect: true,
        },
        {
          text: "useEffect используется для синхронизации данных между компонентами.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 20,
    description:
      "Как можно передать данные от родительского компонента к дочернему в React?",
    roles: ["FRONT_END"],
    technology: "REACT",
    optional: {
      create: [
        {
          text: "Данные передаются через методы жизненного цикла компонента.",
          isCorrect: false,
        },
        {
          text: "Данные передаются через props (свойства) от родительского компонента к дочернему.",
          isCorrect: true,
        },
        {
          text: "Данные передаются через state (состояние) от родительского компонента к дочернему.",
          isCorrect: false,
        },
        {
          text: "Данные передаются с помощью глобальной переменной, доступной во всей иерархии компонентов.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 21,
    description: "Что такое TypeScript?",
    roles: ["FRONT_END"],
    technology: "TS",
    optional: {
      create: [
        {
          text: "TypeScript — это надмножество JavaScript, которое добавляет статическую типизацию и позволяет использовать более строгие правила для кода.",
          isCorrect: true,
        },
        {
          text: "TypeScript — это новая версия JavaScript с улучшенными функциями синтаксиса.",
          isCorrect: false,
        },
        {
          text: "TypeScript — это другой язык программирования, который не поддерживает JavaScript.",
          isCorrect: false,
        },
        {
          text: "TypeScript — это просто JavaScript с дополнительными комментариями.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 22,
    description: "Как объявить переменную с типом в TypeScript?",
    roles: ["FRONT_END"],
    technology: "TS",
    optional: {
      create: [
        {
          text: "Тип переменной в TypeScript указывается через знак равенства: let num = 10 : number;",
          isCorrect: false,
        },
        {
          text: "Переменная в TypeScript объявляется без указания типа.",
          isCorrect: false,
        },
        {
          text: "Переменная объявляется с использованием типа, например: let num: number = 10;",
          isCorrect: true,
        },
        {
          text: "Тип переменной в TypeScript указывается в скобках: let num(type: number) = 10;",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 23,
    description: "Что такое интерфейсы в TypeScript?",
    roles: ["FRONT_END"],
    technology: "TS",
    optional: {
      create: [
        {
          text: "Интерфейсы — это просто аннотации для улучшения автозаполнения в редакторе кода.",
          isCorrect: false,
        },
        {
          text: "Интерфейсы — это типы данных, которые нельзя использовать в других частях программы.",
          isCorrect: false,
        },
        {
          text: "Интерфейсы — это классы, которые могут реализовывать другие классы.",
          isCorrect: false,
        },
        {
          text: "Интерфейсы — определяют структуру объектов, задавая требования к полям и их типам, а также к методам, если они присутствуют.",
          isCorrect: true,
        },
      ],
    },
  },
  {
    number: 24,
    description: "Как задать тип для функции в TypeScript?",
    roles: ["FRONT_END"],
    technology: "TS",
    optional: {
      create: [
        {
          text: "Тип функции в TypeScript задается через аннотацию типов для параметров и возвращаемого значения.",
          isCorrect: true,
        },
        {
          text: "Тип функции задается через =>, например: function add(a, b): number => { return a + b; }.",
          isCorrect: false,
        },
        {
          text: "Функцию в TypeScript нельзя типизировать.",
          isCorrect: false,
        },
        {
          text: "Для функции в TypeScript достаточно указать только тип возвращаемого значения.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 25,
    description: "Что такое any в TypeScript?",
    roles: ["FRONT_END"],
    technology: "TS",
    optional: {
      create: [
        {
          text: "Тип any запрещает использовать переменную в TypeScript.",
          isCorrect: false,
        },
        {
          text: "Тип any используется для указания конкретного типа, который нужно использовать для переменной.",
          isCorrect: false,
        },
        {
          text: "Тип any позволяет переменной принимать значения любого типа, фактически отключая проверку типов для этой переменной.",
          isCorrect: true,
        },
        {
          text: "Тип any позволяет переменной принимать только строковые значения.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 26,
    description: "Что такое Next?",
    roles: ["FRONT_END"],
    technology: "NEXT",
    optional: {
      create: [
        {
          text: "Это JavaScript фреймворк для создания мобильных приложений.",
          isCorrect: false,
        },
        {
          text: "Это фреймворк для работы с базами данных в JavaScript.",
          isCorrect: false,
        },
        {
          text: "Это библиотека для стилизации компонентов в React.",
          isCorrect: false,
        },
        {
          text: "Это фреймворк для React, который предоставляет возможности для серверного рендеринга, статической генерации и маршрутизации.",
          isCorrect: true,
        },
      ],
    },
  },
  {
    number: 27,
    description:
      "Какой метод используется для создания динамических маршрутов в Next?",
    roles: ["FRONT_END"],
    technology: "NEXT",
    optional: {
      create: [
        {
          text: "Для создания динамических маршрутов необходимо использовать внешний пакет для маршрутизации.",
          isCorrect: false,
        },
        {
          text: "Для создания динамических маршрутов используется синтаксис с квадратными скобками, например, [id].js в папке pages",
          isCorrect: true,
        },
        {
          text: "Для создания динамических маршрутов используется синтаксис с фигурными скобками, например, {id}.js",
          isCorrect: false,
        },
        {
          text: "Для создания динамических маршрутов используется только метод getStaticProps.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 28,
    description: "Как в Next генерируется статический сайт?",
    roles: ["FRONT_END"],
    technology: "NEXT",
    optional: {
      create: [
        {
          text: "Для генерации статического сайта используется метод getStaticProps, который позволяет получить данные на момент сборки.",
          isCorrect: true,
        },
        {
          text: "В Next можно генерировать статический сайт только с помощью getServerSideProps.",
          isCorrect: false,
        },
        {
          text: "В Next статический сайт генерируется автоматически без использования методов.",
          isCorrect: false,
        },
        {
          text: "Для генерации статического сайта в Next используется getStaticData.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 29,
    description: "Как в Next обрабатывать серверные запросы?",
    roles: ["FRONT_END"],
    technology: "NEXT",
    optional: {
      create: [
        {
          text: "Серверные запросы обрабатываются с помощью getStaticProps, который работает только на клиенте.",
          isCorrect: false,
        },
        {
          text: "Серверные запросы обрабатываются через глобальный объект window.",
          isCorrect: false,
        },
        {
          text: "Серверные запросы обрабатываются через метод getServerSideProps, который выполняется на сервере перед рендерингом страницы.",
          isCorrect: true,
        },
        {
          text: "Серверные запросы в Next не поддерживаются.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 30,
    description: "Что такое API маршруты в Next?",
    roles: ["FRONT_END"],
    technology: "NEXT",
    optional: {
      create: [
        {
          text: "API маршруты в Next — это серверные маршруты, которые позволяют создавать API внутри приложения.",
          isCorrect: true,
        },
        {
          text: "API маршруты в Next — это клиентские маршруты, которые подключаются к внешним API.",
          isCorrect: false,
        },
        {
          text: "API маршруты — это стандартный способ рендеринга данных на странице.",
          isCorrect: false,
        },
        {
          text: "API маршруты используются только для работы с базой данных и не могут быть использованы для обработки запросов.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 31,
    description: "Что такое прогрессивный рендеринг?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "WEB",
    optional: {
      create: [
        {
          text: "Это подход, при котором контент веб-страницы начинает отображаться сразу после загрузки первых данных, улучшая время до первого отображения.",
          isCorrect: true,
        },
        {
          text: "Это метод для постепенного увеличения качества изображений на странице.",
          isCorrect: false,
        },
        {
          text: "Это технология для динамической подгрузки видео и аудио на веб-странице.",
          isCorrect: false,
        },
        {
          text: "Это способ обработки анимаций на веб-странице.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 32,
    description: "Что такое прогрессивный SSR?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "WEB",
    optional: {
      create: [
        {
          text: "Это техника для создания анимаций на серверной стороне.",
          isCorrect: false,
        },
        {
          text: "Это метод, при котором веб-страницы полностью загружаются на клиенте.",
          isCorrect: false,
        },
        {
          text: "Это способ кэширования данных на сервере для ускорения рендеринга страниц.",
          isCorrect: false,
        },
        {
          text: "Это метод, при котором сервер передает начальную версию страницы, а затем на клиенте добавляются дополнительные элементы, улучшая производительность и время загрузки.",
          isCorrect: true,
        },
      ],
    },
  },
  {
    number: 33,
    description: "SSR и CSR плюсы и минусы?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "WEB",
    optional: {
      create: [
        {
          text: "SSR и CSR — это методы управления анимациями на клиенте.",
          isCorrect: false,
        },
        {
          text: "SSR улучшает SEO и время рендера, но медленнее с динамическим контентом. CSR ускоряет интерактивность, но увеличивает время до отображения.",
          isCorrect: true,
        },
        {
          text: "SSR и CSR — это способы обработки изображений на веб-странице.",
          isCorrect: false,
        },
        {
          text: "SSR и CSR — это разные способы работы с базами данных на сервере.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 34,
    description: "Что такое Progressive Web Application?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "WEB",
    optional: {
      create: [
        {
          text: "PWA — это стандартный тип веб-приложений, работающих только в мобильных браузерах.",
          isCorrect: false,
        },
        {
          text: "PWA — это метод для создания веб-приложений без использования JavaScript.",
          isCorrect: false,
        },
        {
          text: "PWA — это веб-приложение, которое работает оффлайн, быстро откликается и может быть установлено как нативное.",
          isCorrect: true,
        },
        {
          text: "PWA — это специальная версия сайта, которая работает только в браузере.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 35,
    description: "Что такое кроссбраузерность?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "WEB",
    optional: {
      create: [
        {
          text: "Это термин, используемый для оптимизации загрузки изображений в браузере.",
          isCorrect: false,
        },
        {
          text: "Это технология для улучшения работы серверов с веб-сайтами.",
          isCorrect: false,
        },
        {
          text: "Это метод для создания мобильных приложений.",
          isCorrect: false,
        },
        {
          text: "Это способность веб-страницы или приложения корректно работать в разныйх браузерах и на разных устройствах.",
          isCorrect: true,
        },
      ],
    },
  },
  {
    number: 36,
    description: "Что такое HTTPS и зачем он нужен?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "SECURITY",
    optional: {
      create: [
        {
          text: "HTTPS — это протокол для защищённой передачи данных по сети, использующий шифрование для защиты от перехвата и атак.",
          isCorrect: true,
        },
        {
          text: "HTTPS — это стандарт для быстрого обмена данными между сервером и клиентом без шифрования.",
          isCorrect: false,
        },
        {
          text: "HTTPS — это приложение для проверки безопасности на сайте.",
          isCorrect: false,
        },
        {
          text: "HTTPS — это метод подключения к серверу через виртуальную частную сеть (VPN).",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 37,
    description:
      "Что такое XSS (Cross-Site Scripting) и как его предотвратить?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "SECURITY",
    optional: {
      create: [
        {
          text: "Это атака, при которой злоумышленник перехватывает пароли пользователей. Защита — использование сложных паролей.",
          isCorrect: false,
        },
        {
          text: "Это уязвимость, позволяющая злоумышленнику вставить вредоносный скрипт в веб-страницу.",
          isCorrect: true,
        },
        {
          text: "Это ошибка сервера, связанная с неправильной настройкой базы данных. Защита — использование антивирусов.",
          isCorrect: false,
        },
        {
          text: "Это уязвимость для перебора сессий. Защита — использование двухфакторной аутентификации.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 38,
    description:
      "Что такое CSRF (Cross-Site Request Forgery) и как предотвратить такие атаки?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "SECURITY",
    optional: {
      create: [
        {
          text: "Это атака, направленная на перехват данных пользователя. Защита — использование HTTPS.",
          isCorrect: false,
        },
        {
          text: "Это атака на базу данных. Защита — регулярное обновление серверного ПО.",
          isCorrect: false,
        },
        {
          text: "Это атака, при которой злоумышленник заставляет пользователя выполнить нежелательные действия на другом сайте",
          isCorrect: true,
        },
        {
          text: "Это атака, при которой злоумышленник вмешивается в процесс аутентификации. Защита — использование капчи.",
          isCorrect: false,
        },
      ],
    },
  },
  {
    number: 39,
    description: "Что такое SQL Injection и как его предотвратить?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "SECURITY",
    optional: {
      create: [
        {
          text: "Это уязвимость при работе с формами. Защита — использование HTTPS.",
          isCorrect: false,
        },
        {
          text: "Это ошибка при подключении к базе данных. Защита — использование кэширования запросов.",
          isCorrect: false,
        },
        {
          text: "Это атака на операционную систему. Защита — использование фаервола.",
          isCorrect: false,
        },
        {
          text: "Это уязвимость, позволяющая вставить вредоносный SQL-запрос в приложение.",
          isCorrect: true,
        },
      ],
    },
  },
  {
    number: 40,
    description:
      "Что такое двухфакторная аутентификация (2FA) и зачем она нужна?",
    roles: ["FRONT_END", "BACK_END"],
    technology: "SECURITY",
    optional: {
      create: [
        {
          text: "Это способ блокировки аккаунта после нескольких неудачных попыток входа. Защита — использование брандмауэра.",
          isCorrect: false,
        },
        {
          text: "Это система для хранения паролей. Защита — использование VPN.",
          isCorrect: false,
        },
        {
          text: "Это метод восстановления пароля через SMS. Защита — регулярное обновление пароля.",
          isCorrect: false,
        },
        {
          text: "Это метод аутентификации, при котором для входа используется не только пароль, но и второй фактор, например, код из SMS или приложение для генерации кодов",
          isCorrect: true,
        },
      ],
    },
  },
];
