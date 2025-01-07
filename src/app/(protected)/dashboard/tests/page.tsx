import { TechnologyItem } from "@/components/shared";

const technology = [
  {
    name: "Html",
    icon: "./../../../images/html.svg",
    link: "/dashboard/tests/html",
    index: 0,
  },
  {
    name: "Css",
    icon: "./../../../images/css.svg",
    link: "/dashboard/tests/css",
    index: 1,
  },
  {
    name: "Js",
    icon: "./../../../images/js.svg",
    link: "/dashboard/tests/js",
    index: 2,
  },
  {
    name: "React",
    icon: "./../../../images/react.svg",
    link: "/dashboard/tests/react",
    index: 3,
  },
  {
    name: "Ts",
    icon: "./../../../images/ts.svg",
    link: "/dashboard/tests/ts",
    index: 4,
  },
  {
    name: "Next",
    icon: "./../../../images/next.svg",
    link: "/dashboard/tests/next",
    index: 5,
  },
  {
    name: "Web",
    icon: "./../../../images/web.svg",
    link: "/dashboard/tests/web",
    index: 6,
  },
  {
    name: "Security",
    icon: "./../../../images/security.svg",
    link: "/dashboard/tests/security",
    index: 7,
  },
];

export default function Products() {
  return (
    <div className="flex justify-between gap-8 flex-grow">
      <div className="border-[1px] p-4 border-solid border-input bg-card rounded-lg">
        <h3 className="font-bold text-3xl mb-3">Выберите технологию</h3>
        <div className="flex flex-row flex-wrap justify-start gap-5 overflow-auto max-h-[770px]">
          {technology.map((item) => {
            return (
              <TechnologyItem
                key={item.index}
                itemIcon={item.icon}
                itemName={item.name}
                itemLink={item.link}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
