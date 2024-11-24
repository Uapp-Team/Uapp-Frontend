import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";
import CategoryAccordion from "../Components/CategoryAccordion";
import Tag from "../../../../components/ui/Tag";
import Answer from "../Answers/Answer";

const UserViewAns = ({
  answerData,
  uniLable,
  setUniLable,
  uniValue,
  setUniValue,
  category,
  categoryName,
  setCategoryName,
  categoryId,
  setCategoryId,
  openIndex,
  setOpenIndex,
}) => {
  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <DefaultDropdownU
            label={uniLable}
            setLabel={setUniLable}
            value={uniValue}
            setValue={setUniValue}
            url="University/get-dd"
            className="mb-3"
          />

          {category?.map((item, i) => (
            <CategoryAccordion
              key={i}
              content={item}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              setCategoryName={setCategoryName}
              isOpen={openIndex === item?.id}
              toggleAccordion={() => toggleAccordion(item?.id)}
            />
          ))}
        </Col>
        <Col md={8}>
          <Tag
            title="Category"
            label={categoryName}
            action={() => {
              setCategoryId(0);
              setCategoryName("");
            }}
          />

          <hr />
          <span className="text-gray-70 fs-12px">
            Results 1-7 of 7 for university
          </span>
          <hr />

          {answerData?.map((item, i) => (
            <div key={i}>
              <Answer defaultData={item} refetch={() => {}} />
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default UserViewAns;
