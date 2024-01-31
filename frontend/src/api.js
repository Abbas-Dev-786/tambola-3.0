import axios from "axios";

const DEFAULT_ERROR_MESSAGE = "Network Error or Something went wrong.";

export const baseURL = import.meta.env.DEV ? "http://127.0.0.1:5000" : "";

const customRequest = axios.create({ baseURL });

export const loginUser = async (data) => {
  try {
    const res = await customRequest.post(`/login`, data);

    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};
