import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
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
import post from "../../../../helpers/post";
import remove from "../../../../helpers/remove";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AdmissionManagerSubjects = () => {
  const { managerId, universityId } = useParams();
  const history = useHistory();
  const [subject, setSubject] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    get(
      `AdmissionManagerSubject/AssignedSubjects/${universityId}/${managerId}`
    ).then((res) => {
      setSubject(res);
    });
  }, [success]);

  const backToDashboard = () => {
    history.push(`/universityAdmissionManagers/${universityId}`);
  };

  const assignSubject = (data) => {
    setProgress(true);
    post(`AdmissionManagerSubject/Create`, {
      admissionManagerId: managerId,
      subjectId: data?.subjectId,
    }).then((res) => {
      setProgress(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const removeSubject = (data) => {
    setProgress(true);
    remove(
      `AdmissionManagerSubject/Remove/${data?.subjectId}/${managerId}`
    ).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "success",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  return (
    <div>
      <BreadCrumb
        title="Admission Manager Course"
        backTo=" Assigned Admission Managers"
        path={`/universityAdmissionManagers/${universityId}`}
      />

      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Course</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subject?.map((sub, i) => (
                  <tr key={sub?.id} style={{ textAlign: "center" }}>
                    <th scope="row">{1 + i}</th>

                    <td>{sub?.subjectName}</td>

                    <td>
                      {sub?.isAssigned ? (
                        <>
                          {permissions?.includes(
                            permissionList.AdmissionManager_Assign_Subject
                          ) ? (
                            <Button
                              color="danger"
                              onClick={() => removeSubject(sub)}
                            >
                              {progress ? <ButtonLoader /> : " Remove"}
                            </Button>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {permissions?.includes(
                            permissionList.Delete_AdmissionManager_Subject
                          ) ? (
                            <Button
                              color="primary"
                              onClick={() => assignSubject(sub)}
                            >
                              {progress ? <ButtonLoader /> : "Assign"}
                            </Button>
                          ) : null}
                        </>
                      )}
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

export default AdmissionManagerSubjects;
