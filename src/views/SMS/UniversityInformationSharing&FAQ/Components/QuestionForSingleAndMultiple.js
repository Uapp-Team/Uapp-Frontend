import React from "react";
import { Card, Col, FormGroup, Input } from "reactstrap";

const QuestionForSingleAndMultiple = () => {
  return (
    <Card className="p-3">
      <FormGroup row>
        <Col lg="12" md="8">
          <span className="bold-text">Title</span>

          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Title here"
            // onChange={(e) => {
            //   handleFirstNameChange(e);
            // }}
            // value={firstName}
          />
          {/* <span className="text-danger">
                                    {firstNameError}
                                  </span> */}
        </Col>
      </FormGroup>

      <span className="mb-3">Options</span>
      <FormGroup row className="mb-0">
        <Col lg="6" md="8">
          <div className="d-flex">
            {" "}
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Title here"
              // onChange={(e) => {
              //   handleFirstNameChange(e);
              // }}
              // value={firstName}
            />
            <p className="ml-2 mt-2">Delete</p>
          </div>

          {/* <span className="text-danger">
                                    {firstNameError}
                                  </span> */}
        </Col>
      </FormGroup>
      <FormGroup row className="mb-0">
        <Col lg="6" md="8">
          <div className="d-flex">
            {" "}
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Title here"
              // onChange={(e) => {
              //   handleFirstNameChange(e);
              // }}
              // value={firstName}
            />
            <p className="ml-2 mt-2">Delete</p>
          </div>

          {/* <span className="text-danger">
                                    {firstNameError}
                                  </span> */}
        </Col>
      </FormGroup>
      <FormGroup row className="mb-0">
        <Col lg="6" md="8">
          <div className="d-flex">
            {" "}
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Title here"
              // onChange={(e) => {
              //   handleFirstNameChange(e);
              // }}
              // value={firstName}
            />
            <p className="ml-2 mt-2">Delete</p>
          </div>

          {/* <span className="text-danger">
                                    {firstNameError}
                                  </span> */}
        </Col>
      </FormGroup>
      <p className="text-faq-modal">Add Option</p>
    </Card>
  );
};

export default QuestionForSingleAndMultiple;
