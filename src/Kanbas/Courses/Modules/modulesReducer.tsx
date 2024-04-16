import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Module {
  name: string
  description: string
  _id?: string // Make _id optional as it might not be present initially
}

interface ModulesState {
  modules: Module[]
  module: Module
}

const initialState: ModulesState = {
  modules: [],
  module: { name: 'New Module', description: 'New Description' },
}

const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload
    },
    addModule: (state, action) => {
      state.modules = [action.payload, ...state.modules]
      alert(`Module added successfully!`)
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(module => module._id !== action.payload)
      alert(`Module deleted successfully!`)
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map(module =>
        module._id === action.payload._id ? action.payload : module
      )
      alert(`Module updated successfully!`)
    },
    setModule: (state, action: PayloadAction<Module>) => {
      state.module = action.payload
    },
  },
})

export const { addModule, deleteModule, updateModule, setModule, setModules } = modulesSlice.actions
export default modulesSlice.reducer
