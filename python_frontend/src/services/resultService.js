import axios from "axios";

export const saveResult = async (payload) => {
  return await axios.post(
    "http://127.0.0.1:8000/api/results/save/",
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
};
