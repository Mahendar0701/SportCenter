/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSportState } from "../../context/sports/context";
// import { useSportDispatch } from "../../context/sports/context";

export default function SportListItems() {
  const state: any = useSportState();

  // const dispatchSport = useSportDispatch();

  const { sports, isLoading, isError, errorMessage } = state;
  console.log("sports", sports.sports);
  // console.log(user);

  if (sports.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {sports.map((Sport: any) => (
        <div
          key={Sport.id}
          className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {Sport.name}
          </h5>
        </div>
      ))}
    </>
  );
}
