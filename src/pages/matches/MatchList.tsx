import React, { useEffect } from "react";
import { fetchMatches } from "../../context/matches/action";
import { fetchPreferences } from "../../context/preferences/action";
import { useMatchDispatch } from "../../context/matches/context";
import { usePreferencesDispatch } from "../../context/preferences/context";
import MatchListItems from "./MatchListItems";
const MatchList: React.FC = () => {
  const dispatchMatch = useMatchDispatch();
  const dispatchPreferences = usePreferencesDispatch();

  useEffect(() => {
    fetchMatches(dispatchMatch);
    fetchPreferences(dispatchPreferences);
  }, []);
  return (
    // <div className="grid gap-4 grid-cols-4 mt-1">
    <div className="flex flex-direction-row space-x-4">
      <MatchListItems />
      <br />
    </div>
  );
};
export default MatchList;
