import { getEnvVariable } from "../utils/env";

const API_KEY = getEnvVariable('VITE_API_KEY');
const BASE_URL = getEnvVariable('VITE_BASE_URL');

export const fetchArticles = async (period = 7) => {
  const response = await fetch(`${BASE_URL}/mostpopular/v2/viewed/${period}.json?api-key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const fetchArticleDetail = async (title) => {
  const response = await fetch(`${BASE_URL}/search/v2/articlesearch.json?q=${title}&fq=headline:(${title})&api-key=${API_KEY}`);
  const data = await response.json();
  return data?.response?.docs[0];
};
