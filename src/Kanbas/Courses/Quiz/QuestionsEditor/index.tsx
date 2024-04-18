// import React, {useEffect} from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { KanbasState, questionType } from "../../../store";

// function QuestionsEditor() {
//   const { courseId, quizId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);

//   return (
//     <div>
//     {questionList.length > 0 && (
//       <ul>
//         {questionList.map((question: questionType) => (
//           <li key={question.id}>
//             <div>
//               <div className = "row">
//                 <div className = "col">
//                   <p>{question.title}</p>
//                 </div>
//                 <div className = "col">
//                   <p>{question.description}</p>
//                 </div>
//                 <div className = "col">
//                   <p>{question.points}</p>
//                 </div>

//                                 {question.choices?.map((choice) => (
//                                   <div className = "col">
//                                     {choice}
//                                   </div>
//                                 ))}

//                                 {question.correct?.map((choice) => (
//                                   <div className = "col">
//                                     {choice}
//                                 </div>
//                                 ))}

//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>)}
//       <Link to = {`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuestionEditor/${new Date().getTime().toString()}`} className = "btn btn-secondary"> + New Question </Link>
//     </div>
//   );
// }

// export default QuestionsEditor;