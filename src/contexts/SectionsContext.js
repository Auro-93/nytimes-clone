import { createContext, useState, useEffect } from "react";
import { sectionsData } from "../utilities/ny-times-sections";

export const SectionsContext = createContext();

export const SectionsProvider = ({ children }) => {
  const [navSections, setNavSections] = useState([]);

  useEffect(() => {
    setNavSections(sectionsData);
  }, []);

  return (
    <SectionsContext.Provider value={{ navSections }}>
      {children}
    </SectionsContext.Provider>
  );
};
