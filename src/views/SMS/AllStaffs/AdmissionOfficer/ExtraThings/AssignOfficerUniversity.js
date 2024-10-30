import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
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
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import remove from "../../../../../helpers/remove";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import ReactTableConvertToXl from "../../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import Select from "react-select";
import CustomButtonRipple from "../../../Components/CustomButtonRipple";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import ButtonLoader from "../../../Components/ButtonLoader";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import AssignOfficerUniversityModal from "./AssignOfficerUniversityModal";
import EditAssignOfficerUniversityModal from "./EditAssignOfficerUniversityModal";

const AssignOfficerUniversity = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [university, setuniversity] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  // const [providerUniList, setProviderUniList] = useState([]);
  // const [uniLabel, setUniLabel] = useState("Select University");
  // const [uniValue, setUniValue] = useState(0);
  const [uniList, setUniList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [managerUniName, setManagerUniName] = useState("");
  const [managerUniId, setManagerUniId] = useState(0);

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkType, setCheckType] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [officerData, setOfficerData] = useState({});
  const [progress, setProgress] = useState(false);

  const { providerId, officerId } = useParams();

  useEffect(() => {
    get(`AdmissionOfficerUniversity/Index/${officerId}`).then((res) => {
      setUniList(res);
    });

    get(`AdmissionOfficer/Get/${officerId}`).then((res) => {
      setOfficerData(res);
    });
  }, [providerId, officerId, success]);

  const { addToast } = useToasts();
  const componentRef = useRef();
  const location = useLocation();

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const toggleDanger = (p) => {
    setManagerUniId(p?.id);
    setManagerUniName(p?.university?.name);
    setDeleteModal(true);
  };

  const handleDeletePermission = (managerUniId) => {
    setButtonStatus1(true);
    setProgress(true);
    remove(`AdmissionOfficerUniversity/Delete/${managerUniId}`).then(
      (action) => {
        setProgress(false);
        setButtonStatus1(false);
        setDeleteModal(false);
        setSuccess(!success);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setManagerUniId(0);
        setManagerUniName("");
      }
    );
  };

  const handleUpdate = (university) => {
    setEditModalOpen(true);
    setuniversity(university);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedType = (e) => {
    setCheckType(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      <BreadCrumb
        title="Assigned University List"
        backTo={
          location.officerList !== undefined
            ? "Provider Details"
            : "Admission Officer List"
        }
        path={
          location.officerList !== undefined
            ? `/providerDetails/${providerId}`
            : "/admissionOfficerList"
        }
      />

      <Card className="uapp-employee-search">
        <CardBody>
          <div className="d-flex justify-content-end mb-3">
            <span style={{ fontWeight: "bold" }}>
              Admission Officer: {officerData?.nameTittle?.name}{" "}
              {officerData?.firstName} {officerData?.lastName}
            </span>
          </div>

          <Row className="mb-3">
            <Col lg="6" md="6" sm="12" xs="12">
              {permissions?.includes(
                permissionList.AdmissionOfficer_Assign_University
              ) ? (
                <ButtonForFunction
                  func={() => setModalOpen(true)}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Assign University"}
                  permission={6}
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
                    <DropdownMenu className="bg-dd-3">
                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">SL/NO</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedSLNO(e);
                              }}
                              defaultChecked={checkSlNo}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">University Name</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedName(e);
                              }}
                              defaultChecked={checkName}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Requirement Type</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedType(e);
                              }}
                              defaultChecked={checkType}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Action</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedAction(e);
                              }}
                              defaultChecked={checkAction}
                            />
                          </FormGroup>
                        </Col>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>

          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal2"
              size="lg"
            >
              <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                <span className="text-white">University</span>
              </ModalHeader>
              <ModalBody>
                <AssignOfficerUniversityModal
                  officerId={officerId}
                  setModalOpen={setModalOpen}
                  success={success}
                  setSuccess={setSuccess}
                />
              </ModalBody>
            </Modal>
          </div>

          <div>
            <Modal
              isOpen={editModalOpen}
              toggle={closeModal}
              className="uapp-modal2"
              size="md"
            >
              <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                <span className="text-white">University</span>
              </ModalHeader>
              <ModalBody>
                <EditAssignOfficerUniversityModal
                  officerId={officerId}
                  setModalOpen={setEditModalOpen}
                  university={university}
                  success={success}
                  setSuccess={setSuccess}
                />
              </ModalBody>
            </Modal>
          </div>

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="tablehead">
                  <tr style={{ textAlign: "center" }}>
                    {/* {checkSlNo ? <th>SL/NO</th> : null} */}
                    {checkName ? <th>University Name</th> : null}
                    {checkType ? <th>Requirement Type</th> : null}
                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {uniList?.map((uni, i) => (
                    <tr key={uni?.id} style={{ textAlign: "center" }}>
                      {/* {checkSlNo ? <th scope="row">{i + 1}</th> : null} */}

                      {checkName ? <td>{uni?.university?.name}</td> : null}
                      {checkType ? (
                        <td>
                          {uni?.isAcceptHome === true ? `Home,` : null}{" "}
                          {uni?.isAcceptEU_UK === true ? `EU/UK,` : null}{" "}
                          {uni?.isAcceptInternational === true
                            ? "International"
                            : null}
                          {uni?.isAcceptHome === false &&
                          uni?.isAcceptEU_UK === false &&
                          uni?.isAcceptInternational === false
                            ? "Not available"
                            : null}
                        </td>
                      ) : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {permissions?.includes(
                              permissionList.AdmissionOfficer_Assign_University
                            ) ? (
                              <ButtonForFunction
                                func={() => handleUpdate(uni)}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            ) : null}

                            {permissions?.includes(
                              permissionList?.AdmissionOfficer_Assign_University
                            ) ? (
                              <ButtonForFunction
                                color={"danger"}
                                func={() => toggleDanger(uni)}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            ) : null}

                            <Modal
                              isOpen={deleteModal}
                              toggle={() => setDeleteModal(!deleteModal)}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this{" "}
                                  <b>{managerUniName}</b> ? Once Deleted it
                                  can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  disabled={buttonStatus1}
                                  color="danger"
                                  onClick={() =>
                                    handleDeletePermission(managerUniId)
                                  }
                                >
                                  {progress ? <ButtonLoader /> : "YES"}
                                </Button>

                                <Button
                                  // color="primary"
                                  onClick={() => {
                                    setDeleteModal(false);
                                    setManagerUniId(0);
                                    setManagerUniName("");
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
        </CardBody>
      </Card>
    </div>
  );
};

export default AssignOfficerUniversity;
