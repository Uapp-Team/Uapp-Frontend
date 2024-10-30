import React, { useState, useEffect } from "react";
import { Col, Input, Row } from "reactstrap";

function Captcha({
  captchaAnswer,
  captchaInput,
  setCaptchaAnswer,
  setCaptchaInput,
  captchaError,
  setCaptchaError,
}) {
  const [captchaQuestion, setCaptchaQuestion] = useState("");

  // Generate a random number between 1 and 10
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  // Generate the captcha question and answer
  const generateCaptcha = () => {
    const num1 = generateRandomNumber();
    const num2 = generateRandomNumber();
    const answer = num1 + num2;
    setCaptchaAnswer(answer);
    setCaptchaQuestion(`${num1} + ${num2}`);
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setCaptchaInput(e.target.value);
    if (parseInt(e.target.value) !== captchaAnswer) {
      setCaptchaError(true);
    } else {
      setCaptchaError(false);
    }
  };

  return (
    <div className="mb-3">
      <span>Write the answer to this sum</span>
      <Row className="align-items-center">
        <Col xs={4}>
          <b>{captchaQuestion} = </b>
        </Col>
        <Col xs={8}>
          <Input
            className="inside-placeholder"
            type="number"
            id="captcha-input"
            value={captchaInput}
            placeholder={`Result of ${captchaQuestion}`}
            onChange={(e) => handleChange(e)}
            required
          />
        </Col>
      </Row>
      {captchaError ? (
        <p className="text-danger">Wrong result, Please try again.</p>
      ) : null}
    </div>
  );
}

export default Captcha;
