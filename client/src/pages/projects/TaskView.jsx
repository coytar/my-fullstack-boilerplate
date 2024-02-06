import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

function TaskView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const { loading, error, data } = useQuery(queries.GET_TASK, {
    variables: { id },
  });
  const [deleteTask] = useMutation(mutations.DELETE_TASK);
  const navigate = useNavigate();

  const callDeleteTask = () => {
    deleteTask({ variables: { id: id } })
      .then((value) => {
        console.log(value);
        navigate("/projects/tasks");
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const statusColor = (status) => {
    // console.log(status);
    switch (status) {
      case true:
        return "bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400";
      case false:
        return "bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400";
      default:
        return "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400";
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const task = data.getTask;
  if (!task) {
    navigate("/projects/tasks");
    return <p>Item does not exist</p>;
  }
  // console.log(task);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="mb-3">
              <a
                className="text-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                href="/projects/tasks"
              >
                &lt;- Back To Listing
              </a>
            </div>

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                  Task View ✨
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <button
                  className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    callDeleteTask();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Page content */}
            <div>
              <div>{task.description}</div>
              <br />
              Completed:{" "}
              <div
                className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
                  task.completed
                )}`}
              >
                {task.completed ? "Yes" : "No"}
              </div>
              <hr className="my-6 border-t border-slate-200 dark:border-slate-700" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TaskView;
