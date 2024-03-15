import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type AppContext = {
  isUserLoggedIn: boolean | undefined;
};

const AppContext = createContext<AppContext | undefined>(undefined);

// provides context to see if there is a user logged in.
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isError } = useQuery("verifyToken", apiClient.verifyToken, {
    retry: false,
  });

  return (
    <AppContext.Provider value={{ isUserLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
