import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Row,
  Table,
  FormGroup,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
} from "reactstrap";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import LinkButton from "../../Components/LinkButton";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Loader from "../../Search/Loader/Loader";
import put from "../../../../helpers/put";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import PopOverText from "../../../../components/PopOverText";
import SaveButton from "../../../../components/buttons/SaveButton";
import CancelButton from "../../../../components/buttons/CancelButton";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { userTypes } from "../../../../constants/userTypeConstant";
import ColumnBranch from "../../TableColumn/ColumnBranch";

const BranchList = () => {
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [delData, setDelData] = useState(null);
  const [success, setSuccess] = useState(false);

  // for hide/unhide table column
  const [tableData, setTableData] = useState([]);
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const [popoverOpen, setPopoverOpen] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    const tableColumnBranch = JSON.parse(localStorage.getItem("ColumnBranch"));
    tableColumnBranch && setTableData(tableColumnBranch);
    !tableColumnBranch &&
      localStorage.setItem("ColumnBranch", JSON.stringify(ColumnBranch));
    !tableColumnBranch && setTableData(ColumnBranch);
  }, []);

  useEffect(() => {
    get(`Branch/Index`).then((res) => {
      setBranchList(res);
      console.log(res, "hahahah");
      setLoading(false);
    });
  }, [success]);

  const handleUpdate = (id) => {
    history.push(`/branchInformation/${id}`);
  };

  const handleDeletebranch = () => {
    setProgress(true);
    remove(`Branch/Delete/${delData}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const toggleDanger = (id) => {
    setDelData(id);
    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const componentRef = useRef();

  const redirectToBranchProfile = (branchId) => {
    history.push(`/branchProfile/${branchId}`);
  };

  // for hide/unhide column
  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnBranch", JSON.stringify(values));
  };

  const userTypeId = localStorage.getItem("userType");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [passData, setPassData] = useState({});
  const [passModal, setPassModal] = useState(false);
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [resetButtonStatus, setResetButtonStatus] = useState(false);

  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  const passValidate = (e) => {
    setPass(e.target.value);
    if (e.target.value === "") {
      setError("Provide a valid password");
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(e.target.value)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
    } else {
      setError("");
    }
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
    if (e.target.value === "") {
      setPassError("Confirm your password");
    } else {
      setPassError("");
    }
    if (pass && e.target.value !== pass) {
      setPassError("Passwords doesn't match.");
    } else {
      setPassError("");
    }
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("id", passData?.id);
    subData.append("password", pass);
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(pass)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
    } else if (pass !== cPass) {
      setPassError("Passwords do not match");
    } else {
      setResetButtonStatus(true);
      put(`Password/ChangePasswordForBranchManager`, subData).then((res) => {
        setResetButtonStatus(false);
        if (res?.status === 200 && res.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setPassData({});
          setPassModal(false);
          setPass("");
          setCPass("");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setSuccess(!success);
        }
      });
    }
  };

  return (
    <div>
      <BreadCrumb title="Branch List" backTo="" path="/" />
      <div>
        <Card className="uapp-employee-search">
          <CardBody>
            <Row className="mb-3">
              <Col
                lg="6"
                md="6"
                sm="12"
                xs="12"
                style={{ marginBottom: "10px" }}
              >
                {permissions?.includes(permissionList?.Add_Branch) ? (
                  <LinkButton
                    url={"/branchInformation"}
                    className={"btn btn-uapp-add "}
                    icon={<i className="fas fa-plus"></i>}
                    name={"Add Branch"}
                  />
                ) : null}
              </Col>

              <Col lg="6" md="6" sm="12" xs="12">
                <div className="d-flex justify-content-end">
                  <div className="mr-3">
                    <Dropdown
                      className="uapp-dropdown"
                      style={{ float: "right" }}
                      isOpen={dropdownOpen}
                      toggle={toggle}
                    >
                      <DropdownToggle caret>
                        <i className="fas fa-print fs-7"></i>
                      </DropdownToggle>
                      <DropdownMenu className="bg-dd-4">
                        {/* <DropdownItem> */}
                        <div className="d-flex justify-content-around align-items-center mt-2">
                          <div className="cursor-pointer">
                            <ReactTableConvertToXl
                              id="test-table-xls-button"
                              table="table-to-xls"
                              filename="tablexls"
                              sheet="tablexls"
                              icon={<i className="fas fa-file-excel"></i>}
                            />
                          </div>
                          <div className="cursor-pointer">
                            <ReactToPrint
                              trigger={() => (
                                <p>
                                  <i className="fas fa-file-pdf"></i>
                                </p>
                              )}
                              content={() => componentRef.current}
                            />
                          </div>
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  {/* column hide unhide starts here */}

                  <div className="">
                    <Dropdown
                      className="uapp-dropdown"
                      style={{ float: "right" }}
                      isOpen={dropdownOpen1}
                      toggle={toggle1}
                    >
                      <DropdownToggle caret>
                        <i className="fas fa-bars"></i>
                      </DropdownToggle>
                      <DropdownMenu className="bg-dd-1">
                        {tableData?.map((table, i) => (
                          <div key={i}>
                            {i === 2 ? (
                              <>
                                {permissions?.includes(
                                  permissionList?.Staff_Password_Change
                                ) && (
                                  <>
                                    {userTypeId === userTypes?.SystemAdmin ||
                                    userTypeId === userTypes?.Admin ? (
                                      <div className="d-flex justify-content-between">
                                        <Col md="8" className="">
                                          <p className="">{table?.title}</p>
                                        </Col>

                                        <Col md="4" className="text-center">
                                          <FormGroup check inline>
                                            <Input
                                              className="form-check-input"
                                              type="checkbox"
                                              id=""
                                              name="isAcceptHome"
                                              onChange={(e) => {
                                                handleChecked(e, i);
                                              }}
                                              defaultChecked={table?.isActive}
                                            />
                                          </FormGroup>
                                        </Col>
                                      </div>
                                    ) : null}
                                  </>
                                )}
                              </>
                            ) : (
                              <div className="d-flex justify-content-between">
                                <Col md="8" className="">
                                  <p className="">{table?.title}</p>
                                </Col>

                                <Col md="4" className="text-center">
                                  <FormGroup check inline>
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      id=""
                                      name="isAcceptHome"
                                      onChange={(e) => {
                                        handleChecked(e, i);
                                      }}
                                      defaultChecked={table?.isActive}
                                    />
                                  </FormGroup>
                                </Col>
                              </div>
                            )}
                          </div>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  {/* column hide unhide ends here */}
                </div>
              </Col>
            </Row>
            {permissions?.includes(permissionList?.View_Branch_List) ? (
              <>
                <>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="table-responsive" ref={componentRef}>
                      <Table
                        id="table-to-xls"
                        className="table-sm table-bordered"
                      >
                        <thead className="tablehead">
                          <tr style={{ textAlign: "center" }}>
                            {tableData[0]?.isActive ? <th>Code</th> : null}

                            {tableData[1]?.isActive ? (
                              <th>Branch Name</th>
                            ) : null}
                            {tableData[1]?.isActive ? (
                              <th>Manager Name</th>
                            ) : null}
                            {permissions?.includes(
                              permissionList.Staff_Password_Change
                            ) ? (
                              <>
                                {userTypeId === userTypes?.SystemAdmin ||
                                userTypeId === userTypes?.Admin ? (
                                  <>
                                    {tableData[2]?.isActive ? (
                                      <th>Password</th>
                                    ) : null}
                                  </>
                                ) : null}
                              </>
                            ) : null}
                            {tableData[3]?.isActive ? <th>Email</th> : null}
                            {tableData[4]?.isActive ? <th>Contact</th> : null}
                            {tableData[5]?.isActive ? <th>Country</th> : null}
                            {tableData[6]?.isActive ? (
                              <th>Compliance Manager</th>
                            ) : null}
                            {tableData[6]?.isActive ? (
                              <th>Consultants</th>
                            ) : null}
                            {tableData[7]?.isActive ? <th>Student</th> : null}
                            {tableData[8]?.isActive ? (
                              <th>Applications</th>
                            ) : null}

                            {tableData[9]?.isActive ? (
                              <th
                                style={{ width: "8%" }}
                                className="text-center"
                              >
                                Action
                              </th>
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {branchList?.map((singleBranch, i) => (
                            <tr
                              key={singleBranch?.id}
                              style={{ textAlign: "center" }}
                            >
                              {tableData[0]?.isActive ? (
                                <td>{singleBranch?.branchCode}</td>
                              ) : null}

                              {tableData[1]?.isActive ? (
                                <td>{singleBranch?.name}</td>
                              ) : null}

                              {tableData[1]?.isActive ? (
                                <td>{singleBranch?.branchManagerName}</td>
                              ) : null}

                              {permissions?.includes(
                                permissionList.Staff_Password_Change
                              ) ? (
                                <>
                                  {userTypeId === userTypes?.SystemAdmin ||
                                  userTypeId === userTypes?.Admin ? (
                                    <>
                                      {tableData[2]?.isActive ? (
                                        <td>
                                          <Link
                                            onClick={() =>
                                              handlePass(singleBranch)
                                            }
                                          >
                                            Change
                                          </Link>
                                          <Modal
                                            isOpen={passModal}
                                            toggle={() => handleToggle}
                                            className="uapp-modal2"
                                          >
                                            <ModalBody className="p-5">
                                              <h5>
                                                Change password for
                                                {passData?.name}
                                              </h5>
                                              <form
                                                onSubmit={submitModalForm}
                                                className="mt-3"
                                              >
                                                <FormGroup row>
                                                  <Col md="8">
                                                    <span>
                                                      <span className="text-danger">
                                                        *
                                                      </span>
                                                      Password
                                                    </span>

                                                    <Input
                                                      type="password"
                                                      onChange={(e) => {
                                                        passValidate(e);
                                                      }}
                                                    />
                                                    <span className="text-danger">
                                                      {error}
                                                    </span>
                                                  </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                  <Col md="8">
                                                    <span>
                                                      <span className="text-danger">
                                                        *
                                                      </span>
                                                      Confirm Password
                                                    </span>

                                                    <Input
                                                      type="password"
                                                      onChange={(e) => {
                                                        confirmPassword(e);
                                                      }}
                                                    />

                                                    <span className="text-danger">
                                                      {passError}
                                                    </span>
                                                  </Col>
                                                </FormGroup>
                                                <FormGroup className="d-flex justify-content-between mt-3">
                                                  <CancelButton
                                                    cancel={() =>
                                                      handleToggle(false)
                                                    }
                                                  />

                                                  <SaveButton
                                                    text="Submit"
                                                    progress={progress}
                                                    buttonStatus={
                                                      resetButtonStatus
                                                    }
                                                  />
                                                </FormGroup>
                                              </form>
                                            </ModalBody>
                                          </Modal>
                                        </td>
                                      ) : null}
                                    </>
                                  ) : null}
                                </>
                              ) : null}

                              {tableData[3]?.isActive ? (
                                <td>{singleBranch?.branchManagerEmail}</td>
                              ) : null}

                              {tableData[4]?.isActive ? (
                                <td>
                                  <div className=" d-flex justify-content-center">
                                    <PopOverText
                                      value={
                                        singleBranch?.phoneNumber &&
                                        singleBranch?.phoneNumber.includes("+")
                                          ? singleBranch?.phoneNumber
                                          : singleBranch?.phoneNumber &&
                                            !singleBranch?.phoneNumber.includes(
                                              "+"
                                            )
                                          ? "+" + singleBranch?.phoneNumber
                                          : null
                                      }
                                      btn={<i class="fas fa-phone"></i>}
                                      popoverOpen={popoverOpen}
                                      setPopoverOpen={setPopoverOpen}
                                    />
                                    <PopOverText
                                      value={singleBranch?.email}
                                      btn={<i className="far fa-envelope"></i>}
                                      popoverOpen={popoverOpen}
                                      setPopoverOpen={setPopoverOpen}
                                    />
                                  </div>
                                </td>
                              ) : null}

                              {tableData[5]?.isActive ? (
                                <td>{singleBranch?.country?.name}</td>
                              ) : null}

                              {tableData[6]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() => {
                                        history.push(
                                          `/staffListByBranchType/${singleBranch?.id}/7`
                                        );
                                      }}
                                      className="Count-fourth"
                                    >
                                      {singleBranch?.complianceCount}
                                    </span>
                                  </div>
                                </td>
                              ) : null}

                              {tableData[6]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() => {
                                        history.push(
                                          `/branch-consultantList/${singleBranch?.id}`
                                        );
                                      }}
                                      className="Count-first"
                                    >
                                      {singleBranch?.consultants}
                                    </span>
                                  </div>
                                </td>
                              ) : null}

                              {tableData[7]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() => {
                                        history.push(
                                          `/branch-studentList/${singleBranch?.id}`
                                        );
                                      }}
                                      className="Count-second"
                                    >
                                      {singleBranch?.students}
                                    </span>
                                  </div>
                                </td>
                              ) : null}
                              {tableData[8]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() => {
                                        history.push(
                                          `/branch-applications/${singleBranch?.id}`
                                        );
                                      }}
                                      className="Count-third"
                                    >
                                      {singleBranch?.applications}
                                    </span>
                                  </div>
                                </td>
                              ) : null}

                              {tableData[9]?.isActive ? (
                                <td
                                  style={{ width: "8%" }}
                                  className="text-center"
                                >
                                  <ButtonGroup variant="text">
                                    {permissions?.includes(
                                      permissionList?.View_Branch
                                    ) ? (
                                      <ButtonForFunction
                                        color={"primary"}
                                        className={"mx-1 btn-sm"}
                                        func={() =>
                                          redirectToBranchProfile(
                                            singleBranch?.id
                                          )
                                        }
                                        icon={<i className="fas fa-eye"></i>}
                                        permission={6}
                                      />
                                    ) : null}

                                    {permissions?.includes(
                                      permissionList.Edit_Branch
                                    ) ? (
                                      <>
                                        {singleBranch?.email !==
                                        "info@smsheg.co.uk" ? (
                                          <ButtonForFunction
                                            color={"warning"}
                                            className={"mx-1 btn-sm"}
                                            func={() =>
                                              handleUpdate(singleBranch?.id)
                                            }
                                            icon={
                                              <i className="fas fa-edit"></i>
                                            }
                                            permission={6}
                                          />
                                        ) : null}
                                      </>
                                    ) : null}

                                    {permissions?.includes(
                                      permissionList?.Delete_Branch
                                    ) ? (
                                      <>
                                        {singleBranch?.email !==
                                        "info@smsheg.co.uk" ? (
                                          <ButtonForFunction
                                            color={"danger"}
                                            func={() =>
                                              toggleDanger(singleBranch?.id)
                                            }
                                            className={"mx-1 btn-sm"}
                                            icon={
                                              <i className="fas fa-trash-alt"></i>
                                            }
                                            permission={6}
                                          />
                                        ) : null}
                                      </>
                                    ) : null}
                                  </ButtonGroup>
                                </td>
                              ) : null}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </>
              </>
            ) : null}

            <div className="d-flex justify-content-end mt-3">
              <h5>Total Results Found: {branchList.length}</h5>
            </div>
          </CardBody>
        </Card>
      </div>

      <ConfirmModal
        text="Do You Want To Delete This Branch? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        confirm={handleDeletebranch}
        cancel={closeDeleteModal}
      />
    </div>
  );
};

export default BranchList;
