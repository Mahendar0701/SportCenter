import { API_ENDPOINT } from "../../config/constants";
import { ArticleListAvailableAction, ArticlesDispatch } from "./types";

export const refreshTasks = async (
  dispatch: ArticlesDispatch,
  articleID: string
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: ArticleListAvailableAction.FETCH_ARTICLES_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/articles/${articleID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    // extract the response body as JSON data
    const data = await response.json();
    console.log("type article", data);
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLES_SUCCESS,
      payload: data,
    });
    console.dir(data);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLES_FAILURE,
      payload: "Unable to load articles",
    });
  }
};
