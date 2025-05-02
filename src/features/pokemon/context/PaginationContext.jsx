import { createContext, useContext, useState, useCallback } from "react";

const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // default to 20

  const setPage = useCallback((page) => setCurrentPage(page), []);
  const setLimit = useCallback((limit) => {
    setItemsPerPage(limit);
    setCurrentPage(1); // reset page on limit change
  }, []);

  const value = {
    currentPage,
    itemsPerPage,
    setPage,
    setItemsPerPage: setLimit,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within PaginationProvider");
  }
  return context;
};
