import React, { useEffect, useRef, useState } from "react";
import TagButton from "../../../../components/buttons/TagButton";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import Typing from "../../../../components/form/Typing";
import Select from "react-select";
import icon_info from "../../../../assets/img/icons/icon_info.png";
import LinkButton from "../../Components/LinkButton";
import PrintFile from "./PrintFile";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router";
import { userTypes } from "../../../../constants/userTypeConstant";
import put from "../../../../helpers/put";
import remove from "../../../../helpers/remove";
import get from "../../../../helpers/get";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import Pagination from "../../Pagination/Pagination";
import CompanionColumnHide from "../CompanionList/CompanionColumnHide";
import CompanionMyTeamTable from "./CompanionMyTeamTable";
import Uget from "../../../../helpers/Uget";
import ButtonForFunction from "../../Components/ButtonForFunction";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const CompanionMyTeamList = () => {
  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Status");
  const [statusValue, setStatusValue] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [dataPerPage, setDataPerPage] = useState(15);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const componentRef = useRef();
  const [tableData, setTableData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [companionTeamList, setCompanionTeamList] = useState([]);
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");
  const userType = localStorage.getItem("userType");
  const userTypeId = localStorage.getItem("userType");
  const [success, setSuccess] = useState(false);
  const referenceId = localStorage.getItem("referenceId");

  // const ConsultantPaging = JSON.parse(sessionStorage.getItem("consultant"));

  // const [empValue, setEmpValue] = useState(
  //   ConsultantPaging?.empValue ? ConsultantPaging?.empValue : 0
  // );
  // const [branch, setBranch] = useState([]);
  // const [branchLabel, setBranchLabel] = useState(
  //   ConsultantPaging?.branchLabel
  //     ? ConsultantPaging?.branchLabel
  //     : "Select Branch"
  // );
  // const [branchValue, setBranchValue] = useState(
  //   ConsultantPaging?.branchValue ? ConsultantPaging?.branchValue : 0
  // );

  const [entity, setEntity] = useState(0);

  const [serialNum, setSerialNum] = useState(0);

  const [deleteModal, setDeleteModal] = useState(false);
  const { addToast } = useToasts();
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [delData, setDelData] = useState({});
  const history = useHistory();
  const [check, setCheck] = useState(false);
  const [InvitationList, setInvitationList] = useState([]);
  const [emailCompanion, setEmailCompanion] = useState("");
  const [emailCompanionError, setEmailCompanionError] = useState("");
  const [modalOpenCompanion, setModalOpenCompanion] = useState(false);

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
    }
  };

  const [active, setActive] = useState(false);

  useEffect(() => {
    Uget(`Referrer/get-active-status/${referenceId}`).then((res) => {
      console.log(res?.data);
      setActive(res?.data);
    });
  }, [referenceId]);

  useEffect(() => {
    get(`ReferrerTeamInvitation?&companionid=${referenceId}`).then(
      (action) => {
        setInvitationList(action);

        console.log(action, "emergency");
      }
    );
  }, [referenceId, success]);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `Referrer/get-team-members/?&companionId=${referenceId}&searchstring=${searchStr}&page=${currentPage}&pageSize=${dataPerPage}`
      ).then((res) => {
        console.log(res);
        setCompanionTeamList(res?.items);
        // setSerialNum(res?.firstSerialNumber);
        setEntity(res?.totalFiltered);
        setLoading(false);
      });
    }
  }, [currentPage, dataPerPage, isTyping, referenceId, searchStr]);

  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnCompanionsTeam", JSON.stringify(values));
  };

  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  const verifyPass = (e) => {
    setPassError("");
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
      setProgress(true);
      put(`Password/ChangePasswordForConsultant`, subData).then((res) => {
        setProgress(false);
        if (res?.status == 200 && res.data?.isSuccess == true) {
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

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const redirectToConsultantDashboard = (id) => {
    history.push(`/referrer-dashboard/${id}`);
  };

  const redirectToConsultantProfile = (id) => {
    history.push(`/referrer-profile/${id}`);
  };

  const handleCompanionSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (!emailCompanion) {
      setEmailCompanionError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailCompanion)
    ) {
      setEmailCompanionError("Email is not Valid");
    } else {
      setButtonStatus(true);
      setProgress(true);
      put(
        `ReferrerTeamInvitation?companionid=${referenceId}&email=${emailCompanion}`,
        subData
      ).then((action) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
        setModalOpenCompanion(false);
        setEmailCompanion("");
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });

        // setTitle("");
      });
    }
  };

  const handleEmailAffiliateError = (e) => {
    setEmailCompanion(e.target.value);
    if (e.target.value === "") {
      setEmailCompanionError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailCompanionError("Email is not valid");
    } else {
      setEmailCompanionError("");
    }
  };

  const handleUpdate = (data) => {
    put(`Consultant/UpdateAccountStatus/${data?.id}`).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          autoDismiss: true,
          appearance: "success",
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          autoDismiss: true,
          appearance: "error",
        });
      }
    });
  };

  const handleEdit = (data) => {
    history.push(`/referrerPersonalInfo/${data?.id}`);
  };

  const closeModalCompanion = () => {
    setModalOpenCompanion(false);
    setEmailCompanion("");
    setEmailCompanionError("");
    // setTitle("");
  };

  const toggleDanger = (p) => {
    setDelData(p);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Consultant/Delete/${delData?.id}`).then((res) => {
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log("dataPerPage", dataPerPage);
  console.log("entity", entity);
  return (
    <div>
      <BreadCrumb title="My Team" backTo="" path="/" />
      <Card className="uapp-employee-search zindex-100">
        <CardBody>
          <Row>
            <Col className="uapp-mb mb-2" md="4" sm="12">
              <Typing
                name="search"
                placeholder="Id, Name, Email"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
                onKeyDown={handleKeyDown}
              />

              <div className="mt-1 d-flex justify-between ">
                <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
                <div className="pl-2" style={{ paddingTop: "2px" }}>
                  <span>Name should not include title.</span>
                </div>
              </div>
            </Col>
          </Row>

          {/* <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div className="mt-1 mx-1" style={{ display: "flex" }}>
                  {empValue !== 0 || branchValue !== 0 || statusValue !== 0
                    ? ""
                    : ""}
                  {empValue !== 0 ? (
                    <TagButton
                      label={empLabel}
                      setValue={() => setEmpValue(0)}
                      setLabel={() => setEmpLabel("Select Consultant Type")}
                    ></TagButton>
                  ) : (
                    ""
                  )}
                  {empValue !== 0 &&
                    (branchValue !== 0 || statusValue !== 0 ? "" : "")}

                  {branchValue !== 0 ? (
                    <TagButton
                      label={branchLabel}
                      setValue={() => setBranchValue(0)}
                      setLabel={() => setBranchLabel("Select Status")}
                    />
                  ) : (
                    ""
                  )}

                  {branchValue !== 0 && statusValue !== 0 ? "" : ""}

                  {statusValue !== 0 ? (
                    <TagButton
                      label={statusLabel}
                      setValue={() => setStatusValue(0)}
                      setLabel={() => setStatusLabel("Account Status")}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-1 mx-0 d-flex btn-clear">
                  {empValue !== 0 || branchValue !== 0 || statusValue !== 0 ? (
                    <button className="tag-clear" onClick={handleReset}>
                      Clear All
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Col>
          </Row> */}
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              {/* {permissions?.includes(permissionList?.Add_Consultant) && ( */}
              {active && (
                <LinkButton
                  url={`referrer-registrationby/${referenceId}`}
                  className={"btn btn-uapp-add "}
                  name={"Add Team Member"}
                  icon={<i className="fas fa-plus"></i>}
                />
              )}
              {/* )} */}
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex justify-content-end">
                {/* Dropdown number start */}
                <div className="mr-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Showing :</div>
                    <div className="ddzindex">
                      <Select
                        options={dataSizeName}
                        value={{ label: dataPerPage, value: dataPerPage }}
                        onChange={(opt) => selectDataSize(opt.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* Dropdown number end */}

                <PrintFile
                  dropdownOpen={dropdownOpen}
                  toggle={toggle}
                  componentRef={componentRef}
                ></PrintFile>

                <CompanionColumnHide
                  dropdownOpen1={dropdownOpen1}
                  toggle1={toggle1}
                  tableData={tableData}
                  setTableData={setTableData}
                  handleChecked={handleChecked}
                />
              </div>
            </Col>
          </Row>

          {permissions?.includes(permissionList?.View_Consultant_list) && (
            <>
              {companionTeamList?.length === 0 ? (
                <h4 className="text-center">No Data Found</h4>
              ) : (
                <>
                  {loading ? (
                    <h2 className="text-center">Loading...</h2>
                  ) : (
                    <CompanionMyTeamTable
                      componentRef={componentRef}
                      tableData={tableData}
                      permissions={permissions}
                      permissionList={permissionList}
                      userTypeId={userTypeId}
                      userTypes={userTypes}
                      companionTeamList={companionTeamList}
                      history={history}
                      handlePass={handlePass}
                      passModal={passModal}
                      handleToggle={handleToggle}
                      passData={passData}
                      submitModalForm={submitModalForm}
                      passValidate={passValidate}
                      setError={setError}
                      error={error}
                      verifyPass={verifyPass}
                      confirmPassword={confirmPassword}
                      setPassModal={setPassModal}
                      progress={progress}
                      passError={passError}
                      handleDate={handleDate}
                      handleUpdate={handleUpdate}
                      redirectToConsultantProfile={redirectToConsultantProfile}
                      userType={userType}
                      redirectToConsultantDashboard={
                        redirectToConsultantDashboard
                      }
                      handleEdit={handleEdit}
                      toggleDanger={toggleDanger}
                      deleteModal={deleteModal}
                      setDeleteModal={setDeleteModal}
                      handleDeleteData={handleDeleteData}
                      buttonStatus={buttonStatus}
                    />
                  )}
                </>
              )}
            </>
          )}

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>

      {/* <Card>
        <CardBody>
          <h5>Sent Invitations</h5>
          <Row className="mb-3 mt-3">
            <Col lg="5" md="5" sm="12" xs="12">
              <div className="d-flex">
                <div className="">
                  {active && (
                    <ButtonForFunction
                      func={() => setModalOpenCompanion(true)}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={"Invite Companion"}
                      permission={6}
                    />
                  )}
                </div>
              </div>
            </Col>

            <Col lg="7" md="7" sm="12" xs="12"></Col>
          </Row>

          <div>
            <Modal
              isOpen={modalOpenCompanion}
              toggle={closeModalCompanion}
              className="uapp-modal2"
            >
              <ModalHeader>Send an invitation to email</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleCompanionSubmit}>
                  <input
                    type="hidden"
                    name="companionid"
                    id="companionid"
                    value={referenceId}
                  />

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        <span className="text-danger">*</span>Email
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        value={emailCompanion}
                        placeholder="Write Email"
                        onChange={(e) => {
                          handleEmailAffiliateError(e);
                        }}
                      />
                      <span className="text-danger">{emailCompanionError}</span>
                    </Col>
                  </FormGroup>
                  <FormGroup className="d-flex justify-content-between mt-3">
                    <CancelButton cancel={closeModalCompanion} />

                    <SaveButton
                      text="Send Email"
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>

          <div className="table-responsive  mt-3">
            <Table id="table-to-xls">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  <th>Date</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {InvitationList?.map((range, i) => (
                  <tr key={i} style={{ textAlign: "center" }}>
                    <td>{range?.invitedOn}</td>
                    <td>{range?.email}</td>
                    <td>
                      {range?.isRegistered === true
                        ? " Accepted"
                        : "Waiting For Response"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card> */}
    </div>
  );
};
export default CompanionMyTeamList;
