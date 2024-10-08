import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import get from "../../../../helpers/get";
import { connect } from "react-redux";

import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import { useToasts } from "react-toast-notifications";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import LinkSpanButton from "../../Components/LinkSpanButton";
import remove from "../../../../helpers/remove";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import { tableIdList } from "../../../../constants/TableIdConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const CampusList = (props) => {
  const [campusList, setCampusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStr, setSearchStr] = useState("");
  const [callApi, setCallApi] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [uniNameFromObj, setUniNameFromObj] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [camppName, setCamppName] = useState("");
  const [camppId, setCamppId] = useState(0);

  const [tableData, setTableData] = useState([]);

  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);

  const { addToast } = useToasts();
  const { uniId } = useParams();

  const history = useHistory();
  const location = useLocation();
  localStorage.setItem("uIdForCamp", location?.id);

  useEffect(() => {
    get(
      `UniversityCampus/index?universityId=${uniId}&search=${searchStr}`
    ).then((res) => {
      console.log(res);
      setCampusList(res);
      setLoading(false);
    });

    get(`University/Get/${uniId}`).then((res) => {
      setUniNameFromObj(res?.name);
    });

    get(`TableDefination/Index/${tableIdList?.Campus_List}`).then((res) => {
      console.log("table data", res);
      setTableData(res);
    });
  }, [callApi, currentPage, searchStr, loading, success, uniId]);

  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  const handleClearSearch = () => {
    setSearchStr("");
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

  const handleUpdate = (id) => {
    history.push(`/CampusInformation/${uniId}/${id}`);
  };

  const componentRef = useRef();

  const toggleDanger = (p) => {
    setCamppId(p?.id);
    setCamppName(p?.name);
    setDeleteModal(true);
  };

  const handleDeletePermission = (id) => {
    setButtonStatus1(true);
    setProgress(true);
    remove(`UniversityCampus/Delete/${id}`).then((action) => {
      setButtonStatus1(false);
      setProgress(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setCamppId(0);
      setCamppName("");
    });
  };

  const handleAddCampus = () => {
    history.push(`/AddCampus/${uniId}`);
  };
  const handlRedirectToCampusDetails = (campusId) => {
    history.push(`/campusDetails/${campusId}`);
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    put(`TableDefination/Update/${tableIdList?.Campus_List}/${columnId}`).then(
      (res) => {
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
      }
    );
  };

  return (
    <>
      <BreadCrumb
        title="Campus List"
        backTo="University"
        path="/universityList"
      />

      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Input
              style={{ height: "2.7rem" }}
              type="text"
              name="search"
              value={searchStr}
              id="search"
              placeholder="Name ,Short Name"
              onChange={searchValue}
              onKeyDown={handleKeyDown}
            />
          </div>

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div
                  className="mt-1 mx-1 d-flex btn-clear"
                  onClick={handleClearSearch}
                >
                  <span className="text-danger">
                    <i className="fa fa-times"></i> Clear
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          {uniNameFromObj ? (
            <div className="test-score-div-1-style mt-1 mb-4">
              <span className="test-score-span-1-style">
                Showing campus list of <b>{uniNameFromObj}</b>
              </span>
            </div>
          ) : null}

          <Row className="mb-3">
            <Col lg="6" md="6" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              {permissions?.includes(permissionList.Add_University) ? (
                <ButtonForFunction
                  func={() => handleAddCampus()}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Campus"}
                  permission={6}
                />
              ) : null}
            </Col>

            <Col lg="6" md="6" sm="12" xs="12">
              <div className="d-flex justify-content-md-end justify-content-sm-start">
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

          {permissions?.includes(permissionList.View_University_List) && (
            <>
              {loading ? (
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div className="table-responsive" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>SL/NO</th> : null}
                        {tableData[1]?.isActive ? <th>Name</th> : null}
                        {tableData[2]?.isActive ? <th>Campus City</th> : null}
                        {tableData[3]?.isActive ? <th>Student</th> : null}

                        {permissions?.includes(
                          permissionList.View_Subject_List
                        ) ? (
                          <>
                            {" "}
                            {tableData[4]?.isActive ? <th>Courses</th> : null}
                          </>
                        ) : null}
                        {tableData[5]?.isActive ? (
                          <th style={{ width: "8%" }} className="text-center">
                            Action
                          </th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {campusList?.map((campus, i) => (
                        <tr key={campus?.id} style={{ textAlign: "center" }}>
                          {tableData[0]?.isActive ? (
                            <th scope="row">{i + 1}</th>
                          ) : null}

                          {tableData[1]?.isActive ? (
                            <td>{campus?.name}</td>
                          ) : null}
                          {tableData[2]?.isActive ? (
                            <td>{campus?.universityCity?.name}</td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>
                              Total Student - {campus?.totalStudent} {<br />}
                              International Student -{" "}
                              {campus?.internationalStudent}
                            </td>
                          ) : null}
                          {permissions?.includes(
                            permissionList.View_Subject_List
                          ) ? (
                            <>
                              {" "}
                              {tableData[4]?.isActive ? (
                                <td>
                                  {" "}
                                  <span
                                    className="badge badge-secondary"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <LinkSpanButton
                                      url={`/campusSubjectList/${campus?.id}`}
                                      className={"text-decoration-none"}
                                      data={"View"}
                                      permission={6}
                                    />
                                  </span>{" "}
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[5]?.isActive ? (
                            <td style={{ width: "8%" }} className="text-center">
                              <ButtonGroup variant="text">
                                {permissions?.includes(
                                  permissionList.View_University
                                ) ? (
                                  <ButtonForFunction
                                    func={() =>
                                      handlRedirectToCampusDetails(campus?.id)
                                    }
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-eye"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {permissions?.includes(
                                  permissionList.Edit_University
                                ) ? (
                                  <ButtonForFunction
                                    func={() => handleUpdate(campus?.id)}
                                    color={"warning"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-edit"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {permissions?.includes(
                                  permissionList.Delete_University
                                ) ? (
                                  <ButtonForFunction
                                    color={"danger"}
                                    func={() => toggleDanger(campus)}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-trash-alt"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                <Modal
                                  isOpen={deleteModal}
                                  toggle={() => {
                                    setDeleteModal(!deleteModal);
                                    setCamppId(0);
                                    setCamppName("");
                                  }}
                                  className="uapp-modal"
                                >
                                  <ModalBody>
                                    <p>
                                      Are You Sure to Delete this{" "}
                                      <b>{camppName}</b> ? Once Deleted it can't
                                      be Undone!
                                    </p>
                                  </ModalBody>

                                  <ModalFooter>
                                    <Button
                                      disabled={buttonStatus1}
                                      color="danger"
                                      onClick={() =>
                                        handleDeletePermission(camppId)
                                      }
                                    >
                                      {progress ? <ButtonLoader /> : "YES"}
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        setDeleteModal(false);
                                        setCamppId(0);
                                        setCamppName("");
                                      }}
                                    >
                                      NO
                                    </Button>
                                  </ModalFooter>
                                </Modal>
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
          )}

          <div className="d-flex justify-content-end mt-3">
            <h5>Total Results Found: {campusList.length}</h5>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

// export default CampusList;

const mapStateToProps = (state) => ({
  univerSityStateList: state.universityStateDataReducer.universityStates,
});
export default connect(mapStateToProps)(CampusList);
