import { HubConnectionBuilder } from "@microsoft/signalr";
// import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input } from "reactstrap";
import { rootUrl } from "../../../../../../constants/constants";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import get from "../../../../../../helpers/get";
import post from "../../../../../../helpers/post";
import addattachment from "../../../../../../assets/img/addattachment.png";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { Upload } from "antd";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const MessageHistoryCardApplicationDetailsPage = (props) => {
  const userType = localStorage.getItem("userType");
  const [messages, setMessages] = useState([]);
  const {
    applicationStatusId,
    applicationId,
    close,
    chatOpen,
    success,
    setSuccess,
  } = props;
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
    subData.append("isForEveryone", isForEveryone);
    subData.append("isStudent", isStudent);
    subData.append("isConsultant", isConsultant);
    subData.append("isAdManager", isAdManager);
    subData.append("isAdOfficer", isAdOfficer);
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
          setSuccess(!success);
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
                <h5>Message </h5>
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

          <div className="messanger-body px-4 pb-2">
            {messages?.length < 1 ? (
              <div className="no-message">Inbox is empty</div>
            ) : (
              <>
                <div className="messaging" id="scroll-chat">
                  {messages?.map((chat, i) => (
                    <div className="my-4" key={i}>
                      <div className="d-flex justify-between-start">
                        <div className="w-100 pr-4">
                          <p className="mb-0">
                            <b>{chat?.senderName}</b>
                          </p>

                          <div className="row" style={{ fontSize: "12px" }}>
                            <span className="col-12 text-gray">
                              {chat?.messageTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-note pt-1 px-3 pb-3 mr-1">
                        <p className="ext-gray-70">{chat?.messageBody}</p>
                        {chat?.attachmentUrl ? (
                          <a
                            href={rootUrl + chat?.attachmentUrl}
                            target="blank"
                          >
                            Attachment
                          </a>
                        ) : null}
                      </div>
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
                  {/* <div className="mt-3 d-flex justify-between"> */}

                  <Upload
                    multiple={false}
                    fileList={file}
                    onChange={handleChange3}
                    beforeUpload={(file) => {
                      return false;
                    }}
                    className="ml-3 mb-2"
                  >
                    {file.length < 1 ? (
                      <img className="my-2" src={addattachment} alt="" />
                    ) : (
                      ""
                    )}
                  </Upload>

                  <FormGroup className="ml-4">
                    <div className="d-flex justify-between align-items-end">
                      <Col xs={8}>
                        {userType !== userTypes?.Student && (
                          <>
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
                            <span> Everyone </span>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                setIsStudent(e.target.checked);
                              }}
                              value={isStudent}
                              checked={isStudent}
                            />
                            <span> Student </span>
                          </>
                        )}

                        {userType !== userTypes?.Consultant && (
                          <>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                setIsConsultant(e.target.checked);
                              }}
                              value={isConsultant}
                              checked={isConsultant}
                            />
                            <span> Consultant </span>
                          </>
                        )}

                        {userType !== userTypes?.AdmissionManager && (
                          <>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                setIsAdManager(e.target.checked);
                              }}
                              value={isAdManager}
                              checked={isAdManager}
                            />
                            <span> Addmission Manager </span>
                          </>
                        )}

                        {userType !== userTypes?.AdmissionOfficer && (
                          <>
                            <br />
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                setIsAdOfficer(e.target.checked);
                              }}
                              value={isAdOfficer}
                              checked={isAdOfficer}
                            />
                            <span> Addmission Officer </span>
                          </>
                        )}
                      </Col>
                      <Col xs={4} className="text-right">
                        <SaveButton text="Send" />
                      </Col>
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
