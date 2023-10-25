/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";
import { usePreferencesState } from "../../context/preferences/context";

export default function PreferenceListItems() {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string[]>([]);

  const openModal = () => {
    setIsOpen(true);
  };
  // const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    // navigate("../");
  };

  const sportState: any = useSportState();
  const teamState: any = useTeamState();
  const preferencesState: any = usePreferencesState();

  const { sports, isLoading1, isError1, errorMessage1 } = sportState;
  const { teams, isLoading, isError, errorMessage } = teamState;
  const { preferences, isLoading2, isError2, errorMessage2 } = preferencesState;

  console.log("preferences in form", preferences);

  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      setSelectedSports(preferences.sports || []);
      setSelectedTeams(preferences.teams || []);
      setSelectedArticle(preferences.articles || []);
      setSelectedMatch(preferences.matches || []);
    }
  }, [preferences]);

  if (isLoading || isLoading1 || isLoading2) {
    return <span>Loading preferences...</span>;
  }
  if (isError || isError1 || isError2) {
    return <span>{errorMessage || errorMessage1 || errorMessage2}</span>;
  }

  const user = localStorage.getItem("userData") ?? "";
  console.log("user", user);

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
        throw new Error(`Failed to update preferences: ${errorData.message}`);
      }

      console.log("Preferences updated successfully!");
      console.log("selectedSports", updatedPreferences);
      window.location.reload();
    } catch (error: any) {
      console.error("Failed to update preferences:", error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Preferences
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl  dark:bg-black transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Favorite Sport
                  </Dialog.Title>
                  <div className="mt-2 dark:text-white dark:bg-black ">
                    <form onSubmit={handleSubmit}>
                      <div className="">
                        <div className="grid grid-cols-5 gap-3  dark:bg-black">
                          {sports &&
                            sports.length > 0 &&
                            sports.map((sport) => (
                              <div
                                key={sport.id}
                                className="flex items-center space-x-2  dark:bg-black"
                              >
                                <input
                                  type="checkbox"
                                  id={`sport-${sport.id}`}
                                  name={`sport-${sport.id}`}
                                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  value={sport.name}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setSelectedSports((prev) =>
                                      prev.includes(value)
                                        ? prev.filter((item) => item !== value)
                                        : [...prev, value]
                                    );
                                  }}
                                  checked={selectedSports.includes(sport.name)}
                                />
                                <label
                                  htmlFor={`sport-${sport.id}`}
                                  className="text-gray-700"
                                >
                                  {sport.name}
                                </label>
                              </div>
                            ))}
                        </div>
                        <br />
                        <h1 className="text-lg font-medium leading-6 text-gray-900">
                          Favorite Teams
                        </h1>
                        <div className="grid grid-cols-5 gap-3">
                          {teams.map((team) => (
                            <div
                              key={team.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={`team-${team.id}`}
                                name={`team-${team.id}`}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                value={team.name}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSelectedTeams((prev) =>
                                    prev.includes(value)
                                      ? prev.filter((item) => item !== value)
                                      : [...prev, value]
                                  );
                                }}
                                checked={selectedTeams.includes(team.name)}
                              />
                              <label
                                htmlFor={`team-${team.id}`}
                                className="text-gray-700"
                              >
                                {team.name}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 space-x-2">
                          <button
                            type="submit"
                            onClick={closeModal}
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={closeModal}
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );

  // return (
  //   <>
  //     <button
  //       type="button"
  //       onClick={openModal}
  //       className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  //     >
  //       Preferences
  //     </button>
  //     <Transition appear show={isOpen} as={Fragment}>
  //       <Dialog as="div" className="relative z-10" onClose={closeModal}>
  //         <Transition.Child
  //           as={Fragment}
  //           enter="ease-out duration-300"
  //           enterFrom="opacity-0"
  //           enterTo="opacity-100"
  //           leave="ease-in duration-200"
  //           leaveFrom="opacity-100"
  //           leaveTo="opacity-0"
  //         >
  //           <div className="fixed inset-0 bg-black bg-opacity-25" />
  //         </Transition.Child>
  //         <div className="fixed inset-0 overflow-y-auto">
  //           <div className="flex min-h-full items-center justify-center p-4 text-center">
  //             <Transition.Child
  //               as={Fragment}
  //               enter="ease-out duration-300"
  //               enterFrom="opacity-0 scale-95"
  //               enterTo="opacity-100 scale-100"
  //               leave="ease-in duration-200"
  //               leaveFrom="opacity-100 scale-100"
  //               leaveTo="opacity-0 scale-95"
  //             >
  //               <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
  //                 <Dialog.Title
  //                   as="h3"
  //                   className="text-lg font-medium leading-6 text-gray-900"
  //                 >
  //                   Favorite Sport
  //                 </Dialog.Title>
  //                 <div className="mt-2">
  //                   <form onSubmit={handleSubmit}>
  //                     {/* {preferences.sports} */}
  //                     <div className="">
  //                       <div className="grid grid-cols-5 gap-3">
  //                         {sports &&
  //                           sports.length > 0 &&
  //                           sports.map((sport: any) => (
  //                             <div key={sport.id} className="flex items-center">
  //                               <input
  //                                 type="checkbox"
  //                                 id={`sport-${sport.id}`}
  //                                 name={`sport-${sport.id}`}
  //                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
  //                                 value={sport.name}
  //                                 onChange={(e) => {
  //                                   const value = e.target.value;
  //                                   setSelectedSports((prev) =>
  //                                     prev.includes(value)
  //                                       ? prev.filter((item) => item !== value)
  //                                       : [...prev, value]
  //                                   );
  //                                 }}
  //                                 checked={selectedSports.includes(sport.name)}
  //                               />
  //                               <label
  //                                 htmlFor={`sport-${sport.id}`}
  //                                 className="ml-2 text-gray-700"
  //                               >
  //                                 {sport.name}
  //                               </label>
  //                             </div>
  //                           ))}
  //                       </div>
  //                       <br />
  //                       <h1 className="text-lg font-medium leading-6 text-gray-900">
  //                         Favourite Teams
  //                       </h1>
  //                       <div className="grid grid-cols-5 gap-3">
  //                         {teams.map((team: any) => (
  //                           <div key={team.id} className="flex items-center">
  //                             <input
  //                               type="checkbox"
  //                               id={`team-${team.id}`}
  //                               name={`team-${team.id}`}
  //                               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
  //                               value={team.name}
  //                               onChange={(e) => {
  //                                 const value = e.target.value;
  //                                 setSelectedTeams((prev) =>
  //                                   prev.includes(value)
  //                                     ? prev.filter((item) => item !== value)
  //                                     : [...prev, value]
  //                                 );
  //                               }}
  //                               checked={selectedTeams.includes(team.name)}
  //                             />
  //                             <label
  //                               htmlFor={`team-${team.id}`}
  //                               className="ml-2 text-gray-700"
  //                             >
  //                               {team.name}
  //                             </label>
  //                           </div>
  //                         ))}
  //                       </div>

  //                       <button
  //                         type="submit"
  //                         onClick={closeModal}
  //                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
  //                       >
  //                         Update
  //                       </button>
  //                       <button
  //                         type="button"
  //                         onClick={closeModal}
  //                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
  //                       >
  //                         Cancel
  //                       </button>
  //                     </div>
  //                   </form>
  //                 </div>
  //               </Dialog.Panel>
  //             </Transition.Child>
  //           </div>
  //         </div>
  //       </Dialog>
  //     </Transition>
  //   </>
  // );
}
