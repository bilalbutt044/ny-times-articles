import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ArticleList = ({ articles }) => {
  return (
    <div className="article-grid">
      {articles?.map((article) => (
        <div key={article.id}>
          <Link to={`/article/${article?.title}`} href={article.url} rel="noreferrer">
            <img src={article?.media[0]?.["media-metadata"][1]?.url} alt={article?.media[0]?.caption} />
            <div>
              <p>{article.title}</p>
              <p style={{ color: "white" }}>Published Date: {article?.published_date}</p>
              <p style={{ color: "white" }}>{article.byline} </p>
            </div>
          </Link>{" "}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;

ArticleList.propTypes = { articles: PropTypes.array.isRequired };
