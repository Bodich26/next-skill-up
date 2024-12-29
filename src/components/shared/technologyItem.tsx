import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  itemIcon: string;
  itemName: string;
  itemLink: string;
}

export const TechnologyItem: React.FC<Props> = ({
  itemIcon,
  itemName,
  itemLink,
}) => {
  return (
    <Link href={itemLink}>
      <div className="flex flex-col justify-center items-center gap-3 border-[1px] border-solid border-input bg-card rounded-lg p-4 w-[185px] h-[185px] cursor-pointer hover:bg-input duration-300 ease-in-out">
        <Image width={86} height={86} src={itemIcon} alt={itemName} />
        <span className="font-bold text-xl">{itemName}</span>
      </div>
    </Link>
  );
};
