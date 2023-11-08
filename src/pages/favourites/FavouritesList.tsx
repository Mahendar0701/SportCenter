import React, { useEffect } from "react";
import { fetchArticles } from "../../context/articles/action";
import { useArticleDispatch } from "../../context/articles/context";
import FavouriteListItems from "./FavouriteListItems";
import { fetchSports } from "../../context/sports/action";
import { fetchPreferences } from "../../context/preferences/action";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { useSportDispatch } from "../../context/sports/context";
import { useMatchDispatch } from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/action";

const ArticleList: React.FC = () => {
  const dispatchArticle = useArticleDispatch();
  const dispatchSport = useSportDispatch();
  const dispatchPreferences = usePreferencesDispatch();
  const dispatchMatch = useMatchDispatch();

  useEffect(() => {
    fetchArticles(dispatchArticle);
    fetchSports(dispatchSport);
    fetchPreferences(dispatchPreferences);
    fetchMatches(dispatchMatch);
  }, [dispatchArticle, dispatchMatch, dispatchPreferences, dispatchSport]);

  return (
    <div className="mr-7 my-5">
      <FavouriteListItems />
      <br />
    </div>
  );
};
export default ArticleList;
