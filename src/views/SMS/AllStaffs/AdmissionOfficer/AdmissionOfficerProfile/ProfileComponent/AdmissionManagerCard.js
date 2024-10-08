import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import get from "../../../../../../helpers/get";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import { rootUrl } from "../../../../../../constants/constants";
// import profileImage from "../../../../../assets/img/profile/user-uploads/user-07.jpg";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const AdmissionManagerCard = ({ officerId }) => {
  const [success, setSuccess] = useState(false);
  const userTypeId = localStorage.getItem("userType");
  const history = useHistory();
  const userId = localStorage.getItem("referenceId");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [admissionManagerList, setAdmissionManagerList] = useState([]);
  const [officerObj, setOfficerObj] = useState({});

  useEffect(() => {
    if (officerId !== undefined) {
      get(`AdmissionOfficerProfile/ManagerOfficer/${officerId}`).then((res) => {
        console.log("mnagerlist", res);
        // setOfficerObj(res);
        setAdmissionManagerList(res);

        //   setLoading(false);
      });
    } else {
      get(`AdmissionOfficerProfile/ManagerOfficer/${userId}`).then((res) => {
        console.log("mnagerlist", res);
        // setOfficerObj(res);
        setAdmissionManagerList(res);

        //   setLoading(false);
      });
    }
  }, [officerId, success]);

  const handlRedirectToAdmissionManagerDetails = (manager) => {
    history.push({
      pathname: `/admissionManagerProfile/${manager?.id}`,
      // pathname: `/admissionManagerProfile/${manager?.id}/${officerObj?.providerId}`,
      officerId: officerId,
    });
  };

  return (
    <div>
      {admissionManagerList.length < 1 ? null : (
        <Card className="container">
          <div className="hedding-titel d-flex justify-content-between ms-1 pt-3">
            <div>
              <h5>
                {" "}
                <b>Admission Managers</b>{" "}
              </h5>

              <div className="bg-h"></div>
            </div>

            {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}
          </div>
          <div style={{ height: "230px", overflowY: "scroll" }}>
            {admissionManagerList?.map((manager, i) => (
              <div key={i} className="rounded mt-3">
                <div className="d-flex justify-content-between mt-4">
                  <div>
                    {permissions?.includes(
                      permissionList.View_AdmissionManager_Details
                    ) ? (
                      <div className="cursor-pointer hyperlink-hover">
                        <span
                          onClick={() =>
                            handlRedirectToAdmissionManagerDetails(manager)
                          }
                        >
                          {manager?.nameTittleName} {manager?.firstName}{" "}
                          {manager?.lastName}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span>
                          {manager?.nameTittleName} {manager?.firstName}{" "}
                          {manager?.lastName}
                        </span>
                      </div>
                    )}

                    {userTypeId == userTypes?.SystemAdmin ||
                    userTypeId == userTypes?.Admin ||
                    userTypeId == userTypes?.ProviderAdmin ||
                    userTypeId == userTypes?.AdmissionManager ||
                    userTypeId == userTypes?.AdmissionOfficer ? (
                      <span>{manager?.email}</span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdmissionManagerCard;
