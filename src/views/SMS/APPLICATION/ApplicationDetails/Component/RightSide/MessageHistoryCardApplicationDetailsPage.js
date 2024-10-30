import { HubConnectionBuilder } from "@microsoft/signalr";
// import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import { rootUrl } from "../../../../../../constants/constants";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import addattachment from "../../../../../../assets/img/addattachment.png";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { Upload } from "antd";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const MessageHistoryCardApplicationDetailsPage = ({
  applicationStatusId,
  applicationId,
  viewId,
  close,
  chatOpen,
  attach = true,
  user = true,
  success,
  setSuccess,
}) => {
  const userType = localStorage.getItem("userType");
  const [messages, setMessages] = useState([]);
  console.log(messages, "messages");
  const [stringData, setStringData] = useState("");
  const [messagesError, setMessagesError] = useState(false);
  const [file, setFile] = useState([]);
  const [isForEveryone, setIsForEveryone] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isConsultant, setIsConsultant] = useState(false);
  const [isAdManager, setIsAdManager] = useState(false);
  const [isAdOfficer, setIsAdOfficer] = useState(false);

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const getMessage = (appId) => {
    get(`ApplicationMessage/GetMessages/${appId}`).then((res) => {
      setMessages(res);
    });
  };

  useEffect(() => {
    isStudent === true &&
    isConsultant === true &&
    isAdManager === true &&
    isAdOfficer === true
      ? setIsForEveryone(true)
      : setIsForEveryone(false);
  }, [isStudent, isConsultant, isAdManager, isAdOfficer]);

  useEffect(() => {
    if (
      userType === userTypes?.SystemAdmin ||
      userType === userTypes?.Admin ||
      userType === userTypes?.ProviderAdmin ||
      userType === userTypes?.AdmissionOfficer ||
      userType === userTypes?.Consultant ||
      userType === userTypes?.AdmissionManager ||
      userType === userTypes?.Student
    ) {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${rootUrl}applicationMessageHub`)
        .withAutomaticReconnect()
        .build();

      newConnection.start().then((result) => {
        getMessage(applicationId);
        newConnection.invoke("JoinGroup", applicationId);

        newConnection.on("applicationMessageHub", (message) => {
          if (message) {
            getMessage(applicationId);
          }
        });
      });
    } else {
      getMessage(applicationId);
    }
  }, [userType, applicationId]);

  const handleStringData = (e) => {
    setStringData(e.target.value);
    setMessagesError(false);
  };
  const handleChange3 = ({ fileList }) => {
    setFile(fileList);
  };
  const submitFormData = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("isForEveryone", user ? isForEveryone : true);
    subData.append("isStudent", user ? isStudent : true);
    subData.append("isConsultant", user ? isConsultant : true);
    subData.append("isAdManager", user ? isAdManager : true);
    subData.append("isAdOfficer", user ? isAdOfficer : true);
    subData.append(
      "attachment",
      file.length === 0 ? null : file[0]?.originFileObj
    );

    if (stringData === "") {
      setMessagesError(true);
    } else {
      post(`ApplicationMessage/SendMessage`, subData).then((res) => {
        console.log(res);
        if (res) {
          setStringData("");
          setFile([]);
          setIsForEveryone(false);
          setSuccess && success && setSuccess(!success);
        }
      });
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      const container = document.querySelector("#scroll-chat");
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {permissions?.includes(permissionList.View_ApplicationMessage) ? (
        <div className="">
          {chatOpen === true ? (
            <>
              <div
                className="d-flex justify-content-between align-items-center messanger-head px-4"
                style={{ backgroundColor: "#EEF3F4" }}
              >
                <b>{viewId ? viewId : `Chat`}</b>
                <i
                  class="fas fa-times pointer"
                  style={{ width: "24px" }}
                  onClick={() => close()}
                ></i>
              </div>
            </>
          ) : (
            <h5 className="px-4">Message History</h5>
          )}

          <div className="messanger-body px-4">
            {messages?.length < 1 ? (
              <div className="no-message">Inbox is empty</div>
            ) : (
              <>
                <div className="messaging" id="scroll-chat">
                  {messages?.map((chat, i) => (
                    <div className="my-4" key={i}>
                      {chat?.isCurrentUser === true ? (
                        <>
                          {" "}
                          <div className="d-flex justify-between-start text-right">
                            <div className="w-100 pr-4">
                              <p
                                className="mb-0"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#344054",
                                }}
                              >
                                You
                                {/* <b>{chat?.senderName}</b> */}
                              </p>

                              <div
                                className="row mb-2"
                                style={{ fontSize: "12px" }}
                              >
                                <span className="col-12 text-gray">
                                  {chat?.messageTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Row>
                              <Col md="3"></Col>
                              <Col md="9">
                                {" "}
                                <span className="bg-note-for-me  px-3 py-3 mr-1 ">
                                  {chat?.messageBody}{" "}
                                  {chat?.attachmentUrl ? (
                                    <a
                                      // className="bg-note-for-me  px-3 py-3 mr-1 "
                                      style={{
                                        display: "block",
                                        color: "white",
                                        fontWeight: "700",
                                        textDecoration: "underline",
                                      }}
                                      href={rootUrl + chat?.attachmentUrl}
                                      target="blank"
                                    >
                                      Attachment
                                    </a>
                                  ) : null}
                                </span>
                              </Col>
                            </Row>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-flex justify-between-start">
                            <div className="mr-3">
                              <img
                                src={rootUrl + chat?.image}
                                alt=""
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50px",
                                }}
                              />
                            </div>
                            <div className="w-100 pr-4">
                              <p
                                className="mb-0"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#344054",
                                }}
                              >
                                {chat?.senderName}
                              </p>
                              <div
                                className="row mb-2"
                                style={{ fontSize: "12px" }}
                              >
                                <span className="col-12 text-gray">
                                  {chat?.messageTime}
                                </span>
                              </div>{" "}
                              <div className="">
                                <Row>
                                  <Col md="9">
                                    <span className="bg-note-for-user  px-3 py-2 mr-1 ">
                                      {chat?.messageBody}{" "}
                                      {chat?.attachmentUrl ? (
                                        <a
                                          style={{
                                            display: "block",
                                            color: "black",
                                            fontWeight: "700",
                                          }}
                                          href={rootUrl + chat?.attachmentUrl}
                                          target="blank"
                                        >
                                          Attachment
                                        </a>
                                      ) : null}
                                    </span>
                                  </Col>
                                  <Col md="3"></Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* {chat?.isCurrentUser === true ? (
                        <div className="text-right">
                          <Row>
                            <Col md="3"></Col>
                            <Col md="9">
                              {" "}
                              <span className="bg-note-for-me  px-3 py-3 mr-1 ">
                                {chat?.messageBody}
                              </span>
                              {chat?.attachmentUrl ? (
                                <a
                                  href={rootUrl + chat?.attachmentUrl}
                                  target="blank"
                                >
                                  Attachment
                                </a>
                              ) : null}
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        <div className="">
                          <Row>
                            <Col md="9">
                              <span className="bg-note-for-user  px-3 py-2 mr-1 ">
                                {chat?.messageBody}
                              </span>
                              {chat?.attachmentUrl ? (
                                <a
                                  href={rootUrl + chat?.attachmentUrl}
                                  target="blank"
                                >
                                  Attachment
                                </a>
                              ) : null}
                            </Col>
                            <Col md="3"></Col>
                          </Row>
                        </div>
                      )} */}
                    </div>
                  ))}
                </div>
              </>
            )}
            {applicationStatusId !== 13 &&
            (userType === userTypes?.SystemAdmin ||
              userType === userTypes?.Admin ||
              userType === userTypes?.ProviderAdmin ||
              userType === userTypes?.AdmissionOfficer ||
              userType === userTypes?.Consultant ||
              userType === userTypes?.Student ||
              userType === userTypes?.AdmissionManager) ? (
              <div>
                <hr />
                <Form onSubmit={submitFormData}>
                  <input
                    type="hidden"
                    name="groupId"
                    id="groupId"
                    value={applicationId}
                  />

                  <Input
                    type="textarea"
                    placeholder="Type message"
                    onChange={handleStringData}
                    value={stringData}
                    name="message"
                    id="message"
                    className="messanger-text"
                  />
                  {messagesError ? (
                    <span className="text-danger">Message is required</span>
                  ) : null}
                  <br />

                  <FormGroup className="ml-4">
                    {user && (
                      <>
                        {userType !== userTypes?.Student && (
                          <>
                            <div className="d-inline-block">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={(e) => {
                                  setIsForEveryone(e.target.checked);
                                  setIsStudent(e.target.checked);
                                  setIsConsultant(e.target.checked);
                                  setIsAdManager(e.target.checked);
                                  setIsAdOfficer(e.target.checked);
                                }}
                                value={isForEveryone}
                                checked={isForEveryone}
                              />
                              <span className="mr-5"> Everyone </span>
                            </div>
                            <div className="d-inline-block">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={(e) => {
                                  setIsStudent(e.target.checked);
                                }}
                                value={isStudent}
                                checked={isStudent}
                              />
                              <span className="mr-5"> Student </span>
                            </div>
                          </>
                        )}

                        {userType !== userTypes?.Consultant && (
                          <div className="d-inline-block">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                setIsConsultant(e.target.checked);
                              }}
                              value={isConsultant}
                              checked={isConsultant}
                            />
                            <span className="mr-5"> Consultant </span>
                          </div>
                        )}

                        {userType !== userTypes?.AdmissionManager && (
                          <div className="d-inline-block">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                setIsAdManager(e.target.checked);
                              }}
                              value={isAdManager}
                              checked={isAdManager}
                            />
                            <span className="mr-5"> Admission Manager </span>
                          </div>
                        )}

                        {userType !== userTypes?.AdmissionOfficer && (
                          <div className="d-inline-block">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                setIsAdOfficer(e.target.checked);
                              }}
                              value={isAdOfficer}
                              checked={isAdOfficer}
                            />
                            <span className="mr-5"> Admission Officer </span>
                          </div>
                        )}
                      </>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <div className="d-flex justify-content-start">
                      {/* <Col> */}
                      {attach && (
                        <Upload
                          multiple={false}
                          fileList={file}
                          onChange={handleChange3}
                          beforeUpload={(file) => {
                            return false;
                          }}
                          className="mb-2"
                        >
                          {file.length < 1 ? (
                            <div className="file-upload-chat">
                              <i class="fas fa-paperclip"></i>
                            </div>
                          ) : (
                            ""
                          )}
                        </Upload>
                      )}
                      {/* </Col>
                      <Col> */}
                      <SaveButton text="Send" />
                      {/* </Col> */}
                    </div>
                  </FormGroup>
                </Form>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MessageHistoryCardApplicationDetailsPage;
