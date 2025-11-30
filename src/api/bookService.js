// bookService.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/books";

export const getBooks = () => axios.get(API_BASE);
export const getBookById = (id) => axios.get(`${API_BASE}/${id}`);
export const createBook = (data, token) =>
  axios.post(API_BASE, data, {
    headers: { Authorization: `Bearer ${token}` },
  });