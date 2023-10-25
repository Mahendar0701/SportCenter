// import PreferenceList from "./PreferenceList";
import React, { Suspense } from "react";
const PreferenceList = React.lazy(() => import("./PreferenceList"));
import ErrorBoundary from "../../components/ErrorBoundary";

const Preferences = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <>
      {isAuthenticated && (
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="suspense-loading">Loading Preferences...</div>
            }
          >
            <PreferenceList />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};
export default Preferences;
