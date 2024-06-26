"use client";
import React, { useState, useEffect, use } from "react";
import { CardData } from "./_components/Card";
import Card from "./_components/Card";

function CanasJugar() {
  const [questions, setQuestions] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votedQuestions, setVotedQuestions] = useState<Number[]>([]);
  const [likedQuestions, setLikedQuestions] = useState<Number[]>([]);
  const [dislikedQuestions, setDislikedQuestions] = useState<Number[]>([]);

  useEffect(() => {
    fetch("http://54.88.183.156:5000/questions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.sort(() => Math.random() - 0.5));
        console.log("questions", data);
      });
  }, []);

  const handleVote = (id: Number, action: string) => {
    if (votedQuestions.includes(id)) {
      return;
    }
    setVotedQuestions([...votedQuestions, id]);
    fetch("http://54.88.183.156:5000/questions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        action,
      }),
    });
    if (action === "like") {
      setQuestions(
        questions.map((question) => {
          if (question.id === id) {
            question.likes += 1;
          }
          return question;
        })
      );
      setLikedQuestions([...likedQuestions, id]);
    } else {
      setQuestions(
        questions.map((question) => {
          if (question.id === id) {
            question.dislikes += 1;
          }
          return question;
        })
      );
      setDislikedQuestions([...dislikedQuestions, id]);
    }
  };

  const handleNextPrompt = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
      setQuestions(questions.sort(() => Math.random() - 0.5));
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-[100vh]">
      <Card
        question={questions[currentIndex]?.question}
        likes={questions[currentIndex]?.likes}
        dislikes={questions[currentIndex]?.dislikes}
        author={questions[currentIndex]?.author}
        type={questions[currentIndex]?.type}
        id={questions[currentIndex]?.id}
      />
      <div className="flex flex-col justify-center items-center mb-24">
        <div className="flex justify-center">
          <button
            className={`${
              votedQuestions.includes(questions[currentIndex]?.id)
                ? likedQuestions.includes(questions[currentIndex]?.id)
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700"
            } text-white font-bold py-2 px-4 rounded-full mx-4`}
            onClick={() => handleVote(questions[currentIndex]?.id, "like")}
          >
            Me gusta
          </button>
          <button
            className={`${
              votedQuestions.includes(questions[currentIndex]?.id)
                ? dislikedQuestions.includes(questions[currentIndex]?.id)
                  ? "bg-red-950 cursor-not-allowed"
                  : "bg-gray-500 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-700"
            } text-white font-bold py-2 px-4 rounded-full mx-4`}
            onClick={() => handleVote(questions[currentIndex]?.id, "dislike")}
          >
            No me gusta
          </button>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          onClick={handleNextPrompt}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default CanasJugar;
