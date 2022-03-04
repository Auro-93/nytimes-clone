import React, { useEffect, useState } from "react";
import axios from "axios";
import { smoothScroll } from "../utilities/scrolling";

const useFetch = (url, querySearch = false) => {
  const [totalArticles, setTotalArticles] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const source = axios.CancelToken.source();

  const handleFetch = async (url) => {
    setData([]);
    setLoading(true);

    try {
      const response = await axios.get(url, { cancelToken: source.token });
      if (response) {
        setLoading(false);
        setError("");
        smoothScroll(0);

        console.log(response.data);
        setData(response.data);

        if (querySearch === true) {
          setTotalArticles(response.data.response.meta.hits);
        }
      }
    } catch (error) {
      setLoading(false);
      setData([]);
      smoothScroll(0);

      if (error.response) {
        if (error.response.status === 404) {
          setError("Error 404 - Invalid request: can't find data");
        } else if (error.response.status === 429) {
          setError(
            "Error 429 - API call limit reached: you can only send 10 requests per minute (await 6 seconds between calls)"
          );
        } else {
          setError(`${error.response.status}: Something went wrong`);
        }
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleFetch(url);

    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, error, totalArticles };
};

export default useFetch;
