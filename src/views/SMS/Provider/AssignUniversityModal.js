import React, { useEffect, useState } from "react";
import { Input, Form, FormGroup, Table } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";

const AssignUniversityModal = ({
  managerId,
  setModalOpen,
  success,
  setSuccess,
}) => {
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const [assign, setAssign] = useState({});

  useEffect(() => {
    get(`AdmissionManagerUniversity/Unassigned/${managerId}`).then((res) => {
      setAssign(res);
    });
  }, [managerId]);

  console.log("assign", assign);

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonStatus(true);
    setProgress(true);
    post(`AdmissionManagerUniversity/AssignUniversities`, assign).then(
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
  const handleisAcceptInternational = (e, i) => {
    const values = [...assign];
    values[i].isAcceptInternational = e.target.checked;
    setAssign(values);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
          <tbody className="border-buttom">
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
                        handleisAcceptInternational(e, i);
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

export default AssignUniversityModal;
