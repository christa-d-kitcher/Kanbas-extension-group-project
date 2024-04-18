import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    question: {id: -1, type: "multiple", title: "new question", choices: [""], correct: [""], points: 0},
    questions: [{id: -2, type: "multiple", title: "new question", choices: [""], correct: [""],  points: 0}]
}

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        addChoice: (state, action) => {
            state.question = {
                    ...state.question,
                    choices: [...state.question.choices, action.payload]
                  }
        },
        deleteChoiceById : (state, action) => {
          state.question = {
                            ...state.question,
                            choices: state.question.choices.filter((choice, index) => index !== action.payload)
                            };
        },
        resetQuestion: (state) => {
            state.question = {id: -1, type: "multiple", title: "new question", choices: [""], correct: [""],  points: 0}
        },
        setQuestion: (state, action) => {
            state.question = { ...action.payload };
            state.question.choices = [];

            state.question = {
                                ...state.question,
                                choices: [ ...action.payload.choices ]
                              };

            state.question.correct = [];

           state.question = {
                                           ...state.question,
                                           correct: [ ...action.payload.correct ]
                                         };

        },
        setQuestions: (state, action) => {
            state.questions = { ...action.payload }
        },
        addQuestion: (state, action) => {
            state.questions = [...state.questions, action.payload]
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(question => question.id !== action.payload)
        },
        updateQuestion: (state, action) => {
            state.questions = state.questions.map(question => {
                if (question.id === action.payload.id) {
                    return action.payload
                }
                return question
            })
        }
    }
})

export const {setQuestion, setQuestions, addQuestion, deleteQuestion, updateQuestion, addChoice, deleteChoiceById, resetQuestion} = questionSlice.actions
export default questionSlice.reducer