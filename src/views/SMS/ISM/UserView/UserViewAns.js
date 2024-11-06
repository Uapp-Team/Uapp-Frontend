import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";
import CategoryAccordion from "../Components/CategoryAccordion";

const UserViewAns = ({
  uniLable,
  setUniLable,
  uniValue,
  setUniValue,
  category,
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
              isOpen={openIndex === item?.id}
              toggleAccordion={() => toggleAccordion(item?.id)}
            />
          ))}
        </Col>
        <Col md={8}></Col>
      </Row>
    </>
  );
};

export default UserViewAns;
