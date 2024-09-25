import React, { useCallback } from "react";

export const useResetFilter = (
  setters: Array<React.Dispatch<React.SetStateAction<any>>>
) => {
  const handleResetFilters = useCallback(() => {
    setters.forEach((setter) => setter(""));
  }, [setters]);

  return { handleResetFilters };
};
