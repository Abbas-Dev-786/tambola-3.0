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

export async function RaiseHand() {
  //get current time
  var timestamp = Date.now();
  timestamp = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);
  //get user name
  var user = JSON.parse(localStorage.getItem("user"))?.user?.name;

  //create a form data with current time and name of user data
  var formData = new FormData();
  formData.append("Timestamp", timestamp);
  formData.append("Name", user);

  //URL of google sheets api
  const URL =
    "https://script.google.com/macros/s/AKfycbwd2P_htjEqgOllrLlaNhp3qkEv6eCJh3RuweXYbxaSuQM57_HO6Sp3FTGZ7pFeDNE/exec";

  // insert data in google sheet
  const res = await axios.post(URL);
  console.log(res);

  return res;
}
