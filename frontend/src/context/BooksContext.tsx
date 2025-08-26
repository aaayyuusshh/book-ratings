import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface BooksContextType {
  query: string;
  setQuery: (q: string) => void;
  books: any[];
  setBooks: (b: any[]) => void;
}

export const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<any[]>([]);

  return (
    <BooksContext.Provider value={{ query, setQuery, books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
