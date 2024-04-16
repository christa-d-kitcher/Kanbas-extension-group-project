import React, { useEffect, useState,useCallback } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_BASE_API_URL;
function WorkingWithObjects() {
  const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`
  const MODULE_URL = `${API_BASE}/a5/module`;
  const fetchAssignment = useCallback(async () => {
    const response = await axios.get(ASSIGNMENT_URL);
    setAssignment(response.data);
  }, [ASSIGNMENT_URL]);
      const updateTitle = async () => {
        const response = await axios
          .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
      };
      useEffect(() => {
        fetchAssignment();
      }, [fetchAssignment]);
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
        });
    const handleCompletedChange = (completedStatus: boolean) => {
        setAssignment(prevState => ({ ...prevState, completed: completedStatus }));

        // Send the updated status to the backend
        fetch(`${ASSIGNMENT_URL}/completed?status=${completedStatus}`, {
            method: 'GET', // You might want to use 'POST' or 'PUT' in a real app
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    const [module, setModule] = useState({
        id: 1, name: 'NodeJs Module',
        description:'Create a NodeJs server with ExpressJS',
        course: 'CS5610',
    })
  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <button className="btn btn-primary">
        <a className="text-white" style={{'textDecoration':'none'}} href={`${API_BASE}/a5/assignment`}>
            Get Assignment
        </a>
      </button>
      <h4>Retrieving Properties</h4>
      <button className="btn btn-primary">
        <a className="text-white" style={{'textDecoration':'none'}} href={`${API_BASE}/a5/assignment/title`}>
            Get Title
        </a>
      </button>
      <h3>Modifying Properties</h3>
      <input className="form-control mb-2" onChange={(e) => setAssignment({
            ...assignment, title: e.target.value })}
        value={assignment.title} type="text" />
      <button className="btn btn-primary me-2" onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button className="btn btn-danger" onClick={fetchAssignment} >
        Fetch Assignment
      </button>
      <h4>Modifying Score</h4>
      <input type="text" className="me-3 form-control mb-2"
        onChange={(e) => setAssignment({ ...assignment,
            title: e.target.value })}
        value={assignment.score}/>
      <button className="btn btn-primary">
        <a className="text-white" style={{'textDecoration':'none'}} href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
            Update Score
        </a>
      </button>
      <h4>Modifying Complicated</h4>
      <div>
        <input
            type="radio"
            id="completedTrue"
            name="completed"
            value="true"
            checked={assignment.completed === true}
            onChange={() => handleCompletedChange(true)}
        />
        <label htmlFor="completedTrue">True</label>
    </div>
    <div>
        <input
            type="radio"
            id="completedFalse"
            name="completed"
            value="false"
            checked={assignment.completed === false}
            onChange={() => handleCompletedChange(false)}
        />
        <label htmlFor="completedFalse">False</label>
    </div>
      <h4>Retrieving Modules</h4>
        <button className="btn btn-primary">
            <a className="text-white" style={{'textDecoration':'none'}} href={`${API_BASE}/a5/module`}>
                Get Module
            </a>
        </button>
        <h4>Retrieving Properties</h4>
        <button className="btn btn-primary">
            <a className="text-white" style={{'textDecoration':'none'}} href={`${API_BASE}/a5/module/name`}>
                Get Name
            </a>
        </button>
        <h4>Modifying Properties</h4>
        <input type="text" className="me-3 form-control mb-2"
            onChange={(e) => setModule({ ...module,
                name: e.target.value })}
            value={module.name}/>
        <button className="btn btn-primary">
            <a className="text-white" style={{'textDecoration':'none'}} href={`${MODULE_URL}/name/${module.name}`}>
                Update Name
            </a>
        </button>
    </div>
  );
}
export default WorkingWithObjects;