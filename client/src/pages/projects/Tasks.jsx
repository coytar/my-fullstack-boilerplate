import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import DeleteButton from "../../partials/actions/DeleteButton";
import DateSelect from "../../components/DateSelect";
import FilterButton from "../../components/DropdownFilterTask";
import TasksTable from "../../partials/tasks/TasksTable";
import ModalBasic from "../../components/ModalBasic";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import PaginationClassic2 from "../../components/PaginationClassic2";
import ItemCountSelect from "../../components/ItemCountSelect";

function Tasks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [description, setDescription] = React.useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const { loading, error, data } = useQuery(queries.LIST_TASKS, {
    variables: {
      page,
      pageSize,
    },
  });
  const [addTask] = useMutation(mutations.ADD_TASK);
  const [deleteTasks] = useMutation(mutations.DELETE_TASKS);
  const navigate = useNavigate();

  const callDeleteTasks = () => {
    deleteTasks({ variables: { items: selectedItems } })
      .then((value) => {
        console.log(value);
        navigate(0);
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const callAddTask = () => {
    addTask({ variables: { desc: description } })
      .then((value) => {
        console.log(value);
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const handleItemCountSelect = (val) => {
    setPageSize(parseInt(val));
  }

  const handleFilterSelection = (sel) => {
    // console.log(sel);
  }

  const previousClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextClick = () => {
    setPage(page + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tasks = data.tasks.data;
  // console.log(data.tasks);

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
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                  Tasks ✨
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} handleClick={callDeleteTasks} />
                {/* Dropdown */}
                <ItemCountSelect value={pageSize} handleClick={handleItemCountSelect} />
                {/* Dropdown */}
                {/* <DateSelect /> */}
                {/* Filter button */}
                {/* <FilterButton align="right" handleClick={handleFilterSelection} /> */}
                {/* Add order button */}
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeedbackModalOpen(true);
                  }}
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Task</span>
                </button>
              </div>
            </div>

            <div className="m-1.5">
              {/* Start */}
              {/* <button
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                aria-controls="feedback-modal"
                onClick={(e) => {
                  e.stopPropagation();
                  setFeedbackModalOpen(true);
                }}
              >
                Send Feedback
              </button> */}
              <ModalBasic
                id="feedback-modal"
                modalOpen={feedbackModalOpen}
                setModalOpen={setFeedbackModalOpen}
                title="Add Task"
              >
                {/* Modal content */}
                <div className="px-5 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                      Enter the task information
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="feedback"
                      >
                        Description <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="feedback"
                        className="form-textarea w-full px-2 py-1"
                        rows="4"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap justify-end space-x-2">
                    <button
                      className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFeedbackModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        callAddTask();
                        setFeedbackModalOpen(false);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </ModalBasic>
              {/* End */}
            </div>

            <div className="mb-5">
              <ul className="flex flex-wrap -m-1">
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                    View All
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 duration-150 ease-in-out">
                    Completed
                  </button>
                </li>
              </ul>
            </div>

            {/* Table */}
            <TasksTable count={data.tasks.count} items={tasks} selectedItems={handleSelectedItems} />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic2
                page={page}
                countPerPage={pageSize}
                count={pageSize}
                previousClick={previousClick}
                nextClick={nextClick}
                nextClickEnable={data.tasks.nextPage}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Tasks;
