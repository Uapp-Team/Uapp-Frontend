import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

const Typing = ({
  name,
  placeholder,
  value,
  setValue,
  setIsTyping,
  onKeyDown,
}) => {
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    setIsTyping(true);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setIsTyping(false);
      }, 1000)
    ); // 1 second after user stops typing
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <>
      <Input
        style={{ height: "2.7rem" }}
        type="text"
        name={name}
        value={value}
        id={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default Typing;
