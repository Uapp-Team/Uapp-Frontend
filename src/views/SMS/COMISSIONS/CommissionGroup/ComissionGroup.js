import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalBody,
  FormGroup,
  Input,
  Col,
  Table,
  ButtonGroup,
  ModalHeader,
} from "reactstrap";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import remove from "../../../../helpers/remove";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import SaveButton from "../../../../components/buttons/SaveButton";
import CancelButton from "../../../../components/buttons/CancelButton";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import Filter from "../../../../components/Dropdown/Filter";
import TagButton from "../../../../components/buttons/TagButton";
import { userTypes } from "../../../../constants/userTypeConstant";

const ComissionGroup = () => {
  const userType = localStorage.getItem("userType");
  const [openModal, setOpenModal] = useState(false);
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [commission, setCommission] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const [delData, setDelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [progress, setProgress] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [branchValue, setBranchValue] = useState(0);
  const [branchLable, setBranchLable] = useState("Select Branch");
  const [branchError, setBranchError] = useState(false);

  const [filterbranch, setFilterBranch] = useState([]);
  const [filterbranchLabel, setFilterBranchLabel] = useState("Select Branch");
  const [filterbranchValue, setFilterBranchValue] = useState(0);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setFilterBranch(res);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    if (userType === userTypes?.BranchAdmin) {
      setBranchValue(filterbranch[0]?.id);
      setBranchLable(filterbranch[0]?.name);
    }
  }, [userType, filterbranch]);

  useEffect(() => {
    get(`CommissionGroup/Index?branchid=${filterbranchValue}`).then((res) => {
      setCommission(res);
      setLoading(false);
    });
  }, [success, filterbranchValue]);

  const handleupdate = (data) => {
    setData(data);
    setEdit(true);
    setName(data?.name);

    setOpenModal(true);
  };

  const toggleDanger = (data) => {
    setDeleteModal(true);
    setDelData(data);
  };

  const confirmDelete = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`CommissionGroup/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelData({});
      setSuccess(!success);
      setDeleteModal(false);
    });
  };

  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (
      userType === userTypes?.SystemAdmin &&
      userType === userTypes?.Admin &&
      branchValue === 0
    ) {
      isFormValid = false;
      setBranchError(true);
    }
    if (!name) {
      isFormValid = false;
      setNameError("Name is required");
    }

    return isFormValid;
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm();

    if (formIsValid === true) {
      if (edit) {
        setButtonStatus(true);
        setProgress(true);
        put(`CommissionGroup/Update`, subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setEdit(false);
            setData({});
            setOpenModal(false);
            setSuccess(!success);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post(`CommissionGroup/Create`, subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setOpenModal(false);
            setSuccess(!success);
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

  const modalOff = () => {
    setOpenModal(false);
    setData({});
    setName("");
    setNameError("");
  };

  return (
    <div>
      <BreadCrumb title="Commission Groups" backTo="" path="/" />
      <div>
        <Modal isOpen={openModal} toggle={modalOff} className="uapp-modal">
          <ModalHeader> Add Commission Groups </ModalHeader>
          <ModalBody>
            <form onSubmit={submitModalForm} className="mt-3">
              {edit ? (
                <input type="hidden" name="id" id="id" value={data?.id} />
              ) : null}

              <FormGroup row>
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
                    onChange={(e) => {
                      handleName(e);
                    }}
                  />
                  <span className="text-danger">{nameError}</span>
                </Col>
              </FormGroup>

              {userType === userTypes?.SystemAdmin ||
              userType === userTypes?.Admin ? (
                <FormGroup row>
                  <Col md="4">
                    <span>
                      Branch <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <DefaultDropdown
                      label={branchLable}
                      setLabel={setBranchLable}
                      value={branchValue}
                      setValue={setBranchValue}
                      url="BranchDD/Index"
                      name="branchId"
                      error={branchError}
                      setError={setBranchError}
                      errorText="Branch is required"
                      action={() => {}}
                    />
                  </Col>
                </FormGroup>
              ) : (
                <input
                  type="hidden"
                  name="branchId"
                  id="branchId"
                  value={branchValue}
                />
              )}

              <FormGroup row>
                <Col md="12">
                  <div className="d-flex justify-content-between">
                    <CancelButton cancel={modalOff} />
                    <SaveButton text="Submit" buttonStatus={buttonStatus} />
                  </div>
                </Col>
              </FormGroup>
            </form>
          </ModalBody>
        </Modal>

        {filterbranch.length > 1 && (
          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <Filter
                        data={filterbranch}
                        label={filterbranchLabel}
                        setLabel={setFilterBranchLabel}
                        value={filterbranchValue}
                        setValue={setFilterBranchValue}
                        action={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 d-flex justify-content-start">
                  <div className="d-flex mt-1">
                    {filterbranchValue !== 0 ? (
                      <TagButton
                        label={filterbranchLabel}
                        setValue={() => setFilterBranchValue(0)}
                        setLabel={() => setFilterBranchLabel("Select Branch")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-1 mx-1 d-flex btn-clear">
                    {filterbranchValue !== 0 ? (
                      <button
                        className="tag-clear"
                        onClick={() => {
                          setFilterBranchValue(0);
                          setFilterBranchLabel("Select Branch");
                        }}
                      >
                        Clear All
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
        <Card className="uapp-employee-search">
          <CardHeader>
            {permissions?.includes(
              permissionList.Configure_CommissionStucture
            ) ? (
              <div className="">
                <Button
                  className="btn btn-uapp-add"
                  onClick={() => setOpenModal(true)}
                >
                  <i className="fas fa-plus"></i> Add Commission Group
                </Button>
              </div>
            ) : null}

            <div>
              {" "}
              <b>
                {" "}
                Total{" "}
                <span className="badge badge-primary">
                  {commission?.length}
                </span>{" "}
                Commission Group Found{" "}
              </b>
            </div>
          </CardHeader>

          <CardBody className="search-card-body">
            {loading ? (
              <Loader />
            ) : (
              <div className="table-responsive">
                <Table className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      {/* <th>SL/NO</th> */}
                      <th>Name</th>
                      {(userType === userTypes?.SystemAdmin ||
                        userType === userTypes?.Admin) && <th>Branch</th>}
                      {permissions?.includes(
                        permissionList.View_Commission_Structure
                      ) ? (
                        <th>Price Settings</th>
                      ) : null}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commission?.map((comm, i) => (
                      <tr key={i} style={{ textAlign: "center" }}>
                        {/* <th scope="row">{i + 1}</th> */}
                        <td>{comm?.name}</td>
                        {(userType === userTypes?.SystemAdmin ||
                          userType === userTypes?.Admin) && (
                          <td>{comm?.branchName}</td>
                        )}

                        {permissions?.includes(
                          permissionList.View_Commission_Structure
                        ) ? (
                          <td>
                            <Link to={`/commissionPriceList/${comm?.id}`}>
                              <Button color="primary">Edit / View</Button>
                            </Link>
                          </td>
                        ) : null}

                        <td style={{ width: "15%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {permissions?.includes(
                              permissionList.Configure_CommissionStucture
                            ) ? (
                              <Button
                                className="mr-1 btn-sm"
                                color="warning"
                                onClick={() => handleupdate(comm)}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            ) : null}

                            {permissions?.includes(
                              permissionList?.Configure_CommissionStucture
                            ) ? (
                              <Button
                                className="ml-1 btn-sm"
                                color="danger"
                                onClick={() => toggleDanger(comm)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </Button>
                            ) : null}
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <ConfirmModal
        text="Do You Want To Delete This Commission Group ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={confirmDelete}
        cancel={() => setDeleteModal(false)}
        buttonStatus={buttonStatus}
        progress={progress}
      />
    </div>
  );
};

export default ComissionGroup;
