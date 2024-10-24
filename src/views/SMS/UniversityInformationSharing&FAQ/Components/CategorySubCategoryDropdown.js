import React from "react";
import { Col, FormGroup } from "reactstrap";
import Select from "react-select";

const CategorySubCategoryDropdown = ({
  categoryLabel,
  categoryName,
  categoryValue,
  selectCategoryName,
  selectSubCategoryName,
  subCategoryLabel,
  subCategoryValue,
  subCategoryName,
}) => {
  return (
    <div className="bg-answer-card-faq p-3 mb-4">
      {" "}
      <FormGroup row className="has-icon-left position-relative">
        <Col md="6">
          <p>Category</p>
          <Select
            options={categoryName}
            value={{
              label: categoryLabel,
              value: categoryValue,
            }}
            onChange={(opt) => selectCategoryName(opt.label, opt.value)}
            name="departmentId"
            id="departmentId"
          />
          {/* {departmentError ? (
    <span className="text-danger">Department is required.</span>
  ) : null} */}
        </Col>
        <Col md="6">
          <p>Sub Category</p>
          <Select
            options={subCategoryName}
            value={{
              label: subCategoryLabel,
              value: subCategoryValue,
            }}
            onChange={(opt) => selectSubCategoryName(opt.label, opt.value)}
            name="departmentId"
            id="departmentId"
          />

          {/* {departmentError ? (
    <span className="text-danger">Department is required.</span>
  ) : null} */}
        </Col>
      </FormGroup>
    </div>
  );
};

export default CategorySubCategoryDropdown;
