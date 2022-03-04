import React, { useState, useEffect } from "react";
import { Logo } from "..";
import styles from "./Footer.module.css";
import {
  footerCategories,
  footerLastRowData,
} from "../../utilities/footer-static-data.js";
import { FooterItemsRow1, FooterItemsRow2 } from "..";

export const Footer = () => {
  const [footerItems1, setFooterItems1] = useState([]);
  const [footerItems2, setFooterItems2] = useState([]);
  const [current, setCurrent] = useState({ element: "", open: false });

  useEffect(() => {
    setFooterItems1(footerCategories);
  }, []);

  useEffect(() => {
    setFooterItems2(footerLastRowData);
  }, []);

  return (
    <footer className={styles.footer}>
      <Logo inHeader={false} />
      {footerItems1 && (
        <FooterItemsRow1
          sections={footerItems1}
          current={current}
          setCurrent={setCurrent}
        />
      )}
      {footerItems2 && <FooterItemsRow2 sections={footerItems2} />}
    </footer>
  );
};
