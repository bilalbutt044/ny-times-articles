import ArticleList from "../../components/ArticleList";
import useArticles from "../../hooks/useArticle";
const ArticleContainer = () => {
  const { articles, error, loading } = useArticles();

  return (
    <div>
      <h1>NY Times Most Popular Articles</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleContainer;
