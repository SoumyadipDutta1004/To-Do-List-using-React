import Navbar from './components/Navbar'
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";


const App = () => {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [btn, setBtn] = useState("Add");
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todosLS = JSON.parse(localStorage.getItem("todos"));
      setTodos(todosLS);
      console.log(todosLS);
    }
  }, []);// Runs only once when the component mounts

  // Save todos to localStorage whenever "todos" state changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);// Runs every time "todos" is updated

  // function to Add a to-do
  const handleAdd = () => {
    if (document.getElementById("input-text").value === "") {
      alert("Please enter something.....");
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    setBtn("Add");
  }

  // function to Edit a to-do
  const handleEdit = (text, id) => {
    handleDelete(id);
    setTodo(text);
    setBtn("Update");
  }

  // function to Delete a to-do
  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    })
    setTodos(newTodos);
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  // function to mark a to-do as complete
  const handleCheckBox = (id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  // function to toggle the "Show Finished" checkbox 
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  }
  
  return (
    <>
      {/* linear-gradient(135deg,#3700ff,#ff0062) */}
      <div className="bg-[url(https://images.pexels.com/photos/5717411/pexels-photo-5717411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] bg-cover bg-center min-h-[100dvh]">

        {/* Navbar component */}
        <Navbar />

        {/* Main container for the to-do list */}
        <div className="sm:container bg-gray-200 rounded-xl xl:max-w-[70vw] min-h-[80dvh] p-9 mx-4 sm:mx-auto my-5 flex flex-col items-center">

          {/* Add to-do section */}
          <div className="add-todo">
            <h2 className="text-lg font-bold text-center">Add a To-Do</h2> 
            <input onChange={handleChange} value={todo} className="bg-white rounded-md p-1 outline-0 w-52 sm:w-100" type="text" id="input-text" />
            <button onClick={handleAdd} className="btn px-4 py-1">{btn}</button> {/* "Add" or "Update" button */}
          </div>

          {/* Toggle to show/hide finished to-do's */}
          <div>
            <label className='cursor-pointer select-none'>
              <input className='cursor-pointer m-2 accent-purple-800' type="checkbox" onChange={toggleFinished} checked={showFinished} />
              Show Finished
            </label>
          </div>

          {/* Heading for the to-do list */}
          <h2 className="text-lg font-bold self-start">Your Todos</h2>

          {/* To-do list container */}
          <div className="todos w-full">

            {/* display a message is there is no to-do's */}
            {todos.length === 0 && <div>No to-do's to display</div>}

            {/* map through the todo's and render each one */}
            {todos.map((item) => {
              return (
                // render to-do if showFinished is checked or to-do's are not completed
                (showFinished || !item.isCompleted) &&
                <div key={item.id} className="todo w-full flex flex-wrap justify-between items-center gap-4">

                  {/* strikethrough todo's if "isCompleted" is true */}
                  <div className={item.isCompleted ? "line-through" : ""}>

                    {/* Checkbox to mark a todo as complete */}
                    <input checked={item.isCompleted} onChange={() => handleCheckBox(item.id)} className='m-4 accent-purple-800 cursor-pointer' type="checkbox" name={item.id} id="" />

                    {item.todo} {/* to-do text */}
                  </div>
                  {/* "Edit" and "Delete" button */}
                  <div className="buttons">
                    <button onClick={() => handleEdit(item.todo, item.id)} className="btn px-4 py-2"><BiEdit /></button>
                    <button onClick={() => handleDelete(item.id)} className="btn px-4 py-2"><MdDeleteOutline /></button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App


