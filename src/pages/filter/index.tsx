// import ArticleFilterLayout from "./ArticleFilterLayout";

import React, { Suspense } from "react";
const ArticleFilterLayout = React.lazy(() => import("./ArticleFilterLayout"));
import ErrorBoundary from "../../components/ErrorBoundary";

const ArticleFilter = () => {
  return (
    <>
      <div>
        {/* <ArticleFilterLayout /> */}
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="suspense-loading">Loading Articles...</div>
            }
          >
            <ArticleFilterLayout />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};
export default ArticleFilter;
