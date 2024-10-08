import React, { useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Button,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  FormGroup,
  DropdownItem,
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
import { useHistory, useLocation, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";

import get from "../../../helpers/get.js";
import { rootUrl } from "../../../constants/constants.js";
import { useState } from "react";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import remove from "../../../helpers/remove.js";
import LinkButton from "../Components/LinkButton.js";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import ButtonLoader from "../Components/ButtonLoader.js";
import Loader from "../Search/Loader/Loader.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import { tableIdList } from "../../../constants/TableIdConstant.js";
import put from "../../../helpers/put.js";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb.js";
import CustomButtonRipple from "../Components/CustomButtonRipple.js";
import post from "../../../helpers/post.js";
import CancelButton from "../../../components/buttons/CancelButton.js";
import SaveButton from "../../../components/buttons/SaveButton.js";

const ConsultantByConsultant = () => {
  const { id } = useParams();

  const [consultantList, setConsultantList] = useState([]);

  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const [delData, setDelData] = useState({});

  // for hide/unhide column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [progress, setProgress] = useState(false);

  const referenceId = localStorage.getItem("referenceId");
  const userTypeId = localStorage.getItem("userType");
  const userType = localStorage.getItem("userType");
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailInvitation, setEmailInvitation] = useState("");
  const [InvitationList, setInvitationList] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (id === undefined) {
      get(
        `Associate/Index?page=${currentPage}&pageSize=${dataPerPage}&id=${referenceId}`
      ).then((res) => {
        console.log("Response", res);
        setConsultantList(res?.models);
        setEntity(res?.totalEntity);
        setSerialNum(res?.firstSerialNumber);

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
        setSerialNum(res?.firstSerialNumber);

        setLoading(false);
        setPageLoad(false);
      });
    }

    get(`TableDefination/Index/${tableIdList?.Associates_List}`).then((res) => {
      console.log("table data", res);
      setTableData(res);
    });
  }, [currentPage, dataPerPage, callApi, loading, success]);

  useEffect(() => {
    get(`Invitation/Index/${referenceId}`).then((action) => {
      setInvitationList(action);

      console.log(action, "emergency");
    });
  }, [success]);

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

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const toggleDanger = (p) => {
    setDelData(p);

    setDeleteModal(true);
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

  // redirect to dashboard
  const backToDashboard = () => {
    if (id == undefined) {
      history.push("/");
    } else {
      history.push("/consultantList");
    }
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(consultantList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const handleEdit = (data) => {
    history.push(`/consultantInformation/${data?.id}`);
  };

  const componentRef = useRef();

  const handleView = (consultantId) => {
    console.log(consultantId);
    if (userTypeId == userTypes?.Consultant) {
      history.push(`/associateDetails/${consultantId}`);
    } else {
      history.push(`/consultantProfile/${consultantId}`);
    }
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    // setCheckSlNo(e.target.checked);
    setCheck(e.target.checked);

    put(
      `TableDefination/Update/${tableIdList?.Associates_List}/${columnId}`
    ).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        // addToast(res?.data?.message, {
        //   appearance: "success",
        //   autoDismiss: true,
        // });
        setSuccess(!success);
      } else {
        // addToast(res?.data?.message, {
        //   appearance: "error",
        //   autoDismiss: true,
        // });
      }
    });
  };

  const handleAddAssociate = () => {
    id ? history.push(`/addConAssociate/${id}`) : history.push(`/addAssociate`);
  };

  const closeModal = () => {
    setModalOpen(false);
    // setTitle("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

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
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });

      // setTitle("");
    });
  };

  return (
    <div>
      {pageLoad ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb
            title="Associates"
            backTo={id === undefined ? "" : "Consultant"}
            path={id === undefined ? "" : "/consultantList"}
          />

          <Card className="uapp-employee-search">
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
                        <div>
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
                  <ModalHeader>Send Invitation to email</ModalHeader>
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
                          <span>Email</span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            name="email"
                            id="email"
                            defaultValue={email}
                            placeholder="Write Email"
                            // onChange={(e) => {
                            //   handleTitle(e);
                            // }}
                          />
                          {/* <span className="text-danger">{TitleError}</span> */}
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
                <div className="table-responsive my-4" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>Sl/NO</th> : null}
                        {tableData[1]?.isActive ? <th>Name</th> : null}
                        {tableData[2]?.isActive ? <th>Email</th> : null}
                        {tableData[3]?.isActive ? <th>Phone</th> : null}
                        {tableData[4]?.isActive ? <th>Designation</th> : null}
                        {tableData[5]?.isActive ? <th>C.Type</th> : null}
                        {tableData[6]?.isActive ? <th>Student</th> : null}
                        {tableData[7]?.isActive ? <th>Applications</th> : null}
                        {tableData[8]?.isActive ? <th>Associates</th> : null}
                        {tableData[9]?.isActive ? <th>Action</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {consultantList?.map((consultant, i) => (
                        <tr
                          key={consultant?.id}
                          style={{ textAlign: "center" }}
                        >
                          {tableData[0]?.isActive ? (
                            <th scope="row">{serialNum + i}</th>
                          ) : null}
                          {tableData[1]?.isActive ? (
                            <td
                              className="cursor-pointer hyperlink-hover"
                              onClick={() => handleView(consultant?.viewId)}
                            >
                              <span> {consultant?.fullName}</span>
                            </td>
                          ) : null}
                          {tableData[2]?.isActive ? (
                            <td>{consultant?.email}</td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>{consultant?.phoneNumber}</td>
                          ) : null}
                          {tableData[4]?.isActive ? (
                            <td>{consultant?.designation}</td>
                          ) : null}
                          {tableData[5]?.isActive ? (
                            <td>{consultant?.typeName}</td>
                          ) : null}
                          {tableData[6]?.isActive ? (
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
                                        <span
                                          className="badge badge-secondary"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/studentByConsultant/${consultant?.id}`}
                                          >
                                            {`View (${consultant?.studentCount})`}
                                          </Link>
                                        </span>
                                      </td>
                                    </>
                                  ) : null}
                                </>
                              ) : (
                                <td>
                                  {" "}
                                  <span className="badge badge-secondary">
                                    {consultant?.studentCount}
                                  </span>
                                </td>
                              )}
                            </>
                          ) : null}

                          {tableData[7]?.isActive ? (
                            <>
                              {" "}
                              {userType !== userTypes?.Consultant ? (
                                <>
                                  {permissions?.includes(
                                    permissionList.View_Application_List
                                  ) ? (
                                    <>
                                      <td>
                                        {consultant?.applicationCount > 0 ? (
                                          <span
                                            onClick={() => {
                                              history.push(
                                                `/applicationsFromConsultant/${consultant?.id}`
                                              );
                                            }}
                                            className="badge badge-secondary pointer"
                                          >
                                            {`View (${consultant?.applicationCount})`}
                                          </span>
                                        ) : (
                                          <span className="badge badge-secondary">
                                            {consultant?.applicationCount}
                                          </span>
                                        )}
                                      </td>
                                    </>
                                  ) : null}
                                </>
                              ) : (
                                <td>
                                  {" "}
                                  <span className="badge badge-secondary">
                                    {consultant?.applicationCount}
                                  </span>
                                </td>
                              )}
                            </>
                          ) : null}

                          {tableData[8]?.isActive ? (
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
                                        {" "}
                                        <span
                                          className="badge badge-secondary"
                                          style={{
                                            cursor: "pointer",
                                            textDecoration: "none",
                                          }}
                                        >
                                          <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/associates/${consultant?.id}`}
                                          >
                                            {`View (${consultant?.associateCount})`}
                                          </Link>
                                        </span>{" "}
                                      </td>
                                    </>
                                  ) : null}{" "}
                                </>
                              ) : (
                                <td>
                                  {" "}
                                  <span className="badge badge-secondary">
                                    {consultant?.associateCount}
                                  </span>
                                </td>
                              )}
                            </>
                          ) : null}

                          {tableData[9]?.isActive ? (
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
          <Card>
            <CardBody>
              <h5>Sent Invitations</h5>

              <div className="table-responsive  mt-3">
                <Table id="table-to-xls">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      <th>Sl/No</th>
                      <th>Date</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {InvitationList?.map((range, i) => (
                      <tr key={range.id} style={{ textAlign: "center" }}>
                        <th scope="row">{1 + i}</th>

                        <td>{range?.createdOn}</td>
                        <td>{range?.email}</td>
                        <td>
                          {range?.isAccepted === true
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
