import PropTypes from "prop-types";

const ArticleDetails = ({ article }) => {
  return (
    <>
      <h1>{article?.headline?.main}</h1>

      <p>{article?.abstract}</p>
      <p>{article?.lead_paragraph}</p>
      <p>sourc: {article?.source}</p>
    </>
  );
};

export default ArticleDetails;

ArticleDetails.propTypes = {
  article: PropTypes.object.isRequired,
};
