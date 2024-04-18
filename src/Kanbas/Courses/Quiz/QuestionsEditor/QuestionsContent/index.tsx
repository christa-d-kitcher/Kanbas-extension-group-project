// import React from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { KanbasState } from "../../../../store";
// import { setQuestion } from "../questionsReducer";

// import MultipleChoice from "./multipleChoice";
// import TrueFalse from "./trueFalse";
// import FillInTheBlank from "./fillInTheBlank";

// function Question () {
//   const { courseId, quizeId, questionId } = useParams();
//   const dispatch = useDispatch();
//   const questions = useSelector((state: KanbasState) => state.questionsReducer.questions);
//   const question = useSelector((state: KanbasState) => state.questionsReducer.question);

//   return (
//     <div className = "container border rounded">
//         <div className = "row">
//          <div className = "col-3">
//           <input className = "form-control ms-2 mt-2" placeholder = {question?.title} onChange = {(e) => dispatch(setQuestion({...question, title: e.target.value}))}/>
//          </div>
//          <div className = "col-6">
//           <select className = "form-control w-50 ms-1  mt-2" onChange = {(e) => dispatch(setQuestion({...question, type: e.target.value}))}>
//             <option value = "multiple" selected>Multiple Choice</option>
//             <option value = "tf">True/False</option>
//             <option value = "fitb">Fill in the Blank</option>
//           </select>
//          </div>

//           <div className = "col-3">
//             <span>
//               <label htmlFor="points"> pts: </label>
//               <input className = "form-control w-25" value = {question?.points} id = "points" onChange = {(e) => dispatch(setQuestion({...question, points: e.target.value}))}/>
//             </span>
//           </div>
//         </div>

//       <hr/>

//       <div>
//         {question?.type === "multiple" && (
//             <MultipleChoice />
//         )}
//         {question?.type === "tf" && (
//           <TrueFalse />
//         )}
//         {question?.type === "fitb" && (
//           <FillInTheBlank />
//         )}

//       </div>

//     </div>
//   );
// };

// export default Question;