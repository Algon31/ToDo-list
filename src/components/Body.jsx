import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash } from "react-icons/fa";

const Body = () => {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  useEffect(() => {
    let strin = localStorage.getItem("todos");
    if (strin) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
    sL();
  }, []);

  const sL = (e) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const handleAdd = () => {
    if (todo) {
      settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
      settodo("");
      sL();
    } else {
      alert("Enter a task!");
    }
  };
  const handleEdit = (id) => {
    let st = todos.filter((it) => it.id === id);
    // console.log(st);
    settodo(st[0].todo);
    handleDelete(id);
    sL();
  };
  const handleDelete = (id) => {
    let newT = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newT);
    sL();
  };
  const handleClear = () => {
    let a = window.confirm("Are You Sure U Wanna Clear The List??");
    if (a) {
      settodos([]);
      sL();
    }
  };

  const handlecheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newT = [...todos];
    newT[index].iscompleted = !newT[index].iscompleted;
    settodos(newT);
    sL();
  };

  return (
    <>
      {/* this is adding task */}
      <div className="my-5 flex flex-col gap-2">
        <div className="bg-amber-200 mx-auto w-[80vw] h-30 rounded-2xl flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Add Task</h1>
          <div className="w-full flex justify-center gap-2 ">
            <input
              id="inpu"
              onChange={handleChange}
              onKeyDown={(e) => {
                // console.log(e);
                if (e.key === "Enter") {
                  handleAdd();
                }
              }}
              value={todo}
              className="w-8/12 border-b-2 bg-amber-300 rounded-t-sm ml-5 h-9 focus:outline-none"
              type="text"
            />

            <button
              onClick={handleAdd}
              className="cursor-pointer bg-amber-600 p-2 rounded-sm"
            >
              Add
            </button>
          </div>
        </div>
        {/* this is taksss */}
        <div className="bg-amber-200 mx-auto w-[80vw] h-[68vh] rounded-2xl flex flex-col items-center gap-2">
          <div className="flex justify-between w-4/5 items-center content-center">
            <h1 className="text-2xl font-bold my-2">Task Yet To Complete</h1>
            {todos.length > 2 && (
              <button
                onClick={handleClear}
                className="cursor-pointer bg-amber-600 p-2 rounded-sm h-9 "
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-col overflow-y-auto w-4/5 mx-2">
            {todos.length === 0 && (
              <div className="self-center">No Todos Display!!</div>
            )}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-6 bg-amber-300 rounded-sm my-1  justify-between p-2"
                >
                  <div className="flex gap-1.5 justify-center">
                    <input
                      name={item.id}
                      type="checkbox"
                      onChange={handlecheck}
                      value={todo.iscompleted}
                    />
                    <div
                      className={`${
                        item.iscompleted ? "line-through" : ""
                      } text-sm md:text-lg`}
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="flex gap-2 mx-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="flex items-center justify-center bg-amber-600 p-2 rounded-sm text-black hover:bg-amber-700 transition-all"
                    >
                      <FaEdit className="block md:hidden text-lg" />{" "}
                      {/* Icon (small screens) */}
                      <span className="hidden md:block">Edit</span>{" "}
                      {/* Text (large screens) */}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center justify-center bg-amber-600 p-2 rounded-sm text-black hover:bg-red-700 transition-all"
                    >
                      <FaTrash className="block md:hidden text-lg text-black" />{" "}
                      {/* Icon (small screens) */}
                      <span className="hidden md:block">Delete</span>{" "}
                      {/* Text (large screens) */}
                    </button>
                    {sL()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
