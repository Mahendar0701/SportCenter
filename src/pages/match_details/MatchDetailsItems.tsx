/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useMatchDetailsState } from "../../context/match_details/context";
// import { useMatchDispatch } from "../../context/match_details/context";
import { Transition, Dialog } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { API_ENDPOINT } from "../../config/constants";
import { toast } from "react-toastify";
import { LocationMarkerIcon, XIcon } from "@heroicons/react/outline";
import { button } from "@material-tailwind/react";
import { fetchPreferences } from "../../context/preferences/action";

export default function MatchItems() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string[]>([]);

  // Set isOpen to true when component mounts
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const state: any = useMatchDetailsState();
  const preferencesState: any = usePreferencesState();
  const dispatchPreferences = usePreferencesDispatch();

  //   const dispatchArticle = useArticleDispatch();

  const { matches, isLoading, isError, errorMessage } = state;
  const { preferences, isLoading2, isError2, errorMessage2 } = preferencesState;
  console.log("matches detailss", matches);
  // console.log(user);

  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      setSelectedSports(preferences.sports || []);
      setSelectedTeams(preferences.teams || []);
      setSelectedArticle(preferences.articles || []);
      setSelectedMatch(preferences.matches || []);
    }
  }, [preferences]);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const isAuthenticated = !!localStorage.getItem("authToken");

  const isMatchSaved = selectedMatch.includes(state.matches.id);

  const handleSaveMatch = () => {
    if (isMatchSaved) {
      const updatedSelectedMatch = selectedMatch.filter(
        (id) => id !== state.matches.id
      );
      setSelectedMatch(updatedSelectedMatch);
      console.log("updatedSelectedMatch", updatedSelectedMatch);
      toast.success("Match Removed from Favorites!", { autoClose: 3000 });
    } else {
      const updatedSelectedMatch = [...selectedMatch, state.matches.id];
      setSelectedMatch(updatedSelectedMatch);
      toast.success("Match Added to Favorites!", { autoClose: 3000 });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";

    const updatedPreferences = {
      sports: selectedSports,
      teams: selectedTeams,
      articles: selectedArticle,
      matches: selectedMatch,
    };

    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          preferences: updatedPreferences,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save : ${errorData.message}`);
      }

      console.log("saved successfully!");
      console.log("updatedPreferences", updatedPreferences);
      // window.location.reload();
      fetchPreferences(dispatchPreferences);
    } catch (error: any) {
      console.error("Failed to Save :", error.message);
    }
  };

  function calculateDuration(startDate: Date, endDate: Date): string {
    const duration = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m `;
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10  overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
              {state.isLoading ? (
                <div>Loading...</div>
              ) : state.matches ? (
                <>
                  <div className="">
                    <div className="flex justify-between items-center mb-2">
                      <h1 className="text-2xl font-semibold text-blue-800 uppercase antialiased">
                        {state.matches.sportName}
                      </h1>

                      <div className="flex">
                        <div className="flex items-center mx-5">
                          {state.matches.isRunning && (
                            <div className="relative inline-flex mr-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                              <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                            </div>
                          )}
                          <p
                            className={`text-green-500 ${
                              state.matches.isRunning ? "animate-pulse" : ""
                            }`}
                          >
                            {state.matches.isRunning && "Live"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="p-2 rounded-full text-gray-600 hover:bg-gray-200"
                        >
                          <XIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <hr className="my-2" />
                  <h3 className="text-2xl font-semibold mb-2">
                    {state.matches.name}
                  </h3>
                  <div className="flex space-x-8 flex-row ">
                    <div className="m-4 ">
                      <div className="flex items-center my-2 ">
                        <LocationMarkerIcon className="w-4 h-4 mr-1" />{" "}
                        {state.matches.location}
                      </div>
                      <p className="text-md text-gray-700">
                        <span>Starts At:</span>{" "}
                        {new Date(state.matches.startsAt).toLocaleString()}
                      </p>
                      <p className="text-md text-gray-700">
                        <span>Ends At:</span>{" "}
                        {new Date(state.matches.endsAt).toLocaleString()}
                      </p>

                      <p className="text-md text-gray-700">
                        <span>Duration:</span>{" "}
                        {calculateDuration(
                          new Date(state.matches.startsAt),
                          new Date(state.matches.endsAt)
                        )}
                      </p>
                    </div>

                    <div className="flex space-x-4 items-center m-5">
                      <div className="mb-4">
                        <div className="flex flex-row">
                          {Object.entries(state.matches.score).map(
                            ([team, scores]: [any, any]) => (
                              <div key={team} className="flex text-sm ml-2">
                                <p className="mx-2 bg-cyan-400 px-2 py-2 text-center text-xl rounded-md text-white">
                                  {team}
                                </p>
                                <p className=" text-2xl font-bold mx-3 my-2 text-green-600">
                                  {scores}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Details:</h4>
                    <p className="text-md">
                      {state.matches.story}
                      {/* {!showFullStory
                        ? `${state.matches.story
                            .split("\n")
                            .slice(0, 2)
                            .join("\n")}...`
                        : state.matches.story} */}
                    </p>
                    {/* <button
                      className="text-blue-500 hover:underline mt-2"
                      onClick={() => setShowFullStory(!showFullStory)}
                    >
                      {showFullStory ? "Read Less" : "Read More"}
                    </button> */}
                  </div>
                </>
              ) : (
                <div className="text-center text-red-600 dark:text-red-400">
                  Failed to load Match.
                </div>
              )}

              <div className="mt-4 flex justify-center">
                <form onSubmit={handleSubmit}>
                  <div className="flex">
                    {isAuthenticated && (
                      <div>
                        <button type="submit" onClick={handleSaveMatch}>
                          {isMatchSaved ? (
                            <span className="m-2  justify-center px-6 py-2 text-white   rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mb-4 block dark:text-white font-sans text-base font-semibold uppercase leading-relaxed tracking-normal bg-blue-500 antialiased">
                              Remove
                            </span>
                          ) : (
                            <span className="m-2  justify-center px-6 py-2 text-white   rounded-md hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mb-4 block dark:text-white font-sans text-base font-semibold uppercase leading-relaxed tracking-normal bg-pink-500 antialiased">
                              Save
                            </span>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
