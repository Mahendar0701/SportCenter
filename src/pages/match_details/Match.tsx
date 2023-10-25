import React, { useEffect } from "react";
import { getMatchDetails } from "../../context/match_details/action";
import { useMatchDetailsDispatch } from "../../context/match_details/context";

import MatchItems from "./MatchItems";
import { useParams } from "react-router-dom";
const Match: React.FC = () => {
  const dispatchMatchDetails = useMatchDetailsDispatch();
  const { matchID } = useParams();

  useEffect(() => {
    if (matchID) {
      getMatchDetails(dispatchMatchDetails, matchID);
    }
  }, [dispatchMatchDetails, matchID]);
  return (
    <div>
      <MatchItems />
      <br />
    </div>
  );
};
export default Match;
