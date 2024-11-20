import React from "react";
import { CircleCheck } from "lucide-react";

interface IProps {
  message?: string;
}

export const FormSuccess: React.FC<IProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-emerald-500/30 p-3 rounded-lg flex  items-center gap-x-2 text-sm text-emerald-500">
      <CircleCheck className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
