/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
export const fetchMatches = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("all Matches data", data);
    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: data.matches });
  } catch (error) {
    console.log("Error fetching MATCHES:", error);
    dispatch({
      type: "FETCH_MATCHES_FAILURE",
      payload: "Unable to load MATCHES",
    });
  }
};

export const getMatch = async (dispatch: any, matchID: string) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches/${matchID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(" Matche detail data", data);
    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching MATCHES:", error);
    dispatch({
      type: "FETCH_MATCHES_FAILURE",
      payload: "Unable to load MATCHES",
    });
  }
};
