import React from "react";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";
import axios from "axios";
import { rootUrl } from "../../../constants/constants";
import { useHistory } from "react-router-dom";

const Success = () => {
  const history = useHistory();

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

  return (
    <div className="custom-card-border p-4">
      <p>
        Your application for becoming a Consultant has been submitted
        successfully. Our admin team will review the application and update you
        shortly. Please complete your profile by providing the required
        information (i.e: adding the bank account details and sign the
        consultant T&C).
      </p>

      <CancelButton text="Back to Dashboard" cancel={() => history.push("/")} />

      <SaveButton
        text="Switch to consultant"
        action={(e) => convertAccount(e)}
      />
    </div>
  );
};

export default Success;
