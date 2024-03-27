import { createContext, useContext, useState } from "react";

type SearchContext = {
  name: string;
  dishId: string;
  saveSearchValues: (name: string) => void;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState<string>("");
  const [dishId, setDishId] = useState<string>("");

  const saveSearchValues = (name: string, dishId?: string) => {
    setName(name);
    if (dishId) {
      setDishId(dishId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        name,
        dishId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
