import { useState, useEffect } from 'react';
import { fetchArticles } from '../services/api';

const useArticles = (period = 7) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles(period);
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, [period]);

  return { articles, loading, error };
};

export default useArticles;
