import { Navigate, createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import AccountLayout from "../layouts/account";
import Matches from "../pages/matches";
import Logout from "../pages/logout";
import Sports from "../pages/sports";
import MatchDetailsIndex from "../pages/match_details";
import ArticleDetailsIndex from "../pages/article_details";
import Dashboard from "../pages/dashboard";
import Articles from "../pages/articles";
import ArticleContainer from "../pages/articles/ArticleContainer";
import ChangePassword from "../pages/changePassword";
import Profile from "../pages/profile";
import NotFound from "../pages/Notfound";
import ProtectedRoute from "./ProtectedRoute";
import Favourites from "../pages/favourites";
import Preferences from "../pages/preferences";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/account" replace /> },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "account",
    element: <AccountLayout />,
    children: [
      // { index: true, element: <Navigate to="/account" replace /> },
      // { index: true, element: <Dashboard /> },
      {
        path: "articles",
        // element: <ArticleContainer />,
        children: [
          // { index: true, element: <Articles /> },
          {
            path: ":articleID",
            element: <ArticleDetailsIndex />,
          },
        ],
      },
      {
        path: "matches",
        children: [
          { index: true, element: <Matches /> },
          {
            path: ":matchID",
            element: <MatchDetailsIndex />,
          },
        ],
      },

      {
        path: "preferences",
        element: (
          <ProtectedRoute>
            <Preferences />
          </ProtectedRoute>
        ),
      },
      {
        path: "changePassword",
        index: true,
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),

        children: [
          // {
          //   index: true,
          //   element: (
          //     <ProtectedRoute>
          //       <Profile />
          //     </ProtectedRoute>
          //   ),
          // },
          {
            path: "changePassword",
            element: (
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "favourites",
    element: (
      <ProtectedRoute>
        <Favourites />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "articles",
        children: [
          // { index: true, element: <Articles /> },
          {
            path: ":articleID",
            element: <ArticleDetailsIndex />,
          },
        ],
      },
      {
        path: "matches",
        children: [
          { index: true, element: <Matches /> },
          {
            path: ":matchID",
            element: <MatchDetailsIndex />,
          },
        ],
      },
    ],
  },
  {
    path: "/notfound",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/notfound" replace />,
  },
]);
export default router;
