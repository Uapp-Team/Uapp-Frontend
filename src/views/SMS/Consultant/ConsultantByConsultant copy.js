import React, { useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  FormGroup,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import Pagination from "../../SMS/Pagination/Pagination.jsx";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get.js";
import { useState } from "react";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import remove from "../../../helpers/remove.js";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import ButtonLoader from "../Components/ButtonLoader.js";
import Loader from "../Search/Loader/Loader.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import put from "../../../helpers/put.js";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb.js";
import post from "../../../helpers/post.js";
import CancelButton from "../../../components/buttons/CancelButton.js";
import SaveButton from "../../../components/buttons/SaveButton.js";
import PopOverText from "../../../components/PopOverText.js";
import ColumnAssociates from "../TableColumn/ColumnAssociates.js";
import Uget from "../../../helpers/Uget.js";
import { dateFormate } from "../../../components/date/calenderFormate.js";

const ConsultantByConsultant = () => {
  const associates = JSON.parse(sessionStorage.getItem("associates"));
  const { id } = useParams();
  const [consultantList, setConsultantList] = useState([]);
  const [affiliateList, setAffiliateList] = useState([]);
  const [companionList, setCompanionList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [affiliateEntity, setAffiliateEntity] = useState(0);
  const [companionEntity, setCompanionEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  // const [serialNum, setSerialNum] = useState(0);
  // const [affiliateSerialNum, setAffiliateSerialNum] = useState(0);
  // const [companionSerialNum, setCompanionSerialNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    associates?.currentPage ? associates?.currentPage : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    associates?.dataPerPage ? associates?.dataPerPage : 15
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const [delData, setDelData] = useState({});

  // for hide/unhide column
  const [tableData, setTableData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [progress, setProgress] = useState(false);
  const referenceId = localStorage.getItem("referenceId");
  const userTypeId = localStorage.getItem("userType");
  const userType = localStorage.getItem("userType");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenAffiliate, setModalOpenAffiliate] = useState(false);
  const [modalOpenCompanion, setModalOpenCompanion] = useState(false);
  const [email, setEmail] = useState("");
  const [emailAffiliate, setEmailAffiliate] = useState("");
  const [emailCompanion, setEmailCompanion] = useState("");
  const [InvitationList, setInvitationList] = useState([]);
  const [LevelReportList, setLevelReportList] = useState({});
  const [emailError, setEmailError] = useState("");
  const [emailAffiliateError, setEmailAffiliateError] = useState("");
  const [emailCompanionError, setEmailCompanionError] = useState("");
  const [popoverOpen, setPopoverOpen] = useState("");

  useEffect(() => {
    const tableColumnAssociates = JSON.parse(
      localStorage.getItem("ColumnAssociates")
    );
    tableColumnAssociates && setTableData(tableColumnAssociates);
    !tableColumnAssociates &&
      localStorage.setItem(
        "ColumnAssociates",
        JSON.stringify(ColumnAssociates)
      );
    !tableColumnAssociates && setTableData(ColumnAssociates);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "associates",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        dataPerPage: dataPerPage && dataPerPage,
      })
    );
  }, [currentPage, dataPerPage]);

  useEffect(() => {
    Uget(
      `Affiliate/consultant-paginated-list?page=${currentPage}&pageSize=${dataPerPage}&consulantid=${
        id ? id : referenceId
      }`
    ).then((res) => {
      console.log(res);
      setAffiliateList(res?.items);
      setAffiliateEntity(res?.totalFiltered);

      setLoading(false);
      setPageLoad(false);
    });

<<<<<<< HEAD
    Uget(
      `Companion/consultant-paginated-list?page=${currentPage}&pageSize=${dataPerPage}&consultantid=${
=======
    Uget(
      `Ambassador/consultant-paginated-list?page=${currentPage}&pageSize=${dataPerPage}&consultantid=${
>>>>>>> b3c1e8ad6ddf97ce80cbdc6cdb8ab3ddead993fc
        id ? id : referenceId
      }`
    ).then((res) => {
      console.log(res);
      setCompanionList(res?.items);
      setCompanionEntity(res?.totalFiltered);

      setLoading(false);
      setPageLoad(false);
    });
  }, [currentPage, dataPerPage, id, referenceId, success]);

  useEffect(() => {
    if (id === undefined) {
      get(
        `Associate/Index?page=${currentPage}&pageSize=${dataPerPage}&id=${referenceId}`
      ).then((res) => {
        console.log("Response", res);
        setConsultantList(res?.models);
        setEntity(res?.totalEntity);

        setLoading(false);
        setPageLoad(false);
      });
    } else {
      get(
        `Associate/Index?page=${currentPage}&pageSize=${dataPerPage}&id=${id}`
      ).then((res) => {
        console.log(res);
        setConsultantList(res?.models);
        setEntity(res?.totalEntity);

        setLoading(false);
        setPageLoad(false);
      });
    }
  }, [currentPage, dataPerPage, callApi, loading, success, id, referenceId]);

  useEffect(() => {
    get(`Invitation/Index/${referenceId}`).then((action) => {
      setInvitationList(action);

      console.log(action, "emergency");
    });
  }, [referenceId, success]);

  useEffect(() => {
    get(`LevelReport/Get/${id ? id : referenceId}`).then((action) => {
      setLevelReportList(action);

      console.log(action, "Level Report");
    });
  }, [id, referenceId, success]);

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
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

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const handleDeleteData = () => {
    setProgress(true);
    remove(`Consultant/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      //
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const handleEdit = (data) => {
    history.push(`/consultantInformation/${data?.id}`);
  };

  const componentRef = useRef();

  const handleView = (consultantId) => {
    console.log(consultantId);
    if (userTypeId === userTypes?.Consultant.toString()) {
      history.push(`/associateDetails/${consultantId}`);
    } else {
      history.push(`/consultantProfile/${consultantId}`);
    }
  };
  const handleAffiliateView = (affiliateId) => {
    history.push(`/affiliate-profile/${affiliateId}`);
  };
  const handleCompanionView = (companionId) => {
    history.push(`/companion-profile/${companionId}`);
  };

  // for hide/unhide column

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnAssociates", JSON.stringify(values));
  };

  const handleAddAssociate = () => {
    id ? history.push(`/addConAssociate/${id}`) : history.push(`/addAssociate`);
  };
  const handleAddAffiliate = () => {
    id
      ? history.push(`/affiliate-registrationByCons/${id}`)
      : history.push(`/affiliate-registration`);
  };
  const handleAddCompanion = () => {
    id
      ? history.push(`/companion-registrationByCons/${id}`)
      : history.push(`/companion-registration`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEmail("");
    setEmailError("");
    // setTitle("");
  };
  const closeModalAffiliate = () => {
    setModalOpenAffiliate(false);
    setEmailAffiliate("");
    setEmailAffiliateError("");
    // setTitle("");
  };
  const closeModalCompanion = () => {
    setModalOpenCompanion(false);
    setEmailCompanion("");
    setEmailCompanionError("");
    // setTitle("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Email is not Valid");
    } else {
      setButtonStatus(true);
      setProgress(true);
      post(
        `Invitation/Send?${referenceId}=1& ${email}=asdfs@mial.com`,
        subData
      ).then((action) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
        setModalOpen(false);
        setEmail("");
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });

        // setTitle("");
      });
    }
  };

  const handleAffiliateSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (!emailAffiliate) {
      setEmailAffiliateError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailAffiliate)
    ) {
      setEmailAffiliateError("Email is not Valid");
    } else {
      setButtonStatus(true);
      setProgress(true);
      put(
        `AffiliateTeamInvitation?consultantid=${referenceId}&email=${emailAffiliate}`,
        subData
      ).then((action) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
        setModalOpenAffiliate(false);
        setEmailAffiliate("");
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });

        // setTitle("");
      });
    }
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
        `CompanionTeamInvitation?consultantid=${referenceId}&email=${emailCompanion}`,
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

  const handleEmailError = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const handleEmailAffiliateError = (e) => {
    setEmailAffiliate(e.target.value);
    if (e.target.value === "") {
      setEmailAffiliateError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailAffiliateError("Email is not valid");
    } else {
      setEmailAffiliateError("");
    }
  };

  const handleEmailCompanionError = (e) => {
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

  return (
    <div>
      {pageLoad ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb
            title="My Team"
            // backTo={userType === userTypes?.Consultant ? null : "Consultant"}
            // backTo={id === undefined ? "" : "Consultant"}
            path={id === undefined ? "" : "/consultantList"}
          />

          <Card className="uapp-employee-search zindex-100">
            <CardBody>
              {/* new */}
              <Row className="mb-3">
                <Col lg="5" md="5" sm="12" xs="12">
                  <div className="d-flex">
                    <div>
                      {permissions?.includes(permissionList?.Add_Associate) ? (
                        <ButtonForFunction
                          func={handleAddAssociate}
                          className={"btn btn-uapp-add "}
                          icon={<i className="fas fa-plus"></i>}
                          name={" Add Associate"}
                          permission={6}
                        />
                      ) : null}
                    </div>

                    <div className="mx-3">
                      {permissions?.includes(permissionList?.Add_Associate) ? (
                        <ButtonForFunction
                          func={() => setModalOpen(true)}
                          className={"btn btn-uapp-add "}
                          icon={<i className="fas fa-plus"></i>}
                          name={" Invite"}
                          permission={6}
                        />
                      ) : null}
                    </div>
                  </div>
                </Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
                    {/* <Col lg="2">
                    
                    <div className='ms-2'>
                      <ReactToPrint
                        trigger={()=><div className="uapp-print-icon">
                          <div className="text-right">
                            <span title="Print to pdf"> <i className="fas fa-print"></i> </span>
                          </div>
                        </div>}
                        content={() => componentRef.current}
                      />
                    </div>
                </Col> */}

                    <div className="mr-2">
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

                    <div className="mr-2">
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
                              {/* <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p> */}

                              {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                            /> */}

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
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide ends here */}

                    {/* <div className="me-3">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen1}
                    toggle={toggle1}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd">
                      <div className="d-flex justify-content-around align-items-center mt-2">
                        <div className="text-white cursor-pointer">
                          <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p>
                        </div>
                        <div className="text-white cursor-pointer">
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
                </div> */}
                  </div>
                </Col>
              </Row>

              <div>
                <Modal
                  isOpen={modalOpen}
                  toggle={closeModal}
                  className="uapp-modal2"
                >
                  <ModalHeader>Send an invitation to email</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      <input
                        type="hidden"
                        name="consultantId"
                        id="consultantId"
                        value={referenceId}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
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
                            value={email}
                            placeholder="Write Email"
                            onChange={(e) => {
                              handleEmailError(e);
                            }}
                          />
                          <span className="text-danger">{emailError}</span>
                        </Col>
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-between mt-3">
                        <CancelButton cancel={closeModal} />

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

              {loading ? (
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div
                  className="table-responsive my-4 fixedhead"
                  ref={componentRef}
                >
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>Name</th> : null}
                        {tableData[1]?.isActive ? <th>Contact</th> : null}
                        {tableData[2]?.isActive ? <th>Designation</th> : null}
                        {tableData[3]?.isActive ? <th>C.Type</th> : null}
                        {tableData[4]?.isActive ? <th>Student</th> : null}
                        {tableData[5]?.isActive ? <th>Applications</th> : null}
                        {tableData[6]?.isActive ? <th>Associates</th> : null}
                        {tableData[7]?.isActive ? <th>Action</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {consultantList?.map((consultant, i) => (
                        <tr
                          key={consultant?.id}
                          style={{ textAlign: "center" }}
                        >
                          {tableData[0]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <span
                                onClick={() => {
                                  history.push(
                                    userTypeId === userTypes?.Consultant
                                      ? `/associateDetails/${consultant?.id}`
                                      : `/consultantProfile/${consultant?.id}`
                                  );
                                }}
                              >
                                {consultant?.fullName}
                              </span>
                            </td>
                          ) : null}
                          {tableData[1]?.isActive ? (
                            <td>
                              <div className="d-flex justify-content-center">
                                <PopOverText
                                  value={
                                    consultant?.phoneNumber &&
                                    consultant?.phoneNumber.includes("+")
                                      ? consultant?.phoneNumber
                                      : consultant?.phoneNumber &&
                                        !consultant?.phoneNumber.includes("+")
                                      ? "+" + consultant?.phoneNumber
                                      : null
                                  }
                                  // value={consultant?.phoneNumber}
                                  btn={<i class="fas fa-phone"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                                <PopOverText
                                  value={consultant?.email}
                                  btn={<i className="far fa-envelope"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                              </div>
                            </td>
                          ) : null}

                          {tableData[2]?.isActive ? (
                            <td>{consultant?.designation}</td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>{consultant?.typeName}</td>
                          ) : null}
                          {tableData[4]?.isActive ? (
                            <>
                              {" "}
                              {userType !== userTypes?.Consultant ? (
                                <>
                                  {" "}
                                  {permissions?.includes(
                                    permissionList.View_Student_list
                                  ) ? (
                                    <>
                                      <td>
                                        <div style={{ marginTop: "5px" }}>
                                          <span
                                            onClick={() => {
                                              history.push(
                                                `/studentByConsultant/${consultant?.id}`
                                              );
                                            }}
                                            className="Count-first"
                                          >
                                            {consultant?.studentCount}
                                          </span>
                                        </div>
                                      </td>
                                    </>
                                  ) : null}
                                </>
                              ) : (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      className="Count-first"
                                      onClick={() => {
                                        history.push(
                                          `/studentByConsultant/${consultant?.id}`
                                        );
                                      }}
                                    >
                                      {consultant?.studentCount}
                                    </span>
                                  </div>
                                </td>
                              )}
                            </>
                          ) : null}

                          {tableData[5]?.isActive ? (
                            <>
                              {" "}
                              {userType === userTypes?.Consultant ? (
                                <>
                                  {permissions?.includes(
                                    permissionList.View_Application_List
                                  ) ? (
                                    <>
                                      <td>
                                        <div style={{ marginTop: "5px" }}>
                                          <span
                                            onClick={() => {
                                              history.push(
                                                `/applicationsFromAssociate/${consultant?.id}`
                                              );
                                            }}
                                            className="Count-second"
                                          >
                                            {consultant?.applicationCount}
                                          </span>
                                        </div>
                                      </td>
                                    </>
                                  ) : null}
                                </>
                              ) : (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span className="Count-second-no-pointer">
                                      {consultant?.applicationCount}
                                    </span>
                                  </div>
                                </td>
                              )}
                            </>
                          ) : null}

                          {/* <span
                            className="Count-second"
                            onClick={() => {
                              history.push(
                                `/applicationsFromAssociates/${consultant?.id}`
                              );
                            }}
                          >
                            {consultant?.applicationCount}
                          </span> */}

                          {tableData[6]?.isActive ? (
                            <>
                              {" "}
                              {userType !== userTypes?.Consultant ? (
                                <>
                                  {" "}
                                  {permissions?.includes(
                                    permissionList.View_Associate
                                  ) ? (
                                    <>
                                      <td>
                                        <div style={{ marginTop: "5px" }}>
                                          <span
                                            onClick={() => {
                                              history.push(
                                                `/associates/${consultant?.id}`
                                              );
                                            }}
                                            className="Count-third"
                                          >
                                            {consultant?.associateCount}
                                          </span>
                                        </div>
                                      </td>
                                    </>
                                  ) : null}{" "}
                                </>
                              ) : (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      className="Count-third"
                                      onClick={() => {
                                        history.push(
                                          `/associates/${consultant?.id}`
                                        );
                                      }}
                                    >
                                      {consultant?.associateCount}
                                    </span>
                                  </div>
                                </td>
                              )}
                            </>
                          ) : null}

                          {tableData[7]?.isActive ? (
                            <>
                              {" "}
                              <td
                                style={{ width: "8%" }}
                                className="text-center"
                              >
                                <ButtonGroup variant="text">
                                  {permissions?.includes(
                                    permissionList?.View_Associate
                                  ) ? (
                                    <ButtonForFunction
                                      func={() => handleView(consultant?.id)}
                                      color={"primary"}
                                      className={"mx-1 btn-sm"}
                                      icon={<i className="fas fa-eye"></i>}
                                      permission={6}
                                    />
                                  ) : null}

                                  {userType === userTypes.BranchManager ||
                                  userType === userTypes?.Admin ||
                                  userType === userTypes?.SystemAdmin ? (
                                    <ButtonForFunction
                                      func={() => handleEdit(consultant)}
                                      color={"warning"}
                                      className={"mx-1 btn-sm"}
                                      icon={<i className="fas fa-edit"></i>}
                                      permission={6}
                                    />
                                  ) : null}

                                  {/* {permissions?.includes(
                                  permissionList.Delete_Associate
                                ) ? (
                                  <>
                                    {consultant?.id !== 1 ? (
                                      <ButtonForFunction
                                        color={"danger"}
                                        className={"mx-1 btn-sm"}
                                        func={() => toggleDanger(consultant)}
                                        icon={
                                          <i className="fas fa-trash-alt"></i>
                                        }
                                        permission={6}
                                      />
                                    ) : // <Button color="danger" className="mx-1 btn-sm" disabled><i className="fas fa-trash-alt"></i></Button>
                                    null}
                                  </>
                                ) : null} */}
                                </ButtonGroup>
                                <Modal
                                  isOpen={deleteModal}
                                  toggle={() => setDeleteModal(!deleteModal)}
                                  className="uapp-modal"
                                >
                                  <ModalBody>
                                    <p>
                                      Are You Sure to Delete this ? Once Deleted
                                      it can't be Undone!
                                    </p>
                                  </ModalBody>

                                  <ModalFooter>
                                    <Button
                                      color="danger"
                                      onClick={handleDeleteData}
                                    >
                                      {progress ? <ButtonLoader /> : "YES"}
                                    </Button>
                                    <Button
                                      onClick={() => setDeleteModal(false)}
                                    >
                                      NO
                                    </Button>
                                  </ModalFooter>
                                </Modal>
                              </td>
                            </>
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

          <Card className="uapp-employee-search zindex-100">
            <CardBody>
              <h5>My Affiliate List</h5>
              {/* new */}
              <Row className="mb-3 mt-3">
                <Col lg="5" md="5" sm="12" xs="12">
                  <div className="d-flex">
                    <div>
                      <ButtonForFunction
                        func={handleAddAffiliate}
                        className={"btn btn-uapp-add "}
                        icon={<i className="fas fa-plus"></i>}
                        name={" Add Affiliate"}
                        permission={6}
                      />
                    </div>

                    <div className="mx-3">
                      <ButtonForFunction
                        func={() => setModalOpenAffiliate(true)}
                        className={"btn btn-uapp-add "}
                        icon={<i className="fas fa-plus"></i>}
                        name={"Invite Affiliate"}
                        permission={6}
                      />
                    </div>
                  </div>
                </Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
                    {/* <Col lg="2">
                    
                    <div className='ms-2'>
                      <ReactToPrint
                        trigger={()=><div className="uapp-print-icon">
                          <div className="text-right">
                            <span title="Print to pdf"> <i className="fas fa-print"></i> </span>
                          </div>
                        </div>}
                        content={() => componentRef.current}
                      />
                    </div>
                </Col> */}

                    <div className="mr-2">
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

                    <div className="mr-2">
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
                              {/* <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p> */}

                              {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                            /> */}

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
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide ends here */}

                    {/* <div className="me-3">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen1}
                    toggle={toggle1}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd">
                      <div className="d-flex justify-content-around align-items-center mt-2">
                        <div className="text-white cursor-pointer">
                          <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p>
                        </div>
                        <div className="text-white cursor-pointer">
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
                </div> */}
                  </div>
                </Col>
              </Row>

              <div>
                <Modal
                  isOpen={modalOpenAffiliate}
                  toggle={closeModalAffiliate}
                  className="uapp-modal2"
                >
                  <ModalHeader>Send an invitation to email</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleAffiliateSubmit}>
                      <input
                        type="hidden"
                        name="consultantId"
                        id="consultantId"
                        value={referenceId}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
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
                            value={emailAffiliate}
                            placeholder="Write Email"
                            onChange={(e) => {
                              handleEmailAffiliateError(e);
                            }}
                          />
                          <span className="text-danger">
                            {emailAffiliateError}
                          </span>
                        </Col>
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-between mt-3">
                        <CancelButton cancel={closeModalAffiliate} />

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

              {loading ? (
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div
                  className="table-responsive my-4 fixedhead"
                  ref={componentRef}
                >
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>UAPP ID</th> : null}
                        {tableData[1]?.isActive ? <th>Full Name</th> : null}
                        {tableData[2]?.isActive ? <th>Contact</th> : null}
                        {tableData[3]?.isActive ? <th>Started</th> : null}
                        {tableData[4]?.isActive ? <th>Invitation</th> : null}
                        {tableData[5]?.isActive ? <th>Team Member</th> : null}
                        {tableData[6]?.isActive ? <th>Action</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {affiliateList?.map((affiliate, i) => (
                        <tr key={affiliate?.id} style={{ textAlign: "center" }}>
                          {tableData[0]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <Link
                                className="text-id hover"
                                to={`/affiliate-profile/${affiliate?.id}`}
                              >
                                {affiliate?.viewId}
                              </Link>
                            </td>
                          ) : null}
                          {tableData[1]?.isActive ? (
                            <td>
                              <div className="cursor-pointer hyperlink-hover">
                                <Link
                                  className="text-id hover"
                                  to={`/affiliate-profile/${affiliate?.id}`}
                                >
                                  {affiliate?.name}
                                </Link>
                              </div>
                            </td>
                          ) : null}

                          {tableData[2]?.isActive ? (
                            <td>
                              <div className="d-flex justify-content-center">
                                <PopOverText
                                  value={
                                    affiliate?.phone &&
                                    affiliate?.phone.includes("+")
                                      ? affiliate?.phone
                                      : affiliate?.phone &&
                                        !affiliate?.phone.includes("+")
                                      ? "+" + affiliate?.phone
                                      : null
                                  }
                                  btn={<i class="fas fa-phone"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                                <PopOverText
                                  value={affiliate?.email}
                                  btn={<i className="far fa-envelope"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                              </div>
                            </td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>{dateFormate(affiliate?.createdOn)}</td>
                          ) : null}
                          {tableData[4]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span className="Count-first-no-pointer">
                                  {affiliate?.invitationCount}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {tableData[5]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span className="Count-second-no-pointer">
                                  {affiliate?.teamMembersCount}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {tableData[7]?.isActive ? (
                            <>
                              {" "}
                              <td
                                style={{ width: "8%" }}
                                className="text-center"
                              >
                                <ButtonGroup variant="text">
                                  <ButtonForFunction
                                    func={() =>
                                      handleAffiliateView(affiliate?.id)
                                    }
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-eye"></i>}
                                    permission={6}
                                  />
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

              <Pagination
                dataPerPage={dataPerPage}
                totalData={affiliateEntity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </CardBody>
          </Card>

          <Card className="uapp-employee-search zindex-100">
            <CardBody>
              <h5>My Companion List</h5>
              {/* new */}
              <Row className="mb-3">
                <Col lg="5" md="5" sm="12" xs="12">
                  <div className="d-flex">
                    <div>
                      <ButtonForFunction
                        func={handleAddCompanion}
                        className={"btn btn-uapp-add "}
                        icon={<i className="fas fa-plus"></i>}
                        name={" Add Companion"}
                        permission={6}
                      />
                    </div>
                    <div className="mx-3">
                      <ButtonForFunction
                        func={() => setModalOpenCompanion(true)}
                        className={"btn btn-uapp-add "}
                        icon={<i className="fas fa-plus"></i>}
                        name={"Invite Companion"}
                        permission={6}
                      />
                    </div>
                  </div>
                </Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
                    <div className="mr-2">
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

                    <div className="mr-2">
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
                              {/* <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p> */}

                              {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                            /> */}

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
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide ends here */}

                    {/* <div className="me-3">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen1}
                    toggle={toggle1}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd">
                      <div className="d-flex justify-content-around align-items-center mt-2">
                        <div className="text-white cursor-pointer">
                          <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p>
                        </div>
                        <div className="text-white cursor-pointer">
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
                </div> */}
                  </div>
                </Col>
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
                        name="consultantId"
                        id="consultantId"
                        value={referenceId}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
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
                              handleEmailCompanionError(e);
                            }}
                          />
                          <span className="text-danger">
                            {emailCompanionError}
                          </span>
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

              {loading ? (
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div
                  className="table-responsive my-4 fixedhead"
                  ref={componentRef}
                >
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>UAPP ID</th> : null}
                        {tableData[1]?.isActive ? <th>Full Name</th> : null}
                        {tableData[2]?.isActive ? <th>Contact</th> : null}
                        {tableData[3]?.isActive ? <th>Started</th> : null}
                        {tableData[4]?.isActive ? <th>Invitation</th> : null}
                        {tableData[5]?.isActive ? <th>Team Member</th> : null}
                        {tableData[6]?.isActive ? <th>Action</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {companionList?.map((companion, i) => (
                        <tr key={companion?.id} style={{ textAlign: "center" }}>
                          {tableData[0]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <Link
                                className="text-id hover"
                                to={`/companion-profile/${companion?.id}`}
                              >
                                {companion?.viewId}
                              </Link>
                            </td>
                          ) : null}
                          {tableData[1]?.isActive ? (
                            <td>
                              <div className="cursor-pointer hyperlink-hover">
                                <Link
                                  className="text-id hover"
                                  to={`/companion-profile/${companion?.id}`}
                                >
                                  {companion?.name}
                                </Link>
                              </div>
                            </td>
                          ) : null}

                          {tableData[2]?.isActive ? (
                            <td>
                              <div className="d-flex justify-content-center">
                                <PopOverText
                                  value={
                                    companion?.phone &&
                                    companion?.phone.includes("+")
                                      ? companion?.phone
                                      : companion?.phone &&
                                        !companion?.phone.includes("+")
                                      ? "+" + companion?.phone
                                      : null
                                  }
                                  btn={<i class="fas fa-phone"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                                <PopOverText
                                  value={companion?.email}
                                  btn={<i className="far fa-envelope"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                              </div>
                            </td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>{dateFormate(companion?.createdOn)}</td>
                          ) : null}
                          {tableData[4]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span className="Count-first">
                                  {companion?.invitationCount}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {tableData[5]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span className="Count-second">
                                  {companion?.teamMembersCount}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {tableData[7]?.isActive ? (
                            <>
                              {" "}
                              <td
                                style={{ width: "8%" }}
                                className="text-center"
                              >
                                <ButtonGroup variant="text">
                                  <ButtonForFunction
                                    func={() =>
                                      handleCompanionView(companion?.id)
                                    }
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-eye"></i>}
                                    permission={6}
                                  />
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

              <Pagination
                dataPerPage={dataPerPage}
                totalData={companionEntity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h5>Level Report</h5>

              <div className="table-responsive  mt-3">
                <Table id="table-to-xls">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      <th>Designation</th>
                      <th>Total Associates</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ textAlign: "center" }}>
                      <td>Business Development Manager</td>

                      <td>
                        {LevelReportList?.result?.businessDevelopmentManager}
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>Executive Director</td>

                      <td>{LevelReportList?.result?.executiveDirector}</td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>Senior Business Development Manager</td>

                      <td>
                        {
                          LevelReportList?.result
                            ?.seniorBusinessDevelopmentManager
                        }
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>Senior Executive Marketing Officer</td>

                      <td>
                        {
                          LevelReportList?.result
                            ?.seniorExecutiveMarketingOfficer
                        }
                      </td>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                      <td>Student Advisor Marketing Officer</td>

                      <td>
                        {
                          LevelReportList?.result
                            ?.studentAdvisorMarketingOfficer
                        }
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h5>Sent Invitations</h5>

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
          </Card>
        </>
      )}
    </div>
  );
};

export default ConsultantByConsultant;
