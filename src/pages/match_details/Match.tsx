import React, { useEffect } from "react";
import { getMatchDetails } from "../../context/match_details/action";
import { useMatchDetailsDispatch } from "../../context/match_details/context";

import MatchItems from "./MatchItems";
import { useParams } from "react-router-dom";
import { fetchPreferences } from "../../context/preferences/action";
import { usePreferencesDispatch } from "../../context/preferences/context";
const Match: React.FC = () => {
  const dispatchMatchDetails = useMatchDetailsDispatch();
  const { matchID } = useParams();
  const dispatchPreferences = usePreferencesDispatch();

  useEffect(() => {
    if (matchID) {
      getMatchDetails(dispatchMatchDetails, matchID);
    }
    fetchPreferences(dispatchPreferences);
  }, [dispatchMatchDetails, matchID, dispatchPreferences]);
  return (
    <div>
      <MatchItems />
      <br />
    </div>
  );
};
export default Match;
