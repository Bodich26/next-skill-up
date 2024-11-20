import React from "react";
import { TriangleAlert } from "lucide-react";

interface IProps {
  message?: string;
}

export const FormError: React.FC<IProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-destructive/30 p-3 rounded-lg flex  items-center gap-x-2 text-sm text-destructive">
      <TriangleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
