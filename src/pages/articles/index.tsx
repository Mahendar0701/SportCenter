import React, { Suspense } from "react";
const ArticleList = React.lazy(() => import("./ArticleList"));
import ErrorBoundary from "../../components/ErrorBoundary";

const Articles = () => {
  return (
    <>
      <div className="">
        {/* <ArticleList /> */}
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="suspense-loading">Loading Articles...</div>
            }
          >
            <ArticleList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};
export default Articles;
