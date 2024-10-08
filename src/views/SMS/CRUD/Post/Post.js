import React, { useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Nav,
  NavItem,
} from "reactstrap";

import post from "../../../../helpers/post";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const Post = () => {
  const url = "UniversityType/Create";
  const history = useHistory();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    for (let val of subData.values()) {
    }
    // const subData = {
    //   name

    // }

    post(url, subData).then().catch();
  };

  return (
    <>
      <BreadCrumb title="University Type Information" backTo="" path="" />

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormGroup row className="has-icon-left position-relative">
              <Input type="text" name="name" id="name" />
            </FormGroup>

            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button.Ripple type="submit" className="mr-1 mt-3 badge-primary">
                Submit
              </Button.Ripple>
            </FormGroup>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Post;
