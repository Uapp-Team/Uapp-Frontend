import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SearchPaginations = ({
  currentPage,
  setCurrentPage,
  dataPerPage,
  // setDataPerPage,
  totalData,
}) => {
  let initialPage = Math.ceil(totalData / dataPerPage);
  // const list = [10, 20, 30, 50, 100, 1000];
  console.log(totalData);
  const pageList = initialPage;
  const [first, setFirst] = useState(1);
  const [last, setLast] = useState(initialPage);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (pageList > 4) {
      currentPage > 2 ? setFirst(currentPage - 2) : setFirst(1);
      pageList - 2 > currentPage ? setLast(currentPage + 2) : setLast(pageList);
    }
  }, [currentPage, pageList]);

  useEffect(() => {
    let items = [];
    for (let number = first; number <= last; number++) {
      items.push(number);
    }
    setPages(items);
  }, [first, last]);

  return (
    <div className="overflowX-auto mt-16px">
      {pages?.length > 0 && (
        <Pagination className="d-flex justify-content-between align-items-center">
          <span
            style={{
              display: "flex",
              color: "#475467",
            }}
            className={`${currentPage !== 1 && "pointer"}`}
            onClick={() =>
              currentPage !== 1 ? setCurrentPage(currentPage - 1) : {}
            }
          >
            <FaArrowLeft size={20} className="mr-2" />
            {/* Previous */}
          </span>

          <div className="d-flex justify-content-center align-items-center">
            {pages.map((number, i) => (
              <span
                key={i}
                onClick={() => setCurrentPage(number)}
                className={`mx-1 d-block pointer px-3 py-2 fw-500 rounded-circle ${
                  number === currentPage && "bg-white"
                }`}
              >
                {number}
              </span>
            ))}
          </div>

          <span
            style={{
              display: "flex",
              color: "#475467",
            }}
            className={`${currentPage !== pageList && "pointer"}`}
            onClick={() =>
              currentPage !== pageList ? setCurrentPage(currentPage + 1) : {}
            }
          >
            {/* Next */}
            <FaArrowRight size={20} className="ml-2" />
          </span>
        </Pagination>
      )}
    </div>
  );
};

export default SearchPaginations;
