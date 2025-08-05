import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";

const QuizAnswers = () => {
  // Static options and selected index (last one selected)
  const question = "How much UAPP charge student for application?";
  const options = [
    "After inviting the student to the UAPP Platform",
    "After adding the student to the UAPP platform",
    "After applying for the course for the student",
    "After student gets a conditional offer letter",
    "After student enrols in the partner university",
  ];
  const [selected, setSelected] = useState(4); // last option selected

  return (
    <Card>
      <CardBody>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16 }}>
          {question}
        </div>
        <form>
          {options.map((opt, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                paddingLeft: 4,
              }}
            >
              <input
                type="radio"
                name="quiz"
                checked={selected === idx}
                onChange={() => setSelected(idx)}
                style={{ marginRight: 12 }}
              />
              <label style={{ fontSize: 15, color: "#222", cursor: "pointer" }}>
                {opt}
              </label>
            </div>
          ))}
        </form>
      </CardBody>
    </Card>
  );
};

export default QuizAnswers;
