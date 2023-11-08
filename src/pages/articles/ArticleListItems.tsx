/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { useArticleState } from "../../context/articles/context";
import { Link } from "react-router-dom";
import { usePreferencesState } from "../../context/preferences/context";
import { useSportState } from "../../context/sports/context";

export default function ArticleListItems() {
  const [selectedSport, setSelectedSport] = useState<string | null>("Trending");

  const articleState: any = useArticleState();
  const sportState: any = useSportState();
  const preferencesState: any = usePreferencesState();

  const { articles, isLoading, isError, errorMessage } = articleState;
  const { sports, isLoading1, isError1, errorMessage1 } = sportState;
  const { preferences, isLoading2, isError2, errorMessage2 } = preferencesState;

  // if (articles.length === 0) {
  //   throw Error("Error!!!");
  // }

  if (isLoading || isLoading1 || isLoading2) {
    return <span>Loading articles...</span>;
  }
  if (isError || isError1 || isError2) {
    return <span>{errorMessage || errorMessage1 || errorMessage2}</span>;
  }

  const handleSportButtonClick = (sportName: string) => {
    setSelectedSport(sportName);
  };

  const isAuthenticated = !!localStorage.getItem("authToken");

  const filteredArticles = articles.filter(
    (article: { sport: { name: string }; teams: any[] }) => {
      if (selectedSport === "Trending" && !isAuthenticated) {
        return true;
      }
      if (selectedSport === "Trending" && isAuthenticated) {
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

  return (
    <div className="dark:bg-gray-800">
      <div className="sticky">
        {isAuthenticated &&
        preferences &&
        preferences.sports &&
        preferences.sports.length > 0 ? (
          <div className="flex space-x-3">
            <button
              key="trending"
              onClick={() => handleSportButtonClick("Trending")}
              className={`py-2 px-4 border rounded-full ${
                selectedSport === "Trending"
                  ? "bg-black text-white dark:text-gray-800 dark:bg-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              Trending
            </button>
            {preferences &&
              preferences.sports &&
              preferences.sports.map((sport: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSportButtonClick(sport)}
                  className={`py-2 px-4 border rounded-full ${
                    selectedSport === sport
                      ? "bg-black text-white dark:text-gray-800 dark:bg-white"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {sport}
                </button>
              ))}
          </div>
        ) : (
          <div className="flex space-x-3">
            <button
              key="trending"
              onClick={() => handleSportButtonClick("Trending")}
              className={`py-2 px-4 rounded-full ${
                selectedSport === "Trending"
                  ? "bg-black text-white  dark:text-gray-800 dark:bg-white"
                  : "bg-gray-100  dark:bg-gray-800"
              }`}
            >
              Trending
            </button>
            {sportState.sports &&
              sportState.sports.map((sport: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSportButtonClick(sport.name)}
                  className={`py-2 px-4 rounded-full ${
                    selectedSport === sport.name
                      ? "bg-black text-white  dark:text-gray-800 dark:bg-white"
                      : "bg-gray-100  dark:bg-gray-800"
                  }`}
                >
                  {sport.name}
                </button>
              ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : filteredArticles.length === 0 ? (
        <div className="flex h-[10vh] items-center justify-center">
          <div className="text-xl font-semibold text-gray-600">
            Articles not available
          </div>
        </div>
      ) : (
        <div className="my-5 max-h-[1090px]  relative overflow-y-scroll bg-gray-100  dark:bg-gray-600 p-5 rounded-xl">
          {filteredArticles.map((article: any) => (
            <div
              key={article.id}
              style={{ height: "300px" }}
              className="my-5 relative flex w-full max-w-[76rem] flex-row rounded-xl bg-white  dark:bg-gray-800  dark:text-white bg-clip-border text-gray-700 shadow-md"
            >
              <div className="relative m-0 w-80 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                <Link to={`articles/${article.id}`}>
                  <img
                    src={article.thumbnail}
                    alt="image"
                    className="h-full w-80 object-cover"
                  />
                </Link>
              </div>
              <div className="p-5 relative">
                <p className="absolute dark:text-white bottom-5 left-4 font-semibold inset-x-4">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </p>
                <h6 className="mb-4 block dark:text-white font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                  {article.sport.name}
                </h6>
                <h4 className="mb-2 block  font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {article.title}
                </h4>
                <p className="mb-8 block font-sans  dark:text-white text-base font-normal leading-relaxed text-gray-700 antialiased">
                  {article.summary}
                </p>

                <Link key={article.id} to={`/account/articles/${article.id}`}>
                  <button
                    className="absolute bottom-4 right-4 bg-white p-2  hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200  transform hover:scale-110 active:bg-pink-200 flex items-center rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500  dark:text-white dark:bg-black transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      ></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Fragment, useEffect, useState } from "react";
// import { useArticleState } from "../../context/articles/context";
// // import { useArticleDispatch } from "../../context/articles/context";
// import { Link } from "react-router-dom";
// import { usePreferencesState } from "../../context/preferences/context";
// import { useSportState } from "../../context/sports/context";
// import { Dialog, Transition } from "@headlessui/react";
// import {
//   useArticleDetailsDispatch,
//   useArticleDetailsState,
// } from "../../context/article_details/context";
// import { getArticleDetails } from "../../context/article_details/action";

// export default function ArticleListItems() {
//   const [selectedSport, setSelectedSport] = useState<string | null>("Trending");
//   const [selectedArticleId, setSelectedArticleId] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   const handleReadMoreClick = (articleId) => {
//     setSelectedArticleId(articleId);
//   };
//   console.log("selectedArticleId", selectedArticleId);

//   const dispatchArticleDetails = useArticleDetailsDispatch();
//   const articleID = selectedArticleId;

//   useEffect(() => {
//     if (articleID) {
//       getArticleDetails(dispatchArticleDetails, articleID);
//       console.log("useeffect", articleID);
//       setIsOpen(true);
//     }
//   }, [dispatchArticleDetails, articleID]);

//   const articleDetailState: any = useArticleDetailsState();
//   const state: any = useArticleState();
//   const state1: any = useSportState();
//   const state2: any = usePreferencesState();

//   const { articlesDetails, isLoading3, isError3, errorMessage3 } =
//     articleDetailState;
//   console.log("articlesDetails", articleDetailState.articles);

//   const { articles, isLoading, isError, errorMessage } = state;
//   console.log(articles);

//   if (articles.length === 0 && isLoading) {
//     return <span>Loading...</span>;
//   }
//   if (isError) {
//     return <span>{errorMessage}</span>;
//   }

//   const { sports, isLoading1, isError1, errorMessage1 } = state1;
//   console.log(sports);

//   if (isLoading1) {
//     return <span>Loading...</span>;
//   }
//   if (isError1) {
//     return <span>{errorMessage1}</span>;
//   }

//   const { preferences, isLoading2, isError2, errorMessage2 } = state2;

//   if (isLoading2) {
//     return <span>Loading...</span>;
//   }
//   if (isError2) {
//     return <span>{errorMessage2}</span>;
//   }

//   const handleSportButtonClick = (sportName: string) => {
//     setSelectedSport(sportName);
//   };

//   const isAuthenticated = !!localStorage.getItem("authToken");

//   const filteredArticles = articles.filter(
//     (article: { sport: { name: string }; teams: any[] }) => {
//       if (selectedSport === "Trending" && !isAuthenticated) {
//         return true;
//       }
//       if (selectedSport === "Trending" && isAuthenticated) {
//         if (
//           preferences &&
//           preferences.sports &&
//           preferences.sports.length > 0
//         ) {
//           return (
//             preferences.sports.includes(article.sport.name) ||
//             article.teams.some((team: any) =>
//               preferences.teams.includes(team.name)
//             )
//           );
//         } else {
//           return true;
//         }
//       }
//       return !selectedSport || article.sport.name === selectedSport;
//     }
//   );

//   return (
//     <div>
//       <div className="sticky">
//         {isAuthenticated &&
//         preferences &&
//         preferences.sports &&
//         preferences.sports.length > 0 ? (
//           <div>
//             <button
//               key="trending"
//               onClick={() => handleSportButtonClick("Trending")}
//               className={`py-2 px-4 mx-3 border  rounded-xl ${
//                 selectedSport === "Trending" ? "bg-gray-200" : "bg-gray-100"
//               }`}
//             >
//               Trending
//             </button>
//             {preferences &&
//               preferences.sports &&
//               preferences.sports.map((sport: any, index: number) => (
//                 <button
//                   key={index}
//                   onClick={() => handleSportButtonClick(sport)}
//                   className={`py-2 px-4 mx-3 border rounded-xl ${
//                     selectedSport === sport ? "bg-gray-200" : "bg-gray-100"
//                   }`}
//                 >
//                   {sport}
//                 </button>
//               ))}
//           </div>
//         ) : (
//           <div>
//             <p>login</p>
//             <button
//               key="trending"
//               onClick={() => handleSportButtonClick("Trending")}
//               className={`py-2 px-4 mx-2 border ${
//                 selectedSport === "Trending" ? "bg-gray-200" : "bg-gray-100"
//               }`}
//             >
//               Trending
//             </button>
//             {state1.sports &&
//               state1.sports.map((sport: any, index: number) => (
//                 <button
//                   key={index}
//                   onClick={() => handleSportButtonClick(sport.name)}
//                   className={`py-2 px-4 mx-3 rounded border ${
//                     selectedSport === sport.name ? "bg-gray-200" : "bg-gray-100"
//                   }`}
//                 >
//                   {sport.name}
//                 </button>
//               ))}
//             <br />
//           </div>
//         )}
//       </div>

//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="my-5 max-h-[1000px] relative overflow-y-scroll bg-gray-100 p-5 rounded-xl">
//           {filteredArticles.map((article: any) => (
//             <div
//               key={article.id}
//               style={{ height: "345px" }}
//               className="my-5 relative flex w-full max-w-[76rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
//             >
//               <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
//                 <img
//                   src={article.thumbnail}
//                   alt="image"
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
//                   {article.sport.name}
//                 </h6>
//                 <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//                   {article.title}
//                 </h4>
//                 <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
//                   {article.summary}
//                 </p>

//                 <h1>Teams</h1>
//                 <ul>
//                   {article.teams.map((team: any) => (
//                     <li key={team.id}>{team.name}</li>
//                   ))}
//                 </ul>

//                 <Link key={article.id} to={`/account/articles/${article.id}`}>
//                   <button
//                     className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//                     type="button"
//                     onClick={openModal}
//                     // onClick={() => handleReadMoreClick(article.id)}
//                   >
//                     Read More
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="2"
//                       stroke="currentColor"
//                       aria-hidden="true"
//                       className="h-4 w-4"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
//                       ></path>
//                     </svg>
//                   </button>

//                   {/* {selectedArticleId && (
//                   <ArticleDetails articleSelectId={selectedArticleId} />
//                 )} */}

//                   <Transition appear show={isOpen} as={Fragment}>
//                     <Dialog
//                       as="div"
//                       className="fixed inset-0 z-10 overflow-y-auto"
//                       onClose={closeModal}
//                     >
//                       <div className="flex items-center justify-center min-h-screen px-4 text-center">
//                         <Transition.Child
//                           as={Fragment}
//                           enter="ease-out duration-300"
//                           enterFrom="opacity-0"
//                           enterTo="opacity-100"
//                           leave="ease-in duration-200"
//                           leaveFrom="opacity-100"
//                           leaveTo="opacity-0"
//                         >
//                           <Dialog.Overlay className="fixed inset-0 opacity-30" />
//                         </Transition.Child>

//                         <Transition.Child
//                           as={Fragment}
//                           enter="ease-out duration-300"
//                           enterFrom="opacity-0 scale-95"
//                           enterTo="opacity-100 scale-100"
//                           leave="ease-in duration-200"
//                           leaveFrom="opacity-100 scale-100"
//                           leaveTo="opacity-0 scale-95"
//                         >
//                           <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-sm rounded-2xl">
//                             <Dialog.Title
//                               as="h3"
//                               className="text-2xl font-bold text-gray-900 mb-4"
//                             >
//                               {articleDetailState.articles.sport.name}
//                             </Dialog.Title>

//                             {articleDetailState.isLoading ? (
//                               <div className="text-center text-gray-700 dark:text-gray-300">
//                                 Loading...
//                               </div>
//                             ) : articleDetailState.articles ? (
//                               <div className="grid gap-4 mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
//                                 <h5 className="text-xl font-bold">
//                                   {articleDetailState.articles.title}
//                                 </h5>
//                                 <p className="font-medium">
//                                   {articleDetailState.articles.summary}
//                                 </p>
//                                 <img
//                                   src={articleDetailState.articles.thumbnail}
//                                   alt={articleDetailState.articles.title}
//                                   className="w-full h-96 object-cover rounded-lg"
//                                 />
//                                 <p className="font-medium">
//                                   {new Date(
//                                     articleDetailState.articles.date
//                                   ).toLocaleDateString("en-US", {
//                                     year: "numeric",
//                                     month: "short",
//                                     day: "2-digit",
//                                   })}
//                                 </p>
//                                 <p className="text-lg">
//                                   {articleDetailState.articles.content}
//                                 </p>
//                                 {articleDetailState.articles.teams.length >
//                                 0 ? (
//                                   <ul className="text-gray-600">
//                                     <li>Teams:</li>
//                                     {articleDetailState.articles.teams.map(
//                                       (team) => (
//                                         <li>{team.name}</li>
//                                       )
//                                     )}
//                                   </ul>
//                                 ) : null}
//                               </div>
//                             ) : (
//                               <div className="text-center text-red-600 dark:text-red-400">
//                                 Failed to load article.
//                               </div>
//                             )}

//                             <div className="mt-6 flex justify-center">
//                               <button
//                                 type="button"
//                                 className="inline-flex justify-center px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                                 onClick={closeModal}
//                               >
//                                 Close
//                               </button>
//                             </div>
//                           </div>
//                         </Transition.Child>
//                       </div>
//                     </Dialog>
//                   </Transition>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
