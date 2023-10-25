import { useEffect } from "react";
import { useArticleDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/action";
import { Outlet } from "react-router-dom";
import { useMatchDispatch } from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/action";
import { fetchPreferences } from "../../context/preferences/action";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchSports } from "../../context/sports/action";
import { useSportDispatch } from "../../context/sports/context";

const ArticleContainer = () => {
  const articleDispatch = useArticleDispatch();
  const matcheDispatch = useMatchDispatch();
  const dispatchSport = useSportDispatch();
  const dispatchPreferences = usePreferencesDispatch();
  useEffect(() => {
    fetchArticles(articleDispatch);
    fetchMatches(matcheDispatch);
    fetchSports(dispatchSport);
    fetchPreferences(dispatchPreferences);
  }, [articleDispatch, matcheDispatch, dispatchSport, dispatchPreferences]);
  return <Outlet />;
};

export default ArticleContainer;
