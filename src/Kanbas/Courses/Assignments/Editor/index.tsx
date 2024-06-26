import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FaCheck, FaPlus } from 'react-icons/fa6'
import { addAssignment, updateAssignment, setAssignment } from '../assignmentsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { KanbasState } from '../../../store'
import { useState } from 'react'
import * as client from '../client'

export default function AssignmentEditor() {
  const dispatch = useDispatch()
  const assignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments)
  const { assignmentId } = useParams()
  const assignment = assignments.find(assignment => assignment._id === assignmentId) || {} // Fallback to an empty object if not found
  const { courseId } = useParams()
  const navigate = useNavigate()

  // 在组件内部定义局部状态
  const [title, setTitle] = useState(assignment.title || 'New Assignment')
  const [description, setDescription] = useState(
    assignment.description || 'This is a new assignment'
  )
  const [points, setPoints] = useState(assignment.points || '100')
  const [dueDate, setDueDate] = useState(assignment.dueDate || '2024-01-01')
  const [availableFromDate, setAvailableFromDate] = useState(
    assignment.availableFromDate || '2024-01-01'
  )
  const [availableUntilDate, setAvailableUntilDate] = useState(
    assignment.availableUntilDate || '2024-01-01'
  )
  const [assignTo, setAssignTo] = useState(assignment.assignTo || 'Everyone')

  const handleAddAssignemnt = (newAssignment: any) => {
    // Generate a unique ID for the new assignment
    // newAssignment._id = new Date().getTime().toString()
    client.createAssignment(courseId ?? '', newAssignment).then(createdAssignment => {
      dispatch(addAssignment(createdAssignment))
    })
  }

  const handleUpdateAssignment = async (updatedAssignment: any) => {
    await client.updateAssignment(updatedAssignment)
    dispatch(updateAssignment(updatedAssignment))
  }

  const handleSave = () => {
    const newAssignment = {
      ...assignment,
      title,
      description,
      points,
      dueDate,
      availableFromDate,
      availableUntilDate,
      assignTo,
      course: courseId,
    }

    // Check if the assignment exists by ID
    const existingAssignment = assignments.find(a => a._id === assignmentId)

    if (existingAssignment) {
      // If assignmentId exists and is found, update the assignment
      handleUpdateAssignment(newAssignment)
    } else {
      // If assignmentId does not exist or not found, add a new assignment
      handleAddAssignemnt(newAssignment)
    }

    navigate(`/Kanbas/Courses/${courseId}/Assignments`)
  }

  return (
    <div>
      <div className="flex-fill mx-5 my-4">
        <div className="content">
          <div className="hearder clearfix border-1 border-bottom border-gary py-2 pb-4 pe-2 d-flex align-items-center justify-content-end">
            <FaCheck className="text-success" />
            <span className="text-success me-4 ms-2">Published</span>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle btn-light btn-outline-dark"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-ellipsis-vertical" />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Speed Grader
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Duplicate
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Delete
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Move To...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Send To...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Copy To...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Share to commons
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="assignment-main-content">
            {/* content */}
            <div className="my-3">
              <span>Assignment Name</span>
            </div>
            <form className="border-1 border-black border-bottom pb-5">
              <input
                type="text"
                defaultValue={assignment.title}
                onChange={e => {
                  dispatch(setAssignment({ ...assignment, title: e.target.value }))
                  setTitle(e.target.value)
                }}
                className="form-control mb-2"
              />
              <textarea
                className="form-control mt-3 p-4"
                rows={3}
                defaultValue={assignment.description}
                onChange={e => {
                  dispatch(setAssignment({ ...assignment, description: e.target.value }))
                  setDescription(e.target.value)
                }}
              />
              <div className="mx-5 px-5">
                <div className="input-group mt-3">
                  <span className="input-group-text no-border">Points</span>
                  <input
                    type="text"
                    className="form-control"
                    onChange={e => setPoints(e.target.value)}
                    defaultValue={points}
                  />
                </div>
                <div className="dropdown dropdown-menu-end mt-3 ms-2 d-flex align-items-center">
                  <span className="btn-group-text me-2">Assignemnt Group</span>
                  <button
                    type="button"
                    className="btn dropdown-toggle btn-light flex-grow-1"
                    data-bs-toggle="dropdown"
                  >
                    ASSIGNMENTS
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/">
                        link1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        link2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        link3
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown dropdown-menu-end mt-3 ms-2 d-flex align-items-center">
                  <span className="btn-group-text me-2">Display Grade as</span>
                  <button
                    type="button"
                    className="btn dropdown-toggle btn-light flex-grow-1"
                    data-bs-toggle="dropdown"
                  >
                    Percentage
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/">
                        link1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        link2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        link3
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="d-flex align-items-start mt-3">
                  <span className="input-group-text no-border assign-part mt-2">Assign</span>
                  <div className="input-group mt-2 align-items-start">
                    <div className="container form-control">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-1">
                            <strong>Assign to</strong>
                          </div>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              onChange={e => setAssignTo(e.target.value)}
                              value={assignTo}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-2">
                            <strong>Due</strong>
                          </div>
                          <div className="input-group mb-3">
                            <input
                              type="date"
                              className="form-control"
                              onChange={e => setDueDate(e.target.value)}
                              value={dueDate}
                            />
                          </div>
                        </div>
                        <div className="col-6 pe-1">
                          <div className="mb-1">
                            <strong>Available from</strong>
                          </div>
                          <div className="input-group mb-3">
                            <input
                              type="date"
                              className="form-control"
                              onChange={e => setAvailableFromDate(e.target.value)}
                              value={availableFromDate}
                            />
                          </div>
                        </div>
                        <div className="col-6 ps-1">
                          <div className="mb-1">
                            <strong>Until</strong>
                          </div>
                          <div className="input-group mb-3">
                            <input
                              type="date"
                              className="form-control"
                              onChange={e => setAvailableUntilDate(e.target.value)}
                              value={availableUntilDate}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-100">
                      <button className="btn btn-secondary w-100">
                        <FaPlus className="mb-1" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="footer clearfix">
              <div className="form-check m-3">
                <input type="checkbox" className="form-check-input" />
                <label htmlFor="form-check-label">Notify users that this content has changed</label>
              </div>
              <div className="button-group float-end mb-5 me-3">
                <button onClick={handleSave} className="btn btn-success ms-2 float-end">
                  Save
                </button>
                <Link
                  to={`/Kanbas/Courses/${courseId}/Assignments`}
                  className="btn btn-danger float-end"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
