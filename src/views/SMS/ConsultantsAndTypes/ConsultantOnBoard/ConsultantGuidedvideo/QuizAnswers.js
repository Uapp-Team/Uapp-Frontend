import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";

const QuizAnswers = ({ savedQuestions }) => {
  return (
    <>
      {savedQuestions.map((savedQuestion) => (
        <Card key={savedQuestion.id}>
          <CardBody>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16 }}>
              {savedQuestion.question}
            </div>
            <form>
              {savedQuestion.answers.map((opt, id) => (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                    paddingLeft: 4,
                  }}
                >
                  <input
                    type="radio"
                    name={`saved-${savedQuestion.id}`}
                    checked={opt.isCorrect}
                    disabled
                    style={{ marginRight: 12 }}
                  />
                  <label
                    style={{ fontSize: 15, color: "#222", cursor: "pointer" }}
                  >
                    {opt.text}
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
