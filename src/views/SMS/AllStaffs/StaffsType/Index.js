import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ButtonGroup, Table } from "reactstrap";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { User } from "react-feather";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { StoreEmployeeTypeData } from "../../../../redux/actions/SMS/Employees/EmployeesTypeAction";
import { useHistory } from "react-router";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import remove from "../../../../helpers/remove";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import loader from "../../../../assets/img/load.gif";
import ButtonLoader from "../../Components/ButtonLoader";
import StaffTypeTable from "./Component/StaffTypeTable";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const EmployeeType = (props) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const myForm = createRef();
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [employeesTypeName, setemployeesTypeName] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedError, setSelectedError] = useState("");
  const [selectedId, setSelectedId] = useState(undefined);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const EmployeesTypeList = props.EmployeesTypeList[0];
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [empDelName, setEmpDelName] = useState("");
  const [empDelId, setEmpDelId] = useState(undefined);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);

  const openModal = () => {
    setModalOpen(!modalOpen);
    setSelected("");
    setSelectedError("");
    setSelectedId(undefined);
  };
  const openModal1 = () => {
    setModalOpen1(!modalOpen1);
  };

  console.log(EmployeesTypeList);
  const closeModal = () => {
    setModalOpen(false);
    setSelected("");
    setSelectedId(undefined);
    setemployeesTypeName("");
    setSelectedError("");
    localStorage.removeItem("updateemployeesType");
  };
  const closeModal1 = () => {
    setModalOpen1(false);
  };

  useEffect(() => {
    get(`EmployeType/Index`).then((data) => {
      setLoading(false);
      dispatch(StoreEmployeeTypeData(data));
    });
  }, [dispatch]);

  const handleEmployee = (e) => {
    setSelected(e.target.value);
    if (e.target.value === "") {
      setSelectedError("Employees type is required");
    } else {
      setSelectedError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = {
      Name: selected,
    };
    if (!selected) {
      setSelectedError("Employees type is required");
    } else {
      setProgress(true);
      post(`EmployeType/Create`, subdata).then((action) => {
        setSuccess(!success);
        setModalOpen(false);
        // setModalOpen1(true);

        setProgress(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setemployeesTypeName("");
        setSelected("");
        setSelectedId(undefined);
        get(`EmployeType/Index`).then((data) => {
          dispatch(StoreEmployeeTypeData(data));
        });
      });
    }
  };

  const handleUpdate = (p) => {
    setModalOpen(true);
    setSelected(p?.name);
    setSelectedId(p?.id);
  };

  const changingemployeesType = (v) => {
    setemployeesTypeName(v);
    setSelected(v);
  };
  const toggleDanger = (p) => {
    setEmpDelId(p?.id);
    setEmpDelName(p?.name);
    setDeleteModal(true);
  };

  const handleDeletePermission = (id) => {
    setProgress2(true);
    remove(`EmployeType/Delete/${id}`).then((action) => {
      setDeleteModal(false);
      setSuccess(!success);
      setProgress2(false);

      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setEmpDelName("");
      setEmpDelId(undefined);
      get(`EmployeType/Index`).then((data) => {
        dispatch(StoreEmployeeTypeData(data));
      });
    });
  };

  const handleUpdateSubmit = () => {
    const subData = {
      Name: selected,
      Id: selectedId,
    };
    if (!selected) {
      setSelectedError("Employees type is required");
    } else {
      setProgress1(true);
      put(`EmployeType/Update`, subData).then((action) => {
        setSuccess(!success);
        setModalOpen(false);

        if (action?.status == 200) {
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setProgress1(false);

          setSelected("");
          setSelectedError("");
          setSelectedId(undefined);
          get(`EmployeType/Index`).then((data) => {
            dispatch(StoreEmployeeTypeData(data));
          });
        } else {
          addToast(action?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setProgress1(false);
        }
      });
    }
  };

  // employee count click
  const handleEmpCount = (id) => {
    history.push(`/staffListByType/${id}`);
  };
  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  return (
    <div>
      <BreadCrumb title="Staff Types" backTo="" path="/" />
      {loading ? (
        <div className="text-center">
          <img className="img-fluid" src={loader} alt="uapp_loader" />
        </div>
      ) : (
        <div>
          <Card>
            <CardHeader>
              {permissions?.includes(permissionList?.Add_Staff_type) && (
                <ButtonForFunction
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  func={() => setModalOpen(true)}
                  name={" Add Employee Type"}
                  permission={6}
                />
              )}

              <div className="mt-2">
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {EmployeesTypeList?.length}
                  </span>{" "}
                  Staff Types Found{" "}
                </b>
              </div>
            </CardHeader>
            <CardBody>
              <Modal
                isOpen={modalOpen}
                toggle={openModal}
                className="uapp-modal"
              >
                <ModalHeader>Employees Type</ModalHeader>
                <ModalBody>
                  <Form ref={myForm} onSubmit={handleSubmit}>
                    <Input type="number" name="Id" id="Id" hidden />

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          Employees Type <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Input
                          type="text"
                          name="Name"
                          id="Name"
                          value={selected}
                          placeholder="Employees Type"
                          onChange={(e) => {
                            handleEmployee(e);
                          }}
                        />
                        <span className="text-danger">{selectedError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup className="d-flex justify-content-between mt-3">
                      <CancelButton cancel={closeModal} />

                      <SaveButton text="Submit" progress={progress} />
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>
              <StaffTypeTable
                EmployeesTypeList={EmployeesTypeList}
                handleEmpCount={handleEmpCount}
                handleUpdate={handleUpdate}
                toggleDanger={toggleDanger}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                empDelId={empDelId}
                empDelName={empDelName}
                handleDeletePermission={handleDeletePermission}
                progress2={progress2}
              ></StaffTypeTable>

              {/* <Modal
                isOpen={modalOpen1}
                toggle={openModal}
                className="uapp-modal"
              >
                <ModalHeader>sakib Type</ModalHeader>
                <ModalBody>
                  <Form ref={myForm}>
                    <Input type="number" name="Id" id="Id" hidden />

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="4">
                        <span>
                          sakib Type <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Input
                          type="text"
                          name="Name"
                          id="Name"
                          value={selected}
                          placeholder="Employees Type"
                          onChange={(e) => {
                            handleEmployee(e);
                          }}
                        />
                        <span className="text-danger">{selectedError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup className="d-flex justify-content-between mt-3">
                      <CancelButton cancel={closeModal1} />

                      <SaveButton text="Submit" progress={progress} />
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal> */}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  EmployeesTypeList: state.employeeTypeDataReducer.employeeType,
});
export default connect(mapStateToProps)(EmployeeType);
