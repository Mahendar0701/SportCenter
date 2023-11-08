import { useNavigate } from "react-router-dom";
import { useArticleDetailsState } from "../../context/article_details/context";
import { Transition, Dialog } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { API_ENDPOINT } from "../../config/constants";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { toast } from "react-toastify";
import { XIcon } from "@heroicons/react/outline";
import { fetchPreferences } from "../../context/preferences/action";

export default function ArticleItems() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string[]>([]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const articleDetailsState: any = useArticleDetailsState();
  const preferencesState: any = usePreferencesState();
  const dispatchPreferences = usePreferencesDispatch();

  const { articles, isLoading, isError, errorMessage } = articleDetailsState;
  const { preferences, isLoading2, isError2, errorMessage2 } = preferencesState;

  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      // setSelectedSports(preferences.sports || []);
      // setSelectedTeams(preferences.teams || []);
      setSelectedArticle(preferences.articles || []);
      // setSelectedMatch(preferences.matches || []);
    }
  }, [preferences]);

  if (articles.length === 0 && isLoading && isLoading2) {
    return <span>Loading article...</span>;
  }
  if (isError || isError2) {
    return <span>{errorMessage}</span>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";

    const updatedPreferences = {
      ...preferences,
      articles: selectedArticle,
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
      console.error("Failed to save :", error.message);
    }
  };

  const isAuthenticated = !!localStorage.getItem("authToken");
  const isArticleSaved = selectedArticle.includes(
    articleDetailsState.articles.id
  );

  const handleSaveArticle = () => {
    if (isArticleSaved) {
      const updatedSelectedArticle = selectedArticle.filter(
        (id) => id !== articleDetailsState.articles.id
      );
      setSelectedArticle(updatedSelectedArticle);
      toast.success("Article Removed from Favorites!", { autoClose: 3000 });
    } else {
      const updatedSelectedArticle = [
        ...selectedArticle,
        articleDetailsState.articles.id,
      ];
      setSelectedArticle(updatedSelectedArticle);
      toast.success("Article Added to Favorites!", { autoClose: 3000 });
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto "
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center dark:bg-gray-800">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block shadow-md w-full max-w-4xl px-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white  rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-gray-900 mb-4"
                >
                  <div className="flex justify-between pt-5">
                    <p> {articleDetailsState.articles.sport.name}</p>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="p-2 rounded-full text-gray-600 hover:bg-gray-200"
                    >
                      <XIcon className="w-6 h-6" />
                    </button>
                  </div>
                </Dialog.Title>

                {articleDetailsState.isLoading ? (
                  <div className="text-center text-gray-700 dark:text-gray-300">
                    Loading article...
                  </div>
                ) : articleDetailsState.articles ? (
                  <div className="grid gap-4 mt-4 p-4 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="text-xl font-bold">
                      {articleDetailsState.articles.title}
                    </h5>
                    <p className="font-medium">
                      {articleDetailsState.articles.summary}
                    </p>
                    <img
                      src={articleDetailsState.articles.thumbnail}
                      alt={articleDetailsState.articles.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    <p className="font-medium">
                      {new Date(
                        articleDetailsState.articles.date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </p>
                    <p className="text-lg">
                      {articleDetailsState.articles.content}
                    </p>
                    {articleDetailsState.articles.teams.length > 0 ? (
                      <ul className="text-gray-600">
                        <li>Teams:</li>
                        {articleDetailsState.articles.teams.map((team) => (
                          <li>{team.name}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-center text-red-600 dark:text-red-400">
                    Failed to load article.
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <form onSubmit={handleSubmit}>
                    <div className="flex">
                      {isAuthenticated && (
                        <div>
                          {isAuthenticated && (
                            <button
                              onClick={handleSaveArticle}
                              type="submit"
                              className={``}
                            >
                              {isArticleSaved ? (
                                <span className="m-2  justify-center px-6 py-2 text-white   rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mb-4 block dark:text-white font-sans text-base font-semibold uppercase leading-relaxed tracking-normal bg-blue-500 antialiased">
                                  Remove
                                </span>
                              ) : (
                                <span className="m-2  justify-center px-6 py-2 text-white   rounded-md hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mb-4 block dark:text-white font-sans text-base font-semibold uppercase leading-relaxed tracking-normal bg-pink-500 antialiased">
                                  Save
                                </span>
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
