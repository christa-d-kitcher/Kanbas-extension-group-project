import axios from 'axios'

const API_BASE = process.env.REACT_APP_BASE_API_URL
const QUIZZES_API = `${API_BASE}/api/quizzes`

export const saveQuiz = async (quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}`, quiz)
  return response.data
}

export const getAllQuizzes = async () => {
  const response = await axios.get(`${QUIZZES_API}`)
  return response.data
}

export const getQuizById = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/{quizId}`)
  return response.data
}

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz.id}`, quiz)
  return response.data
}

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`)
  return response.data
}

export const publishQuiz = async (quizId: string) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/publish`)
  return response.data
}

export const unpublishQuiz = async (quizId: string) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/unpublish`)
  return response.data
}

export const copyQuiz = async (quizId: string) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/copy`)
  return response.data
}

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`)
  return response.data
}

export const getQuizzesByCourseId = async (courseId: string) => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/course/${courseId}`)
  return response.data
}
