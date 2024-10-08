import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import remove from "../../../../../helpers/remove";
import ButtonLoader from "../../../Components/ButtonLoader";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const AdmissionOfficerWiseSubject = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { managerId, universityId } = useParams();
  const [list, setList] = useState([]);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    get(
      `AdmissionOfficerSubject/AssignedSubjects/${universityId}/${managerId}`
    ).then((res) => {
      setList(res);
    });
  }, [success]);

  const backToDashboard = () => {
    history.push(`/universityAdmissionOfficers/${universityId}`);
  };

  const assignSubject = (data) => {
    setProgress(true);
    post(`AdmissionOfficerSubject/Create`, {
      admissionOfficerId: managerId,
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
      `AdmissionOfficerSubject/Remove/${data?.subjectId}/${managerId}`
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
        title="Admission Officer Course"
        backTo="Assigned Admission officers"
        path={`/universityAdmissionOfficers/${universityId}`}
      />

      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Course</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list?.map((sub, i) => (
                  <tr key={sub?.id} style={{ textAlign: "center" }}>
                    <th scope="row">{1 + i}</th>

                    <td>{sub?.subjectName}</td>

                    <td>
                      {sub?.isAssigned ? (
                        <>
                          {permissions?.includes(
                            permissionList.Assign_AdmissionOfficer_Subject
                          ) ? (
                            <Button
                              color="danger"
                              onClick={() => removeSubject(sub)}
                            >
                              {progress ? <ButtonLoader /> : "Remove"}
                            </Button>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {permissions?.includes(
                            permissionList.Delete_AdmissionOfficer_Subject
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

export default AdmissionOfficerWiseSubject;
