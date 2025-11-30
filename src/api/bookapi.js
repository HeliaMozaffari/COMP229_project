// client/src/api/bookApi.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/books';

export const getBooks = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getBook = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const createBook = async (book) => {
  const res = await axios.post(API_BASE, book);
  return res.data;
};

export const updateBook = async (id, book) => {
  const res = await axios.put(`${API_BASE}/${id}`, book);
  return res.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};
