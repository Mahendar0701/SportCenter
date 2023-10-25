import React, { useEffect } from "react";
import { fetchArticles } from "../../context/articles/action";
import { useArticleDispatch } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";
import { fetchSports } from "../../context/sports/action";
import { fetchPreferences } from "../../context/preferences/action";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { useSportDispatch } from "../../context/sports/context";

const ArticleList: React.FC = () => {
  const dispatchArticle = useArticleDispatch();
  const dispatchSport = useSportDispatch();
  const dispatchPreferences = usePreferencesDispatch();

  useEffect(() => {
    fetchArticles(dispatchArticle);
    fetchSports(dispatchSport);
    fetchPreferences(dispatchPreferences);
  }, []);

  return (
    <div className="mr-7 my-5">
      <ArticleListItems />
      <br />
    </div>
  );
};
export default ArticleList;
