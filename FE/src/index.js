import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home/Home";
import ViewQuiz from "./pages/ViewQuiz/ViewQuiz";
import CreateQuiz from "./pages/createQuiz/createQuiz";
import CreateQuestion from "./pages/createQuestion/createQuestion";
import MyLibrary from "./components/myLibrary/myLibrary";
import Explore from "./components/Explore/Explore";
import InforQuiz from "./components/inforQuiz/inforQuiz";
import QuizList from "./pages/quizList/quizList";
import QuizDetail from "./pages/quizDetail/quizDetail";
import ExamContent from "./components/examContent/examContent";
import DoExam from "./pages/doExam/doExam";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/ViewQuiz" element={<ViewQuiz />} />
          <Route path="/" element={<Explore />} />
          <Route path="/createquiz" element={<CreateQuiz />}>
            <Route path="inforquiz" element={<InforQuiz />} />
            <Route path="createquestion" element={<CreateQuestion />} />
          </Route>
          <Route path="/quizlist" element={<QuizList />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/quizdetail" element={<QuizDetail />} >
          <Route path="examcontent" element={<ExamContent />} />
        </Route>
        <Route path="/doexam" element={<DoExam />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
