import axios from 'axios';

// Remplace cette IP par celle de ton PC si tu testes sur téléphone
const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/ld+json',
    'Content-Type': 'application/ld+json',
  },
});
