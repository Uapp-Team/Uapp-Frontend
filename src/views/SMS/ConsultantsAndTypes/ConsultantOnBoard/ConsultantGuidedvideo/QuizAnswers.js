import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";

const QuizAnswers = ({ savedQuestions, onDeleteQuestion, onEditQuestion }) => {
  console.log(savedQuestions, "savedquestions");

  return (
    <>
      {savedQuestions?.map((savedQuestion) => (
        <Card key={savedQuestion.id} className="mb-3">
          <CardBody>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 16 }}>
                Question {savedQuestion.number || savedQuestion.order}:{" "}
                {savedQuestion.question}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {/* {onEditQuestion && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEditQuestion(savedQuestion.id)}
                    title="Edit Question"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )} */}
                {onDeleteQuestion && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDeleteQuestion(savedQuestion.id)}
                    title="Delete Question"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
            <form>
              {savedQuestion?.answers.map((answer) => (
                <div
                  key={answer.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                    paddingLeft: 4,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={answer.isCorrect}
                    disabled
                    style={{ marginRight: 12 }}
                  />
                  <label
                    style={{
                      fontSize: 15,
                      cursor: "pointer",
                      fontWeight: answer.isCorrect ? "bold" : "normal",
                      color: answer.isCorrect ? "#28a745" : "#222",
                    }}
                  >
                    {answer.text}
                  </label>
                </div>
              ))}
            </form>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default QuizAnswers;
