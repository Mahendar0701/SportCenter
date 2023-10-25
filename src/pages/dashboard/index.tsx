import { useEffect } from "react";
import { fetchPreferences } from "../../context/preferences/action";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchSports } from "../../context/sports/action";
import { useSportDispatch } from "../../context/sports/context";
import { fetchTeams } from "../../context/teams/action";
import { useTeamDispatch } from "../../context/teams/context";
import Articles from "../articles";
import ArticleFilter from "../filter";
import Matches from "../matches";
import { useArticleDispatch } from "../../context/articles/context";

const Dashboard = () => {
  const dispatchSport = useSportDispatch();
  const dispatchArticle = useArticleDispatch();
  const dispatchTeam = useTeamDispatch();
  const dispatchPreferences = usePreferencesDispatch();

  useEffect(() => {
    fetchSports(dispatchSport);
    fetchSports(dispatchArticle);
    fetchTeams(dispatchTeam);
    fetchPreferences(dispatchPreferences);
  }, []);
  return (
    <>
      <div className=" p-5 border border-gray-200 shadow-sm rounded-md overflow-x-auto">
        <Matches />
      </div>

      <div className=" mt-5 p-5 border border-gray-200 shadow-sm rounded-md">
        <div className="flex flex-wrap">
          <div className="w-full  md:w-3/4 max-h-[1300px]   ">
            <h2 className="text-2xl font-medium tracking-tight">Your News</h2>
            <Articles />
          </div>
          <div className="w-full px-0  md:w-1/4 max-h-[1300px] ">
            <h2 className="text-2xl font-medium tracking-tight mb-5">Filter</h2>
            <ArticleFilter />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
