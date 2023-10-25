/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
export const getMatchDetails = async (dispatch: any, matchID: string) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_MATCHESDetails_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches/${matchID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(" Matche Details data", data);
    dispatch({ type: "FETCH_MATCHESDetails_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching MATCHES Details:", error);
    dispatch({
      type: "FETCH_MATCHESDetails_FAILURE",
      payload: "Unable to load MATCHES Details",
    });
  }
};
