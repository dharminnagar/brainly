import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/content`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setContents(res.data.content);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return contents;
}
