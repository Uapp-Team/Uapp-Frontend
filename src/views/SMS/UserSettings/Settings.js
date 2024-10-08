import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import Uapp_fav from "../../../assets/img/Uapp_fav.png";
import { rootUrl } from "../../../constants/constants";
import put from "../../../helpers/put";
import SaveButton from "../../../components/buttons/SaveButton";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { userTypes } from "../../../constants/userTypeConstant";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { addToast } = useToasts();
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const current_user = JSON.parse(localStorage.getItem("current_user"));
  const userTypeId = localStorage.getItem("userType");

  useEffect(() => {}, []);

  const changePassword = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (oldPassword === newPassword) {
      setError("You are trying to use old password");
    } else if (newPassword !== confirmPassword) {
      setError("Password doesn't match");
    } else {
      setloading(true);
      put(`Manage/ChangePassword`, subData).then((res) => {
        setloading(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const changeEmail = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    setloading(true);
    put(`Manage/ChangeEmail`, subData).then((res) => {
      setloading(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: "true",
        });
        setEmail("");
        window.localStorage.clear();
        window.location.reload();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <div className="setting">
      <div className="row">
        {/* tab options */}
        <div className="col-md-3">
          <div className="setting-menu">
            <div
              className={
                activeTab === 1
                  ? "nav-link bg-white p-4 pointer px-md-5"
                  : "nav-link text-white p-4 pointer px-md-5"
              }
              onClick={() => setActiveTab(1)}
            >
              <i class="fa fa-user"></i>
              <span className="setting-menu-text ml-3">Account</span>
            </div>
            <div
              className={
                activeTab === 2
                  ? "nav-link bg-white p-4 pointer px-md-5"
                  : "nav-link text-white p-4 pointer px-md-5"
              }
              onClick={() => setActiveTab(2)}
            >
              <i class="fa fa-envelope"></i>
              <span className="setting-menu-text ml-3">Email</span>
            </div>
            <div
              className={
                activeTab === 3
                  ? "nav-link bg-white p-4 pointer px-md-5"
                  : "nav-link text-white p-4 pointer px-md-5"
              }
              onClick={() => setActiveTab(3)}
            >
              <i class="fa fa-key"></i>
              <span className="setting-menu-text ml-3">Password</span>
            </div>
          </div>
        </div>

        {/* details options */}
        <div className="col-md-9 p-5">
          {activeTab === 1 && (
            <div className="setting-account my-5">
              <div className="setting-user">
                <div className="d-flex justify-content-start">
                  <img
                    src={
                      current_user?.displayImage === null
                        ? Uapp_fav
                        : rootUrl + current_user?.displayImage
                    }
                    className="setting-user-pic"
                    alt=""
                  />

                  <div className="px-1">
                    <span className="setting-user-name">
                      <b>{current_user?.displayName}</b>
                    </span>
                    <br />
                    <span className="setting-user-type">
                      {current_user?.displayUserType}
                    </span>
                  </div>
                </div>

                <div>
                  {/* {userTypeId === userTypes.ProviderAdmin.toString() ? (
                    <Link to={`/updateProvider/${current_user?.referenceId}`}>
                      <i class="far fa-edit text-primary"></i>
                    </Link>
                  ) : null} */}
                  <Link
                    to={
                      userTypeId === userTypes.ProviderAdmin.toString()
                        ? `/updateProvider/${current_user?.referenceId}`
                        : userTypeId === userTypes.AdmissionManager.toString()
                        ? `/admissionManagerGeneralInformation/${current_user?.referenceId}`
                        : userTypeId === userTypes.AdmissionOfficer.toString()
                        ? `/admissionOfficerGeneralInfo/${current_user?.referenceId}`
                        : userTypeId === userTypes.Consultant.toString()
                        ? `/consultantInformation/${current_user?.referenceId}`
                        : userTypeId === userTypes.Student.toString()
                        ? `/addStudentInformation/${current_user?.referenceId}/1`
                        : `/staffGeneralInformation/${current_user?.referenceId}`
                    }
                  >
                    <i class="far fa-edit text-primary"></i>
                  </Link>
                </div>
              </div>

              <div className="mt-4 mb-3">
                <h3>
                  <b>Account Information</b>{" "}
                </h3>
                <p>
                  Email: {current_user?.displayEmail}
                  <br />
                  UAPP Id: {current_user?.userViewId}
                </p>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <form onSubmit={changeEmail}>
              <div className="mt-3">
                <h3 class="mb-3">Change Email </h3>

                <span className="fs-16px">
                  By changing email, you will change the primary email with the
                  new email address.
                </span>
                <br />
                <span className="fs-16px">
                  All notification and will be send to your new email.
                </span>
                <br />
                <p className="fs-16px my-4">
                  <b> This new email will require log in to UAPP .</b>
                </p>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group mb-1">
                      <label>
                        <b>New Email ID</b>
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        value={email}
                        name="newEmail"
                        id="newEmail"
                        required
                      />
                    </div>
                    <span className="text-danger">{error}</span>

                    <div className="mt-3">
                      <SaveButton
                        text="Update"
                        progress={loading}
                        buttonStatus={loading}
                      />
                    </div>
                  </div>
                </div>
                <p className="fs-16px mt-4 text-justify">
                  <span className="text-danger">Note:</span> After the email
                  change is successful you will be logged out and you will need
                  to login again using the new email
                </p>
              </div>
            </form>
          )}

          {activeTab === 3 && (
            <form onSubmit={changePassword}>
              <div className="mt-3">
                <h3 class="mb-4">Password Change</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group mb-1">
                      <label>
                        <b>Old Password</b>
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                          setError("");
                        }}
                        value={oldPassword}
                        name="oldPassword"
                        id="oldPassword"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group mb-1">
                      <label>
                        <b>New Password</b>
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setError("");
                        }}
                        value={newPassword}
                        name="newPassword"
                        id="newPassword"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group mb-1">
                      <label>
                        <b>Confirm New password</b>
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setError("");
                        }}
                        value={confirmPassword}
                      />
                    </div>
                    <span className="text-danger">{error}</span>

                    <div className="mt-3">
                      <SaveButton
                        text="Update"
                        progress={loading}
                        buttonStatus={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
