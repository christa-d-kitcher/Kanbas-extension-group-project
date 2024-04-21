import React, {useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuestion, setQuestions, addQuestion, updateQuestion, addChoice, deleteChoiceById, resetQuestion} from "../questionsReducer";
import { FaArrowRight, FaTrash } from "react-icons/fa"


function FillInTheBlank () {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const question = useSelector((state: KanbasState) => state.questionsReducer.question);
    const questions = useSelector((state: KanbasState) => state.questionsReducer.questions);
  const handleAddAnswer = () => {
    dispatch(addChoice(""));
  };

  const handelCancel = () => {
     navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/DetailEditor`);
  }

  const handleUpdateQuestion = () => {
    const correct = [];

    for (let i = 0; i < question.choices.length; i++) {
      const answer = document.getElementById(i.toString()) as HTMLInputElement;
      correct.push(answer.value);
    }

    dispatch(addQuestion({...question, correct: correct}));

    dispatch(resetQuestion());
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/DetailEditor`);
  }

  return (
    <div className = "flex">
      <p> Enter your question, then define all possible answers for the blank. </p>
      <p> Students will see the question followed by a small text box to type their answers. </p>
      <h4> Question: </h4>
      <textarea rows = {3} className = "form-control" id = "m_question" value = {question.description} onChange =  { (e) => dispatch(setQuestion({...question, description: e.target.value}))} ></textarea>
      <h4> Answers: </h4>

      {question.correct.map((choice : any, index: any) => {
        return (
          <>
            <br />
            <div className = "row" key = {index}>
              <div className = "col-2 ms-4">
                <FaArrowRight />
                <label className = "ms-2"> Possible Answers: </label>
              </div>

              <div className = "col-7">
                <input type = "text" className = "form-control w-25" id = {index.toString()} value = {choice} />
              </div>

              <div className = "col-2 ms-5">
                <button className = "btn btn-danger" onClick = {() => dispatch(deleteChoiceById(index))}> <FaTrash /> </button>
              </div>
            </div>
          </>
        )
      })}

      <button className = "btn btn-danger mt-3" onClick = {handleAddAnswer}> + Add Another Answer </button>

      <div>
        <button className = "btn btn-secondary mt-3" onClick = {handelCancel}> Cancel </button>
        <button className = "btn btn-success mt-3 ms-3" onClick = {handleUpdateQuestion}> Update Question </button>
      </div>
    </div>
  );
};

export default FillInTheBlank;