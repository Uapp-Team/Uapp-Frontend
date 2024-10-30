import React, { useEffect, useState } from "react";
import poundicon from "../../../../../assets/img/poundcoin.svg";
import camera from "../../../../../assets/img/camera.svg";
import { Col, Form, FormGroup, Input, Modal, ModalBody, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import { useHistory, useParams } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import UserNotices from "../../Component/UserNotices";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import RecentInvitations from "./RecentInvitations";
import CountingCards from "./CountingCards";
import Uget from "../../../../../helpers/Uget";
import CompanionRefer from "./CompanionRefer/CompanionRefer";
import CopyButton from "../../../../../components/Refer/CopyButton";
import SocialShare from "../../../../../components/Refer/SocialShare";
import put from "../../../../../helpers/put";
import { userTypes } from "../../../../../constants/userTypeConstant";

const Companion = () => {
  const { id } = useParams();

  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const referenceId = localStorage.getItem("referenceId");
  const userId = id ? id : referenceId;

  const [showBal, setShowBal] = useState(false);
  const [availableWithdraw, setAvailableWithdraw] = useState(0);
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
  const [count, setCount] = useState({});
  const userViewId = JSON.parse(localStorage.getItem("current_user"));
  const url = `https://portal.uapp.uk/studentRegister/${userViewId.userViewId}`;
  const userType = localStorage.getItem("userType");

  const [active, setActive] = useState(false);

  useEffect(() => {
    Uget(`Companion/get-active-status/${referenceId}`).then((res) => {
      console.log(res?.data);
      setActive(res?.data);
    });
  }, [referenceId]);

  useEffect(() => {
    Uget(`Companion/get-dashboard-info/${userId}`).then((res) => {
      setCount(res?.data);
    });
  }, [userId]);

  useEffect(() => {
    get(`CompanionTransactoin/Balance/${referenceId}`).then((res) => {
      setAvailableWithdraw(res);
    });
  }, []);

  const redirectEditProfile = () => {
    history.push(`/consultantInformation/${userId}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEmail("");
    setEmailError("");
    // setSuccess(!success);
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
      put(
        `CompanionTeamInvitation?companionid=${referenceId}&email=${email}`,
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
        {userType !== userTypes?.SystemAdmin ? (
          <div className="d-flex flex-wrap">
            {active ? <CompanionRefer /> : <p>Your Account is not Active</p>}
            <UserNotices />
          </div>
        ) : null}
      </div>

      <Row className="mb-4">
        <Col lg="9">
          <CountingCards id={referenceId} count={count} setCount={setCount} />
          <RecentInvitations count={count} setCount={setCount} />
        </Col>

        <Col lg="3">
          {active && (
            <>
              {userType !== userTypes?.SystemAdmin ? (
                <div className="custom-card-border p-4 minH-250px relative mb-30px">
                  <div className="text-center my-5">
                    {" "}
                    <div className="text-center mx-auto mb-4">
                      <p style={{ color: "##828282" }}>Copy & Share</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center copy-text mx-auto w-75">
                      <p className="mb-0 text-ellipsis mr-1">{url}</p>
                      <CopyButton text={url} />
                    </div>
                    <SocialShare
                      description={"this is a basic share page"}
                      url={url}
                    ></SocialShare>
                  </div>
                </div>
              ) : null}
            </>
          )}

          <div className="custom-card-border p-4 minH-250px relative mb-30px">
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

            {/* <div className="consultant-balance-botton pb-4 pr-5 w-100">
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
            </div> */}
          </div>

          {userType !== userTypes?.SystemAdmin ? (
            <>
              {active && (
                <div className="custom-card-border p-4 relative mb-3">
                  <div>
                    <div className="p-4 pb-3 d-flex justify-content-center flex-collumn ">
                      <i
                        className="fas fa-gift fs-63px"
                        style={{
                          color: "#1E98B0",
                        }}
                      ></i>
                    </div>
                    <div className="text-center">
                      <h1 className="mb-3 fs-16px fw-500">
                        Refer a student, Earn Unlimited
                      </h1>
                      <p className="fs-13px ">
                        Refer a friend or family and receive up to £500!
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
                </div>
              )}
            </>
          ) : null}
        </Col>
      </Row>

      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
        {/* <ModalHeader></ModalHeader> */}
        <ModalBody>
          <h4 className="mb-3">Send Invitation to email</h4>
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

      {overview?.profileCompleted === false && (
        <Modal isOpen={true} className="uapp-modal">
          <ModalBody style={{ padding: "30px" }}>
            <p>
              <b>Complete your profile</b>
              <br />
              We need some more information from you to set up your account.
            </p>
            <div className="text-right">
              <CancelButton text="Continue" cancel={redirectEditProfile} />
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default Companion;
