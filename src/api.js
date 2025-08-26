import axios from "axios";

// Set the backend URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getMembers = () => API.get("/members");
export const getMemberById = (id) => API.get(`/members/${id}`);
export const createMember = (data) => API.post("/members", data);
export const updateMember = (id, data) => API.put(`/members/${id}`, data);
export const deleteMember = (id) => API.delete(`/members/${id}`);
