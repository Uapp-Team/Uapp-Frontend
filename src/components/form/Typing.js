import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "reactstrap";

const Typing = ({
  name,
  placeholder,
  value,
  setValue,
  setIsTyping,
  onKeyDown,
  isIcon = false,
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
      {isIcon ? (
        <div className="d-flex align-items-center bg-white py-2 px-3 border-radius-unlimited">
          <CiSearch size={30} />
          <Input
            className="border-0"
            style={{ height: "2.7rem" }}
            type="text"
            name={name}
            value={value}
            id={name}
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            onKeyDown={onKeyDown}
          />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Typing;
