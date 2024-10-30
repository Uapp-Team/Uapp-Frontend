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
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
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
    onChange(value);
    action && action();
  };

  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && <span>{label}</span>}
      <div className="h-300px">
        <ReactQuill
          theme="snow"
          value={defaultValue}
          modules={modules}
          className="h-75"
          onChange={hangleChange}
        />
      </div>

      <ErrorText error={error} />
    </Form.Group>
  );
};

export default RichTextArea;
