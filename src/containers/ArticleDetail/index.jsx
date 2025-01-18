import { useNavigate, useParams } from "react-router-dom";
import useArticleDetail from "../../hooks/useArticleDetail";
import ArticleDetails from "../../components/ArticleDetail";

const ArticleDetailContainer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { article, error, loading } = useArticleDetail(params?.title);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!article) {
    return (
      <div>
        <p>Article not found.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return <ArticleDetails article={article} />;
};

export default ArticleDetailContainer;
