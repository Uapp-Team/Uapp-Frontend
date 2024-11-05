import React from "react";
import { Col, Row } from "reactstrap";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";

const UserViewAns = ({ uniLable, setUniLable, uniValue, setUniValue }) => {
  return (
    <>
      <Row>
        <Col md={3}>
          <DefaultDropdownU
            label={uniLable}
            setLabel={setUniLable}
            value={uniValue}
            setValue={setUniValue}
            url="University/get-dd"
            className="w-100"
          />
        </Col>
        <Col md={9}></Col>
      </Row>
    </>
  );
};

export default UserViewAns;
