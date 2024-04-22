import React, {useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuestion, setQuestions, addQuestion, updateQuestion, addChoice, deleteChoiceById, resetQuestion} from "../questionsReducer";
import { FaArrowRight, FaTrash } from "react-icons/fa"


function TrueFalse () {
  const { courseId, quizId, questionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const question = useSelector((state: KanbasState) => state.questionsReducer.question);
  const questions = useSelector((state: KanbasState) => state.questionsReducer.questions);

  const handelCancel = () => {
     navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/DetailEditor`);
  }

  const handleUpdateQuestion = () => {
    const index = questions.findIndex((q) => q._id === questionId);
    if (index !== -1) {
      dispatch(updateQuestion(question));
    } else {
      const correct = [document.querySelector('input[name="truefalse"]:checked')?.id];
      const choices = ["TRUE", "FALSE"];
      dispatch(addQuestion({...question, correct: correct, choices: choices}));
    }
    dispatch(resetQuestion());
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/DetailEditor`);
  }

  return (
    <div className = "flex">
      <p> Enter your question text, then select if True or False is the correct answer. </p>
      <h4> Question: </h4>
      <textarea rows = {3} className = "form-control" id = "m_question" value = {question.description} onChange =  { (e) => dispatch(setQuestion({...question, description: e.target.value}))} ></textarea>
      <h4> Answers: </h4>

      <div className = "row">
        <div className = "col-2 ms-4">
          <FaArrowRight />
          <label className = "ms-2" htmlFor = "TRUE" > True: </label>
        </div>

        <div className = "col-7">
          <input type = "radio" id = "TRUE" name = "truefalse"  checked={question.correct && question.correct[0] === "TRUE"} onChange={(e)=>dispatch(setQuestion({ ...question, correct: ['TRUE'] }))}/>
        </div>
      </div>

      <div className = "row">
        <div className = "col-2 ms-4">
          <FaArrowRight />
          <label className = "ms-2" htmlFor = "FALSE"> False: </label>
        </div>

        <div className = "col-7">
          <input type = "radio" id = "FALSE" name = "truefalse" checked={question.correct && question.correct[0] === "FALSE"} onChange={(e)=>dispatch(setQuestion({ ...question, correct: ['FALSE'] }))} />
        </div>
      </div>

      <div>
        <button className = "btn btn-secondary mt-3" onClick = {handelCancel}> Cancel </button>
        <button className = "btn btn-success mt-3 ms-3" onClick = {handleUpdateQuestion}> Update Question </button>
      </div>
    </div>
  );
};

export default TrueFalse;