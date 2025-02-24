import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import user from "../../../assets/img/Uapp_fav.png";
import { BranchManager, Consultant } from "../../../components/core/User";
import { rootUrl } from "../../../constants/constants";
import { userTypes } from "../../../constants/userTypeConstant";
import get from "../../../helpers/get";
import { logoutStorageHandler } from "../../../helpers/logoutStorageHandler";
import { history } from "../../../history";

const NavbarUser = () => {
  // const [navbarSearch, setnavbarSearch] = useState(false);
  // const [langDropdown, setlangDropdown] = useState(false);
  // const [suggestions, setsuggestions] = useState([]);
  // const [connection, setconnection] = useState([]);
  // const [chat, setchat] = useState("");
  const [notificationCount, setnotificationCount] = useState();
  const [notificationData, setnotificationData] = useState([]);
  const [newNotificationData, setNewNotification] = useState([]);
  const [canSwitch, setcanSwitch] = useState(false);
  const [message, setmessage] = useState([]);
  const [messageCount, setmessageCount] = useState();

  const userInfo = JSON.parse(localStorage.getItem("current_user"));
  const AuthStr = localStorage.getItem("token");

  const [data, setData] = useState(false);
  useEffect(() => {
    (Consultant() || BranchManager()) &&
      get(`consultant/is-switchable/${userInfo?.referenceId}`).then((res) => {
        setData(res);
      });
  }, [userInfo]);

  useEffect(() => {
    if (newNotificationData.length > 0) {
      // const agerNotification = notificationData;
      const newNotificationList = [...newNotificationData, ...notificationData];
      setnotificationData(newNotificationList);
      setNewNotification([]);
    }
  }, [newNotificationData, notificationData]);

  const handleLogOut = (e) => {
    e.preventDefault();
    history.push("/");
    logoutStorageHandler();
  };

  const convertAccount = (e, url) => {
    axios
      .get(`${rootUrl + url}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response?.status === 200) {
          if (response?.data?.isSuccess === true) {
            localStorage.removeItem("token");
            localStorage.removeItem("permissions");

            localStorage.setItem("token", "Bearer " + response?.data?.message);
            localStorage.setItem(
              "permissions",
              JSON.stringify(response?.data?.permissions)
            );
            const AuthStr = "Bearer " + response?.data?.message;
            axios
              .get(`${rootUrl}Account/GetCurrentUser`, {
                headers: {
                  authorization: AuthStr,
                },
              })
              .then((res) => {
                if (res?.status === 200) {
                  if (res?.data?.isActive === true) {
                    localStorage.setItem(
                      "current_user",
                      JSON.stringify(res?.data)
                    );
                    localStorage.setItem("userType", res?.data?.userTypeId);
                    localStorage.setItem("referenceId", res?.data?.referenceId);
                    window.location.reload();
                  }
                }
              });

            history.push("/");
          }
        }
      })
      .catch();
  };

  const goToLoginHistory = () => {
    history.push("/loginHistory");
  };

  const goToSettings = () => {
    history.push(`/accountSettings/${userInfo?.referenceId}`);
  };

  const goToBin = () => {
    history.push(`/recycle`);
  };

  const UserDropdown = (props) => {
    useEffect(() => {}, [props]);
    return (
      <DropdownMenu right>
        {userInfo?.userTypeId === userTypes?.SystemAdmin ? null : (
          <Link style={{ textDecoration: "none" }} to="/profile">
            <DropdownItem
              tag="a"
              // href="#"
              // onClick={redirectToProfile}
            >
              <Icon.User size={14} className="mr-1 align-middle" />
              <span className="align-middle">Profile</span>
            </DropdownItem>
          </Link>
        )}

        {(userInfo?.userTypeId.toString() === userTypes?.SystemAdmin ||
          userInfo?.userTypeId.toString() === userTypes?.Admin) && (
          <DropdownItem tag="a" onClick={goToBin}>
            <i className="fas fa-recycle mr-1 align-middle"></i>
            <span className="align-middle">Recycle Bin</span>
          </DropdownItem>
        )}

        <DropdownItem tag="a" onClick={goToSettings}>
          <Icon.Settings size={14} className="mr-1 align-middle" />
          <span className="align-middle">Settings</span>
        </DropdownItem>

        <DropdownItem tag="a" onClick={goToLoginHistory}>
          <Icon.LogIn size={14} className="mr-1 align-middle" />
          <span className="align-middle">Login History</span>
        </DropdownItem>

        <DropdownItem divider />

        {userInfo?.userTypeId?.toString() === userTypes?.Student ? (
          <>
            {props?.switch ? (
              <DropdownItem
                tag="a"
                onClick={(e) => {
                  convertAccount(e, "AccountSwitch/SwitchToConsultant");
                }}
              >
                <Icon.Repeat size={14} className="mr-1 align-middle" />
                <span className="align-middle">Switch To Consultant</span>
              </DropdownItem>
            ) : null}
          </>
        ) : userInfo?.userTypeId?.toString() === userTypes?.Consultant ? (
          <>
            {props?.switch ? (
              <DropdownItem
                tag="a"
                onClick={(e) => {
                  convertAccount(e, "AccountSwitch/SwitchToStudent");
                }}
              >
                <Icon.Repeat size={14} className="mr-1 align-middle" />
                <span className="align-middle">Switch To Student</span>
              </DropdownItem>
            ) : null}
          </>
        ) : null}
        {data === true &&
          (Consultant() ? (
            <DropdownItem
              tag="a"
              onClick={(e) => {
                convertAccount(e, "AccountSwitch/branch-manager");
              }}
            >
              <Icon.Repeat size={14} className="mr-1 align-middle" />
              <span className="align-middle">Switch To Branch Manager</span>
            </DropdownItem>
          ) : BranchManager() ? (
            <DropdownItem
              tag="a"
              onClick={(e) => {
                convertAccount(e, "AccountSwitch/consultant");
              }}
            >
              <Icon.Repeat size={14} className="mr-1 align-middle" />
              <span className="align-middle">Switch To Consultant</span>
            </DropdownItem>
          ) : null)}

        <DropdownItem
          tag="a"
          onClick={(e) => {
            handleLogOut(e);
          }}
        >
          <Icon.Power size={14} className="mr-1 align-middle" />
          <span className="align-middle">Log Out</span>
        </DropdownItem>
      </DropdownMenu>
    );
  };

  const countNotification = () => {
    axios
      .get(`${rootUrl}Notification/UserNotificationCount`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {
        setnotificationCount(res?.data);
        // setState({ notificationCount: res?.data });
      });
  };

  const messageFunction = () => {};

  const countMessage = () => {
    axios
      .get(`${rootUrl}MessageNotification/Count`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {});
  };

  const allNotifications = () => {
    history.push(`/allNotifications`);
  };

  const allMessage = () => {
    history.push(`/allMessages`);
  };

  const notificationByIdFunction = (data) => {
    axios
      .get(`${rootUrl}Notification/ViewNotification/${data}`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {});
  };

  const redirect = (data) => {
    notificationByIdFunction(data?.id);
    history.push(`${data?.targetUrl}`);

    let value = data?.id;
    let arrays = notificationData;
    let final = arrays.filter((arr) => arr.id !== value);

    setnotificationData(final);
    // countNotification();
    setnotificationCount(notificationCount - 1);
  };

  useEffect(() => {
    if (userInfo?.userTypeId === userTypes?.Student) {
      get(`Student/CheckIfStudentIsConsultant/${userInfo?.displayEmail}`).then(
        (res) => {
          setcanSwitch(res?.data?.result);
        }
      );
    }

    if (userInfo?.userTypeId?.toString() === userTypes?.Consultant) {
      get(
        `Consultant/CheckIfConsultantIsStudent/${userInfo?.displayEmail}`
      ).then((res) => {
        setcanSwitch(res?.data?.result);
      });
    }

    get(`Notification/UserNotificationCount`).then((res) => {
      setnotificationCount(res?.data);
    });

    get(`MessageNotification/Count`).then((res) => {
      setmessageCount(res?.data?.result);
    });

    get(`Notification/GetInitial`).then((res) => {
      setnotificationData(res?.data?.result);
    });

    if (
      userInfo?.userTypeId.toString() === userTypes?.Consultant ||
      userInfo?.userTypeId.toString() === userTypes?.AdmissionManager ||
      userInfo?.userTypeId.toString() === userTypes?.AdmissionOfficer ||
      userInfo?.userTypeId.toString() === userTypes?.Admin ||
      userInfo?.userTypeId.toString() === userTypes?.SystemAdmin ||
      userInfo?.userTypeId.toString() === userTypes?.Student
    ) {
      get(`MessageNotification/GetPreview`).then((res) => {
        setmessage(res);
      });
    }
  }, [AuthStr, userInfo.displayEmail, userInfo.userTypeId]);

  useEffect(() => {
    if (
      userInfo?.userTypeId.toString() === userTypes?.Consultant ||
      userInfo?.userTypeId.toString() === userTypes?.AdmissionManager ||
      userInfo?.userTypeId.toString() === userTypes?.AdmissionOfficer ||
      userInfo?.userTypeId.toString() === userTypes?.Admin ||
      userInfo?.userTypeId.toString() === userTypes?.SystemAdmin ||
      userInfo?.userTypeId.toString() === userTypes?.Student
    ) {
      const messageConnection = new HubConnectionBuilder()
        .withUrl(`${rootUrl}messageNotificationHub`)
        .withAutomaticReconnect()
        .build();
      if (messageConnection) {
        try {
          messageConnection.start().then((result) => {
            messageConnection.on("messageNotificationHub", (message) => {
              if (message) {
                countMessage();
                messageFunction();
              }
            });
          });
        } catch (error) {}
      }
    }

    let token = localStorage.getItem("token");

    let newToken = token ? token.slice(6) : null;

    const newConnection = new HubConnectionBuilder()
      .withUrl(`${rootUrl}notification-hub`, {
        accessTokenFactory: () => newToken,
      })
      // .withUrl(`${rootUrl}notification-hub`)
      .withAutomaticReconnect()
      .build();
    if (newConnection) {
      newConnection.start().then((result) => {
        newConnection.on("ReceiveNotification", (user, message) => {
          setNewNotification([message]);

          if (message) {
            countNotification();
          }
        });
      });
    }
  }, []);

  return (
    <>
      <>
        <ul className="nav navbar-nav navbar-nav-user float-right">
          {/* Message Dropdown */}

          {userInfo?.userTypeId.toString() === userTypes?.Consultant ||
          userInfo?.userTypeId.toString() === userTypes?.AdmissionManager ||
          userInfo?.userTypeId.toString() === userTypes?.AdmissionOfficer ||
          userInfo?.userTypeId.toString() === userTypes?.Admin ||
          userInfo?.userTypeId.toString() === userTypes?.SystemAdmin ||
          userInfo?.userTypeId.toString() === userTypes?.Student ? (
            <UncontrolledDropdown
              tag="li"
              className="dropdown-notification nav-item"
            >
              <DropdownToggle tag="a" className="nav-link nav-link-label">
                <i class="fa-regular fa-message fa-20px"></i>

                <Badge pill color="primary" className="badge-up">
                  {" "}
                  {messageCount}{" "}
                </Badge>
              </DropdownToggle>
              <DropdownMenu
                tag="ul"
                right
                className="dropdown-menu-media notification-menu-style"
              >
                <li className="dropdown-menu-header">
                  <div className="d-flex justify-content-between">
                    <div className="dropdown-header mt-0">
                      <h6 className=" notification-title text-white">
                        {messageCount} Unread Messages
                      </h6>
                    </div>
                    <div
                      className="dropdown-header mt-0"
                      style={{ cursor: "pointer" }}
                    ></div>
                  </div>
                </li>
                <PerfectScrollbar
                  className="media-list overflow-hidden position-relative"
                  options={{
                    wheelPropagation: false,
                  }}
                >
                  {message?.map((data, i) => (
                    <DropdownItem
                      key={i}
                      // onClick={toggle}
                      // onClick={() => {
                      //   history.push(
                      //     `/applicationDetails/${data?.applicationId}/${data?.studentId}`
                      //   );
                      // }}
                      className={
                        data?.isSeen
                          ? "d-flex justify-content-between notification-active-style"
                          : "d-flex justify-content-between notification-inactive-style"
                      }
                    >
                      <div
                        style={{ overflowX: "hidden" }}
                        onClick={() => {
                          history.push(
                            `/applicationDetails/${data?.applicationId}/${data?.studentId}`
                          );
                        }}
                      >
                        <div
                          style={{ color: "#1e98b0" }}
                          heading
                          className=" media-heading"
                          tag="h6"
                        >
                          {data?.senderName}
                        </div>
                        <p className="notification-text text-wrap">
                          {data?.messageBody}
                        </p>
                        <small></small>
                      </div>
                    </DropdownItem>
                  ))}
                </PerfectScrollbar>
                <li className="dropdown-menu-footer">
                  <div
                    className="p-3 notification-footer-style text-center dropdown-bottom-header"
                    onClick={() => allMessage()}
                  >
                    <span className="align-middle">Read All</span>
                  </div>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : null}

          {/* message dropdown end */}

          <UncontrolledDropdown
            tag="li"
            className="dropdown-notification nav-item"
          >
            <DropdownToggle tag="a" className="nav-link nav-link-label">
              <i className="far fa-bell fa-20px"></i>
              <Badge pill color="primary" className="badge-up">
                {notificationCount}
              </Badge>
            </DropdownToggle>
            <DropdownMenu
              tag="ul"
              right
              className="dropdown-menu-media notification-menu-style"
            >
              <li className="dropdown-menu-header">
                <div className="d-flex justify-content-between">
                  <div className="dropdown-header mt-0">
                    <h6 className=" notification-title text-white">
                      {notificationCount} Unread Notifications
                    </h6>
                  </div>
                  <div
                    className="dropdown-header mt-0"
                    style={{ cursor: "pointer" }}
                  ></div>
                </div>
              </li>
              <PerfectScrollbar
                className="media-list overflow-hidden position-relative"
                options={{
                  wheelPropagation: false,
                }}
              >
                {notificationData?.map((data, i) => (
                  <DropdownItem
                    key={i}
                    // onClick={toggle}
                    className={
                      data?.isSeen
                        ? "d-flex justify-content-between notification-active-style"
                        : "d-flex justify-content-between notification-inactive-style"
                    }
                  >
                    <div
                      onClick={() => {
                        redirect(data);
                      }}
                      style={{ overflowX: "hidden" }}
                    >
                      <div
                        style={{ color: "#1e98b0" }}
                        heading
                        className="media-heading"
                        tag="h6"
                      >
                        {data?.title}
                      </div>
                      <p className="notification-text text-wrap">
                        {data?.description}
                      </p>
                      <small>{/* {dateFormate(data?.createdOn)} */}</small>
                    </div>
                  </DropdownItem>
                ))}
              </PerfectScrollbar>
              <DropdownItem
                className="dropdown-menu-footer"
                // onClick={toggle}
                style={{
                  padding: "0",
                  display: "block",
                  width: "100%",
                }}
              >
                <div
                  className="p-3 notification-footer-style text-center dropdown-bottom-header w-100 align-middle"
                  onClick={() => allNotifications()}
                >
                  Read All
                </div>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle tag="a" className="nav-link dropdown-user-link">
              <div className="user-nav d-sm-flex d-none">
                <span className="user-name text-bold-600">
                  {userInfo?.displayName}
                </span>
                <span className="user-status">{userInfo?.roleName}</span>
              </div>
              <span data-tour="user">
                <img
                  src={
                    userInfo?.displayImage == null
                      ? user
                      : rootUrl + userInfo?.displayImage
                  }
                  className="round"
                  height="40"
                  width="40"
                  alt="avatar"
                />
              </span>
            </DropdownToggle>
            <UserDropdown switch={canSwitch} />
          </UncontrolledDropdown>
        </ul>
      </>
    </>
  );
};

export default NavbarUser;
