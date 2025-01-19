import React from "react";
import PropTypes from "prop-types";

const ArticleDetails = ({ article }) => {
  return (
    <>
      <h1>{article?.headline?.main}</h1>
      <p>{article?.abstract}</p>
      <p>{article?.lead_paragraph}</p>
      {article?.source && <p>sourc: {article.source}</p>} {/* Conditionally render source */}
    </>
  );
};

export default ArticleDetails;

ArticleDetails.propTypes = {
  article: PropTypes.object.isRequired,
};
