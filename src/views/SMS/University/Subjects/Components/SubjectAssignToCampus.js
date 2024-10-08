import React, { useState } from "react";
import {
  Button,
  FormGroup,
  Col,
  Row,
  ButtonGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ButtonLoader from "../../../Components/ButtonLoader";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";

const SubjectAssignToCampus = ({
  subjId,
  campus,
  setCampusList,
  permissions,
}) => {
  const [homeAccept, setHomeAccept] = useState(false);
  const [ukAccept, setUkAccept] = useState(false);
  const [intAccept, setIntAccept] = useState(false);
  const [delCamId, setDelCamId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress2, setProgress2] = useState(false);

  const { addToast } = useToasts();

  const handleAssignSubjectToCampus = (e, campu) => {
    e.preventDefault();

    if (homeAccept !== true && ukAccept !== true && intAccept !== true) {
      addToast("Please Select Application Type", { appearance: "warning" });
    } else {
      const subData = {
        campusId: campu?.campusId,
        subjectId: subjId,
        isAcceptHome: homeAccept,
        isAcceptEU_UK: ukAccept,
        isAcceptInternational: intAccept,
      };
      setProgress(true);
      post("SubjectCampus/Assign", subData).then((res) => {
        setProgress(false);
        if (res?.data?.isSuccess === true && res?.status === 200) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          get(`SubjectCampus/index?subjectid=${subjId}`).then((res) => {
            setCampusList([]);
            setCampusList(res);
          });
          setSuccess(!success);
          setHomeAccept(false);
          setUkAccept(false);
          setIntAccept(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "danger",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const toggleDanger = (camp) => {
    setDelCamId(camp?.campusId);
    setDeleteModal(true);
  };

  const handleDeletePermission = (campusSubjectId) => {
    setProgress2(true);
    get(
      `SubjectCampus/Unassign?subjectid=${subjId}&campusid=${campusSubjectId}`
    ).then((action) => {
      console.log("del data cccc", action);
      if (action === true) {
        setProgress2(false);
        setHomeAccept(false);
        setUkAccept(false);
        setIntAccept(false);

        setDeleteModal(false);
        addToast("Course unassigned successfully", {
          appearance: "error",
          autoDismiss: true,
        });
        get(`SubjectCampus/index?subjectid=${subjId}`).then((res) => {
          setCampusList([]);
          setCampusList(res);
        });
      } else {
        addToast("Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
        setProgress2(false);
      }
    });
  };
  return (
    <>
      <tr key={campus?.id} style={{ textAlign: "center" }}>
        <td>
          <p className="mt-2">{campus?.name}</p>
        </td>
        <td>
          <Row>
            {campus?.isAcceptHomeAvailable ? (
              <Col xs="3" sm="12" md="3" className="text-center mt-2">
                <FormGroup check inline>
                  <span className="mr-2">Home </span>
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    name="isAcceptHome"
                    onChange={(e) => {
                      setHomeAccept(false);
                      setHomeAccept(!homeAccept);
                    }}
                    defaultChecked={campus?.isAcceptHome}
                  />
                </FormGroup>
              </Col>
            ) : null}

            {campus?.isAcceptEU_UKAvailable ? (
              <Col xs="3" sm="12" md="3" className="text-center mt-2">
                <FormGroup check inline>
                  <span className="mr-2">EU/UK </span>
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    name="isAcceptEU_UK"
                    onChange={(e) => {
                      setUkAccept(false);
                      setUkAccept(!ukAccept);
                    }}
                    defaultChecked={campus?.isAcceptEU_UK}
                  />
                </FormGroup>
              </Col>
            ) : null}
            {campus?.isAcceptInternationalAvailable ? (
              <Col xs="3" sm="12" md="3" className="text-center mt-2">
                <FormGroup check inline>
                  <span className="mr-2">International </span>
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    name="isAcceptInternational"
                    onChange={(e) => {
                      setIntAccept(false);
                      setIntAccept(!intAccept);
                    }}
                    defaultChecked={campus?.isAcceptInternational}
                  />
                </FormGroup>
              </Col>
            ) : null}
            <Col xs="3" sm="12" md="3" className="text-center">
              <ButtonGroup>
                {campus?.isAssigned ? (
                  <button
                    className="cancel-button"
                    onClick={() => toggleDanger(campus)}
                  >
                    Unassign
                  </button>
                ) : (
                  <>
                    {permissions?.includes(permissionList.Edit_Subjects) ? (
                      <>
                        {" "}
                        <button
                          className="save-button"
                          onClick={(e) =>
                            handleAssignSubjectToCampus(e, campus)
                          }
                        >
                          Assign
                        </button>
                        {progress ? (
                          <span>
                            <ButtonLoader />
                          </span>
                        ) : null}
                      </>
                    ) : null}
                  </>
                )}
              </ButtonGroup>
            </Col>
          </Row>
        </td>
      </tr>

      {/* subject unassign modal */}
      <Modal
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        className="uapp-modal"
      >
        <ModalBody>
          <p>
            Are You Sure to Unassign this ? Once Unassigned it can't be Undone!
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => handleDeletePermission(delCamId)}
            color="danger"
          >
            {progress2 ? <ButtonLoader /> : "YES"}
          </Button>
          <Button onClick={() => setDeleteModal(false)}>NO</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SubjectAssignToCampus;
