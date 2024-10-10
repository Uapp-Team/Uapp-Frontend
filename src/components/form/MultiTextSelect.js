import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
const MultiTextSelect = ({ value, setValue }) => {
  const [inputValue, setInputValue] = useState("");

  const components = {
    DropdownIndicator: null,
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const handleKeyDown = (event) => {
    if (inputValue) {
      if (event.key === "Enter" || event.key === "Tab") {
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
      }
    } else return;
  };

  return (
    <>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
      />
    </>
  );
};

export default MultiTextSelect;
