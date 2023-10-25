/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
// import { Article, ArticleDispatch } from "./reducer";
export const fetchArticles = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  //   const UserData = localStorage.getItem("userData");
  //   const userDatas = JSON.parse(UserData);
  //   const userId = userDatas.id;
  //   console.log("iddd", userId);

  try {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching ARTICLES:", error);
    dispatch({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "Unable to load ARTICLES",
    });
  }
};

export const getArticle = async (
  // dispatch: ArticleDispatch,
  dispatch: any,
  articleID: string
  // articles: Article
) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles/${articleID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("get article", data);

    // fetchArticles(dispatch);
    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching ARTICLES:", error);
    dispatch({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "Unable to load ARTICLES",
    });
  }
};
