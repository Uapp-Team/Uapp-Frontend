import React, { useEffect, useState } from "react";
import poundicon from "../../../../../assets/img/poundcoin.svg";
import camera from "../../../../../assets/img/camera.svg";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Refer from "./Refer";
import ContinueModal from "../../../../../components/modal/ContinueModal";
import TandC from "./TandC";

const Consultant = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const referenceId = localStorage.getItem("referenceId");
  const [showBal, setShowBal] = useState(false);
  const [availableWithdraw, setAvailableWithdraw] = useState(0);
  const [status, setStatus] = useState(false);
  // const [balance, setBalance] = useState(0);
  // const [open, setOpen] = useState(false);
  const history = useHistory();
  const [overview, setOverview] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    get(`Consultant/Status/${referenceId}`).then((res) => {
      setStatus(res);
    });

    // get(
    //   `Balance/ConsultantBalance/${referenceId}}`
    // ).then((res) => {
    //   setBalance(res);
    // });

    get(`Balance/ConsultantBalanceSummery/${referenceId}`).then((res) => {
      setAvailableWithdraw(res);
    });

    get(`ConsultantOverview/Overview`).then((res) => {
      setOverview(res);
    });
  }, [referenceId]);

  console.log(status);

  // const showDrawer = () => {
  //   setOpen(true);
  // };
  // const onClose = () => {
  //   setOpen(false);
  // };

  const redirectToAddStudent = () => {
    history.push("/addStudentRegister");
  };

  const redirectEditProfile = () => {
    history.push(`/consultantInformation/${referenceId}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEmail("");
    setEmailError("");
    setSuccess(!success);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Email is not Valid");
    } else {
      setButtonStatus(true);
      setProgress(true);
      post(
        `Invitation/Send?${referenceId}=1& ${email}=asdfs@mial.com`,
        subData
      ).then((action) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
        setEmail("");
        setModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      });
    }
  };

  const handleEmailError = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const handleConsent = () => {
    history.push(`/consultantTermsInformation/${referenceId}`);
  };

  const redirectToStudentAdd = () => {
    history.push(`/addStudentRegister`);
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
            Here's what's happening with your portal.
          </span>
        </div>

        <div className="d-flex flex-wrap">
          <div className="mt-2 mr-4 mb-1">
            {/* {overview?.profileCompleted && overview?.consentSigned ? null : (
              <span className="text-danger">{overview?.message}</span>
            )} */}
          </div>
          <div style={{ cursor: "pointer" }}>
            {overview?.consentSigned && status ? (
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
            ) : !overview?.profileCompleted ? (
              <div className="std-profile">
                <span onClick={redirectEditProfile}>Complete Profile</span>
              </div>
            ) : null}
          </div>

          <Refer />
          <UserNotices />
        </div>
      </div>
      {status ? (
        <>
          <div className="row">
            <div className="col-sm-12 col-12">
              <ConsultantDesignation id={referenceId} />
            </div>
            <div className="col-sm-12 col-lg-9 col-12">
              <CountingCards id={referenceId} />
            </div>

            <div className="col-sm-12 col-lg-3 col-12 mb-30px">
              <div className="custom-card-border p-4 h-100 minH-250px relative">
                <div className="d-flex justify-content-between">
                  <div className="text-gray">MY BALANCE</div>
                  <div className="dashboard-balance">
                    £ {availableWithdraw?.balance}
                  </div>
                </div>
                <div className="text-center my-5">
                  <p className="mb-0">Available to withdraw</p>
                  <p>
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
                        {showBal
                          ? availableWithdraw?.availableToWithdraw
                          : "Balance"}
                      </span>
                    </button>
                  </p>
                </div>

                <div className="consultant-balance-botton pb-4 pr-5 w-100">
                  <div className="d-flex justify-content-between">
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
          </div>

          <div className="row">
            <div className="col-lg-9">
              <DashboardApplication url="ConsultantDashboard/NewApplications" />
            </div>
            <div className="col-lg-3 mb-30px">
              <TargetApplications id={referenceId} />
            </div>
          </div>

          <Row className="mb-4">
            <Col lg="9">
              <DashboardReadyToApply url="ConsultantDashboard/ReadyToApplyApplications" />
            </Col>

            <Col lg="3">
              <div className="custom-card-border p-4 h-100 relative mb-3">
                <Carousel
                  autoPlay={true}
                  showThumbs={true}
                  showIndicators={false}
                  interval={2000}
                  infiniteLoop={true}
                  showArrows={false}
                  transitionTime={1000}
                >
                  <div>
                    <div className="p-4 pb-3 d-flex justify-content-center flex-collumn ">
                      {/* <img
                        alt=""
                        src={gift1}
                        style={{ width: "84px", height: "84px" }}
                      /> */}
                      <i
                        className="fas fa-users fs-63px"
                        style={{
                          color: "#1E98B0",
                        }}
                      ></i>
                    </div>
                    <div className="text-center">
                      <h1 className="mb-3 fs-16px fw-500">
                        Build a Team, Earn UNLIMITED!
                      </h1>
                      {/* <p className="fs-13px ">
                    Refer a friend or family and receive £500!
                  </p> */}
                      <button
                        onClick={() => setModalOpen(true)}
                        className="btn btn-primary btn-invite relative"
                      >
                        <i className="fas fa-envelope invite-now"></i>
                        <span>Invite Associate</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="p-4 pb-3 d-flex justify-content-center flex-collumn ">
                      {/* <img
                        alt=""
                        src={gift1}
                        style={{ width: "84px", height: "84px" }}
                      /> */}

                      <i
                        className="fas fa-gift fs-63px"
                        style={{
                          color: "#1E98B0",
                        }}
                      ></i>
                    </div>
                    <div className="text-center">
                      <h1 className="mb-3 fs-16px fw-500">
                        Refer a student and earn up to 500 Pounds!
                      </h1>
                      {/* <p className="fs-13px ">
                    Refer a friend or family and receive £500!
                  </p> */}
                      <button
                        onClick={redirectToStudentAdd}
                        className="btn btn-primary btn-student relative"
                      >
                        <i className="fas fa-envelope add-student-carousel"></i>
                        <span>Add Student</span>
                      </button>
                    </div>
                  </div>
                </Carousel>
              </div>
            </Col>

            <Col md="12" className="mt-4">
              <Overview id={referenceId} />
              <ConsProgressReport id={referenceId} />
              {/* <ProgressReport id={referenceId} /> */}
            </Col>
          </Row>
        </>
      ) : (
        <p className="text-center my-5">
          <b>Your Account is not active</b>
        </p>
      )}
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
                <span>
                  <span className="text-danger">*</span>Email
                </span>
              </Col>
              <Col md="8">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Write Email"
                  onChange={(e) => {
                    handleEmailError(e);
                  }}
                />
                <span className="text-danger">{emailError}</span>
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
      {overview?.profileCompleted === false ? (
        <ContinueModal
          text="Please Complete your profile"
          text2="We need some more information from you to set up your account."
          cancel={redirectEditProfile}
        />
      ) : (
        <TandC />
      )}
    </>
  );
};

export default Consultant;
