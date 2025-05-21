import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <SearchContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchInput() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchInput must be used within SearchProvider");
  }
  return context;
}
