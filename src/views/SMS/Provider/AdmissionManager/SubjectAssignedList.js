import React from "react";
import post from "../../../../helpers/post";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import { Button } from "reactstrap";
import ButtonLoader from "../../Components/ButtonLoader";

const SubjectAssignedList = ({
  managerId,
  i,
  list,
  permissions,
  permissionList,
  checkSlNo,
  checkSubject,
  checkAction,
  progress,
  setProgress,
  success,
  setSuccess,
}) => {
  const { addToast } = useToasts();

  const assignSubject = (data) => {
    setProgress(true);
    post(`AdmissionManagerSubject/Create`, {
      admissionManagerId: managerId,
      subjectId: data?.subjectId,
    }).then((res) => {
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
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
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  return (
    <tr key={i} style={{ textAlign: "center" }}>
      {checkSlNo ? <td>{i + 1}</td> : null}
      {checkSubject ? <td>{list?.subjectName}</td> : null}
      {checkAction ? (
        <td style={{ width: "8%" }} className="text-center">
          {list?.isAssigned ? (
            <>
              {permissions?.includes(
                permissionList.AdmissionManager_Assign_Subject
              ) ? (
                <Button color="danger" onClick={() => removeSubject(list)}>
                  Remove
                </Button>
              ) : null}
            </>
          ) : (
            <>
              {permissions?.includes(
                permissionList.AdmissionManager_Assign_Subject
              ) ? (
                <Button
                  color="primary px-3"
                  onClick={() => assignSubject(list)}
                >
                  Assign
                </Button>
              ) : null}
            </>
          )}
        </td>
      ) : null}
    </tr>
  );
};

export default SubjectAssignedList;
