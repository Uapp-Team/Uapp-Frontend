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
          onChange={(e) => handleChange(e)}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      </div>
      <div className="d-none d-md-block">
        <div className="d-flex">
          <span className="border-left border-right d-flex align-items-center px-1">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.9173 9.16667C12.9173 10.7775 11.6115 12.0833 10.0007 12.0833C8.38982 12.0833 7.08398 10.7775 7.08398 9.16667C7.08398 7.55583 8.38982 6.25 10.0007 6.25C11.6115 6.25 12.9173 7.55583 12.9173 9.16667Z"
                  stroke="#A8A8A8"
                  stroke-width="1.5"
                />
                <path
                  d="M10 1.66699C14.0588 1.66699 17.5 5.02781 17.5 9.10516C17.5 13.2474 14.0027 16.1542 10.7725 18.1309C10.5371 18.2638 10.2708 18.3337 10 18.3337C9.72917 18.3337 9.46292 18.2638 9.2275 18.1309C6.00325 16.135 2.5 13.2617 2.5 9.10516C2.5 5.02781 5.9412 1.66699 10 1.66699Z"
                  stroke="#A8A8A8"
                  stroke-width="1.5"
                />
              </svg>
            </span>
            <DefaultDropdown
              label={countryName}
              setLabel={setCountryName}
              value={countryId}
              setValue={setCountryId}
              selectAll={true}
              all="All Country"
              url="UniversityCountry/Index"
            />
          </span>
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
