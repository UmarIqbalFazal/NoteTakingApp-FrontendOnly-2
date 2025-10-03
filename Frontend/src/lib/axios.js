// Mock in-memory notes for demo
let fakeNotes = [
  { id: "1", title: "Demo Note", content: "This is a mocked note", tags: ["demo", "test"] },
  { id: "2", title: "Shopping List", content: "Milk, Eggs, Bread", tags: ["personal"] },
];

// Mock API wrapper (imitates axios methods)
const api = {
  get: async (url) => {
    if (url === "/notes") {
      return { data: fakeNotes };
    }
    if (url.startsWith("/notes/")) {
      const id = url.split("/").pop();
      const note = fakeNotes.find((n) => n.id === id);
      return { data: note || {} };
    }
    return { data: {} };
  },

  post: async (url, body) => {
    if (url === "/notes") {
      const newNote = { id: Date.now().toString(), ...body };
      fakeNotes.push(newNote);
      return { data: newNote };
    }
    return { data: {} };
  },

  put: async (url, body) => {
    if (url.startsWith("/notes/")) {
      const id = url.split("/").pop();
      const idx = fakeNotes.findIndex((n) => n.id === id);
      if (idx > -1) {
        fakeNotes[idx] = { ...fakeNotes[idx], ...body };
        return { data: fakeNotes[idx] };
      }
    }
    return { data: {} };
  },

  delete: async (url) => {
    if (url.startsWith("/notes/")) {
      const id = url.split("/").pop();
      fakeNotes = fakeNotes.filter((n) => n.id !== id);
      return { data: {} };
    }
    return { data: {} };
  },
};

export default api;

/* commenting out original code and replaced with mock api


import axios from "axios";

// in production there is no base url so this code makes it dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" :"/api"

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("➡️ [API] Attaching token:", token ? token.slice(0,8) + "..." : null);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

*/