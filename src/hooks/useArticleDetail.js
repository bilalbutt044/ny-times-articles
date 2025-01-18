import { useState, useEffect } from 'react';
import { fetchArticleDetail, } from '../services/api';

const useArticleDetail = (title) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticleDetail(title);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, [title]);

  return { article, loading, error };
};

export default useArticleDetail;
