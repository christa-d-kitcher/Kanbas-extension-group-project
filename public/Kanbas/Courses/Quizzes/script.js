// // Function to generate a new quiz item
// function createQuizItem(title, dueDate, points, numQuestions) {
//     const quizItem = document.createElement('div');
//     quizItem.classList.add('quiz-item');
//     quizItem.innerHTML = `
//         <div class="quiz-info">
//             <h2>${title}</h2>
//             <p>Due Date: ${dueDate}</p>
//             <p>Points: ${points}</p>
//             <p>Number of Questions: ${numQuestions}</p>
//         </div>
//         <div class="quiz-actions">
//             <button class="context-menu-btn">...</button>
//             <select>
//                 <option>Edit</option>
//                 <option>Speed Grader</option>
//                 <option>Duplicate</option>
//                 <option>Delete</option>
//                 <option>Move To...</option>
//                 <option>Send To...</option>
//                 <option>Copy To...</option>
//                 <option>Share To Commons</option>
//             </select>
//         </div>
//     `;
//     return quizItem;
// }

// // Function to add a new quiz to the list
// function addQuiz(title, dueDate, points, numQuestions) {
//     const quizzesList = document.querySelector('.quizzes-list');
//     const newQuizItem = createQuizItem(title, dueDate, points, numQuestions);
//     quizzesList.appendChild(newQuizItem);
// }

// // Example quizzes data
// const quizzesData = [
//     { title: 'Quiz 1', dueDate: '2024-04-30', points: 100, numQuestions: 10 },
//     { title: 'Quiz 2', dueDate: '2024-05-07', points: 150, numQuestions: 15 },
//     { title: 'Quiz 3', dueDate: '2024-05-14', points: 120, numQuestions: 12 }
// ];

// // Add example quizzes to the list
// quizzesData.forEach(quiz => {
//     addQuiz(quiz.title, quiz.dueDate, quiz.points, quiz.numQuestions);
// });

// // Add event listener for Add Quiz button
// const addQuizBtn = document.getElementById('add-quiz-btn');
// addQuizBtn.addEventListener('click', () => {
//     // For simplicity, let's add a default new quiz
//     addQuiz('New Quiz', 'YYYY-MM-DD', 0, 0);
// });
