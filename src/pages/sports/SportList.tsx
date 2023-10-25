import React, { useEffect } from "react";
import { fetchSports } from "../../context/sports/action";
import { useSportDispatch } from "../../context/sports/context";

import SportListItems from "./SportListItems";
const SportList: React.FC = () => {
  const dispatchSport = useSportDispatch();

  useEffect(() => {
    fetchSports(dispatchSport);
  }, []);
  return (
    <div className="grid gap-4 grid-cols-4 mt-5 mr-52">
      <SportListItems />
      <br />
    </div>
  );
};
export default SportList;
