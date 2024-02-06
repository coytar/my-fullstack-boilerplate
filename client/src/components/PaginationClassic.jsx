import React from "react";

function PaginationClassic(props) {
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
              className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600"
              onClick={props.previousClick}
            >
              &lt;- Previous
            </button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-600 text-indigo-500"
              onClick={props.nextClick}
            >
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {props.page}
        </span>{" "}
        to{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {props.countPerPage}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {props.count}
        </span>{" "}
        results
      </div>
    </div>
  );
}

export default PaginationClassic;
