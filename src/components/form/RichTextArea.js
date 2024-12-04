import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextArea = ({
  label,
  defaultValue,
  onChange,
  error,
  className,
  action,
}) => {
  const modules = {
    toolbar: [
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // [{ font: [] }],
      // [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "ordered" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

  const hangleChange = (value) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    const textContent = doc.body.textContent.trim();

    textContent ? onChange(value) : onChange("");
    textContent && action && action();
  };

  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && <span>{label}</span>}
      <div className="h-250px">
        <ReactQuill
          theme="snow"
          value={defaultValue}
          modules={modules}
          className="h-83"
          onChange={hangleChange}
        />
      </div>

      <ErrorText error={error} />
    </Form.Group>
  );
};

export default RichTextArea;
