import React, { useEffect } from "react";
import { fetchSports } from "../../context/sports/action";
import { fetchTeams } from "../../context/teams/action";
import { fetchPreferences } from "../../context/preferences/action";

// So, let's import the useProjectsDispatch custom hook.
import { useSportDispatch } from "../../context/sports/context";
import { useTeamDispatch } from "../../context/teams/context";
import { usePreferencesDispatch } from "../../context/preferences/context";

// I'll import the ProjectListItems component from the same folder.
// This I'll define next.
import PreferenceListItems from "./PreferenceListItems";
// import matches from ".";
// import SportSlider from "./SportSlider";
const PreferenceList: React.FC = () => {
  // I'll define a new constant called dispatchProjects,
  // to call the useProjectsDispatch() hook.
  const dispatchSport = useSportDispatch();
  const dispatchTeam = useTeamDispatch();
  const dispatchPreferences = usePreferencesDispatch();

  useEffect(() => {
    fetchSports(dispatchSport);
    fetchTeams(dispatchTeam);
    fetchPreferences(dispatchPreferences);
  }, []);
  const isAuthenticated = !!localStorage.getItem("authToken");
  return (
    <div className="mx-5">
      {/* <PreferenceListItems /> */}
      {isAuthenticated && <PreferenceListItems />}
      <br />
    </div>
  );
};
export default PreferenceList;
