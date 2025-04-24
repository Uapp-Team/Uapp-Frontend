import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const SearchPaginations = ({
  currentPage,
  setCurrentPage,
  dataPerPage,
  setDataPerPage,
  totalData,
}) => {
  let initialPage = Math.ceil(totalData / dataPerPage);
  const list = [24, 48, 72, 96, 240, 480];
  console.log(totalData);
  const [pageList, setPageList] = useState(initialPage);
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

  const handleChange = (e) => {
    setDataPerPage(e.target.value);
    setCurrentPage(1);
    setPageList(Math.ceil(totalData / e.target.value));
    setLast(Math.ceil(totalData / e.target.value));
  };

  return (
    <Row>
      <Col>
        {pages?.length > 0 && (
          <Pagination className="d-flex align-items-center">
            {currentPage !== 1 && (
              <span
                style={{
                  display: "flex",
                  color: "#475467",
                }}
                className={`${currentPage !== 1 && "pointer"}`}
                onClick={() => (currentPage !== 1 ? setCurrentPage(1) : {})}
              >
                <MdKeyboardDoubleArrowLeft size={20} className="mr-2" />
              </span>
            )}

            {currentPage !== 1 && (
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
                <MdKeyboardArrowLeft size={20} className="mr-2" />
              </span>
            )}

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

            {currentPage !== pageList && (
              <span
                style={{
                  display: "flex",
                  color: "#475467",
                }}
                className={`${currentPage !== pageList && "pointer"}`}
                onClick={() =>
                  currentPage !== pageList
                    ? setCurrentPage(currentPage + 1)
                    : {}
                }
              >
                <MdKeyboardArrowRight size={20} className="ml-2" />
              </span>
            )}

            {currentPage !== pageList && (
              <span
                style={{
                  display: "flex",
                  color: "#475467",
                }}
                className={`${currentPage !== pageList && "pointer"}`}
                onClick={() =>
                  currentPage !== pageList ? setCurrentPage(pageList) : {}
                }
              >
                <MdKeyboardDoubleArrowRight size={20} className="ml-2" />
              </span>
            )}
          </Pagination>
        )}
      </Col>
      <Col>
        <div className="d-flex justify-content-end align-item-center">
          <p className="mt-6px fs-12px mr-1 mb-0"> Show:</p>

          <Form.Group className="mb-0">
            <Form.Select
              defaultValue={dataPerPage}
              onChange={handleChange}
              className="mw-70px"
            >
              {list?.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      </Col>
    </Row>
  );
};

export default SearchPaginations;
