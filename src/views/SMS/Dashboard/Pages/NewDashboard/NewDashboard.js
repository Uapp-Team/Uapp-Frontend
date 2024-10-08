import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import LinkButton from "../../../Components/LinkButton";

import video from "../../../../../assets/video/video.mp4";

const NewDashboard = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  return (
    <div>
      <div className="uapp-user-name mb-3">
        <Row>
          <Col sm="9" xs="12">
            <h2>Welcome, {currentUser?.displayName}.</h2>
          </Col>

          <Col sm="3" xs="12 text-sm-right">
            {/* <button className="uapp-btn btn">Add New Action</button> */}
          </Col>
        </Row>
      </div>

      <Row>
        <Col md="12">
          <Card style={{ borderLeft: "6px solid #1e98b0" }} className="p-2">
            <div className="row">
              <div className="col-md-2 my-auto">
                <div className="text-center">
                  {/* <span className="university-title-style">Course</span> */}
                  <span className="span-style-search">
                    {/* <i className="fas fa-location-dot"></i> */}
                    APP ID
                  </span>
                  <br />
                  <span className="">
                    {/* <i className="fas fa-location-dot"></i> */}1
                  </span>
                </div>
              </div>

              <div className="col-md-2 my-auto">
                <div className="text-center">
                  {/* <span className="university-title-style">Course</span> */}
                  <span className="span-style-search">
                    {/* <i className="fas fa-location-dot"></i> */}
                    Course
                  </span>
                  <br />
                  <span className="">
                    {/* <i className="fas fa-location-dot"></i> */}
                    Computer Fundamentals
                  </span>
                </div>
              </div>

              <div className="col-md-2 my-auto">
                <div className="text-center">
                  {/* <span className="university-title-style">University</span> */}
                  <span className="span-style-search">University</span>
                  <br />
                  <span className="">
                    {/* <i className="fas fa-location-dot"></i>
                    address */}
                    Dhaka University
                  </span>
                </div>
              </div>

              <div className="col-md-2 my-auto">
                <div className="text-center">
                  {/* <span className="university-title-style">Intake</span> */}
                  <span className="span-style-search">Intake</span>
                  <br />
                  <span className="">
                    {/* <i className="fas fa-location-dot"></i>
                    address */}
                    January 2023
                  </span>
                </div>
              </div>

              <div className="col-md-2 my-auto">
                <div className="text-center">
                  {/* <span className="university-title-style">Status</span> */}
                  <span className="span-style-search">Status</span>
                  <br />
                  <span className="">
                    {/* <i className="fas fa-location-dot"></i>
                    address */}
                    Open
                  </span>
                </div>
              </div>

              <div className="col-md-2 my-auto text-center">
                {/* <div className="d-flex justify-content-end"> */}
                {/* <LinkButton
                    // url={`/universityDetails/${info?.universityId}`}
                    target={"_blank"}
                    color={"primary"}
                    className={"mx-1 btn-sm"}
                    icon={<i className="fas fa-eye"></i>}
                    permission={6}
                  /> */}
                <span
                  style={{ color: "#1e98b0", cursor: "pointer" }}
                  className="font-weight-bold"
                >
                  View
                </span>
                {/* </div> */}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <h5>
        <b>Need help before applying</b>
      </h5>
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-4">
                  <video
                    width="100%"
                    height="100%"
                    src={video}
                    controls
                    autoPlay
                    loop
                  />
                </div>

                <div className="col-md-8 ">
                  <div className="row mb-2">
                    <div className="col-md-12 col-sm-12">
                      <span>
                        <i className="fas fa-chevron-circle-right"></i> FAQ
                      </span>
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col-md-12 col-sm-12">
                      <span>
                        <i className="fas fa-chevron-circle-right"></i> BLOG
                      </span>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-12 col-sm-12">
                      <span>
                        <i className="fas fa-chevron-circle-right"></i> CONTACT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="mt-2">
            <CardBody>
              <p>Become Consultant Part</p>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-4 col-sm-12">
          <Card className="container py-4">
            <div className="hedding-titel d-flex justify-content-between ms-1">
              <div>
                <h5>
                  {" "}
                  <b>Consultant Information</b>{" "}
                </h5>

                <div className="bg-h"></div>
              </div>
              {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
