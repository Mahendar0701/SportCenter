/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useMatchState } from "../../context/matches/context";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  LocationMarkerIcon,
  MapIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import { API_ENDPOINT } from "../../config/constants";
import { usePreferencesState } from "../../context/preferences/context";

export default function MemberListItems() {
  const matchState: any = useMatchState();
  const preferencesState: any = usePreferencesState();
  const { matches, isLoading, isError, errorMessage } = matchState;
  const { preferences, isLoading1, isError1, errorMessage1 } = preferencesState;

  if (matches.length === 0 && isLoading) {
    return <span>Loading matches...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const isAuthenticated = !!localStorage.getItem("authToken");

  // const last5Matches = matches.filter((match) => !match.isRunning).slice(0, 5);
  const last5Matches = [];
  const liveMatches = [];

  if (isAuthenticated) {
    if (preferences && preferences.sports && preferences.teams) {
      matches.forEach(
        (match: { sportName: any; teams: { name: any }[]; isRunning: any }) => {
          const sportMatch = preferences.sports.some(
            (prefSport: any) => match.sportName === prefSport
          );
          const teamMatch =
            preferences.teams.some(
              (prefTeam: any) => match.teams[0].name == prefTeam
            ) ||
            preferences.teams.some(
              (prefTeam: any) => match.teams[1].name == prefTeam
            );

          if (sportMatch || teamMatch) {
            if (!match.isRunning) {
              last5Matches.push(match);
            } else {
              liveMatches.push(match);
            }
          }
        }
      );
    }
  } else {
    matches
      .filter((match: { isRunning: any }) => !match.isRunning)
      .slice(0, 5)
      .forEach((match: any) => {
        last5Matches.push(match);
      });

    matches
      .filter((match: { isRunning: any }) => match.isRunning)
      .slice(0, 5)
      .forEach((match: any) => {
        liveMatches.push(match);
      });
  }
  if (last5Matches.length === 0 && liveMatches.length === 0) {
    last5Matches.push(
      ...matches
        .filter((match: { isRunning: any }) => !match.isRunning)
        .slice(0, 5)
    );
    liveMatches.push(
      ...matches.filter((match: { isRunning: any }) => match.isRunning)
    );
  }

  // console.log("last5Matches", matches);
  const liveMatchesRow = liveMatches.map((match: any) => (
    <div key={match.id}>
      <div className="py-5 mx-3">
        <MatchCard matchID={match.id} />
      </div>
    </div>
  ));

  const last5MatchesRow = last5Matches
    .slice(0, 5)
    .filter((match) => match)
    .map((match: any) => (
      <div key={match.id}>
        <div className="py-5 mx-3 ">
          <MatchCard matchID={match.id} />
        </div>
      </div>
    ));

  return (
    <>
      <div className="overflow-x-auto">
        <p className="text-xl ">Live Matches</p>
        {liveMatchesRow.length > 0 ? (
          <div className="flex flex-row">{liveMatchesRow}</div>
        ) : (
          <p className="my-3">
            No live matches matching your preferences are available.
          </p>
        )}
        <hr className="my-2 border-gray-400" />
        <p className="text-xl ">Previous Matches</p>
        <div className="overflow-x-auto">
          <div className="flex flex-row ">{last5MatchesRow}</div>
        </div>
      </div>
    </>
  );
}

const MatchCard = ({ matchID }: { matchID: number }) => {
  const [getScores, setGetScores] = useState(false);
  const [match, setMatch] = useState<string>();
  // console.log(match);

  const fetchMatch = async () => {
    setGetScores(true);
    await fetch(`${API_ENDPOINT}/matches/${matchID}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data);
        setGetScores(false);
      });
  };

  useEffect(() => {
    fetchMatch();
  }, [matchID]);

  return match ? (
    <div
      key={match.id}
      className="border  p-5 h-52 w-92 rounded-md shadow-md hover:shadow-lg"
    >
      <div className="flex flex-col justify-between h-full">
        <Link to={`/account/matches/${match.id}`}>
          <div>
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-xl font-semibold text-blue-800 uppercase antialiased">
                {match.sportName}
              </h1>
              <div className="flex items-center">
                {match.isRunning && (
                  <div className="relative inline-flex mr-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                  </div>
                )}
                <p
                  className={`text-green-500 ${
                    match.isRunning ? "animate-pulse" : ""
                  }`}
                >
                  {match.isRunning && "Live"}
                </p>
              </div>
            </div>

            <div className="flex items-center ">
              <LocationMarkerIcon className="w-4 h-4 mr-1" />
              <p>{match.location}</p>
            </div>

            <div className="flex space-x-4 my-5">
              <p className="text-lg font-semibold">{match?.teams[0].name}</p>
              <div className="">
                <p className="text-green-600 text-xl font-bold">
                  {match?.score[match?.teams[0].name]}
                </p>
              </div>
              <p className="font-semibold text-gray-900 p-1">VS</p>
              <div className="">
                <p className="text-green-600 text-xl font-bold">
                  {match?.score[match?.teams[1].name]}
                </p>
              </div>
              <p className="text-lg font-semibold">{match?.teams[1].name}</p>
            </div>
          </div>
        </Link>

        <div className="flex justify-between items-center">
          <p className="flex text-md">
            <CalendarIcon className="w-6 h-6 mr-1" />
            {new Date(match.endsAt).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <button onClick={fetchMatch}>
            <RefreshIcon
              className={`w-6 h-6 text-black transform ${
                getScores && "rotate-180"
              } transition-all`}
            />
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
