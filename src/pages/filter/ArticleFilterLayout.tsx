import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../context/articles/action";
import {
  useArticleDispatch,
  useArticleState,
} from "../../context/articles/context";
import { fetchPreferences } from "../../context/preferences/action";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { fetchSports } from "../../context/sports/action";
import { fetchTeams } from "../../context/teams/action";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import { useTeamDispatch, useTeamState } from "../../context/teams/context";
import { Link } from "react-router-dom";

const ArticleFilterLayout: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const dispatchSport = useSportDispatch();
  const dispatchTeam = useTeamDispatch();
  const dispatchArticle = useArticleDispatch();
  const dispatchPreferences = usePreferencesDispatch();

  const sportState: any = useSportState();
  const teamState: any = useTeamState();
  const articleState: any = useArticleState();
  const preferencesState: any = usePreferencesState();

  useEffect(() => {
    fetchSports(dispatchSport);
    fetchTeams(dispatchTeam);
    fetchArticles(dispatchArticle);
    fetchPreferences(dispatchPreferences);
  }, []);

  const { sports, isLoading, isError, errorMessage } = sportState;
  const { teams, isLoading1, isError1, errorMessage1 } = teamState;
  const { articles, isLoading2, isError2, errorMessage2 } = articleState;
  const { preferences, isLoading3, isError3, errorMessage3 } = preferencesState;

  // if (preferences.length === 0) {
  //   throw Error("Error!!!");
  // }

  if (isLoading || isLoading1 || isLoading2 || isLoading3) {
    return <span>Loading articles...</span>;
  }
  if (isError || isError1 || isError2 || isError3) {
    return (
      <span>
        {errorMessage || errorMessage1 || errorMessage2 || errorMessage3}
      </span>
    );
  }

  const isAuthenticated = !!localStorage.getItem("authToken");

  const filteredArticles = articleState.articles.filter((article: any) => {
    const sportMatches = !selectedSport || article.sport.name === selectedSport;
    const teamMatches =
      !selectedTeam ||
      article.teams.some(
        (team: { name: string }) => team.name === selectedTeam
      );
    return sportMatches && teamMatches;
  });

  const filteredDefaultArticles = articles.filter(
    (article: { sport: { name: string }; teams: any[] }) => {
      if (!isAuthenticated) {
        return true;
      }
      if (isAuthenticated) {
        if (
          preferences &&
          preferences.sports &&
          preferences.sports.length > 0
        ) {
          return (
            preferences.sports.includes(article.sport.name) ||
            article.teams.some((team: any) =>
              preferences.teams.includes(team.name)
            )
          );
        } else {
          return true;
        }
      }
      return !selectedSport || article.sport.name === selectedSport;
    }
  );

  // Get teams of selected sport
  const getTeamsOfSelectedSport = () => {
    if (!selectedSport) return [];
    const teamsOfSelectedSport = teamState.teams.filter(
      (team: any) => team.plays === selectedSport
    );
    return teamsOfSelectedSport.map((team: any) => team.name);
  };

  const teamNames = getTeamsOfSelectedSport();

  // Get preference teams of selected sport
  const getPreferenceTeamsOfSelectedSport = () => {
    if (!selectedSport) return [];
    return preferences.teams.filter((team) => {
      const teamDetails = teams.find((t) => t.name === team);
      return teamDetails && teamDetails.plays === selectedSport;
    });
  };

  let preferTeamOfSelectedSport = [];

  if (isAuthenticated) {
    preferTeamOfSelectedSport = getPreferenceTeamsOfSelectedSport();

    if (preferTeamOfSelectedSport.length === 0) {
      preferTeamOfSelectedSport = getTeamsOfSelectedSport();
    }
  }

  return (
    <div className="p-4 rounded-xl bg-white border border-gray-200  dark:bg-gray-500 shadow-sm">
      <div className="bg-white">
        {isAuthenticated &&
        preferences &&
        preferences.sports &&
        preferences.sports.length > 0 ? (
          <div className="space-y-4 dark:bg-gray-500">
            <select
              className="p-3 border border-gray-200 w-80 rounded-md bg-gray-100 dark:bg-black"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="">Select Favorite Sport</option>
              {preferences.sports.map((sport: string, index: number) => (
                <option key={index} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
            <select
              className="p-3 border border-gray-200 w-80 rounded-md bg-gray-100 dark:bg-black"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="">Select Favorite Team</option>
              {preferTeamOfSelectedSport.map((team: any, index: number) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-4">
            <select
              className="p-3 border border-gray-200 w-80 rounded-md bg-gray-100"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="">Select Favorite Sport</option>
              {sportState.sports.map((sport: any, index: number) => (
                <option key={index} value={sport.name}>
                  {sport.name}
                </option>
              ))}
            </select>
            <select
              className="p-3 border border-gray-200 w-80 rounded-md bg-gray-100"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="">Select Favorite Team</option>
              {teamNames.map((team: any, index: number) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {articleState.isLoading ? (
        <div>Loading articles..</div>
      ) : selectedSport ? (
        <div className="mt-4 space-y-4 max-h-[990px] overflow-y-scroll ">
          {filteredArticles.map((article: any) => (
            <div
              key={article.id}
              className="bg-white  dark:bg-black border border-gray-200 rounded-lg shadow-md mr-2"
            >
              <Link to={`/account/articles/${article.id}`}>
                <img
                  src={article.thumbnail}
                  alt=""
                  className="w-full h-80 object-cover rounded-t-lg"
                />
              </Link>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {article.title}
                  </h5>{" "}
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {article.summary}
                </p>
                <Link
                  to={`/account/articles/${article.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-4 max-h-[980px] overflow-y-scroll ">
          {filteredDefaultArticles.map((article: any) => (
            <div
              key={article.id}
              className="bg-white dark:bg-black border border-gray-200 rounded-lg shadow-md mr-2"
            >
              <Link to={`/account/articles/${article.id}`}>
                <img
                  src={article.thumbnail}
                  alt=""
                  className="w-full h-80 object-cover rounded-t-lg"
                />
              </Link>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {article.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {article.summary}
                </p>
                <Link
                  to={`/account/articles/${article.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleFilterLayout;
