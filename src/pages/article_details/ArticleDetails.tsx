import React, { useEffect } from "react";
import { getArticleDetails } from "../../context/article_details/action";
import { useArticleDetailsDispatch } from "../../context/article_details/context";
import ArticleItems from "./ArticleDetailsItems";
import { useParams } from "react-router-dom";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/action";

const ArticleDetails: React.FC = () => {
  const dispatchArticleDetails = useArticleDetailsDispatch();
  const { articleID } = useParams();
  const dispatchPreferences = usePreferencesDispatch();

  useEffect(() => {
    if (articleID) {
      getArticleDetails(dispatchArticleDetails, articleID);
    }
    fetchPreferences(dispatchPreferences);
  }, [dispatchArticleDetails, articleID, dispatchPreferences]);
  return <ArticleItems />;
};
export default ArticleDetails;
