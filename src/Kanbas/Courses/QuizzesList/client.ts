import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const saveQuiz = async (quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}`, quiz);
  return response.data;
};

export const getAllQuizzes = async () => {
    const response = await axios
        .get(`${QUIZZES_API}`);
    return response.data;
};
export const deleteQuiz = async (quizId:string) => {
    const response = await axios
        .delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const publishQuiz = async (quizId:string) => {
    const response = await axios
        .put(`${QUIZZES_API}/${quizId}/publish`);
    return response.data;
}

export const unpublishQuiz = async (quizId:string) => {
    const response = await axios
        .put(`${QUIZZES_API}/${quizId}/unpublish`);
    return response.data;
}

export const updateQuiz = async (quiz:any) => { //edit?
    const response = await axios
        .put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};
