import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ProfileImportantLinks = ({ id }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <>
      {permissions?.includes(permissionList.View_Application_Transactions) ||
      permissions?.includes(permissionList.View_Account_Transactions) ||
      permissions?.includes(permissionList.View_Widthdraw_Request) ? (
        <Card className="p-4">
          <h5 className="mb-4">Navigate to Accounts</h5>

          <div>
            {permissions?.includes(
              permissionList.View_Application_Transactions
            ) ? (
              <p className="pb-3">
                <Link
                  to={`/applicationTransactionFromConsultant/${id}`}
                  className="key-button"
                >
                  Application Transaction
                </Link>
              </p>
            ) : null}

            {permissions?.includes(permissionList.View_Account_Transactions) ? (
              <p className="pb-3">
                <Link
                  to={`/withdrawTransactionByConsultant/${id}`}
                  className="key-button"
                >
                  Withdraw transaction
                </Link>
              </p>
            ) : null}

            {permissions?.includes(permissionList.View_Widthdraw_Request) ? (
              <p className="pb-3">
                <Link
                  to={`/accountTransactionByConsultant/${id}`}
                  className="key-button"
                >
                  Account Transaction{" "}
                </Link>
              </p>
            ) : null}

            <p className="pb-3">
              <Link
                to={`/consultantTermsInformation/${id}`}
                className="key-button"
              >
                T&C
              </Link>
            </p>
          </div>
          {/* <div>
          <p className="key-button"> Application Transaction </p>
          <p className="key-button"> Withdraw transaction </p>
          <p className="key-button"> Account Transaction </p>
        </div> */}
        </Card>
      ) : null}
    </>
  );
};

export default ProfileImportantLinks;
