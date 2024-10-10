import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import ConsultantTypeUpdateModal from "./Component/ConsultantTypeUpdateModal";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import remove from "../../../../helpers/remove";
import ButtonLoader from "../../Components/ButtonLoader";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const AddConsultantType = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(false);
  const [consultants, setConsultants] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [consultantType, setConsultantType] = useState("");
  const [consultantTypeError, setConsultantTypeError] = useState("");
  const [postId, setPostId] = useState(0);
  const [consName, setConsName] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  // setDelUniCountryName(name);
  const [consultantName, setConsultantName] = useState("");
  const [consultantNameId, setConsultantNameId] = useState("0");

  const { addToast } = useToasts();

  useEffect(() => {
    get("ConsultantType/Index").then((res) => {
      console.log(res);
      setConsultants(res);
      setLoading(false);
    });
  }, [success]);

  // on Close Modal
  const closeModal = () => {
    setConsultantType("");
    setConsName("");
    setConsultantTypeError("");
    setModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    // setDelUniCountryName("");
    // setDelUniCountryId(0);
  };

  const handleUpdate = (type) => {
    setModalOpen(true);
    setConsultantType(type.name);
    get(`ConsultantType/Get/${type.id}`).then((res) => {
      console.log(res, "update4");
      setPostId(res.id);
      setConsName(res.name);
    });
  };

  const handleConsultant = (e) => {
    setConsultantType(e.target.value);
    if (e.target.value === "") {
      setConsultantTypeError("consultant type is required");
    } else {
      setConsultantTypeError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    if (!consultantType) {
      setConsultantTypeError("consultant type is required");
    } else {
      if (postId === 0) {
        setButtonStatus(true);
        post(`ConsultantType/Create`, subdata).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setModalOpen(false);
            setSuccess(!success);
            setButtonStatus(false);
            setConsultantType("");
          } else if (res?.status === 200 && res?.data?.isSuccess === false) {
            setProgress(false);
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        put(`ConsultantType/Update`, subdata).then((action) => {
          setSuccess(!success);
          setModalOpen(false);
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setConsultantType("");
          setConsName("");
          setPostId(0);
          setButtonStatus(false);
        });
      }
    }
  };

  const handleDeleteConsultant = (id) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`ConsultantType/Delete/${id}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      setDeleteModal(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setConsultantName("");
      setConsultantNameId(0);
      setSuccess(!success);
    });
  };
  const toggleDanger = (name, id) => {
    setConsultantName(name);
    setConsultantNameId(id);
    setDeleteModal(true);
  };

  return (
    <div>
      <BreadCrumb title="Consultant Types" backTo="" path="/" />
      {loading ? (
        <div className="text-center"></div>
      ) : (
        <div>
          <Card>
            <CardHeader>
              {permissions?.includes(permissionList?.Add_Consultant_type) ? (
                <ButtonForFunction
                  className={"btn btn-uapp-add"}
                  func={() => setModalOpen(true)}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Consultant Type"}
                  permission={6}
                />
              ) : null}

              <div>
                <b>
                  Total{" "}
                  <span className="badge badge-primary">
                    {consultants?.length}
                  </span>{" "}
                  Consultant Type Found
                </b>
              </div>
            </CardHeader>
            <CardBody>
              {permissions?.includes(
                permissionList?.View_Consultant_type_List
              ) && (
                <>
                  <ConsultantTypeUpdateModal
                    modalOpen={modalOpen}
                    closeModal={closeModal}
                    postId={postId}
                    handleSubmit={handleSubmit}
                    consName={consName}
                    consultantType={consultantType}
                    buttonStatus={buttonStatus}
                    consultantTypeError={consultantTypeError}
                    handleConsultant={handleConsultant}
                  ></ConsultantTypeUpdateModal>
                  <div className="table-responsive">
                    <Table className="table-sm table-bordered">
                      <thead className="tablehead">
                        <tr style={{ textAlign: "center" }}>
                          {/* <th>SL/NO</th> */}
                          <th>Consultant Type Name</th>
                          <th>Count</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consultants?.map((consultant, i) => (
                          <tr
                            key={consultant?.id}
                            style={{ textAlign: "center" }}
                          >
                            {/* <th scope="row">{i + 1}</th> */}
                            <td>{consultant?.name}</td>
                            <td className="text-center">
                              <span className="badge badge-pill badge-primary">
                                {" "}
                                {consultant?.consultantCount}{" "}
                              </span>
                            </td>
                            <td>
                              {consultant?.id > 4 ? (
                                <ButtonGroup>
                                  {permissions?.includes(
                                    permissionList.Edit_Consultant_type
                                  ) ? (
                                    <ButtonForFunction
                                      func={() => handleUpdate(consultant)}
                                      className={"mx-1 btn-sm"}
                                      color={"warning"}
                                      icon={<i className="fas fa-edit"></i>}
                                      permission={6}
                                    />
                                  ) : null}
                                  {permissions?.includes(
                                    permissionList?.Delete_Consultant_type
                                  ) ? (
                                    <ButtonForFunction
                                      className={"mx-1 btn-sm"}
                                      func={() =>
                                        toggleDanger(
                                          consultant.name,
                                          consultant.id
                                        )
                                      }
                                      color={"danger"}
                                      icon={
                                        <i className="fas fa-trash-alt"></i>
                                      }
                                      permission={6}
                                    />
                                  ) : null}
                                </ButtonGroup>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      <ConfirmModal
        text="Do You Want To Delete This Consultant Types ? Once Deleted it can't be Undone "
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        cancel={closeDeleteModal}
        buttonStatus={buttonStatus}
        progress={progress}
        confirm={() => handleDeleteConsultant(consultantNameId)}
      />
    </div>
  );
};

export default AddConsultantType;
