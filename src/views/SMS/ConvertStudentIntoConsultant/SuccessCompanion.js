import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";
import { rootUrl } from "../../../constants/constants";
import get from "../../../helpers/get";

const SuccessCompanion = () => {
  const history = useHistory();

  const convertAccount = (e) => {
    get(`AccountSwitch/SwitchToCompanion`)
      .then((response) => {
        if (response?.isSuccess === true) {
          localStorage.removeItem("token");
          localStorage.removeItem("permissions");

          localStorage.setItem("token", "Bearer " + response?.authToken);
          localStorage.setItem(
            "permissions",
            JSON.stringify(response?.permissions)
          );
          const AuthStr = "Bearer " + response?.authToken;
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
      })
      .catch();
  };

  return (
    <div className="custom-card-border p-4">
      <p>
        Your application for becoming a Companion has been submitted
        successfully. Our admin team will review the application and update you
        shortly. Please complete your profile by providing the required
        information (i.e: adding the bank account details and sign the companion
        T&C).
      </p>

      <CancelButton text="Back to Dashboard" cancel={() => history.push("/")} />

      <SaveButton
        text="Switch to Companion"
        action={(e) => convertAccount(e)}
      />
    </div>
  );
};

export default SuccessCompanion;
