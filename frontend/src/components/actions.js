const BASE_URL = "http://127.0.0.1:5000";
export const handlelogin = async (user, password) => {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify({ userId: user, password: password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export async function fetchTicket(id) {
  const res = await fetch(`${BASE_URL}/api/ticket`, {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
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
  var user = JSON.parse(localStorage.getItem("user")).name;

  //create a form data with current time and name of user data
  var formData = new FormData();
  formData.append("Timestamp", timestamp);
  formData.append("Name", user);

  //URL of google sheets api
  const URL =
    "https://script.google.com/macros/s/AKfycbwd2P_htjEqgOllrLlaNhp3qkEv6eCJh3RuweXYbxaSuQM57_HO6Sp3FTGZ7pFeDNE/exec";

  // insert data in google sheet
  const res = await fetch(URL, {
    method: "POST",
    body: formData,
  });
  return res;
}
