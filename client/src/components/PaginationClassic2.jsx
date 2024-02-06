import React from "react";

function PaginationClassic2(props) {
  const prevButtonColor = (page) => {
    if (page == 1) {
      return "text-slate-300 dark:text-slate-600";
    }
    return "dark:text-slate-600 text-indigo-500";
  };

  const nextButtonColor = () => {
    if (props.nextClickEnable) {
      return "dark:text-slate-600 text-indigo-500";
    }
    return "text-slate-300 dark:text-slate-600";
  };

  const startNum = (props.page - 1) * props.countPerPage + 1;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button
              className={`btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${prevButtonColor(
                props.page
              )}`}
              onClick={props.previousClick}
            >
              &lt;- Previous
            </button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              className={`btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${nextButtonColor()}`}
              onClick={() => {
                if (props.nextClickEnable) props.nextClick();
              }}
            >
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {startNum}
        </span>{" "}
        to{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {startNum + props.count - 1}
        </span>{" "}
        {/* of{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {props.count}
        </span>{" "} */}
        results
      </div>
    </div>
  );
}

export default PaginationClassic2;
