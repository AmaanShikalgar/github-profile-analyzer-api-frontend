import axios from 'axios';

const BASE_URL = 'https://github-profile-analyzer-api-9622.up.railway.app';

const api = axios.create({ baseURL: BASE_URL });

export const analyzeProfile = (username) =>
  api.post(`/analyze/${username}`);

export const getAllProfiles = () =>
  api.get('/profiles');

export const getProfile = (username) =>
  api.get(`/profiles/${username}`);

export const deleteProfile = (username) =>
  api.delete(`/profiles/${username}`);
