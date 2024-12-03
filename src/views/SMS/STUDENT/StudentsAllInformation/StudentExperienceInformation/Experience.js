import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../components/buttons/CancelButton";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import {
  currentDate,
  dateFormate,
} from "../../../../../components/date/calenderFormate";
import DMYPicker from "../../../../../components/form/DMYPicker";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import remove from "../../../../../helpers/remove";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";

const Experience = () => {
  const { applicationStudentId } = useParams();
  const [success, setSuccess] = useState(false);
  const [action, setAction] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const history = useHistory();
  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const [working, setWorking] = useState(false);
  const [delData, setDelData] = useState({});
  const [progress, setProgress] = useState(false);
  const [info, setInfo] = useState([]);
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleError, setJobTitleError] = useState("");
  const [employment, setEmployment] = useState("");
  const [employmentError, setEmploymentError] = useState("");
  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const minDate = "1950-01-01";
  const userType = localStorage.getItem("userType");
  const [nav, setNav] = useState({});

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    setWorking(isChecked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const navigation = await get(
          `StudentNavbar/Get/${applicationStudentId}`
        );
        setNav(navigation);
      } catch (error) {
        console.log(error);
      }
    };
    get(`Experience/GetByStudentId/${applicationStudentId}`).then((res) => {
      setInfo(res);
    });
    fetchData();
  }, [success, applicationStudentId]);

  const handleCancelAdd = () => {
    setShowForm(false);
  };

  const handleJobTitle = (e) => {
    let data = e.target.value.trimStart();
    setJobTitle(data);
    if (data === "") {
      setJobTitleError("Job title is required");
    } else {
      setJobTitleError("");
    }
  };
  const handleEmployment = (e) => {
    let data = e.target.value.trimStart();
    setEmployment(data);
    if (data === "") {
      setEmploymentError("Duties and Responsibilities is required");
    } else {
      setEmploymentError("");
    }
  };
  const handleCompany = (e) => {
    let data = e.target.value.trimStart();
    setCompany(data);
    if (data === "") {
      setCompanyError("Company name is required");
    } else {
      setCompanyError("");
    }
  };
  const handleStartDate = (e) => {
    // setStartDate(e.target.value);
    // if (e.target.value === "") {
    //   setStartDateError("Start date is required");
    // } else {
    //   setStartDateError("");
    // }
    if (e) {
      setStartDate(e);
    } else {
      setStartDateError("Start date is required");
    }
  };
  const handleEndDate = (e) => {
    // setEndDate(e.target.value);
    // if (e.target.value === "") {
    //   setEndDateError("End date is required");
    // } else {
    //   setEndDateError("");
    // }
    if (e) {
      setEndDate(e);
    } else {
      setEndDateError("End date is required");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;

    if (!jobTitle) {
      isFormValid = false;
      setJobTitleError("Job title is required");
    }
    if (!employment) {
      isFormValid = false;
      setEmploymentError(" Duties and Responsibilities is required");
    }
    if (!company) {
      isFormValid = false;
      setCompanyError("Company name is required");
    }
    if (!startDate) {
      isFormValid = false;
      setStartDateError("Start date is required");
    }
    if (!working && !endDate) {
      isFormValid = false;
      setEndDateError("End date is required");
    }
    return isFormValid;
  };

  const handleRegisterStudent = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    subData.append("isStillWorking", working);
    if (startDate) {
      subData.append("startDate", startDate);
    }
    if (endDate) {
      subData.append("endDate", endDate);
    }

    if (validateRegisterForm()) {
      if (value.id) {
        setButtonStatus(true);
        setProgress(true);
        put("Experience/Update", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setValue({});
          setSuccess(!success);
          setInfo({});
          setJobTitle("");
          setEmployment("");
          setCompany("");
          setStartDate("");
          setEndDate("");

          setShowForm(false);
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        post("Experience/Create", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setShowForm(false);
          setInfo({});
          setJobTitle("");
          setEmployment("");
          setCompany("");
          setStartDate("");
          setEndDate("");
        });
      }
    }
  };

  const toggleDanger = (id) => {
    setDelData(id);
    setDeleteModal(true);
  };

  const handleDeletePermission = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Experience/Delete/${delData?.id}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      setSuccess(!success);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      get(`Experience/GetByStudentId/${applicationStudentId}`).then((res) => {
        setInfo(res);
      });
    });
    setValue({});
    setJobTitle("");
    setEmployment("");
    setCompany("");
    setStartDate(currentDate);
    setEndDate(currentDate);
    setJobTitleError("");
    setEmploymentError("");
    setCompanyError("");
  };

  const handleUpdate = (id) => {
    setShowForm(true);
    get(`Experience/Get/${id}`).then((res) => {
      console.log("experience value", res);
      setValue(res);
      setJobTitle(res?.jobTitle);
      setEmployment(res?.employeementDetails);
      setCompany(res?.companyName);
      setStartDate(moment(new Date(res?.startDate)).format("YYYY-MM-DD"));
      setEndDate(moment(new Date(res?.endDate)).format("YYYY-MM-DD"));
      setWorking(res.isStillWorking);
    });
    setJobTitleError("");
    setEmploymentError("");
    setCompanyError("");
  };

  if (showForm) {
    const element = document.getElementById("scrollDown");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const goPrevious = () => {
    history.push(`/addTestScore/${applicationStudentId}`);
  };
  const goForward = () => {
    history.push(`/addReference/${applicationStudentId}`);
  };
  const onShow = () => {
    setShowForm(true);

    setJobTitle("");
    setEmployment("");
    setCompany("");
    setStartDate(currentDate);
    setEndDate(currentDate);
    setJobTitleError("");
    setEmploymentError("");
    setCompanyError("");
    setWorking(false);
  };

  return (
    <div>
      <BreadCrumb
        title="Experience Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />

      <StudentNavigation
        studentid={applicationStudentId}
        activetab={"7"}
        success={success}
        setSuccess={setSuccess}
        action={setAction}
      />
      <Card>
        <CardBody>
          <p className="section-title">Experience Information</p>

          <div className="row mx-0 mb-3">
            {info.length > 0 && (
              <Table className="table-bordered">
                <thead className="tablehead">
                  <tr>
                    <th>Job Title</th>
                    <th>Company Name</th>
                    <th>Duties and Responsibilities</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {info?.map((inf, i) => (
                    <tr key={inf.id}>
                      <td>{inf?.jobTitle}</td>
                      <td>{inf?.companyName}</td>
                      <td>{inf?.employeementDetails}</td>
                      <td>{dateFormate(inf?.startDate)}</td>
                      <td>
                        {inf?.isStillWorking === false ? (
                          dateFormate(inf?.endDate)
                        ) : (
                          <span>Continue</span>
                        )}
                      </td>

                      <td>
                        <span>
                          {permissions?.includes(
                            permissionList?.Edit_Student
                          ) ? (
                            <a href="#experience-form">
                              <span
                                className="pointer text-body"
                                onClick={() => handleUpdate(inf.id)}
                              >
                                Edit
                              </span>
                            </a>
                          ) : null}{" "}
                          |{" "}
                          {permissions?.includes(
                            permissionList?.Edit_Student
                          ) ? (
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => toggleDanger(inf)}
                            >
                              Delete
                            </span>
                          ) : null}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <ConfirmModal
              text="Do You Want To Delete Experience Information?"
              isOpen={deleteModal}
              toggle={() => setDeleteModal(!deleteModal)}
              confirm={handleDeletePermission}
              buttonStatus={buttonStatus}
              progress={progress}
              cancel={() => setDeleteModal(false)}
            />
          </div>

          {info.length < 1 || showForm ? (
            <div id="experience-form" className="pt-1">
              {" "}
              <Form onSubmit={handleRegisterStudent}>
                <input
                  type="hidden"
                  name="studentId"
                  id="studentId"
                  value={applicationStudentId}
                />
                {value?.id ? (
                  <input type="hidden" name="id" id="id" value={value.id} />
                ) : null}
                <Row>
                  <Col lg="6" md="8">
                    <FormGroup className="has-icon-left position-relative">
                      <span>
                        <span className="text-danger">*</span> Job Title
                      </span>

                      <Input
                        className="form-mt"
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        placeholder="Enter Job Title"
                        onChange={(e) => {
                          handleJobTitle(e);
                        }}
                        value={jobTitle}
                      />
                      <span className="text-danger">{jobTitleError}</span>
                    </FormGroup>
                    <FormGroup className="has-icon-left position-relative">
                      <span>
                        <span className="text-danger">*</span> Duties and
                        Responsibilities
                      </span>

                      <Input
                        className="form-mt"
                        type="text"
                        name="employeementDetails"
                        id="employeementDetails"
                        placeholder="Enter Duties and Responsibilities"
                        onChange={(e) => {
                          handleEmployment(e);
                        }}
                        value={employment}
                      />
                      <span className="text-danger">{employmentError}</span>
                    </FormGroup>
                    <FormGroup className="has-icon-left position-relative">
                      <span>
                        <span className="text-danger">*</span>Company Name
                      </span>

                      <Input
                        className="form-mt"
                        type="text"
                        name="companyName"
                        id="companyName"
                        onChange={(e) => {
                          handleCompany(e);
                        }}
                        placeholder="Enter Company Name"
                        value={company}
                      />
                      <span className="text-danger">{companyError}</span>
                    </FormGroup>
                    <FormGroup className="has-icon-left position-relative">
                      {/* <span>
                        <span className="text-danger">*</span> Start Date
                      </span>

                      <Input
                        className="form-mt"
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => {
                          handleStartDate(e);
                        }}
                        min={minDate}
                      />
                      <span className="text-danger">{startDateError}</span> */}
                      <DMYPicker
                        setValue={handleStartDate}
                        label="Start Date"
                        value={startDate}
                        error={startDateError}
                        action={setStartDateError}
                        required={true}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        className="ml-0"
                        type="checkbox"
                        checked={working}
                        onChange={handleChange}
                      />
                      <span className="ml-4">Still Working?</span>
                    </FormGroup>
                    {!working ? (
                      <FormGroup className="has-icon-left position-relative">
                        {/* <span>
                          End Date <span className="text-danger">*</span>{" "}
                        </span>

                        <Input
                          className="form-mt"
                          type="date"
                          onChange={(e) => {
                            handleEndDate(e);
                          }}
                          min={minDate}
                          value={endDate}
                        />
                        <span className="text-danger">{endDateError}</span> */}
                        <DMYPicker
                          setValue={handleEndDate}
                          label="End Date"
                          value={endDate}
                          error={endDateError}
                          action={setEndDateError}
                          required={true}
                        />
                      </FormGroup>
                    ) : null}
                  </Col>
                </Row>

                <FormGroup row className="mt-2">
                  <Col lg="6" md="8" className="text-right">
                    {info.length > 0 && (
                      <CancelButton cancel={handleCancelAdd} />
                    )}
                    {permissions?.includes(permissionList?.Edit_Student) ? (
                      <SaveButton
                        progress={progress}
                        buttonStatus={buttonStatus}
                      />
                    ) : null}
                  </Col>
                </FormGroup>
              </Form>
            </div>
          ) : (
            <>
              {info?.length > 0 && !showForm ? (
                <>
                  {permissions?.includes(permissionList?.Edit_Student) ? (
                    <a href="#experience-form" className="text-decoration-none">
                      <button
                        className="add-button"
                        onClick={onShow}
                        permission={6}
                      >
                        Add experience
                      </button>
                    </a>
                  ) : null}
                </>
              ) : null}
            </>
          )}

          <Row className="mt-4 ">
            <Col className="d-flex justify-content-between">
              <PreviousButton action={goPrevious} />
              {action?.reference && nav?.reference && (
                <SaveButton text="Next" action={goForward} />
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default Experience;
