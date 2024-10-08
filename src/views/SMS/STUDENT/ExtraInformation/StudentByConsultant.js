import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Select from "react-select";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import Pagination from "../../Pagination/Pagination.jsx";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove.js";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import put from "../../../../helpers/put.js";
import ToggleSwitch from "../../Components/ToggleSwitch.js";
import { permissionList } from "../../../../constants/AuthorizationConstant.js";
import ButtonLoader from "../../Components/ButtonLoader.js";
import { userTypes } from "../../../../constants/userTypeConstant.js";
import { tableIdList } from "../../../../constants/TableIdConstant.js";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb.js";
import CancelButton from "../../../../components/buttons/CancelButton.js";
import SaveButton from "../../../../components/buttons/SaveButton.js";
import LinkButton from "../../Components/LinkButton.js";

const StudentByConsultant = () => {
  const [serialNum, setSerialNum] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delData, setDelData] = useState({});
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");

  // for hide/unhide column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userTypeId = localStorage.getItem("userType");
  const [progress, setProgress] = useState(false);

  const history = useHistory();
  const { id } = useParams();
  const { addToast } = useToasts();

  console.log(id);

  useEffect(() => {
    get(
      `Student/GetByConsultant?page=${currentPage}&pageSize=${dataPerPage}&id=${id}`
    ).then((res) => {
      setStudentList(res?.models);
      setEntity(res?.totalEntity);
      setSerialNum(res?.firstSerialNumber);

      setLoading(false);
    });

    get(`TableDefination/Index/${tableIdList?.Student_List}`).then((res) => {
      console.log("table data", res);
      setTableData(res);
    });
  }, [currentPage, dataPerPage, id, success]);

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const handleEdit = (data) => {
    history.push(`/addStudentApplicationInformation/${data?.id}/${1}`);
  };

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const passValidate = (e) => {
    setPass(e.target.value);
  };

  const verifyPass = (e) => {
    setPassError("");
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("id", passData?.id);
    subData.append("password", pass);
    if (pass.length < 6) {
      setError("Password length can not be less than six digits");
    } else if (pass !== cPass) {
      setPassError("Passwords do not match");
    } else {
      setProgress(true);
      put(`Password/ChangePasswordForStudent`, subData).then((res) => {
        setProgress(false);
        if (res?.status === 200 && res.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setPassData({});
          setPassModal(false);
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

  const handleBlacklist = (e, id) => {
    const subData = {
      id: id,
    };

    put(`Student/UpdateAccountStatus/${id}`, subData).then((res) => {
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

  const handleDeleteData = (data) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Student/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);

      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const componentRef = useRef();

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const redirectToStudentProfile = (studentId) => {
    history.push(`/studentProfile/${studentId}`);
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    setCheck(e.target.checked);

    put(`TableDefination/Update/${tableIdList?.Student_List}/${columnId}`).then(
      (res) => {
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          setSuccess(!success);
        } else {
        }
      }
    );
  };

  return (
    <div>
      <BreadCrumb
        title="Student List"
        backTo="Consultant List"
        path="/consultantList"
      />

      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12">
              {" "}
              {permissions?.includes(permissionList?.Add_New_Student) ? (
                <LinkButton
                  url={`/addStudentRegisterByConsultant/${id}`}
                  className={"btn btn-uapp-add "}
                  name={"Add Student"}
                  icon={<i className="fas fa-plus"></i>}
                />
              ) : null}
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex justify-content-md-end justify-content-sm-start">
                <div className="mr-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Showing :</div>
                    <div>
                      <Select
                        options={dataSizeName}
                        value={{ label: dataPerPage, value: dataPerPage }}
                        onChange={(opt) => selectDataSize(opt.value)}
                      />
                    </div>
                  </div>
                </div>

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
                      {tableData.map((table, i) => (
                        <div className="d-flex justify-content-between">
                          <Col md="8" className="">
                            <p className="">{table?.collumnName}</p>
                          </Col>

                          <Col md="4" className="text-center">
                            <FormGroup check inline>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id=""
                                name="isAcceptHome"
                                onChange={(e) => {
                                  handleChecked(e, table?.id);
                                }}
                                defaultChecked={table?.isActive}
                              />
                            </FormGroup>
                          </Col>
                        </div>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive mb-3" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {tableData[0]?.isActive ? <th>SL/NO</th> : null}
                    {tableData[1]?.isActive ? <th>UAPP ID</th> : null}
                    {tableData[2]?.isActive ? <th>Full Name</th> : null}
                    {tableData[3]?.isActive ? <th>Email</th> : null}
                    {tableData[4]?.isActive ? <th>Phone No</th> : null}
                    {tableData[5]?.isActive ? <th>Consultant</th> : null}
                    {tableData[6]?.isActive ? <th>UAPP Reg Date</th> : null}

                    {permissions?.includes(
                      permissionList.Change_Student_Password
                    ) ? (
                      <>{tableData[7]?.isActive ? <th>Password</th> : null}</>
                    ) : null}

                    {permissions?.includes(
                      permissionList?.Change_Student_Account_Status
                    ) ? (
                      <>{tableData[8]?.isActive ? <th>Black List</th> : null}</>
                    ) : null}
                    {tableData[9]?.isActive ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {studentList?.map((student, i) => (
                    <tr key={student.id} style={{ textAlign: "center" }}>
                      {tableData[0]?.isActive ? (
                        <th scope="row">{serialNum + i}</th>
                      ) : null}
                      {tableData[1]?.isActive ? (
                        <td>{student?.studentViewId}</td>
                      ) : null}

                      {tableData[2]?.isActive ? (
                        <td>
                          {student?.nameTittle?.name} {student?.firstName}{" "}
                          {student?.lastName}
                        </td>
                      ) : null}

                      {tableData[3]?.isActive ? (
                        <td>{student?.email}</td>
                      ) : null}

                      {tableData[4]?.isActive ? (
                        <td>{student?.phoneNumber}</td>
                      ) : null}

                      {tableData[5]?.isActive ? (
                        <td>
                          {student?.consultant?.firstName}{" "}
                          {student?.consultant?.lastName}
                        </td>
                      ) : null}

                      {tableData[6]?.isActive ? (
                        <td>{handleDate(student?.createdOn)}</td>
                      ) : null}

                      {permissions?.includes(
                        permissionList.Change_Student_Password
                      ) ? (
                        <>
                          {tableData[7]?.isActive ? (
                            <td
                              onClick={() => handlePass(student)}
                              style={{
                                cursor: "pointer",

                                color: "#007bff",
                              }}
                            >
                              Change
                              <Modal
                                isOpen={passModal}
                                toggle={() => handleToggle}
                                className="uapp-modal2"
                              >
                                <ModalHeader>
                                  <div className="text-center mt-3">
                                    <span>
                                      Change password for {passData?.firstName}{" "}
                                      {passData?.lastName} (
                                      {passData?.studentViewId}){" "}
                                    </span>
                                  </div>
                                </ModalHeader>
                                <ModalBody className="p-5">
                                  <h5>
                                    Change password for {passData?.firstName}{" "}
                                    {passData?.lastName} (
                                    {passData?.studentViewId}){" "}
                                  </h5>
                                  <form
                                    onSubmit={submitModalForm}
                                    className="mt-3"
                                  >
                                    <FormGroup row>
                                      <Col md="8">
                                        <span>
                                          <span className="text-danger">*</span>{" "}
                                          Password{" "}
                                        </span>

                                        <Input
                                          type="password"
                                          onBlur={passValidate}
                                          onChange={() => setError("")}
                                        />
                                        <span className="text-danger">
                                          {error}
                                        </span>
                                      </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                      <Col md="8">
                                        <span>
                                          <span className="text-danger">*</span>{" "}
                                          Confirm Password{" "}
                                        </span>

                                        <Input
                                          type="password"
                                          onChange={(e) => {
                                            verifyPass();
                                            confirmPassword(e);
                                          }}
                                        />

                                        <br />
                                        {
                                          <span className="text-danger">
                                            {passError}
                                          </span>
                                        }
                                      </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                      <Col md="12">
                                        <CancelButton
                                          cancel={() => setPassModal(false)}
                                        />
                                        <SaveButton
                                          buttonStatus={buttonStatus}
                                          progress={progress}
                                        />
                                      </Col>
                                    </FormGroup>
                                  </form>
                                </ModalBody>
                              </Modal>
                            </td>
                          ) : null}
                        </>
                      ) : null}

                      {permissions?.includes(
                        permissionList.Change_Student_Account_Status
                      ) ? (
                        <>
                          {tableData[8]?.isActive ? (
                            <td>
                              <ToggleSwitch
                                defaultChecked={
                                  student?.blacklisted == null
                                    ? false
                                    : student?.blacklisted === false
                                    ? false
                                    : true
                                }
                                onChange={(e) => {
                                  handleBlacklist(e, student?.id);
                                }}
                              />
                            </td>
                          ) : null}
                        </>
                      ) : null}

                      {tableData[9]?.isActive ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {permissions?.includes(
                              permissionList.View_Student
                            ) ? (
                              <ButtonForFunction
                                icon={<i className="fas fa-eye"></i>}
                                color={"primary"}
                                className={"mx-1 btn-sm"}
                                func={() =>
                                  redirectToStudentProfile(student?.id)
                                }
                              />
                            ) : null}

                            {permissions?.includes(
                              permissionList.Edit_Student
                            ) ? (
                              <ButtonForFunction
                                icon={<i className="fas fa-edit"></i>}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                func={() => handleEdit(student)}
                              />
                            ) : null}

                            {permissions?.includes(
                              permissionList.Delete_Student
                            ) ? (
                              <ButtonForFunction
                                icon={<i className="fas fa-trash-alt"></i>}
                                color={"danger"}
                                className={"mx-1 btn-sm"}
                                func={() => toggleDanger(student)}
                              />
                            ) : null}
                          </ButtonGroup>

                          <Modal
                            isOpen={deleteModal}
                            toggle={() => setDeleteModal(!deleteModal)}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this ? Once Deleted it
                                can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                color="danger"
                                onClick={handleDeleteData}
                                disabled={buttonStatus}
                              >
                                {progress ? <ButtonLoader /> : "YES"}
                              </Button>
                              <Button onClick={() => setDeleteModal(false)}>
                                NO
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentByConsultant;
