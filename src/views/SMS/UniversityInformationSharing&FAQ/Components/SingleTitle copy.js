import React from "react";
import { Card, Col, FormGroup } from "reactstrap";
import Input from "../../../../components/form/Input";

const SingleTitle = () => {
  return (
    <div>
      <Card className="p-3">
        {" "}
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
      </Card>
    </div>
  );
};

export default SingleTitle;
