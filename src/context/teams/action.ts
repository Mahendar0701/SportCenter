/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
export const fetchTeams = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  //   const UserData = localStorage.getItem("userData");
  //   const userDatas = JSON.parse(UserData);
  //   const userId = userDatas.id;
  //   console.log("iddd", userId);

  try {
    dispatch({ type: "FETCH_TEAMS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_TEAMS_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching Team:", error);
    dispatch({
      type: "FETCH_TEAMS_FAILURE",
      payload: "Unable to load Team",
    });
  }
};

// export const addMember = async (dispatch: any, args: any) => {
//   try {
//     const token = localStorage.getItem("authToken") ?? "";
//     const response = await fetch(`${API_ENDPOINT}/users`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },

//       // Next, I'll pass the `args` here
//       body: JSON.stringify(args),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to create Member");
//     }
//     const data = await response.json();
//     console.log("data", data.user);
//     if (data.errors && data.errors.length > 0) {
//       return { ok: false, error: data.errors[0].message };
//     }

//     // And if everything goes well with the API call, we will dispatch an action,
//     // with `type` set to `ADD_PROJECT_SUCCESS` and in `payload` we will send the
//     // new project `data`.
//     dispatch({ type: "ADD_MEMBERS_SUCCESS", payload: data.user });

//     // Next, I'll return a status called "ok", with value `true`
//     // as everything went well.
//     return { ok: true };
//   } catch (error) {
//     console.error("Operation failed:", error);
//     // Dialogue 5: And for error I'll return status called "ok", with value `false`.
//     return { ok: false, error };
//   }
// };

// export const removeMember = async (dispatch: any, args: any) => {
//   try {
//     const token = localStorage.getItem("authToken") ?? "";

//     const Id = args.id;
//     console.log("ID", Id);

//     const response = await fetch(`${API_ENDPOINT}/users/${Id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },

//       // Next, I'll pass the `args` here
//       body: JSON.stringify(args),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to delete Member");
//     }
//     const data = await response.json();
//     console.log("data", data);
//     if (data.errors && data.errors.length > 0) {
//       return { ok: false, error: data.errors[0].message };
//     }

//     //fetch users and update
//     const response1 = await fetch(`${API_ENDPOINT}/users`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data1 = await response1.json();
//     console.log("data", data1);
//     dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: data1 });

//     // And if everything goes well with the API call, we will dispatch an action,
//     // with `type` set to `ADD_PROJECT_SUCCESS` and in `payload` we will send the
//     // new project `data`.

//     // dispatch({ type: "DELETE_MEMBER_SUCCESS", payload: Id });

//     // Next, I'll return a status called "ok", with value `true`
//     // as everything went well.
//     return { ok: true };
//   } catch (error) {
//     console.error("Operation failed:", error);
//     // Dialogue 5: And for error I'll return status called "ok", with value `false`.
//     return { ok: false, error };
//   }
// };
