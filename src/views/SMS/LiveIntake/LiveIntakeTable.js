import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import {
  Button,
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
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import Loader from "../Search/Loader/Loader";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import MoreData from "./MoreData";
import SideModal from "./SideModal";
import { rootUrl } from "../../../constants/constants";
import PopOverText from "../../../components/PopOverText";

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
  liveIntakeList,
  uniCount,
  intakeCount,
  courseCount,
  campusCount,
  recruitmentCount,
  deliveryCount,
}) => {
  // const [intakeDataList, setIntakeDataList] = useState(liveIntake?.intakeNames);
  const [popoverOpen, setPopoverOpen] = useState("");
  const [data, setData] = useState({});
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassModal(!passModal);
  };

  const closeOpenModal = () => {
    setPassModal(false);
  };

  const handleUpdate = (data) => {
    setData(data);
    setPassModal(true);
    // setDescription(data?.description);
    // setName(data?.name);
    // setdepartmentLabel(data?.departmentinfo?.name);
    // setdepartmentValue(data?.departmentinfo?.id);
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
                        {/* <div className="cursor-pointer">
                          <ReactToPrint
                            trigger={() => (
                              <p>
                                <i className="fas fa-file-pdf"></i>
                              </p>
                            )}
                            content={() => componentRef.current}
                          />
                        </div> */}
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
            {loading ? (
              <Loader />
            ) : liveIntakeList?.length === 0 ? (
              <h3 className="text-center">No Data Found</h3>
            ) : (
              <div className="table-responsive fixedhead" ref={componentRef}>
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      {tableData[0]?.isActive ? (
                        <th>
                          University{" "}
                          <span className="count-summery">{uniCount}</span>
                        </th>
                      ) : null}
                      {tableData[1]?.isActive ? (
                        <th>Admission Manager</th>
                      ) : null}
                      {tableData[2]?.isActive ? <th>Contact</th> : null}
                      {tableData[3]?.isActive ? (
                        <th>
                          Intake{" "}
                          <span className="count-summery">{intakeCount}</span>
                        </th>
                      ) : null}
                      {tableData[4]?.isActive ? (
                        <th>
                          Campus{" "}
                          <span className="count-summery">{campusCount}</span>
                        </th>
                      ) : null}
                      {tableData[5]?.isActive ? (
                        <th>
                          Recruitment Type{" "}
                          <span className="count-summery">
                            {recruitmentCount}
                          </span>
                        </th>
                      ) : null}
                      {tableData[6]?.isActive ? (
                        <th>
                          Delivery Pattern{" "}
                          <span className="count-summery">{deliveryCount}</span>
                        </th>
                      ) : null}
                      {tableData[7]?.isActive ? (
                        <th>
                          Course{" "}
                          <span className="count-summery">{courseCount}</span>
                        </th>
                      ) : null}
                      {tableData[8]?.isActive ? (
                        <th style={{ width: "8%" }} className="text-center">
                          Action
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {liveIntakeList?.map((liveIntake, i) => (
                      <tr key={i} style={{ textAlign: "left" }}>
                        {tableData[0]?.isActive ? (
                          <td>{liveIntake?.universityName} </td>
                        ) : null}
                        {tableData[1]?.isActive ? (
                          <td>
                            <img
                              className="live-intake-c-image"
                              src={
                                rootUrl +
                                liveIntake?.admissionManagers[0]
                                  ?.profileImageUrl
                              }
                              title={liveIntake?.admissionManagers[0]?.name}
                              alt="adm_logo"
                            />{" "}
                            <span
                              className="for-intake-table cursor-pointer ml-3"
                              onClick={() => handleUpdate(liveIntake)}
                            >
                              {liveIntake?.admissionManagers.length - 1 !==
                                0 && (
                                <>
                                  {liveIntake?.admissionManagers.length - 1} +
                                </>
                              )}
                            </span>
                          </td>
                        ) : null}
                        {tableData[2]?.isActive ? (
                          <td>
                            <div className="d-flex justify-content-center sa">
                              <PopOverText
                                value={
                                  liveIntake?.admissionManagers[0]?.phone &&
                                  liveIntake?.admissionManagers[0]?.phone.includes(
                                    "+"
                                  )
                                    ? liveIntake?.admissionManagers[0]?.phone
                                    : liveIntake?.admissionManagers[0]?.phone &&
                                      !liveIntake?.admissionManagers[0]?.phone.includes(
                                        "+"
                                      )
                                    ? "+" +
                                      liveIntake?.admissionManagers[0]?.phone
                                    : null
                                }
                                // value={
                                //   student?.phoneNumber ? "+" + student.phoneNumber : null
                                // }
                                btn={<i class="fas fa-phone"></i>}
                                popoverOpen={popoverOpen}
                                setPopoverOpen={setPopoverOpen}
                              />
                              <PopOverText
                                value={liveIntake?.admissionManagers[0]?.email}
                                btn={<i className="far fa-envelope"></i>}
                                popoverOpen={popoverOpen}
                                setPopoverOpen={setPopoverOpen}
                              />
                            </div>
                          </td>
                        ) : null}
                        {tableData[3]?.isActive ? (
                          <td>
                            <MoreData
                              data={liveIntake?.intakes}
                              action={() => handleUpdate(liveIntake)}
                            />
                          </td>
                        ) : null}
                        {tableData[4]?.isActive ? (
                          <td>
                            <MoreData
                              data={liveIntake?.campuses}
                              action={() => handleUpdate(liveIntake)}
                            />
                          </td>
                        ) : null}
                        {tableData[5]?.isActive ? (
                          <td>
                            {liveIntake?.isAcceptHome === true ? (
                              <span className="for-intake-table">Home/UK</span>
                            ) : null}
                            {liveIntake?.isAcceptEU_UK === true ? (
                              <span className="for-intake-table">EU/EEU</span>
                            ) : null}
                            {liveIntake?.isAcceptInternational === true ? (
                              <span className="for-intake-table">
                                International
                              </span>
                            ) : null}
                          </td>
                        ) : null}
                        {tableData[6]?.isActive ? (
                          <td>
                            {" "}
                            {/* <span className="for-intake-table">
                               
                             </span> */}
                            {liveIntake?.deliveryPatternNames}
                          </td>
                        ) : null}
                        {tableData[7]?.isActive ? (
                          <td>
                            <span className="for-intake-table">
                              {liveIntake?.totalCourse}{" "}
                            </span>
                          </td>
                        ) : null}
                        {tableData[8]?.isActive ? (
                          <td
                            className="cursor-pointer"
                            onClick={() => handleUpdate(liveIntake)}
                          >
                            {" "}
                            More Info
                            <i class="fa-solid fa-chevron-right ml-2"></i>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </>

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>

      {passModal && <SideModal action={closeOpenModal} data={data} />}

      {/* <Modal
        isOpen={passModal}
        toggle={() => handleToggle}
        className="uapp-modal2"
      >
        <ModalHeader>
          <i
            onClick={closeOpenModal}
            class="fa-solid fa-xmark cursor-pointer"
          ></i>
        </ModalHeader>
        <ModalBody className="p-5">
          <h5>sakib</h5>
        </ModalBody>
      </Modal> */}
    </div>
  );
};

export default LiveIntakeTable;
