import React, { useEffect, useState } from "react";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import gift from "../../../../../assets/img/gift.PNG";
import gift1 from "../../../../../assets/icon/gift.png";
import poundicon from "../../../../../assets/img/poundcoin.svg";
import camera from "../../../../../assets/img/camera.svg";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { Drawer } from "antd";
import get from "../../../../../helpers/get";
import { useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import TargetApplications from "../../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/TargetApplications";
import CountingCards from "../../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/CountingCards";
import vector from "../../../../../assets/img/Vector.png";
import ConsProgressReport from "./ConsProgressReport";
import DashboardApplication from "../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../components/ui/DashboardReadyToApply";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Overview from "./Overview/Overview";
import ConsultantDesignation from "../../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/ConsultantDesignation";
import UserNotices from "../../Component/UserNotices";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";

const Consultant = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const referenceId = localStorage.getItem("referenceId");
  const [showBal, setShowBal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [overview, setOverview] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    get(
      `Balance/ConsultantBalance/${localStorage.getItem("referenceId")}`
    ).then((res) => {
      setBalance(res);
    });

    get(`ConsultantOverview/Overview`).then((res) => {
      // setAcSts(res);
      console.log("overview", res);
      setOverview(res);
    });
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const redirectToAddStudent = () => {
    history.push("/addStudentRegister");
  };

  const redirectEditProfile = () => {
    history.push(
      `/consultantInformation/${localStorage.getItem("referenceId")}`
    );
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    setButtonStatus(true);
    setProgress(true);
    post(
      `Invitation/Send?${referenceId}=1& ${email}=asdfs@mial.com`,
      subData
    ).then((action) => {
      setButtonStatus(false);
      setProgress(false);
      setSuccess(!success);
      setModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };
  const handleConsent = () => {
    history.push(
      `/consultantTermsInformation/${localStorage.getItem("referenceId")}`
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <span className="std-dashboard-style1">
            Hello, {currentUser?.displayName}!
          </span>
          <br />
          <span className="std-dashboard-style2">
            Here's what's happening with your store today.
          </span>
        </div>

        <div className="d-flex flex-wrap">
          <div className="mt-2 mr-4 mb-1">
            {/* {overview?.profileCompleted && overview?.consentSigned ? null : (
              <span className="text-danger">{overview?.message}</span>
            )} */}
          </div>

          <div style={{ cursor: "pointer" }}>
            {overview?.profileCompleted && overview?.consentSigned ? (
              <div className="std-student">
                <span onClick={redirectToAddStudent}>Add New Student</span>
              </div>
            ) : overview?.profileCompleted === false &&
              overview?.consentSigned ? (
              <div className="std-consent-and-profile">
                <span onClick={redirectEditProfile}>Edit Profile</span>
              </div>
            ) : overview?.profileCompleted &&
              overview?.consentSigned === false ? (
              <div className="std-consent-and-profile">
                <img
                  src={vector}
                  className="img-fluid dashbard-img-style1"
                  alt=""
                />
                <span onClick={handleConsent}>Sign Terms and Conditions</span>
              </div>
            ) : (
              <div className="std-profile">
                <span onClick={redirectEditProfile}>Complete Profile</span>
              </div>
            )}
          </div>

          <UserNotices />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-12">
          <ConsultantDesignation id={referenceId} />
        </div>
        <div className="col-sm-12 col-lg-9 col-12">
          <CountingCards id={referenceId} />
        </div>

        <div className="col-sm-12 col-lg-3 col-12 mb-30px">
          <div className="custom-card-border p-4 h-100 relative">
            <span className="text-gray fw-500">MY BALANCE</span>

            <div
              className="text-center relative balance-amount"
              style={{
                margin: "16px 0",
              }}
            >
              <button
                className="consultant-balance-button pr-3"
                style={{ border: "1px solid #019088" }}
                onClick={() => setShowBal(!showBal)}
              >
                <img src={poundicon} className="img-fluid mr-4" alt="" />

                <span
                  style={{
                    color: "#1E98B0",
                    fontWeight: "600",
                    fontSize: "17px",
                  }}
                >
                  {showBal ? balance : "Balance"}
                </span>
              </button>
            </div>

            <div className="consultant-dashboard-balance d-flex justify-content-between">
              <Link
                to={`/withdrawTransactionByConsultant/${currentUser?.referenceId}`}
                className="application-count-style text-gray"
              >
                Withdraw money
              </Link>

              <div className="consultant-bg-img">
                <img src={camera} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="row">
        <div className="col-lg-9">
          <DashboardApplication url="ConsultantDashboard/NewApplications" />
        </div>
        <div className="col-lg-3 mb-30px">
          <TargetApplications id={referenceId} />
        </div>
      </div>

      {/* Progress Report */}
      <Row className="mb-4">
        <Col md="9" sm="9" xs="12">
          <DashboardReadyToApply url="ConsultantDashboard/ReadyToApplyApplications" />
        </Col>
        <div>
          <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
            <ModalHeader>Send Invitation to email</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="consultantId"
                  id="consultantId"
                  value={referenceId}
                />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>Email</span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      defaultValue={email}
                      placeholder="Write Email"
                      // onChange={(e) => {
                      //   handleTitle(e);
                      // }}
                    />
                    {/* <span className="text-danger">{TitleError}</span> */}
                  </Col>
                </FormGroup>
                <FormGroup className="d-flex justify-content-between mt-3">
                  <CancelButton cancel={closeModal} />

                  <SaveButton
                    text="Send Email"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
        <Col md="3" sm="3" xs="12">
          <div className="custom-card-border p-4 h-100 relative mb-3">
            <div className="p-4 pb-3 d-flex justify-content-center flex-collumn ">
              <img alt="" src={gift1} height={70} />
            </div>
            <div className="text-center">
              <h1 className="mb-3 fs-16px fw-500">
                Build a Team, Earn UNLIMITED!
              </h1>
              <p className="fs-13px ">
                Refer a friend or family and receive £500!
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="btn btn-primary btn-invite relative"
              >
                <i className="fas fa-envelope invite-now"></i>
                <span>Invite Now</span>
              </button>
            </div>
          </div>
        </Col>

        <Col md="12" className="mt-4">
          <Overview id={referenceId} />
          <ConsProgressReport id={referenceId} />
          {/* <ProgressReport id={referenceId} /> */}
        </Col>
      </Row>
    </>
  );
};

export default Consultant;
