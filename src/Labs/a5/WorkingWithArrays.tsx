import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_BASE_API_URL;
function WorkingWithArrays(){
    const API = `${API_BASE}/a5/todos`;
    const [todo, setTodo] = useState<Todo>({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    interface Todo {
        id: number;
        title: string;
        description: string;
        due: string;
        completed: boolean;
    }
    const [errorMessage, setErrorMessage] = useState(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const fetchTodos = useCallback(async () => {
      const response = await axios.get(API);
      setTodos(response.data);
    }, [API]);
      const fetchTodoById = async (id:any) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
      };
      const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
      };
      const deleteTodo = async (todo:any) => {
        try {
          await axios.delete(
            `${API}/${todo.id}`);
          setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error:any) {
          console.log(error);
          setErrorMessage(error.response.data.message);
        }
      };
      const updateTodo = async () => {
        try {
          await axios.put(
            `${API}/${todo.id}`, todo);
          setTodos(todos.map((t) => (
            t.id === todo.id ? todo : t)));
        } catch (error:any) {
          console.log(error);
          setErrorMessage(error.response.data.message);
        }
    }
    useEffect(() => {
      fetchTodos();
    }, [fetchTodos]);
    return (
      <div>
        <h3>Working with Arrays</h3>
        <input type="number" className="form-control mb-2" value={todo.id} onChange={(e) => setTodo({...todo, id: parseInt(e.target.value) })}/>
        <input type="text" className="form-control mb-2" value={todo.title} onChange={(e) => setTodo({...todo, title: e.target.value })}/>
        <textarea className="form-control mb-2" value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
      <input className="form-control mb-2" value={todo.due} type="date"
        onChange={(e) => setTodo({
          ...todo, due: e.target.value })} />
        <label>
            <input value={todo.completed.toString()} type="checkbox"
                onChange={(e) => setTodo({
                    ...todo, completed: e.target.checked })} />
            Completed
        </label><br />
      <button className="btn btn-warning mb-2" onClick={postTodo}> Post Todo </button><br />
      <button className="btn btn-success mb-2" onClick={updateTodo}>
        Update Todo
      </button><br />
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}
        <ul className="list-group">
        {todos.map((todo: Todo) => (
            <li key={todo.id} className="list-group-item clearfix">
                <div className="float-start">
                    <input checked={todo.completed}
                        type="checkbox" readOnly />
                    {todo.title}
                    <p>{todo.description}</p>
                    <p>{todo.due}</p>
                </div>
                <div className="float-end">
                    <button onClick={() => deleteTodo(todo)}
                        className="btn btn-danger ms-2">
                        Delete
                    </button>
                    <button className="btn btn-warning" onClick={() => fetchTodoById(todo.id)} >
                        Edit
                    </button>
                </div>
            </li>
        ))}
        </ul>
        <h3>Updating an Item in an Array</h3>
        <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`} >
            Update Title to {todo.title}
        </a>
        <h4>Retrieving Arrays</h4>
        <button className="btn btn-primary">
            <a className="text-white" style={{'textDecoration':'none'}} href={API}>
            Get Todos
            </a>
        </button>
        <h4>Retrieving an Item from an Array by ID</h4>
        <input value={todo.id} className="me-3 form-control mb-2"
            onChange={(e) => setTodo({ ...todo,
            id: parseInt(e.target.value) })}/>
        <button className="btn btn-primary">
            <a className="text-white" style={{'textDecoration':'none'}} href={`${API}/${todo.id}`}>
            Get Todo by ID
            </a>
        </button>
        <h3>Filtering Array Items</h3>
        <button className="btn btn-primary">
        <a className="text-white" style={{'textDecoration':'none'}} href={`${API}?completed=true`}>
            Get Completed Todos
        </a>
        </button>
        <h3>Creating new Items in an Array</h3>
        <button className="btn btn-primary">
        <a className="text-white" style={{'textDecoration':'none'}} href={`${API}/create`}>
            Create Todo
        </a>
        </button>
        <h3>Deleting from an Array</h3>
        <button className="btn btn-primary">
            <a className="text-white" style={{'textDecoration':'none'}} href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>
        </button>
      </div>
    );
  }
  export default WorkingWithArrays;