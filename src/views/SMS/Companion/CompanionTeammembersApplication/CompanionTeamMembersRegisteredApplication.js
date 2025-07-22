import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  FormGroup,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl.js";
import ReactToPrint from "react-to-print";

import { useParams } from "react-router";
import ColumnApplicationStudent from "../../TableColumn/ColumnApplicationStudent.js";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb.js";
import { permissionList } from "../../../../constants/AuthorizationConstant.js";
import PaginationOnly from "../../Pagination/PaginationOnly.jsx";
import get from "../../../../helpers/get.js";

const CompanionTeamMembersRegisteredApplication = () => {
  const { companionId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [enrollDD, setEnrollDD] = useState([]);
  const [enrollLabel, setEnrollLabel] = useState("Enrolment Status");
  const [enrollValue, setEnrollValue] = useState(0);
  const [entity, setEntity] = useState(0);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // application list
  const [applicationList, setApplicationList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const tableColumnApplicationStudent = JSON.parse(
      localStorage.getItem("ColumnApplicationStudent")
    );
    tableColumnApplicationStudent &&
      setTableData(tableColumnApplicationStudent);
    !tableColumnApplicationStudent &&
      localStorage.setItem(
        "ColumnApplicationStudent",
        JSON.stringify(ColumnApplicationStudent)
      );
    !tableColumnApplicationStudent && setTableData(ColumnApplicationStudent);
  }, []);

  useEffect(() => {
    get("EnrollmentStatusDD/Index").then((res) => {
      setEnrollDD(res);
    });
  }, []);

  useEffect(() => {
    get(
      `ReferrerApplication/Index?page=${currentPage}&pagesize=${dataPerPage}&companionid=${companionId}&enrollmentStatus=${true}`
    ).then((res) => {
      setLoading(false);
      setApplicationList(res?.models);
      console.log("dsdsdsd", res);
      // setEntity(res?.totalEntity);
      // setSerialNumber(res?.firstSerialNumber);
    });
  }, [currentPage, dataPerPage, companionId, enrollValue]);

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const selectEnrollDD = (label, value) => {
    setEnrollLabel(label);
    setEnrollValue(value);
  };
  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const componentRef = useRef();

  // for hide/unhide column

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnApplicationStudent", JSON.stringify(values));
  };

  return (
    <div>
      <BreadCrumb title="Applications" backTo="" path="" />

      <Card className="uapp-employee-search">
        <CardBody>
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12">
              <h5 className="text-orange fw-700">
                Total {applicationList.length} items
              </h5>
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex flex-wrap justify-content-end">
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
              </div>
            </Col>
          </Row>

          {permissions?.includes(permissionList.View_Application_List) && (
            <>
              {applicationList?.length === 0 ? (
                <h4 className="text-center">No Data Found</h4>
              ) : (
                <>
                  {loading ? (
                    <div className="d-flex justify-content-center mb-5">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive mb-3" ref={componentRef}>
                      <Table
                        id="table-to-xls"
                        style={{ verticalAlign: "middle" }}
                        className="table-sm table-bordered"
                      >
                        <thead className="thead-uapp-bg">
                          <tr style={{ textAlign: "center" }}>
                            {tableData[0]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                APP ID
                              </th>
                            ) : null}

                            {tableData[1]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                University
                              </th>
                            ) : null}
                            {tableData[2]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Student
                              </th>
                            ) : null}
                            {tableData[3]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Course
                              </th>
                            ) : null}
                            {tableData[4]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Intake
                              </th>
                            ) : null}
                            {tableData[5]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Application Date
                              </th>
                            ) : null}
                            {tableData[6]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Status
                              </th>
                            ) : null}

                            {tableData[10]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Enrolment Status
                              </th>
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {applicationList?.map((app, i) => (
                            <tr key={i}>
                              {tableData[0]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.applicationViewId}
                                </td>
                              ) : null}

                              {tableData[1]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.universityName}
                                </td>
                              ) : null}

                              {tableData[2]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.studentName}
                                </td>
                              ) : null}

                              {tableData[3]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.subjectName}
                                </td>
                              ) : null}

                              {tableData[4]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.intakeName}
                                </td>
                              ) : null}

                              {tableData[5]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.createdOn}
                                </td>
                              ) : null}

                              {tableData[6]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.applicationStatusName}
                                </td>
                              ) : null}

                              {tableData[10]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.enrollmentStatusName}
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
            </>
          )}

          <PaginationOnly
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default CompanionTeamMembersRegisteredApplication;
