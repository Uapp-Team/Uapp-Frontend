import React, { useEffect, useRef, useState } from "react";
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
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import { useToasts } from "react-toast-notifications";
import { useLocation, useParams, useHistory } from "react-router-dom";
import ButtonForFunction from "../Components/ButtonForFunction";
import get from "../../../helpers/get";
import remove from "../../../helpers/remove";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import AssignUniversityModal from "./AssignUniversityModal";
import EditAssignUniversityModal from "./EditAssignUniversityModal";
import AssignProvidersUniversityModal from "./AssignProvidersUniversityModal";
import { userTypes } from "../../../constants/userTypeConstant";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { Link } from "react-router-dom/cjs/react-router-dom";

const AssignUniversity = () => {
  // const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [university, setuniversity] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [providerModalOpen, setProviderModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [uniList, setUniList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [managerUniName, setManagerUniName] = useState("");
  const [managerUniId, setManagerUniId] = useState(0);

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkPro, setCheckPro] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkType, setCheckType] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const { providerId, managerId } = useParams();
  const { addToast } = useToasts();
  const location = useLocation();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [data, setData] = useState({});
  const componentRef = useRef();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get(`AdmissionManagerUniversity/Index/${managerId}`).then((res) => {
      setUniList(res);
      console.log(res, "university list");
    });

    get(`AdmissionManager/Get/${managerId}`).then((res) => {
      setData(res);
    });
  }, [providerId, managerId, success]);
  console.log(uniList);
  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setProviderModalOpen(false);
    setEditModalOpen(false);
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
    setProgress1(true);
    remove(`AdmissionManagerUniversity/Delete/${managerUniId}`).then(
      (action) => {
        setButtonStatus1(false);
        setProgress1(false);
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
  const handleCheckedPro = (e) => {
    setCheckPro(e.target.checked);
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
        title="Assigned Universities"
        backTo={
          location.managerList !== undefined
            ? "Admission Manager List"
            : "Provider Details"
        }
        path={
          location.managerList !== undefined
            ? "/admissionManagerList"
            : `/providerDetails/${providerId}`
        }
      />

      <Card className="uapp-employee-search">
        <CardBody>
          <div className="d-flex justify-content-end mb-3">
            <span style={{ fontWeight: "bold" }}>
              Admission Manager: {data?.nameTittle?.name} {data?.firstName}{" "}
              {data?.lastName}
            </span>
          </div>

          <Row className="mb-3">
            <Col lg="6" md="6" sm="12" xs="12">
              {permissions?.includes(
                permissionList.AdmissionManager_Assign_University
              ) ? (
                <div className="d-sm-flex">
                  <ButtonForFunction
                    func={() => setModalOpen(true)}
                    className={"btn btn-uapp-add mr-2 "}
                    icon={<i className="fas fa-plus"></i>}
                    name={" Assign University"}
                    permission={6}
                  />
                  {providerId === "1" && (
                    <ButtonForFunction
                      func={() => setProviderModalOpen(true)}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Assign Provider University"}
                      permission={6}
                    />
                  )}
                </div>
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
                          <p className="">Provider</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedPro(e);
                              }}
                              defaultChecked={checkPro}
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
              isOpen={providerModalOpen}
              toggle={closeModal}
              className="uapp-modal2"
              size="lg"
            >
              <ModalHeader>
                <span>University</span>
              </ModalHeader>
              <ModalBody>
                <AssignProvidersUniversityModal
                  managerId={managerId}
                  setModalOpen={setProviderModalOpen}
                  success={success}
                  setSuccess={setSuccess}
                />
              </ModalBody>
            </Modal>
          </div>

          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal2"
              size="lg"
            >
              <ModalHeader>
                <span>University</span>
              </ModalHeader>
              <ModalBody>
                <AssignUniversityModal
                  managerId={managerId}
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
              <ModalHeader>
                <span>University</span>
              </ModalHeader>
              <ModalBody>
                <EditAssignUniversityModal
                  managerId={managerId}
                  setModalOpen={setEditModalOpen}
                  university={university}
                  success={success}
                  setSuccess={setSuccess}
                />
              </ModalBody>
            </Modal>
          </div>

          {/* {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : ( */}
          <div className="table-responsive fixedhead" ref={componentRef}>
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  {checkSlNo ? <th>SL/NO</th> : null}
                  <th>Provider</th>
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
                    {checkSlNo ? <td>{i + 1}</td> : null}

                    {checkPro ? (
                      <td>
                        {userType === userTypes?.SystemAdmin.toString() ||
                        userType === userTypes?.Admin.toString() ? (
                          <Link
                            className="text-id hover"
                            to={`/providerDetails/${uni?.university?.providerId}`}
                          >
                            {uni?.providerName}
                          </Link>
                        ) : (
                          <span>{uni?.providerName}</span>
                        )}
                      </td>
                    ) : null}

                    {checkName ? (
                      <td>
                        <Link
                          className="text-id hover"
                          to={`/universityDetails/${uni?.universityId}`}
                        >
                          {uni?.university?.name}
                        </Link>
                      </td>
                    ) : null}
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
                            permissionList.AdmissionManager_Assign_University
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
                            permissionList.AdmissionManager_Assign_University
                          ) ? (
                            <ButtonForFunction
                              color={"danger"}
                              func={() => toggleDanger(uni)}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                            />
                          ) : null}
                        </ButtonGroup>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* )} */}
        </CardBody>
      </Card>

      <ConfirmModal
        text={`Do You Want To Delete This ${managerUniName} Information ?`}
        isOpen={deleteModal}
        toggle={closeModal}
        confirm={() => handleDeletePermission(managerUniId)}
        cancel={() => {
          setDeleteModal(false);
          setManagerUniId(0);
          setManagerUniName("");
        }}
        buttonStatus={buttonStatus1}
        progress={progress1}
      />
    </div>
  );
};

export default AssignUniversity;
