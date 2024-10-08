import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Table,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  ModalHeader,
  Form,
} from "reactstrap";
import Select from "react-select";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import ButtonForFunction from "../Components/ButtonForFunction";
import ButtonLoader from "../Components/ButtonLoader";
import remove from "../../../helpers/remove";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import put from "../../../helpers/put";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";

const RoleItems = () => {
  const history = useHistory();
  const [role, setRole] = useState([]);
  const [roleLabel, setRoleLabel] = useState("Select Parent Role");
  const [roleValue, setRoleValue] = useState(0);
  const { addToast } = useToasts();
  const [name, setName] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [delData, setDelData] = useState({});
  const [progress, setProgress] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [updateDocument, setUpdateDocument] = useState(undefined);
  const [progress1, setProgress1] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    get(`Role/Index`).then((res) => {
      console.log(res);
      setRole(res);
    });
  }, [success]);

  // useEffect(() => {
  //   get(`RoleDD/Index`).then((res) => {
  //     setRole(res);
  //   });
  // }, []);

  const backToDashboard = () => {
    history.push("/");
  };

  const roleOptions = role?.map((r) => ({
    label: r?.name,
    value: r?.id,
  }));

  const SelectRole = (label, value) => {
    setRoleError(false);
    console.log(value);
    setRoleLabel(label);
    setRoleValue(value);
  };
  const handleRoleName = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setNameError("Role Name is Required");
    } else {
      setNameError("");
    }
  };

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (roleValue === 0) {
      isFormValid = false;
      setRoleError(true);
    }
    if (!name) {
      isFormValid = false;
      setNameError("Role Name is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm();

    if (formIsValid) {
      if (!delData?.id) {
        setDelData({});
        post(`Role/Create`, subData).then((res) => {
          if (res?.status === 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: "true",
            });
            setSuccess(!success);
            setModalOpen(false);
            setRoleLabel("Select Parent Role");
            setRoleValue("");
            setName("");
            setDelData({});
          } else {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: "error",
            });
          }
        });
      } else {
        put(`Role/Update`, subData).then((res) => {
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            setSuccess(!success);
            setModalOpen(false);
            setRoleLabel("Select Parent Role");
            setRoleValue("");
            setName("");
            setDelData({});
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: "true",
            });
          } else {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: "error",
            });
          }
        });
      }
    }
  };

  const handlePrevious = () => {
    history.push(`/roleItems`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setName("");

    setRoleLabel("Select Parent Role");
    setRoleValue(0);

    setDelData({});
    setRoleError(false);

    setNameError("");
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDelData({});
    setDeleteModal(false);
  };

  const toggleDanger = (data) => {
    setDeleteModal(true);
    setDelData(data);
  };

  const handleDelete = () => {
    setButtonStatus1(true);
    setProgress(true);
    remove(`Role/Delete?id=${delData?.id}`).then((res) => {
      setButtonStatus1(false);
      setProgress(false);
      setDeleteModal(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  const handleUpdate = (docu) => {
    setModalOpen(true);
    setRoleLabel(
      docu?.parentName != null ? docu?.parentName : "Select Parent Role"
    );
    setRoleValue(docu?.parentId != null ? docu?.parentId : "");
    setName(docu?.name);
    setDelData(docu);
  };

  return (
    <div className="">
      <BreadCrumb title=" Role Items" backTo="" path="" />

      <Card>
        <CardHeader>
          <ButtonForFunction
            className={"btn btn-uapp-add"}
            func={() => setModalOpen(true)}
            icon={<i className="fas fa-plus"></i>}
            name={" Add New"}
            permission={6}
          />
        </CardHeader>
        <CardBody>
          <>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal2"
            >
              <ModalHeader>Document Details</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  {delData?.id ? (
                    <Input
                      type="hidden"
                      name="id"
                      id="id"
                      defaultValue={delData?.id}
                    />
                  ) : null}

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        Parent Role <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Select
                        options={roleOptions}
                        value={{ label: roleLabel, value: roleValue }}
                        onChange={(opt) => SelectRole(opt.label, opt.value)}
                        name="parentId"
                        id="parentId"
                      />
                      {roleError && (
                        <span className="text-danger">
                          Parent Role is required
                        </span>
                      )}
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        Role Name <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Role Name"
                        value={name}
                        onChange={(e) => {
                          handleRoleName(e);
                        }}
                      />
                      <span className="text-danger">{nameError}</span>
                    </Col>
                  </FormGroup>

                  <FormGroup className="d-flex justify-content-between mt-3">
                    <CancelButton cancel={closeModal} />

                    <SaveButton
                      text="Submit"
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </>
          <Table className="table-sm table-bordered">
            <thead className="thead-uapp-bg">
              <tr style={{ textAlign: "center" }}>
                <th>Serial</th>
                <th>Name</th>
                <th>Parent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {role.map((dept, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <th scope="row">{index + 1}</th>
                  <td>{dept?.name}</td>
                  <td>{dept?.parentName}</td>
                  <td>
                    <ButtonGroup variant="text">
                      {dept?.isFixed ? null : (
                        <>
                          <ButtonForFunction
                            func={() => handleUpdate(dept)}
                            className={"btn-sm"}
                            color={"warning"}
                            icon={<i className="fas fa-edit"></i>}
                          />

                          <ButtonForFunction
                            func={() => toggleDanger(dept)}
                            className={"btn-sm mx-2"}
                            color={"danger"}
                            icon={<i className="fas fa-trash-alt"></i>}
                          />
                        </>
                      )}
                    </ButtonGroup>

                    <ConfirmModal
                      text="Do You Want To Delete This Role?"
                      isOpen={deleteModal}
                      toggle={closeDeleteModal}
                      confirm={handleDelete}
                      cancel={closeDeleteModal}
                    />

                    {/* modal for delete */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default RoleItems;
