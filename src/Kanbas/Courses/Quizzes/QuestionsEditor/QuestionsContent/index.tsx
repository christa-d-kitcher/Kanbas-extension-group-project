import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuestion } from "../questionsReducer";

import MultipleChoice from "./multipleChoice";
import TrueFalse from "./trueFalse";
import FillInTheBlank from "./fillInTheBlank";

function Question () {
  const { courseId, quizeId, questionId } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((state: KanbasState) => state.questionsReducer.questions);
  const question = useSelector((state: KanbasState) => state.questionsReducer.question);

  return (
    <div className = "container border rounded">
        <div className = "row">
         <div className = "col-3">
          <input className = "form-control ms-2 mt-2" placeholder = {question?.title} onChange = {(e) => dispatch(setQuestion({...question, title: e.target.value}))}/>
         </div>
         <div className = "col-6">
          <select className = "form-control w-50 ms-1  mt-2" onChange = {(e) => dispatch(setQuestion({...question, type: e.target.value}))}>
            <option value = "MULTIPLE_CHOICE" selected={question.type === "MULTIPLE_CHOICE"}>Multiple Choice</option>
            <option value = "TRUE_FALSE" selected={question.type === "TRUE_FALSE"}>True/False</option>
            <option value = "FILL_IN_BLANKS" selected={question.type === "FILL_IN_BLANKS"}>Fill in the Blank</option>
          </select>
         </div>

          <div className = "col-3">
            <span>
              <label htmlFor="points"> pts: </label>
              <input className = "form-control w-25" value = {question?.points} id = "points" onChange = {(e) => dispatch(setQuestion({...question, points: e.target.value}))}/>
            </span>
          </div>
        </div>

      <hr/>

      <div>
        {question?.type === "MULTIPLE_CHOICE" && (
            <MultipleChoice />
        )}
        {question?.type === "TRUE_FALSE" && (
          <TrueFalse />
        )}
        {question?.type === "FILL_IN_BLANKS" && (
          <FillInTheBlank />
        )}

      </div>

    </div>
  );
};

export default Question;