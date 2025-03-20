import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Table,
} from "reactstrap";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import get from "../../../../helpers/get";
import ButtonForFunction from "../../Components/ButtonForFunction";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const UniversityWiseAdmissionManager = () => {
  const { universityId } = useParams();
  const history = useHistory();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [adManagerData, setAdManagerData] = useState([]);

  const backToDashboard = () => {
    history.push("/universityList");
  };

  const goToSubjectsList = (data) => {
    history.push(
      `/admissionManagerSubjects/${data?.admissionManagerId}/${universityId}`
    );
  };

  const gotoProfile = (data) => {
    // history.push(`/providerAdmissionManager/${data?.admissionManagerId}/${data?.admissionManager?.providerId}`);
  };

  useEffect(() => {
    get(`AdmissionManager/GetByUniversity/${universityId}`).then((res) => {
      setAdManagerData(res);
    });
  }, []);

  return (
    <div>
      <BreadCrumb
        title="Assigned Admission Managers"
        backTo="University"
        path="/universityList"
      />

      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  {/* <th>SL/NO</th> */}
                  <th>Name</th>

                  <th>Requirement Type</th>

                  {permissions?.includes(permissionList.View_Subject_List) ? (
                    <th>Course</th>
                  ) : null}
                  {/* {
                        permissions?.includes(permissionList.View_Admission_manager_info) ? */}
                  <th>Action</th>
                  {/* :
                        null
                       } */}
                </tr>
              </thead>
              <tbody>
                {adManagerData?.map((ad, i) => (
                  <tr key={ad?.id} style={{ textAlign: "center" }}>
                    {/* <th scope="row">{1 + i}</th> */}

                    <td>
                      {ad?.admissionManager?.firstName}{" "}
                      {ad?.admissionManager?.lastName}
                    </td>

                    <td>
                      {ad?.isAcceptEU_UK ? "EU/EEU, " : null}
                      {ad?.isAcceptHome ? "Home/UK, " : null}
                      {ad?.isAcceptInternational ? "International" : null}
                    </td>
                    {permissions?.includes(permissionList.View_Subject_List) ? (
                      <td>
                        <span
                          className="badge badge-secondary"
                          style={{ cursor: "pointer" }}
                          onClick={() => goToSubjectsList(ad)}
                        >
                          View
                        </span>
                      </td>
                    ) : null}

                    <td style={{ width: "8%" }} className="text-center">
                      <ButtonGroup variant="text">
                        {permissions?.includes(
                          permissionList.View_AdmissionManager_Details
                        ) ? (
                          <ButtonForFunction
                            func={() => gotoProfile(ad)}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          />
                        ) : null}
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UniversityWiseAdmissionManager;
