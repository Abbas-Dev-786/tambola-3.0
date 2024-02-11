import axios from "axios";

const DEFAULT_ERROR_MESSAGE = "Network Error or Something went wrong.";

export const baseURL = import.meta.env.DEV
  ? "http://127.0.0.1:5000"
  : "https://average-toad-school-uniform.cyclic.app";

const customRequest = axios.create({ baseURL });

customRequest.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem("user"))?.token;

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

export const loginUser = async (data) => {
  try {
    const res = await customRequest.post(`/api/login`, data);

    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export async function fetchTicket() {
  try {
    const res = await customRequest.get(`/api/ticket`);

    return res?.data?.data?.answers;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
}

export const RaiseHand = async (data) => {
  try {
    const res = await customRequest.post(`/api/raiseHand`, data);

    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};
