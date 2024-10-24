import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ViewQuiz from "./pages/ViewQuiz/ViewQuiz";
import Result from './pages/result/result.jsx';
import CreateQuiz from "./pages/createQuiz/createQuiz";
import CreateQuestion from "./pages/createQuestion/createQuestion";
import MyLibrary from "./components/myLibrary/myLibrary";
import Explore from "./components/explore/explore.jsx";
import InforQuiz from "./components/inforQuiz/inforQuiz";
import QuizList from "./pages/quizList/quizList";
import QuizDetail from "./pages/quizDetail/quizDetail";
import ExamContent from "./components/examContent/examContent";
import DoExam from "./pages/doExam/doExam";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReportQuizResult from "./pages/reportQuizResult/reportQuizResult";
import ChangePassword from "./pages/changePassword/changePassword";
import Profile from "./pages/profile/profile";
import Test from "./pages/Test/Test.jsx";
import EditQuiz from "./pages/editQuiz/editQuiz";
import Edit from "./pages/editQuiz/edit";
import EditQuestion from "./pages/editQuiz/editQuestion";

import { FileProvider } from "./components/context/ContextFileImage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FileProvider>
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/ViewQuiz" element={<ViewQuiz />} />
          <Route path="/" element={<Explore />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/result" element={<Result />} />
          <Route path="/reportquizresult" element={<ReportQuizResult />} />
          <Route path="/test" element={<Test />} />
          <Route path="/createquiz" element={<CreateQuiz />}>
            <Route path="inforquiz" element={<InforQuiz />} />
            <Route path="createquestion" element={<CreateQuestion />} />
          </Route>
          <Route path="/edit" element={<Edit />}>
            <Route path="editquiz/:id" element={<EditQuiz />} />
            <Route path="editquestion/:id" element={<EditQuestion />} />
          </Route>
          <Route path="/quizlist" element={<QuizList />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Routes>
        <Route path="/quizdetail" element={<QuizDetail />} >
          <Route path="examcontent/:id" element={<ExamContent />} />
        </Route>
        <Route path="/doexam/:id" element={<DoExam />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changepass" element={<ChangePassword />} />
      </Routes>
    </Router>
    </FileProvider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
