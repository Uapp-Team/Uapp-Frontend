import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
} from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import get from "../../../../helpers/get";
import Pagination from "../../Pagination/Pagination.jsx";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";

import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../../Components/ButtonForFunction";
import LinkButton from "../../Components/LinkButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Loader from "../../Search/Loader/Loader";
import CustomButtonRipple from "../../Components/CustomButtonRipple";
import post from "../../../../helpers/post";
import ButtonLoader from "../../Components/ButtonLoader";
import put from "../../../../helpers/put";
import { tableIdList } from "../../../../constants/TableIdConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import { useParams } from "react-router-dom";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import ColumnIntake from "../../TableColumn/ColumnIntake.js";

const Intake = () => {
  const [intakeList, setIntakeList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [dataPerPage, setDataPerPage] = useState(15);
  // const [searchStr, setSearchStr] = useState("");
  const [serialNum, setSerialNum] = useState(1);
  const [entity, setEntity] = useState(0);
  // const [callApi, setCallApi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [intakeId, setIntakeId] = useState(0);
  const [intakeName, setIntakeName] = useState("");
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [smTitle, setsmTitle] = useState("Select Month");
  const [emTitle, setemTitle] = useState("Select Month");
  const [syTitle, setsyTitle] = useState("Select Year");
  const [eyTitle, seteyTitle] = useState("Select Year");
  const [syValue, setsyValue] = useState(0);
  const [eyValue, seteyValue] = useState(0);
  const [smValue, setsmValue] = useState(0);
  const [emValue, setemValue] = useState(0);
  const [smError, setsmError] = useState("");
  const [emError, setemError] = useState("");
  const [syError, setsyError] = useState("");
  const [eyError, seteyError] = useState("");

  // for hide/unhide table column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const history = useHistory();
  const { addToast } = useToasts();
  const [modalOpen, setModalopen] = useState(false);
  const [modalOpen1, setModalopen1] = useState(false);
  const [monthIntake, setMonthIntake] = useState([]);
  const [yearIntake, setYearIntake] = useState([]);
  const [monthTypeIntakeLabel, setMonthTypeIntakeLabel] =
    useState("Select Month");
  const [intakeUpdateId, setIntakeUpdateId] = useState(0);
  const [monthTypeIntakeValue, setMonthTypeIntakeValue] = useState(0);
  const [yearTypeIntakeLabel, setYearTypeIntakeLabel] = useState("Select Year");
  const [yearTypeValue, setYearTypeValue] = useState(0);
  const [montheIntakerror, setMonthIntakeError] = useState("");
  const [yearIntakeError, setYearIntakeError] = useState("");
  const [updateDocument, setUpdateDocument] = useState(undefined);
  // const { id } = useParams();

  useEffect(() => {
    const tableColumnIntake = JSON.parse(localStorage.getItem("ColumnIntake"));
    tableColumnIntake && setTableData(tableColumnIntake);
    !tableColumnIntake &&
      localStorage.setItem("ColumnIntake", JSON.stringify(ColumnIntake));
    !tableColumnIntake && setTableData(ColumnIntake);
  }, []);

  const handleAddNewButton = () => {
    setModalopen1(true);
  };

  // useEffect(()=>{
  //     get(
  //         `Intake/GetPaginated?page=${currentPage}&pageSize${dataPerPage}&search=${searchStr}`
  //       ).then((res) => {
  //           setIntakeList(res?.models);
  //           setSerialNum(res?.firstSerialNumber);
  //           setEntity(res?.totalEntity);
  //           setLoading(false);
  //       });
  // },[])

  useEffect(() => {
    get("MonthDD/Index")
      .then((res) => {
        setMonthIntake(res);
      })
      .catch();

    get("YearDD/Index")
      .then((res) => {
        setYearIntake(res);
      })
      .catch();
  }, [success2, intakeId]);

  const monthMenu = monthIntake.map((monthOptions) => ({
    label: monthOptions.name,
    value: monthOptions.id,
  }));
  const yearMenu = yearIntake.map((yearOptions) => ({
    label: yearOptions.name,
    value: yearOptions.id,
  }));

  useEffect(() => {
    get(`Intake/Index`).then((res) => {
      setIntakeList(res);
      setEntity(res?.totalEntity);
      setLoading(false);
    });

    get("MonthDD/Index")
      .then((res) => {
        setMonth(res);
      })
      .catch();

    get("YearDD/Index").then((res) => {
      setYear(res);
    });
  }, [success, success2]);

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  const selectSMonthType = (label, value) => {
    setsmError("");
    setsmTitle(label);
    setsmValue(value);
  };

  const selectEMonthType = (label, value) => {
    setemError("");
    setemTitle(label);
    setemValue(value);
  };

  const selectSYearType = (label, value) => {
    setsyError("");
    setsyTitle(label);
    setsyValue(value);
  };

  const selectEYearType = (label, value) => {
    seteyError("");
    seteyTitle(label);
    seteyValue(value);
  };

  const selectMonthTypeIntake = (label, value) => {
    setMonthIntakeError("");
    setMonthTypeIntakeLabel(label);
    setMonthTypeIntakeValue(value);
  };

  const selectYearTypeIntake = (label, value) => {
    setYearIntakeError("");
    setYearTypeIntakeLabel(label);
    setYearTypeValue(value);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const toggleDanger = (name, id) => {
    //  localStorage.setItem('intakeName',name)
    //  localStorage.setItem('intakeId',id)
    setIntakeName(name);
    setIntakeId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setIntakeName("");
    setIntakeId(0);
  };

  const closeOpenModal = () => {
    setModalopen(false);
    setsmTitle("Select Month");
    setemTitle("Select Month");
    setsmValue(0);
    setemValue(0);
    setsyTitle("Select Year");
    setsyValue(0);
    seteyTitle("Select Year");
    seteyValue(0);
  };

  const closeOpenModal1 = () => {
    setModalopen1(false);
    setMonthTypeIntakeLabel("Select Month");
    setMonthTypeIntakeValue(0);
    setYearTypeIntakeLabel("Select Year");
    setYearTypeValue(0);
    setMonthIntakeError("");
    setYearIntakeError("");
  };

  const handleDelete = (id) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Intake/Delete/${id}`).then((action) => {
      setButtonStatus(false);
      setProgress(false);
      setSuccess(!success);
      setDeleteModal(false);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setIntakeName("");
      setIntakeId(0);
    });
  };

  const handleGenerateIntake = () => {
    setModalopen(true);
  };

  const componentRef = useRef();

  const redirecttoUpdateIntake = (intake) => {
    setModalopen1(true);
    setIntakeUpdateId(intake?.id);
    setMonthTypeIntakeLabel(intake?.month?.name);
    setMonthTypeIntakeValue(intake?.month?.id);
    setYearTypeIntakeLabel(intake?.year?.name);
    setYearTypeValue(intake?.year?.id);
  };

  // for hide/unhide column

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnIntake", JSON.stringify(values));
  };

  const validateRegisterForm = () => {
    var isFormValid = true;

    if (smValue === 0) {
      isFormValid = false;
      setsmError("Month is required");
    }
    if (emValue === 0) {
      isFormValid = false;
      setemError("Month is required");
    }
    if (syValue === 0) {
      isFormValid = false;
      setsyError("Year is required");
    }
    if (eyValue === 0) {
      isFormValid = false;
      seteyError("Year is required");
    }
    return isFormValid;
  };

  const validateRegisterFormIntake = () => {
    var isFormValid = true;
    if (monthTypeIntakeValue === 0) {
      isFormValid = false;
      setMonthIntakeError("Month is required");
    }

    if (yearTypeValue === 0) {
      isFormValid = false;
      setYearIntakeError("Year is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    //   for (var value of subData.values()) {
    //
    //     }
    var formIsValid = validateRegisterFormIntake(subData);

    if (formIsValid) {
      if (intakeUpdateId === 0) {
        setProgress2(true);
        post(`Intake/Create`, subData).then((action) => {
          setProgress2(false);
          if (action?.status == 200 && action?.data?.isSuccess == true) {
            addToast(action?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess2(!success2);
            closeOpenModal1();
            setIntakeUpdateId(0);
          } else {
            addToast(action?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setProgress2(true);
        put(`Intake/Update`, subData).then((action) => {
          setProgress2(false);
          //
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess2(!success2);
          closeOpenModal1();
          setIntakeUpdateId(0);
        });
      }
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      setProgress1(true);
      post(`Intake/Generate`, subData).then((res) => {
        setProgress1(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          closeOpenModal();
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  return (
    <div>
      <BreadCrumb title="Intake List" backTo="" path="/" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Modal
            isOpen={modalOpen1}
            toggle={closeOpenModal1}
            className="uapp-modal2"
          >
            <ModalHeader>Add Intake</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} className="m-3">
                {intakeUpdateId !== 0 ? (
                  <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={intakeUpdateId}
                  />
                ) : null}
                <FormGroup row>
                  <Col md="4">
                    <span>
                      <span>Intake Month</span>{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>

                  <Col md="6">
                    <Select
                      options={monthMenu}
                      value={{
                        label: monthTypeIntakeLabel,
                        value: monthTypeIntakeValue,
                      }}
                      onChange={(opt) =>
                        selectMonthTypeIntake(opt.label, opt.value)
                      }
                      name="monthId"
                      id="monthId"
                    />
                    {<span className="text-danger">{montheIntakerror}</span>}
                  </Col>

                  <Col md="4"></Col>
                </FormGroup>

                <FormGroup row className="mt-3">
                  <Col md="4">
                    <span>
                      <span>Intake Year</span>{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>

                  <Col md="6">
                    <Select
                      options={yearMenu}
                      value={{
                        label: yearTypeIntakeLabel,
                        value: yearTypeValue,
                      }}
                      onChange={(opt) =>
                        selectYearTypeIntake(opt.label, opt.value)
                      }
                      name="yearId"
                      id="yearId"
                    />
                    {<span className="text-danger">{yearIntakeError}</span>}
                  </Col>
                </FormGroup>

                <FormGroup className="d-flex justify-content-between mt-3">
                  <CancelButton cancel={closeOpenModal1} />

                  <SaveButton
                    text="Submit"
                    progress={progress2}
                    buttonStatus={buttonStatus}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={modalOpen}
            toggle={closeOpenModal}
            className="uapp-modal2"
          >
            <ModalHeader>Generate Intake</ModalHeader>
            <ModalBody>
              <Form onSubmit={submitForm}>
                <FormGroup row>
                  <Col md="4">
                    <span>
                      <span>Start Month</span>{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>

                  <Col md="6">
                    <Select
                      options={monthMenu}
                      value={{ label: smTitle, value: smValue }}
                      onChange={(opt) => selectSMonthType(opt.label, opt.value)}
                      name="startMonthId"
                      id="startMonthId"
                    />

                    <span className="text-danger">{smError}</span>
                  </Col>

                  <Col md="4"></Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="4">
                    <span>
                      <span>End Month</span>{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>

                  <Col md="6">
                    <Select
                      options={monthMenu}
                      value={{ label: emTitle, value: emValue }}
                      onChange={(opt) => selectEMonthType(opt.label, opt.value)}
                      name="endMonthId"
                      id="endMonthId"
                    />

                    <span className="text-danger">{emError}</span>
                  </Col>

                  <Col md="4"></Col>
                </FormGroup>

                <FormGroup row className="mt-3">
                  <Col md="4">
                    <span>
                      <span>Start Year</span>{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>

                  <Col md="6">
                    <Select
                      options={yearMenu}
                      value={{ label: syTitle, value: syValue }}
                      onChange={(opt) => selectSYearType(opt.label, opt.value)}
                      name="startYearId"
                      id="startYearId"
                    />

                    <span className="text-danger">{syError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row className="mt-3">
                  <Col md="4">
                    <span>
                      <span>End Year</span>{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>

                  <Col md="6">
                    <Select
                      options={yearMenu}
                      value={{ label: eyTitle, value: eyValue }}
                      onChange={(opt) => selectEYearType(opt.label, opt.value)}
                      name="endYearId"
                      id="endYearId"
                    />

                    <span className="text-danger">{eyError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col
                    md="10"
                    className="d-flex justify-content-end align-items-end"
                  >
                    <div>
                      <Button
                        onClick={closeOpenModal}
                        className="mt-md-3 mr-1"
                        color="danger"
                      >
                        Cancel
                      </Button>

                      <ButtonForFunction
                        type={"submit"}
                        className={"mt-md-3 ml-1"}
                        color={"primary"}
                        name={progress1 ? <ButtonLoader /> : "Submit"}
                        permission={6}
                      />
                    </div>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>

          <Card className="uapp-employee-search">
            <CardBody>
              <Row className="mb-3">
                <Col
                  lg="6"
                  md="6"
                  sm="12"
                  xs="12"
                  style={{ marginBottom: "10px" }}
                >
                  {permissions?.includes(permissionList?.Add_Account_Intake) ? (
                    <ButtonForFunction
                      func={handleAddNewButton}
                      className={"btn btn-uapp-add mr-1"}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Add Intake"}
                    />
                  ) : null}
                  {permissions?.includes(permissionList?.Add_Account_Intake) ? (
                    <ButtonForFunction
                      func={handleGenerateIntake}
                      className={"btn btn-uapp-add ml-1"}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Generate Intake"}
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
                              {/* <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p> */}
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
                        <DropdownMenu className="bg-dd-2">
                          {tableData.map((table, i) => (
                            <div key={i}>
                              {i === 1 ? (
                                <>
                                  {(permissions?.includes(
                                    permissionList.Edit_Account_Intake
                                  ) ||
                                    permissions?.includes(
                                      permissionList.Delete_Account_Intake
                                    )) && (
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
                                            name="check"
                                            onChange={(e) => {
                                              handleChecked(e, i);
                                            }}
                                            checked={table?.isActive}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </div>
                                  )}
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
                                        name="check"
                                        onChange={(e) => {
                                          handleChecked(e, i);
                                        }}
                                        checked={table?.isActive}
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

              {loading ? (
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div className="table-responsive" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>Name</th> : null}

                        {permissions?.includes(
                          permissionList.Edit_Account_Intake
                        ) ||
                        permissions?.includes(
                          permissionList.Delete_Account_Intake
                        ) ? (
                          <>
                            {" "}
                            {tableData[1]?.isActive ? (
                              <th
                                style={{ width: "8%" }}
                                className="text-center"
                              >
                                Action
                              </th>
                            ) : null}
                          </>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {intakeList?.map((intake, i) => (
                        <tr key={intake.id} style={{ textAlign: "center" }}>
                          {tableData[0]?.isActive ? (
                            <td>{intake?.name}</td>
                          ) : null}

                          {permissions?.includes(
                            permissionList.Edit_Account_Intake
                          ) ||
                          permissions?.includes(
                            permissionList.Delete_Account_Intake
                          ) ? (
                            <>
                              {" "}
                              {tableData[1]?.isActive ? (
                                <td
                                  style={{ width: "8%" }}
                                  className="text-center"
                                >
                                  <ButtonGroup variant="text">
                                    {permissions?.includes(
                                      permissionList.Edit_Account_Intake
                                    ) ? (
                                      <ButtonForFunction
                                        func={() =>
                                          redirecttoUpdateIntake(intake)
                                        }
                                        color={"warning"}
                                        className={"mx-1 btn-sm"}
                                        icon={<i className="fas fa-edit"></i>}
                                        permission={6}
                                      />
                                    ) : null}

                                    {/* <LinkButton
                              url={`/updateIntake/${intake?.id}`}
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                            /> */}

                                    {permissions?.includes(
                                      permissionList.Delete_Account_Intake
                                    ) ? (
                                      <ButtonForFunction
                                        func={() =>
                                          toggleDanger(intake?.name, intake?.id)
                                        }
                                        color={"danger"}
                                        className={"mx-1 btn-sm"}
                                        icon={
                                          <i className="fas fa-trash-alt"></i>
                                        }
                                        permission={6}
                                      />
                                    ) : null}
                                  </ButtonGroup>
                                </td>
                              ) : null}
                            </>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {/* modal for delete */}
                  <ConfirmModal
                    text="Do You Want To Delete This Intake? Once Deleted it can't be Undone"
                    // ${delData?.name}
                    isOpen={deleteModal}
                    toggle={closeDeleteModal}
                    cancel={closeDeleteModal}
                    progress={progress}
                    confirm={() => handleDelete(intakeId)}
                  />
                </div>
              )}

              <div className="d-flex justify-content-end mt-3">
                <h5>Total Results Found: {intakeList.length}</h5>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default Intake;
