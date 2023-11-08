import React, { Suspense } from "react";
const MatchList = React.lazy(() => import("./MatchList"));
import ErrorBoundary from "../../components/ErrorBoundary";

const Matches = () => {
  return (
    <>
      <h2 className="text-xl font-semibold">Matches</h2>
      <hr className="my-5 border-gray-400" />
      {/* <MatchList /> */}
      <ErrorBoundary>
        <Suspense
          fallback={<div className="suspense-loading">Loading Matches...</div>}
        >
          <MatchList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
export default Matches;
