import React from "react";

function DeleteButton({ selectedItems, handleClick }) {
  return (
    <div className={`${selectedItems.length < 1 && "hidden"}`}>
      <div className="flex items-center">
        <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap">
          <span>{selectedItems.length}</span> items selected
        </div>
        <button
          className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-rose-500"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteButton;
