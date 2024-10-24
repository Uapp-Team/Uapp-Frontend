import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EyeBtn = ({ eye, setEye }) => {
  return (
    <>
      {eye ? (
        <FaEye size={20} onClick={() => setEye(!eye)} />
      ) : (
        <FaEyeSlash size={20} onClick={() => setEye(!eye)} />
      )}
    </>
  );
};

export default EyeBtn;
