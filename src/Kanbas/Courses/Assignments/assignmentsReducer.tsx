import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Assignment {
  title: string
  description: string
  course: string
  points: string
  dueDate: string
  availableFromDate: string
  availableUntilDate: string
  assignTo: string
  _id?: string // Making _id optional as it might not be present initially
}

interface AssignmentsState {
  assignments: Assignment[]
  assignment: Assignment
}

const initialState: AssignmentsState = {
  assignments: [], // Assuming your assignments data structure is similar
  assignment: {
    title: 'New Assignment',
    description: 'It is an assignment',
    course: '',
    points: '100',
    dueDate: '',
    availableFromDate: '',
    availableUntilDate: '',
    assignTo: '',
  },
}

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload
    },
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = [action.payload, ...state.assignments]
      alert(`Assignment added successfully!`)
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(assignment => assignment._id !== action.payload)
      alert(`Assignment deleted successfully!`)
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map(assignment =>
        assignment._id === action.payload._id ? action.payload : assignment
      )
      alert(`Assignment updated successfully!`)
    },
    setAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignment = action.payload
    },
  },
})

export const { addAssignment, deleteAssignment, updateAssignment, setAssignment, setAssignments } =
  assignmentsSlice.actions
export default assignmentsSlice.reducer
