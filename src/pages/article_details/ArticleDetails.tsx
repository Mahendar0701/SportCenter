import React, { useEffect } from "react";
import { getArticleDetails } from "../../context/article_details/action";
import { useArticleDetailsDispatch } from "../../context/article_details/context";
import ArticleItems from "./ArticleDetailsItems";
import { useParams } from "react-router-dom";

const ArticleDetails: React.FC = () => {
  const dispatchArticleDetails = useArticleDetailsDispatch();
  const { articleID } = useParams();

  useEffect(() => {
    if (articleID) {
      getArticleDetails(dispatchArticleDetails, articleID);
    }
  }, [dispatchArticleDetails, articleID]);
  return <ArticleItems />;
};
export default ArticleDetails;
