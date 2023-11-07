import React from "react";

// import MatchList from "./MatchDetails";
import Match from "./MatchDetails";
// import ArticleListItems from "./ArticleLi";

import { Outlet } from "react-router-dom";

const MatchDetailsIndex: React.FC = () => {
  return (
    <>
      {/* <MatchList /> */}
      <Match />
      <Outlet />
    </>
  );
};

export default MatchDetailsIndex;
