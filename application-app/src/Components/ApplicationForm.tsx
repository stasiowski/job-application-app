import { useState } from "react";

export function ApplicationForm() {
  const [showForm, setShowForm] = useState(false);

  function handleForm() {
    setShowForm((prev) => !prev);
  }
  return (
    <div className="flex flex-col w-fit gap-2">
      {showForm && (
        <div className="mt-1 w-fit py-2 px-1 rounded-md shadow-md">
          <div className="flex flex-col gap-1 items-center">
            <input
              className="px-2 py-1 rounded-md bg-white"
              type="text"
              placeholder="Title"
              name="Title"
            />
            <input
              className="px-2 py-1 rounded-md bg-white"
              type="text"
              placeholder="Company"
              name="Company name"
            />
            <input
              className="px-2 py-1 rounded-md bg-white"
              type="text"
              placeholder="Location"
              name="Location"
            />
          </div>
        </div>
      )}

      <button
        className="px-3 py-1 
            rounded-md
            text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
        onClick={() => {
          handleForm();
        }}
      >
        Add Application
      </button>
    </div>
  );
}
