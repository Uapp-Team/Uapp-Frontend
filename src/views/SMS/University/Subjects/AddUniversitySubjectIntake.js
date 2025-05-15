import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import get from "../../../../helpers/get";
import Axios from "axios";
import {
  Card,
  CardBody,
  Input,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
} from "reactstrap";
import { userTypes } from "../../../../constants/userTypeConstant";
import Select from "react-select";
import { rootUrl } from "../../../../constants/constants";
import ButtonLoader from "../../Components/ButtonLoader";
import { useToasts } from "react-toast-notifications";
import remove from "../../../../helpers/remove";
import moment from "moment";
import SubjectNavbar from "./Components/SubjectNavbar";
import ButtonForFunction from "../../Components/ButtonForFunction";
import SaveButton from "../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import DMYPicker from "../../../../components/form/DMYPicker";

const AddUniversitySubjectIntake = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { id, subjId } = useParams();
  const activetab = "6";
  const [intakeData, setIntakeData] = useState([]);
  const [intakeStatusData, setIntakeStatusData] = useState([]);
  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [intakeError, setIntakeError] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [statusError, setStatusError] = useState(false);
  const userType = localStorage.getItem("userType");
  const [subjectIds, setSubjectIds] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkedError, setCheckedError] = useState(false);
  const AuthStr = localStorage.getItem("token");
  // const [buttonStatus5, setButtonStatus5] = useState(false);
  const [progress5, setProgress5] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [data, setData] = useState([]);
  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [progress, setProgress] = useState(false);

  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startdateError, setstartDateError] = useState(false);

  useEffect(() => {
    get(`IntakeDD/Index`).then((res) => {
      setIntakeData(res);
    });

    get(`IntakeStatus/GetAll`).then((res) => {
      setIntakeStatusData(res);
    });
  }, []);

  useEffect(() => {
    get(`UniversityCampusSubject/GetAllCampusBySubject/${subjId}`).then(
      (res) => {
        setSubjectIds(res);

        if (res?.length === 1) {
          setChecked([`${res[0]?.campusId}`]);
        }
      }
    );

    get(`SubjectIntake/GetAllCampusWithIntake?subjectId=${subjId}`).then(
      (res) => {
        console.log("subject intake campuses", res);
        setData(res);
      }
    );
  }, [success, subjId]);

  // for intake dropdown
  const intakeDropDown = intakeData?.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));

  const intakeStatusDropDown = intakeStatusData?.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));

  const selectIntakeType = (label, value) => {
    setIntakeError(false);
    setIntakeLabel(label);
    setIntakeValue(value);
    setDate(moment(new Date(label)).format("YYYY-MM-DD"));
    // handleSearch();
  };

  const selectStatusType = (label, value) => {
    setStatusError(false);
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };

  const handleStartDate = (e) => {
    if (e) {
      setStartDate(e);
      // } else {
      //   setstartDateError("Class Start Date Required");
    }
  };

  // console.log(!(new Date(date) > new Date()));
  // console.log(new Date(date), new Date());

  const validateForm = () => {
    let isFormValid = true;

    if (intakeValue === 0) {
      isFormValid = false;
      setIntakeError(true);
    }
    if (statusValue === 0) {
      isFormValid = false;
      setStatusError(true);
    }
    if (
      !(new Date(date) > new Date()) &&
      (statusValue === 1 || statusValue === 3)
    ) {
      isFormValid = false;
      setDateError(true);
    }
    // if (!startDate && statusValue === 1) {
    //   isFormValid = false;
    //   setstartDateError("Class Start Date Required");
    // }
    if (checked?.length === 0) {
      isFormValid = false;
      setCheckedError(true);
    }

    return isFormValid;
  };

  const handleSubjectAssignInIntake = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);
    subdata.append(`campusIds`, checked);
    startDate && subdata.append(`classStartDate`, startDate);

    // for (let value of subdata) {
    // }

    const config = {
      headers: {
        authorization: AuthStr,
      },
    };

    // setButtonStatus5(true);
    if (validateForm()) {
      setProgress5(true);
      Axios.post(
        `${rootUrl}SubjectIntake/AssignToCampus`,
        subdata,
        config
      ).then((res) => {
        setProgress5(false);
        setIntakeLabel("Select Intake");
        setIntakeValue(0);
        setStatusLabel("Select Status");
        setStatusValue(0);
        setSuccess(!success);
        setChecked([]);
        setDate("");
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
      });
    }
  };

  const handleClearSearch = () => {
    setStatusLabel("Select Status");
    setStatusValue(0);
    setIntakeLabel("Select Intake");
    setIntakeValue(0);
    setDate("");
  };

  // on Select All Checkbox
  const handleSelectAll = (e) => {
    let newChecked = [];
    const val = e.target.checked;
    if (val === true) {
      subjectIds.map((per) => {
        const perId = per?.campusId.toString();
        newChecked.push(perId);
        document.getElementById(per?.campusId).checked = true;
      });
      setChecked([...newChecked]);
    }

    if (val === false) {
      subjectIds.map((per) => {
        document.getElementById(per?.campusId).checked = false;
      });
      setChecked([]);
    }
    setCheckedError(false);
  };

  // onChange checkbox
  const handleCheck = (e) => {
    console.log(e);
    let ids = e.target.id;
    let val = e.target.checked;

    if (val === true) {
      if (!checked?.includes(ids)) {
        setChecked([...checked, ids]);
      }
    } else {
      const newD = ids;
      const res = checked.filter((c) => c !== newD);
      setChecked(res);
    }
    setCheckedError(false);
  };

  const toggleDanger = (data) => {
    console.log(data);
    setDeleteModal(true);
    setDelData(data);
  };

  const confirmDelete = () => {
    setProgress(true);
    remove(`SubjectIntake/DeleteById/${delData?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      setDelData({});
      setDeleteModal(false);
    });
  };

  return (
    <div>
      <SubjectNavbar
        title="Course Intake Information"
        activeTab={activetab}
        id={id}
        subjId={subjId}
      />
      {/* subject intake starts here */}
      {userType === userTypes?.Student ? null : (
        <div>
          <Card className="uapp-employee-search">
            <CardBody className="search-card-body">
              <TabContent activeTab={activetab}>
                <TabPane tabId="6">
                  <p className="section-title">Course Intake</p>
                  <Form onSubmit={handleSubjectAssignInIntake}>
                    <Input
                      type="hidden"
                      id="subjectId"
                      name="subjectId"
                      value={subjId}
                    />
                    <FormGroup>
                      <Row>
                        <Col lg="4" md="4" sm="6" xs="12" className="mb-3">
                          <span>
                            <span className="text-danger">*</span> Intake
                          </span>
                          <Select
                            options={intakeDropDown}
                            value={{ label: intakeLabel, value: intakeValue }}
                            onChange={(opt) =>
                              selectIntakeType(opt.label, opt.value)
                            }
                            name="intakeId"
                            id="intakeId"
                          />
                          {intakeError ? (
                            <span className="text-danger">
                              Intake is required
                            </span>
                          ) : null}
                        </Col>

                        <Col lg="4" md="4" sm="6" xs="12" className="mb-3">
                          <span>
                            <span className="text-danger">*</span> Status
                          </span>

                          <Select
                            options={intakeStatusDropDown}
                            value={{ label: statusLabel, value: statusValue }}
                            onChange={(opt) =>
                              selectStatusType(opt.label, opt.value)
                            }
                            name="statusId"
                            id="statusId"
                          />
                          {statusError ? (
                            <span className="text-danger">
                              Status is required
                            </span>
                          ) : null}
                        </Col>
                        {(statusValue === 1 || statusValue === 3) && (
                          <Col
                            className="date-input mb-3"
                            lg="4"
                            md="4"
                            sm="6"
                            xs="12"
                          >
                            <span>
                              <span className="text-danger">*</span> Deadline
                            </span>
                            <Input
                              type="date"
                              name="applicationDeadLine"
                              id="applicationDeadLine"
                              value={date}
                              // defaultValue={handleDate(currUpdateData?.endDate)}
                              onChange={(e) => {
                                setDate(
                                  moment(new Date(e.target.value)).format(
                                    "YYYY-MM-DD"
                                  )
                                );
                                setDateError(false);
                              }}
                            />
                            {dateError ? (
                              <span className="text-danger">
                                Date is required
                              </span>
                            ) : null}
                          </Col>
                        )}
                        {statusValue === 1 && (
                          <Col lg="4" md="4" sm="6" xs="12" className="mb-3">
                            <DMYPicker
                              label="Class Start Date"
                              value={startDate}
                              setValue={handleStartDate}
                              error={startdateError}
                              action={setstartDateError}
                            />
                          </Col>
                        )}
                      </Row>

                      <Row>
                        <Col sm="12">
                          {subjectIds?.length > 1 && (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                onChange={(e) => handleSelectAll(e)}
                                type="checkbox"
                                name=""
                                checked={
                                  checked?.length === subjectIds?.length
                                    ? true
                                    : false
                                }
                              />
                              <label className="form-check-label" htmlFor="">
                                Select All
                              </label>
                            </div>
                          )}
                        </Col>
                        {subjectIds?.map((per) => (
                          <Col xs="6" sm="4" md="3" lg="2" key={per.campusId}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                onChange={(e) => handleCheck(e)}
                                type="checkbox"
                                name=""
                                id={per?.campusId}
                                checked={
                                  checked.includes(`${per?.campusId}`)
                                    ? true
                                    : false
                                }
                              />
                              <label className="form-check-label" htmlFor="">
                                {per?.campusName}
                              </label>
                            </div>
                          </Col>
                        ))}
                      </Row>
                      {subjectIds?.length > 0 ? (
                        <>
                          {" "}
                          {checkedError ? (
                            <span className="text-danger">
                              Must be is required
                            </span>
                          ) : null}
                        </>
                      ) : null}
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <button
                          className="cancel-button"
                          onClick={handleClearSearch}
                          type="reset"
                        >
                          Clear
                        </button>
                        {permissions?.includes(
                          permissionList?.Edit_Subjects
                        ) && <SaveButton progress={progress5} />}
                      </Col>
                    </FormGroup>
                  </Form>

                  {/* Table Data Showing  */}
                  <p className="section-title">Course Intakes on Campuses</p>
                  <div className="table-responsive ">
                    <Table className="table-sm table-bordered mb-0">
                      <thead className="tablehead">
                        <tr>
                          <th style={{ width: "20%" }}>Intake</th>
                          <th style={{ width: "20%" }}>Campus</th>
                          <th style={{ width: "15%" }}>Status</th>
                          <th style={{ width: "15%" }}>Deadline</th>
                          <th style={{ width: "15%" }}>Class Start</th>
                          {permissions?.includes(
                            permissionList.Delete_Subjects
                          ) && <th style={{ width: "15%" }}>Action</th>}
                        </tr>
                      </thead>
                    </Table>
                    <Table className="table-sm table-bordered">
                      <tbody>
                        {data?.map((ls, i) => (
                          <tr>
                            {permissions?.includes(
                              permissionList.Delete_Subjects
                            ) ? (
                              <td style={{ width: "20%" }}>{ls?.intakeName}</td>
                            ) : (
                              <td style={{ width: "20%" }}>{ls?.intakeName}</td>
                            )}
                            <td>
                              <Table className="table-sm">
                                <tbody>
                                  {ls?.campusWithIntakeStatusViewModels?.map(
                                    (l) => (
                                      <tr>
                                        <td
                                          style={{
                                            border: "none",
                                            width: "20%",
                                          }}
                                        >
                                          {l?.campusName}
                                        </td>
                                        <td
                                          style={{
                                            border: "none",
                                            width: "15%",
                                          }}
                                        >
                                          {l?.intakeStatusName}
                                        </td>

                                        <td
                                          style={{
                                            border: "none",
                                            width: "15%",
                                          }}
                                        >
                                          {l?.intakeStatusName !== "Closed" && (
                                            <span>
                                              {l?.applicationDeadLine}
                                            </span>
                                          )}
                                        </td>

                                        <td
                                          style={{
                                            border: "none",
                                            width: "15%",
                                          }}
                                        >
                                          {l?.classStartDate !==
                                            "01/01/0001" && (
                                            <span>{l?.classStartDate}</span>
                                          )}
                                        </td>

                                        {permissions?.includes(
                                          permissionList.Delete_Subjects
                                        ) && (
                                          <td
                                            style={{
                                              border: "none",
                                              width: "15%",
                                            }}
                                          >
                                            <ButtonForFunction
                                              func={() => toggleDanger(l)}
                                              color={"danger"}
                                              className={"mx-1 btn-sm"}
                                              icon={
                                                <i className="fas fa-trash-alt"></i>
                                              }
                                              permission={6}
                                            />
                                          </td>
                                        )}
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </Table>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  {/* Delete Modal Start */}

                  <ConfirmModal
                    text="Do You Want To Delete This Information ?"
                    isOpen={deleteModal}
                    toggle={() => {
                      setDeleteModal(!deleteModal);
                      setDelData({});
                    }}
                    confirm={confirmDelete}
                    cancel={() => setDeleteModal(false)}
                    progress={progress}
                  />

                  {/* Delete Modal End */}
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      )}
      {/* subject intake test ends here */}
    </div>
  );
};

export default AddUniversitySubjectIntake;
