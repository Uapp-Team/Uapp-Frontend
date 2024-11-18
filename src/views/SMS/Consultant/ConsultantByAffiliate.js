import React, { useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
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
  Form,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import Pagination from "../Pagination/Pagination.jsx";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get.js";
import { useState } from "react";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl.js";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import Loader from "../Search/Loader/Loader.js";
import put from "../../../helpers/put.js";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb.js";
import CancelButton from "../../../components/buttons/CancelButton.js";
import SaveButton from "../../../components/buttons/SaveButton.js";
import PopOverText from "../../../components/PopOverText.js";
import ColumnAssociates from "../TableColumn/ColumnAssociates.js";
import Uget from "../../../helpers/Uget.js";
import { dateFormate } from "../../../components/date/calenderFormate.js";

const ConsultantByAffiliate = () => {
  const associates = JSON.parse(sessionStorage.getItem("associates"));
  const { id } = useParams();
  const [affiliateList, setAffiliateList] = useState([]);
  const [affiliateEntity, setAffiliateEntity] = useState(0);
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
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  // for hide/unhide column
  const [tableData, setTableData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const referenceId = localStorage.getItem("referenceId");
  const [modalOpenAffiliate, setModalOpenAffiliate] = useState(false);
  const [emailAffiliate, setEmailAffiliate] = useState("");
  const [InvitationList, setInvitationList] = useState([]);
  const [emailAffiliateError, setEmailAffiliateError] = useState("");
  const [popoverOpen, setPopoverOpen] = useState("");

  const handleAddAffiliate = () => {
    id
      ? history.push(`/affiliate-registrationByCons/${id}`)
      : history.push(`/affiliate-registration`);
  };

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
  }, [currentPage, dataPerPage, id, referenceId, success]);

  useEffect(() => {
    get(`AffiliateTeamInvitation?consultantid=${referenceId}`).then(
      (action) => {
        setInvitationList(action);

        console.log(action, "emergency");
      }
    );
  }, [referenceId, success]);

  // user select data per page
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

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const componentRef = useRef();

  const handleAffiliateView = (affiliateId) => {
    history.push(`/affiliate-profile/${affiliateId}`);
  };

  // for hide/unhide column

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnAssociates", JSON.stringify(values));
  };

  const closeModalAffiliate = () => {
    setModalOpenAffiliate(false);
    setEmailAffiliate("");
    setEmailAffiliateError("");
    // setTitle("");
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

  return (
    <div>
      {pageLoad ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb
            title="Affiliates"
            backTo={id === undefined ? "" : "Consultant"}
            path={id === undefined ? "" : "/consultantList"}
          />

          <Card className="uapp-employee-search zindex-100">
            <CardBody>
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
                  <ModalHeader>Send Invitation to email</ModalHeader>
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
                        {tableData[3]?.isActive ? <th>Parent</th> : null}
                        {tableData[3]?.isActive ? <th>Started</th> : null}
                        {tableData[4]?.isActive ? <th>Invitation</th> : null}
                        {tableData[6]?.isActive ? <th>Leads</th> : null}
                        {tableData[6]?.isActive ? <th>Students</th> : null}
                        {tableData[5]?.isActive ? <th>Team Member</th> : null}
                        {tableData[8]?.isActive ? <th>Application</th> : null}
                        {tableData[9]?.isActive ? <th>Registered</th> : null}
                        {tableData[10]?.isActive ? <th>Status</th> : null}
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
                            <td>{affiliate?.parentName}</td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>{dateFormate(affiliate?.createdOn)}</td>
                          ) : null}
                          {tableData[4]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span
                                  className="Count-first"
                                  onClick={() => {
                                    history.push(
                                      `/affiliate-Invitation-list/${affiliate?.id}`
                                    );
                                  }}
                                >
                                  {affiliate?.invitationCount}
                                </span>
                              </div>
                            </td>
                          ) : null}
                          {tableData[6]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span
                                  className="Count-fifth-no-pointer"
                                  onClick={() => {
                                    history.push(
                                      `/affiliate-lead-List/${affiliate?.id}`
                                    );
                                  }}
                                >
                                  {affiliate?.leadCount}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {tableData[6]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span
                                  className="Count-sixth-no-pointer"
                                  onClick={() => {
                                    history.push(
                                      `/affiliate-student-List/${affiliate?.id}`
                                    );
                                  }}
                                >
                                  {affiliate?.studentCount}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {tableData[5]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span
                                  className="Count-second"
                                  onClick={() => {
                                    history.push(
                                      `/affiliate-team-List/${affiliate?.id}`
                                    );
                                  }}
                                >
                                  {affiliate?.teamMembersCount}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {tableData[8]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span
                                  className="Count-third-no-pointer"
                                  // onClick={() => {
                                  //   history.push(
                                  //     `/companion-team-List/${companion?.id}`
                                  //   );
                                  // }}
                                >
                                  {affiliate?.totalApplicationCount}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {tableData[9]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span
                                  className="Count-fourth-no-pointer"
                                  // onClick={() => {
                                  //   history.push(
                                  //     `/companion-team-List/${companion?.id}`
                                  //   );
                                  // }}
                                >
                                  {affiliate?.totalRegisteredApplicationCount}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {tableData[10]?.isActive ? (
                            <td>{affiliate?.accountStatus}</td>
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

          {/* <Card>
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
          </Card> */}
        </>
      )}
    </div>
  );
};

export default ConsultantByAffiliate;
