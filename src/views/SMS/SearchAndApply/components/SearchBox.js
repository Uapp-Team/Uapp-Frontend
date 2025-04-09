import { Select } from "antd"; // antd for dropdown
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "reactstrap";
import "../SearchAndApply.css"; // custom CSS

const { Option } = Select;

const SearchBox = ({
  name,
  placeholder,
  value,
  setValue,
  setIsTyping,
  onKeyDown,
  onBlur,
  university,
  setUniversity,
  universityOptions = [],
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
    );
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div className="search-container">
      <div className="search-input">
        <CiSearch className="search-icon" />
        <Input
          className="search-text"
          type="text"
          name={name}
          value={value}
          id={name}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      </div>
      <Select
        className="university-select"
        value={university}
        onChange={setUniversity}
        placeholder="Select University"
        bordered={false}
      >
        {universityOptions.map((u) => (
          <Option key={u} value={u}>
            {u}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SearchBox;
