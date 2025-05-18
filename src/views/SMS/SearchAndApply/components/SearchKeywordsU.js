import React, { useEffect, useState } from "react";
import "../SearchAndApply.css";
import { AiOutlineClose } from "react-icons/ai";
import Uget from "../../../../helpers/Uget";

const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronUp = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 15L12 9L6 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchKeywordsU = ({ state, setState, url, slice = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    Uget(url).then((res) => {
      setData(res?.data);
    });
  }, [url]);

  const handleChange = (e) => {
    let id = parseInt(e);
    if (!state?.includes(id)) {
      setState([...state, id]);
    }
  };

  const handleChange2 = (e) => {
    let id = parseInt(e);
    const res = state?.filter((c) => c !== id);
    setState(res);
  };

  return (
    <div className="filter-wrapper">
      <div
        className="buttons-container"
        style={{
          overflow: "hidden",
          height: isOpen ? "auto" : "40px",
        }}
      >
        {data.map((item, index) => (
          <button
            key={index}
            className={`filter-button mb-2 mr-2 ${
              state?.includes(item.id) ? "filter-button-clicked" : ""
            } `}
            onClick={() => handleChange(item?.id)}
          >
            {slice ? (
              <>
                {item?.name.split(" ")[0]?.slice(0, 3)}{" "}
                {item?.name.split(" ")[1]}
              </>
            ) : (
              item?.name
            )}
            {state?.includes(item.id) && (
              <AiOutlineClose
                size={16}
                onClick={() => handleChange2(item?.id)}
                className="pointer ml-2"
              />
            )}
          </button>
        ))}
      </div>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
    </div>
  );
};

export default SearchKeywordsU;
