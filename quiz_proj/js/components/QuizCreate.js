import React, { useState } from "react";
import API from "../api/api";

const QuizCreate = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/quizzes/create/", { title });
      alert("Quiz created!");
    } catch (err) {
      alert("Error while creating quiz");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Name of the quiz" />
      <button type="submit">Create</button>
    </form>
  );
};

export default QuizCreate;
