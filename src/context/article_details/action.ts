/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
// import { Article, ArticleDispatch } from "./reducer";

export const getArticleDetails = async (
  // dispatch: ArticleDispatch,
  dispatch: any,
  articleID: string
  // articles: Article
) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ARTICLESDetails_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles/${articleID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("get", data);

    // fetchArticles(dispatch);
    dispatch({ type: "FETCH_ARTICLESDetails_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching ARTICLESDetails:", error);
    dispatch({
      type: "FETCH_ARTICLESDetails_FAILURE",
      payload: "Unable to load ARTICLESDetails",
    });
  }
};
