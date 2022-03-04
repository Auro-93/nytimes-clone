import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QueryArticlesContext } from "../../contexts/QueryArticlesContext";
import { SidebarContext } from "../../contexts/SidebarContext";
import styles from "./SearchForm.module.css";

export const SearchForm = () => {
  const { setPage } = useContext(QueryArticlesContext);
  const { setIsSidebarOpen } = useContext(SidebarContext);

  let navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm) return;

    let formattedSearchTerm = searchTerm.toString().toLowerCase().trim();

    setSearchTerm("");

    setPage(1);

    setIsSidebarOpen(false);

    navigate(`/query/${formattedSearchTerm}`);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };

  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <form className={styles.search_form}>
      <input
        ref={input}
        className={styles.search_input}
        type="search"
        placeholder="SEARCH"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        onClick={handleSubmit}
        className={styles.submit_btn}
        type="submit"
      >
        GO
      </button>
    </form>
  );
};
