import { useState } from "react";

export const useFilterName = (initialValue: string) => {
  const [filterName, setFilterName] = useState(initialValue);

  const handleFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
  };

  return { filterName, handleFilterName, setFilterName };
};
