import React, { useEffect, useState } from "react";
import { Input, Form, FormGroup, Table } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { userTypes } from "../../../../../constants/userTypeConstant";

const AssignOfficerUniversityModal = ({
  officerId,
  setModalOpen,
  success,
  setSuccess,
}) => {
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const userType = localStorage.getItem("userType");
  const [admissionManager, setAdmissionManager] = useState([]);
  const [managerLabel, setManagerLabel] = useState("Select Admission Manager");
  const [managerValue, setManagerValue] = useState(0);
  const [assign, setAssign] = useState({});

  useEffect(() => {
    get(`AdmissionManagerDD/AdmissionOfficer/${officerId}`).then((res) => {
      setAdmissionManager(res);
    });
  }, [officerId]);
  console.log("admissionManager", admissionManager);
  useEffect(() => {
    get(
      `AdmissionOfficerUniversity/Unassigned/${officerId}/${managerValue}`
    ).then((res) => {
      console.log("assign", res);
      setAssign(res);
    });
  }, [managerValue, officerId]);

  const admissionmanagerOptions = admissionManager.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const selectAdmissionManager = (label, value) => {
    setManagerLabel(label);
    setManagerValue(value);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonStatus(true);
    setProgress(true);
    post(`AdmissionOfficerUniversity/AssignUniversities`, assign).then(
      (res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setModalOpen(false);
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    );
  };

  const handleisAcceptHome = (e, i) => {
    const values = [...assign];
    values[i].isAcceptHome = e.target.checked;
    setAssign(values);
  };
  const handleisAcceptEu = (e, i) => {
    const values = [...assign];
    values[i].isAcceptEu = e.target.checked;
    setAssign(values);
  };
  const isAcceptInternational = (e, i) => {
    const values = [...assign];
    values[i].isAcceptInternational = e.target.checked;
    setAssign(values);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {userType === userTypes?.AdmissionManager.toString() ? null : (
          <>
            <FormGroup>
              <span>Admission Manager</span>

              <Select
                options={admissionmanagerOptions}
                value={{
                  label: managerLabel,
                  value: managerValue,
                }}
                onChange={(opt) => selectAdmissionManager(opt.label, opt.value)}
              />
            </FormGroup>
          </>
        )}

        <Table>
          <thead className="tablehead">
            <td className="border-0">
              <b>University</b>
            </td>
            <td className="border-0 text-center">
              <b>Home</b>
            </td>
            <td className="border-0 text-center">
              <b>EU</b>
            </td>
            <td className="border-0 text-center">
              <b>International</b>
            </td>
          </thead>
          <tbody style={{ borderBottom: "1px solid #dee2e6" }}>
            {assign.length > 0 &&
              assign?.map((item, i) => (
                <tr key={item?.universityId}>
                  <td>{item?.universityName}</td>
                  <td className="text-center">
                    <input
                      // className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        handleisAcceptHome(e, i);
                      }}
                      value={item?.isAcceptHome}
                      defaultChecked={
                        item?.isAcceptHome === true ? true : false
                      }
                    />
                  </td>
                  <td className="text-center">
                    <input
                      // className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        handleisAcceptEu(e, i);
                      }}
                      value={item?.isAcceptEu}
                      defaultChecked={item?.isAcceptEu === true ? true : false}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      // className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        isAcceptInternational(e, i);
                      }}
                      value={item?.isAcceptInternational}
                      defaultChecked={
                        item?.isAcceptInternational === true ? true : false
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <FormGroup>
          <CancelButton cancel={closeModal} />
          <SaveButton
            text="Submit"
            progress={progress}
            buttonStatus={buttonStatus}
          />
        </FormGroup>
      </Form>
    </>
  );
};

export default AssignOfficerUniversityModal;
