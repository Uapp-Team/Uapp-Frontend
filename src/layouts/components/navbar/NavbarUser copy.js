import React, { useEffect } from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Badge,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import * as Icon from "react-feather";
import { history } from "../../../history";
import { rootUrl } from "../../../constants/constants";
import { userTypes } from "../../../constants/userTypeConstant";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Link } from "react-router-dom";
import get from "../../../helpers/get";
import user from "../../../assets/img/Uapp_fav.png";
import { logoutStorageHandler } from "../../../helpers/logoutStorageHandler";

// const handleNavigation = (e, path) => {
//   e.preventDefault();
//   history.push(path);
// };

const userInfo = JSON.parse(localStorage.getItem("current_user"));
console.log(userInfo, "userinfo plz plz");
const AuthStr = localStorage.getItem("token");

// const student = JSON.parse(sessionStorage.getItem("student"));
// console.log("student", student);

// const redirectToProfile = () => {

//   if ( userInfo?.userTypeId == userTypes?.AccountManager ||
//     userInfo?.userTypeId == userTypes?.Editor ||
//     userInfo?.userTypeId == userTypes?.AccountOfficer ||
//     userInfo?.userTypeId == userTypes?.ComplianceManager ||
//     userInfo?.userTypeId == userTypes?.FinanceManager) {
//     history.push(`/staffProfile/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.AdmissionManager) {
//     history.push(`/admissionManagerProfile/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.AdmissionOfficer) {
//     history.push(`/admissionOfficerDetails/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.ProviderAdmin) {
//     history.push(`/providerAdminProfile/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.BranchManager) {
//     history.push(`/branchManagerProfile/${userInfo?.referenceId}`);//TODO
//   }
//   else if (userInfo?.userTypeId == userTypes?.Consultant) {
//     history.push(`/consultantProfile/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.Student) {
//     history.push(`/studentProfile/${userInfo?.referenceId}`);//TODO
//   }
//   else if (userInfo?.userTypeId == userTypes?.Provider) {
//     history.push(`/providerDetails/${userInfo?.referenceId}`);//TODO
//   }
//   else {
//     history.push('/');
//   }

// }

const handleLogOut = (e) => {
  e.preventDefault();
  history.push("/");
  logoutStorageHandler();
  // window.localStorage.clear();
  // window.location.reload();
  //const AuthStr = localStorage.getItem("token");
  //axios
  //  .get(`${rootUrl}Account/LogOut`, {
  //    method: "GET",
  //    headers: {
  //      authorization: AuthStr,
  //    },
  //  })
  //  .then((res) => {
  //    // localStorage.removeItem('token');
  //    history.push("/");
  //    window.localStorage.clear();
  //    window.location.reload();
  //  });
};

const convertAccount = (e) => {
  axios
    .get(`${rootUrl}AccountSwitch/SwitchToConsultant`, {
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

const convertToConsultantAccount = (e) => {
  axios
    .get(`${rootUrl}AccountSwitch/SwitchToStudent`, {
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
                convertAccount(e);
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
                convertToConsultantAccount(e);
              }}
            >
              <Icon.Repeat size={14} className="mr-1 align-middle" />
              <span className="align-middle">Switch To Student</span>
            </DropdownItem>
          ) : null}
        </>
      ) : null}

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

class NavbarUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navbarSearch: false,
      langDropdown: false,
      suggestions: [],
      connection: [],
      chat: "",
      notificationCount: 0,
      notificationData: [],
      canSwitch: false,
      message: [],
      messageCount: 0,
    };
  }

  componentDidMount() {
    console.log("navysersdvcsd", userInfo?.userTypeId);
    if (userInfo?.userTypeId === userTypes?.Student) {
      axios
        .get(
          `${rootUrl}Student/CheckIfStudentIsConsultant/${userInfo?.displayEmail}`,
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log("object", res);
          this.setState({ canSwitch: res?.data?.result });
        });
    }

    if (userInfo?.userTypeId?.toString() === userTypes?.Consultant) {
      axios
        .get(
          `${rootUrl}Consultant/CheckIfConsultantIsStudent/${userInfo?.displayEmail}`,
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.setState({ canSwitch: res?.data?.result });
        });
    }

    axios
      .get(`${rootUrl}Notification/UserNotificationCount`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {
        this.setState({ notificationCount: res?.data });
      });

    axios
      .get(`${rootUrl}MessageNotification/Count`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {
        console.log("Navbar massae", res);
        this.setState({ messageCount: res?.data?.result });
      });
    if (
      userInfo?.userTypeId.toString() === userTypes?.Student ||
      userInfo?.userTypeId.toString() === userTypes?.Consultant ||
      userInfo?.userTypeId.toString() === userTypes?.AdmissionManager ||
      userInfo?.userTypeId.toString() === userTypes?.SystemAdmin
    ) {
      axios
        .get(`${rootUrl}Notification/GetInitial`, {
          headers: {
            authorization: AuthStr,
          },
        })
        .then((res) => {
          this.setState({ notificationData: res?.data?.result });
        });
      // axios
      //   .get(`${rootUrl}MessageNotification/GetPreview`, {
      //     headers: {
      //       authorization: AuthStr,
      //     },
      //   })
      //   .then((res) => {
      //     this.setState({ message: res?.data?.result });
      //   });

      get(`MessageNotification/GetPreview`).then((res) => {
        this.setState({ message: res });
      });
    }

    if (
      userInfo?.userTypeId === userTypes?.Student ||
      userInfo?.userTypeId === userTypes?.Consultant ||
      userInfo?.userTypeId === userTypes?.AdmissionManager
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
                this.countMessage();
                this.messageFunction();
              }
            });
          });
        } catch (error) {}
      }
    }

    const newConnection = new HubConnectionBuilder()
      .withUrl(`${rootUrl}testnotificationHub`)
      .withAutomaticReconnect()
      .build();
    console.log("result1", newConnection);
    if (newConnection) {
      newConnection.start().then((result) => {
        console.log("result2", result);
        newConnection.on("testnotificationHub", (message) => {
          if (message) {
            this.countFunction();
            this.initialFunction();
          }
        });
      });
    }
  }

  //  Code testing start

  //  const [ connection, setConnection ] = useState(null);
  //  const [ chat, setChat ] = useState('');
  //  const latestChat = useRef(null);

  //  latestChat.current = chat;

  countFunction = () => {
    axios
      .get(`${rootUrl}Notification/UserNotificationCount`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {
        this.setState({ notificationCount: res?.data });
      });
  };

  initialFunction = () => {};

  messageFunction = () => {};

  countMessage = () => {
    axios
      .get(`${rootUrl}MessageNotification/Count`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {});
  };

  allNotifications = () => {
    history.push(`/allNotifications`);
  };

  allMessage = () => {
    history.push(`/allMessages`);
  };

  notificationByIdFunction = (data) => {
    axios
      .get(`${rootUrl}Notification/ViewNotification/${data}`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {});
  };

  redirect = (data) => {
    this.notificationByIdFunction(data?.id);
    history.push(data?.targetUrl);
  };

  // Code testing end

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown });

  render() {
    return (
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
                  {this?.state?.messageCount}{" "}
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
                        {this?.state?.messageCount} Unread Messages
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
                  {this?.state?.message?.map((data, i) => (
                    <DropdownItem
                      key={i}
                      onClick={this.toggle}
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
                        className="d-flex align-items-start"
                        onClick={() => {
                          history.push(
                            `/applicationDetails/${data?.applicationId}/${data?.studentId}`
                          );
                        }}
                      >
                        <div>
                          <div
                            style={{ color: "#1e98b0" }}
                            heading
                            className=" media-heading"
                            tag="h6"
                          >
                            {data?.senderName}
                          </div>
                          <p className="notification-text">
                            {data?.messageBody}
                          </p>
                        </div>
                        <small></small>
                      </div>
                    </DropdownItem>
                  ))}
                </PerfectScrollbar>
                <li className="dropdown-menu-footer">
                  <div
                    className="p-3 notification-footer-style text-center dropdown-bottom-header"
                    onClick={() => this.allMessage()}
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
              {/*<Icon.Bell size={21} />*/}
              <i className="far fa-bell fa-20px"></i>
              <Badge pill color="primary" className="badge-up">
                {this?.state?.notificationCount}
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
                      {this?.state?.notificationCount} Unread Notifications
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
                {this.state.notificationData?.map((data, i) => (
                  <DropdownItem
                    key={i}
                    onClick={this.toggle}
                    className={
                      data?.isSeen
                        ? "d-flex justify-content-between notification-active-style"
                        : "d-flex justify-content-between notification-inactive-style"
                    }
                  >
                    <div
                      className="d-flex align-items-start"
                      onClick={() => {
                        this.redirect(data);
                      }}
                    >
                      <div>
                        <div
                          style={{ color: "#1e98b0" }}
                          heading
                          className="media-heading"
                          tag="h6"
                        >
                          {data?.title}
                        </div>
                        <p className="notification-text">{data?.description}</p>
                      </div>
                      <small>{/* {this.dateFormate(data?.createdOn)} */}</small>
                    </div>
                  </DropdownItem>
                ))}
              </PerfectScrollbar>
              <DropdownItem
                className="dropdown-menu-footer"
                onClick={this.toggle}
                style={{
                  padding: "0",
                  display: "block",
                  width: "100%",
                }}
              >
                <div
                  className="p-3 notification-footer-style text-center dropdown-bottom-header w-100 align-middle"
                  onClick={() => this.allNotifications()}
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
            <UserDropdown switch={this?.state?.canSwitch} />
          </UncontrolledDropdown>
        </ul>
      </>
    );
  }
}
export default NavbarUser;
