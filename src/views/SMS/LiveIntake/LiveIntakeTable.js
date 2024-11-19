import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row,
  Table,
} from "reactstrap";
import Loader from "../Search/Loader/Loader";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";

const LiveIntakeTable = ({
  loading,
  dataSizeName,
  dataPerPage,
  selectDataSize,
  dropdownOpen,
  toggle,
  componentRef,
  dropdownOpen1,
  toggle1,
  tableData,
  handleChecked,
  entity,
  paginate,
  currentPage,
}) => {
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassModal(!passModal);
  };
  return (
    <div>
      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12">
              <p className="section-title  pt-2">Intake</p>
            </Col>

            <Col lg="7" md="7" sm="12" xs="12" className="mt-md-0 mt-sm-3">
              <div className="d-flex justify-content-md-end justify-content-sm-start">
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
                      {tableData?.map((table, i) => (
                        <div key={i}>
                          {i === 2 ? (
                            <>
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
                            </>
                          ) : i === 5 ? (
                            <>
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
                            </>
                          ) : i === 6 ? (
                            <>
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
                            </>
                          ) : i === 7 ? (
                            <>
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
                            </>
                          ) : i === 10 ? (
                            <>
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
          <>
            {/* {loading ? (
              <Loader />
            ) : managerList.length === 0 ? (
              <h3 className="text-center">No Data Found</h3>
            ) : (
              <div className="table-responsive fixedhead" ref={componentRef}>
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      {tableData[0]?.isActive ? <th>University</th> : null}
                      {tableData[1]?.isActive ? <th>Intake</th> : null}

                      {tableData[3]?.isActive ? <th>Campus</th> : null}
                      {tableData[4]?.isActive ? (
                        <th>Recruitment Type</th>
                      ) : null}
                      {tableData[5]?.isActive ? (
                        <th>Delivery Pattern</th>
                      ) : null}
                      {tableData[6]?.isActive ? <th>Course</th> : null}

                      {tableData[12]?.isActive ? (
                        <th style={{ width: "8%" }} className="text-center">
                          Action
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {managerList?.map((manager, i) => (
                      <tr key={manager.id} style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? (
                          <td className="cursor-pointer hyperlink-hover">
                            {" "}
                            <span
                              onClick={() => {
                                handleViewAdmissionManager(
                                  manager?.id,
                                  manager?.provider?.id
                                );
                              }}
                            >
                              {manager?.sequenceId}
                            </span>
                          </td>
                        ) : null}

                        {tableData[1]?.isActive ? (
                          <td className="cursor-pointer hyperlink-hover">
                            <span
                              onClick={() => {
                                handleViewAdmissionManager(
                                  manager?.id,
                                  manager?.provider?.id
                                );
                              }}
                            >
                              {" "}
                              {manager?.nameTittle?.name} {manager?.firstName}{" "}
                              {manager?.lastName}
                            </span>
                          </td>
                        ) : null}

                      

                        {tableData[3]?.isActive ? (
                          <td>{manager?.provider?.name}</td>
                        ) : null}

                        {tableData[4]?.isActive ? (
                          <td>
                            <div className=" d-flex">
                              <PopOverText
                                value={
                                  manager?.phoneNumber &&
                                  manager?.phoneNumber.includes("+")
                                    ? manager?.phoneNumber
                                    : manager?.phoneNumber &&
                                      !manager?.phoneNumber.includes("+")
                                    ? "+" + manager?.phoneNumber
                                    : null
                                }
                                btn={<i class="fas fa-phone"></i>}
                                popoverOpen={popoverOpen}
                                setPopoverOpen={setPopoverOpen}
                              />
                              <PopOverText
                                value={manager?.email}
                                btn={<i className="far fa-envelope"></i>}
                                popoverOpen={popoverOpen}
                                setPopoverOpen={setPopoverOpen}
                              />
                            </div>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                
                  </tbody>
                </Table>
              </div>
            )} */}

            <div className="table-responsive fixedhead" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="tablehead">
                  <tr style={{ textAlign: "center" }}>
                    <th>University</th>
                    <th>Intake</th>
                    <th>Campus</th>
                    <th>Recruitment Type</th>
                    <th>Delivery Pattern</th>
                    <th>Course</th>
                    <th style={{ width: "8%" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>De MOntFort University</td>
                    <td>November 2024</td>
                    <td>London East</td>
                    <td>
                      <span className="for-intake-table">Home</span>
                      <span className="for-intake-table">Eu</span>
                      <span className="for-intake-table">International</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">Weekend</span>
                      <span className="for-intake-table">Stander</span>
                      <span className="for-intake-table">Evening</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">35</span>
                    </td>
                    <td
                      className="cursor-pointer"
                      onClick={() => setPassModal(true)}
                    >
                      More Info<i class="fa-solid fa-chevron-right ml-2"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>De MOntFort University</td>
                    <td>November 2024</td>
                    <td>London East</td>
                    <td>
                      <span className="for-intake-table">Home</span>
                      <span className="for-intake-table">Eu</span>
                      <span className="for-intake-table">International</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">Weekend</span>
                      <span className="for-intake-table">Stander</span>
                      <span className="for-intake-table">Evening</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">35</span>
                    </td>
                    <td>
                      More Info<i class="fa-solid fa-chevron-right ml-2"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>De MOntFort University</td>
                    <td>November 2024</td>
                    <td>London East</td>
                    <td>
                      <span className="for-intake-table">Home</span>
                      <span className="for-intake-table">Eu</span>
                      <span className="for-intake-table">International</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">Weekend</span>
                      <span className="for-intake-table">Stander</span>
                      <span className="for-intake-table">Evening</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">35</span>
                    </td>
                    <td>
                      More Info<i class="fa-solid fa-chevron-right ml-2"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>De MOntFort University</td>
                    <td>November 2024</td>
                    <td>London East</td>
                    <td>
                      <span className="for-intake-table">Home</span>
                      <span className="for-intake-table">Eu</span>
                      <span className="for-intake-table">International</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">Weekend</span>
                      <span className="for-intake-table">Stander</span>
                      <span className="for-intake-table">Evening</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">35</span>
                    </td>
                    <td>
                      More Info<i class="fa-solid fa-chevron-right ml-2"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>De MOntFort University</td>
                    <td>November 2024</td>
                    <td>London East</td>
                    <td>
                      <span className="for-intake-table">Home</span>
                      <span className="for-intake-table">Eu</span>
                      <span className="for-intake-table">International</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">Weekend</span>
                      <span className="for-intake-table">Stander</span>
                      <span className="for-intake-table">Evening</span>
                    </td>
                    <td>
                      {" "}
                      <span className="for-intake-table">35</span>
                    </td>
                    <td>
                      More Info<i class="fa-solid fa-chevron-right ml-2"></i>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </>

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>

      <Modal
        isOpen={passModal}
        toggle={() => handleToggle}
        className="uapp-modal2"
      >
        <ModalBody className="p-5">
          <h5>
            Change password for {passData?.nameTittle?.name}{" "}
            {passData?.firstName} {passData?.lastName}
          </h5>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LiveIntakeTable;
