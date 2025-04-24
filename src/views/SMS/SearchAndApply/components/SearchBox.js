import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "reactstrap";
import "../SearchAndApply.css"; // custom CSS
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";

const SearchBox = ({
  name,
  placeholder,
  value,
  setValue,
  setIsTyping,
  onKeyDown,
  onBlur,
  institutionId,
  setInstitutionId,
  countryId,
  setCountryId,
  institutionName,
  setInstitutionName,
  countryName,
  setCountryName,
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
    <div className="d-flex dropdown-circle w-100">
      <div className="search-input">
        <CiSearch size={20} />
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
      <div className="d-none d-md-block">
        <div className="d-flex">
          <DefaultDropdown
            label={countryName}
            setLabel={setCountryName}
            value={countryId}
            setValue={setCountryId}
            selectAll={true}
            all="All Country"
            url="UniversityCountry/Index"
          />
          <DefaultDropdown
            label={institutionName}
            setLabel={setInstitutionName}
            value={institutionId}
            setValue={setInstitutionId}
            selectAll={true}
            all="All Institution"
            url="UniversityDD/Index"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
