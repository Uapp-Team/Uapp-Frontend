import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { useHistory } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  Table,
  ButtonGroup,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";
import put from "../../../helpers/put";
import { Link } from "react-router-dom";
import ButtonForFunction from "../Components/ButtonForFunction";
import { permissionList } from "../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../components/buttons/TagButton";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";

const SubDepartment = (props) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [departmentLabel, setdepartmentLabel] = useState("Select Department");
  const [departmentValue, setdepartmentValue] = useState(0);
  const [departmentError, setDepartmentError] = useState(false);
  const [filterdepartmentLabel, setfilterdepartmentLabel] =
    useState("Select Department");
  const [filterdepartmentValue, setfilterdepartmentValue] = useState(0);
  const [subdepartment, setSubdepartment] = useState("");
  const [departmentList, setdepartmentList] = useState([0]);
  const [subdepartmentList, setSubDepartmentList] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [SubdepId, setSubdepId] = useState(0);
  const [SubdepName, setSubdepName] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    get(`DepartmentDD/Index`).then((action) => {
      setdepartmentList(action);
    });
  }, []);

  useEffect(() => {
    get(`SubDepartment/Index?id=${filterdepartmentValue}`).then((action) => {
      setSubDepartmentList(action);
    });
  }, [success, filterdepartmentValue]);

  const departmentName = departmentList?.map((depart) => ({
    label: depart.name,
    value: depart.id,
  }));

  const selectDepartmentName = (label, value) => {
    setdepartmentLabel(label);
    setdepartmentValue(value);
    setDepartmentError(false);
  };

  const selectDepartmentNamefilder = (label, value) => {
    setfilterdepartmentLabel(label);
    setfilterdepartmentValue(value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    if (e.target.value === "") {
      setDescriptionError("Description is required");
    } else {
      setDescriptionError("");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (!name) {
      isFormValid = false;
      setNameError("Name is required");
    }
    if (departmentValue === 0) {
      isFormValid = false;
      setDepartmentError(true);
    }
    if (!description) {
      isFormValid = false;
      setDescriptionError("Description is required");
    }

    return isFormValid;
  };

  const handleUpdate = (data) => {
    setData(data);
    console.log(data, "res");
    setModalOpen(true);
    setDescription(data?.description);
    setName(data?.name);
    setdepartmentLabel(data?.departmentinfo?.name);
    setdepartmentValue(data?.departmentinfo?.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subdata = {
      name: name,
      departmentId: departmentValue,
      description: description,
      id: data?.id,
    };
    // const subdata = new FormData(e.target);

    var formIsValid = validateRegisterForm(subdata);
    if (formIsValid) {
      if (!data?.id) {
        setButtonStatus(true);
        setProgress(true);
        post(`SubDepartment/Create`, subdata).then((action) => {
          setButtonStatus(false);
          setProgress(false);
          setSuccess(!success);
          setModalOpen(false);
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setModalOpen(false);
          setData({});
          setdepartmentLabel("Select Country");
          setdepartmentValue(0);
          setDescription("");
          setName("");
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        put("SubDepartment/Update", subdata).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setModalOpen(false);
            setData({});
            setdepartmentLabel("Select Country");
            setdepartmentValue(0);
            setDescription("");
            setName("");
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setData({});
    setName("");
    setdepartmentLabel("Select Department");
    setdepartmentValue(0);
    setDescription("");
    setDescriptionError("");
    setNameError("");
    setDepartmentError(false);
  };
  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };
  const toggleDanger = (name, id) => {
    setSubdepName(name);
    setSubdepId(id);
    setDeleteModal(true);
  };
  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSubdepName("");
    setSubdepId(0);
  };

  const handleDeleteSubDep = (id) => {
    setButtonStatus1(true);
    setProgress1(true);
    remove(`SubDepartment/Delete/${id}`).then((action) => {
      setButtonStatus1(false);
      setProgress1(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });

      //  localStorage.removeItem('depName')
      setSubdepName("");
      setSubdepId(0);
    });
  };

  const AddModalOpen = () => {
    setModalOpen(true);
    setName("");
    setdepartmentLabel("Select Department");
    setdepartmentValue(0);
    setDescription("");
    // localStorage.removeItem('updateSupdep')
  };

  // on clear
  const handleClearSearch = () => {
    setfilterdepartmentLabel("Select Department");
    setfilterdepartmentValue(0);
  };

  const redirectToEditSubDepartment = (subDepListId) => {
    history.push(`/editSubDepartment/${subDepListId}`);
  };

  return (
    <div>
      <BreadCrumb title="Sub Department List" backTo="" path="/" />

      <Card className="uapp-employee-search">
        <CardBody>
          <Row>
            <Col lg="12" md="4">
              <Select
                options={departmentName}
                value={{
                  label: filterdepartmentLabel,
                  value: filterdepartmentValue,
                }}
                onChange={(opt) =>
                  selectDepartmentNamefilder(opt.label, opt.value)
                }
                name="departmentId"
                id="departmentId"
              />
            </Col>
          </Row>
          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div className="d-flex mt-1">
                  {filterdepartmentValue !== 0 && (
                    <TagButton
                      label={filterdepartmentLabel}
                      setValue={() => setfilterdepartmentValue(0)}
                      setLabel={() =>
                        setfilterdepartmentLabel("Select Department")
                      }
                    ></TagButton>
                  )}
                </div>
                <div
                  className="mt-1 mx-1 d-flex btn-clear"
                  onClick={handleClearSearch}
                >
                  {/* <Icon.X  className='text-danger' />*/}
                  {filterdepartmentValue !== 0 ? (
                    <button className="tag-clear" onClick={handleClearSearch}>
                      Clear All
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                {/* <div className="mt-2 mx-1">
                <span className="btn btn-primary">Export</span>
              </div> */}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <div>
        <Card>
          <CardHeader>
            {permissions?.includes(permissionList.Add_Departments) ? (
              <ButtonForFunction
                className={"btn btn-uapp-add"}
                func={AddModalOpen}
                icon={<i className="fas fa-plus"></i>}
                name={" Add Sub Department"}
                permission={6}
              />
            ) : null}

            <div>
              {" "}
              <b>
                {" "}
                Total{" "}
                <span className="badge badge-primary">
                  {" "}
                  {subdepartmentList?.length}{" "}
                </span>{" "}
                Sub Department Found{" "}
              </b>
            </div>
          </CardHeader>
          <CardBody>
            <div>
              <Modal
                isOpen={modalOpen}
                toggle={closeModal}
                className="uapp-modal"
              >
                <ModalHeader>Add Sub Department</ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Name <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          placeholder="Create Sub Department Name"
                          onChange={(e) => handleNameChange(e)}
                        />
                        <span className="text-danger">{nameError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Department <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Select
                          options={departmentName}
                          value={{
                            label: departmentLabel,
                            value: departmentValue,
                          }}
                          onChange={(opt) =>
                            selectDepartmentName(opt.label, opt.value)
                          }
                          name="departmentId"
                          id="departmentId"
                        />

                        {departmentError ? (
                          <span className="text-danger">
                            Department is required.
                          </span>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Description <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Input
                          type="textarea"
                          name="description"
                          id="description"
                          rows="3"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => handleDescription(e)}
                        />
                        <span className="text-danger">{descriptionError}</span>
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
            </div>

            {permissions?.includes(permissionList.View_Departments) && (
              <div className="table-responsive">
                <Table className="table-sm table-bordered">
                  <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                      {/* <th>SL/NO</th> */}
                      <th> Name</th>
                      <th className="text-center">Department</th>
                      {permissions?.includes(permissionList.Edit_Departments) ||
                      permissions?.includes(
                        permissionList.Delete_Departments
                      ) ? (
                        <th>Action</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {subdepartmentList?.map((subDeplist, i) => (
                      <tr key={subDeplist.id} style={{ textAlign: "center" }}>
                        {/* <th scope="row">{i + 1}</th> */}
                        <td>{subDeplist?.name}</td>
                        <td>{subDeplist?.departmentinfo?.name}</td>
                        {permissions?.includes(
                          permissionList.Edit_Departments
                        ) ||
                        permissions?.includes(
                          permissionList.Delete_Departments
                        ) ? (
                          <>
                            {" "}
                            <td>
                              {/* <Button className="mx-1 btn-sm" onClick={() => toggleDanger(subDeplist.name, subDeplist.id)} color="danger"><i className="fas fa-trash-alt"></i></Button> */}
                              <ButtonGroup variant="text">
                                {permissions.includes(
                                  permissionList.Edit_Departments
                                ) ? (
                                  <ButtonForFunction
                                    func={() => handleUpdate(subDeplist)}
                                    className={"mx-1 btn-sm"}
                                    color={"warning"}
                                    icon={<i className="fas fa-edit"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {permissions.includes(
                                  permissionList.Delete_Departments
                                ) ? (
                                  <ButtonForFunction
                                    func={() =>
                                      toggleDanger(
                                        subDeplist.name,
                                        subDeplist.id
                                      )
                                    }
                                    className={"mx-1 btn-sm"}
                                    color={"danger"}
                                    icon={<i className="fas fa-trash-alt"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {/* <Link to={`editSubDepartment/${subDeplist?.id}`}>
                      <Button className="mx-1 btn-sm" color="warning"><i className="fas fa-edit"></i></Button>
                    </Link> */}

                                {/* <LinkButton
                          url={`editSubDepartment/${subDeplist?.id}`}
                          className={"mx-1 btn-sm"}
                          color={"warning"}
                          icon={<i className="fas fa-edit"></i>}
                          permission={6}
                        /> */}
                              </ButtonGroup>
                            </td>
                          </>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </CardBody>
        </Card>
        <ConfirmModal
          text="Do You Want To Delete This Sub Department? Once Deleted it can't be Undone "
          // ${delData?.name}
          isOpen={deleteModal}
          toggle={closeDeleteModal}
          cancel={closeDeleteModal}
          buttonStatus={buttonStatus}
          progress={progress}
          confirm={() => handleDeleteSubDep(SubdepId)}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  alldepartmentList: state.departmentDataReducer.departmentList,
});
export default connect(mapStateToProps)(SubDepartment);
