import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import put from "../../../../helpers/put";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import ReactQuill from "react-quill";

const AddUniversitySubject = () => {
  const [submitData, setSubmitData] = useState(false);
  const [activetab, setActivetab] = useState("1");
  const [programLevel, setProgramLevel] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [subDepList, setSubDepList] = useState([]);
  // const [uniLabel, setUniLabel] = useState("Select University");
  // const [uniValue, setUniValue] = useState(0);
  const [programLabel, setProgramLabel] = useState("Select Education Level");
  const [programValue, setProgramValue] = useState(0);
  const [depLabel, setDepLabel] = useState("Select Department");
  const [depValue, setDepValue] = useState(0);
  const [subDepLabel, setSubDepLabel] = useState("Select Sub Department");
  const [subDepValue, setSubDepValue] = useState(0);

  // const [subject, setSubject] = useState({});
  const [subId, setSubId] = useState(0);
  const [subName, setSubName] = useState("");
  const [subNameError, setSubNameError] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const [progLvlError, setProgLvlError] = useState(false);
  const [deptDropError, setDeptDropError] = useState(false);
  const [subDeptDropError, setSubDeptDropError] = useState(false);
  const [subjectId, setSubjectId] = useState(undefined);

  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const { addToast } = useToasts();
  const { id, subjId } = useParams();
  console.log(subjId);
  console.log(id);

  const history = useHistory();

  useEffect(() => {
    if (subjId !== undefined) {
      get(`Subject/Get/${subjId}`)
        .then((res) => {
          // setSubject(res);
          setSubId(res?.id);
          setSubName(res?.name);
          setDescription(res?.description);
          setDuration(res?.duration);
          // setUniLabel(res?.university?.name);
          // setUniValue(res?.university?.id);
          setProgramLabel(res?.educationLevel?.name);
          setProgramValue(res?.educationLevel?.id);
          setDepLabel(res?.department?.name);
          setDepValue(res?.department?.id);
          setSubDepLabel(res?.subDepartment?.name);
          setSubDepValue(res?.subDepartment?.id);
        })
        .catch();
    } else {
      get(`Subject/Get/${subjectId}`)
        .then((res) => {
          // setSubject(res);
          setSubId(res?.id);
          setSubName(res?.name);
          setDescription(res?.description);
          setDuration(res?.duration);
          // setUniLabel(res?.university?.name);
          // setUniValue(res?.university?.id);
          setProgramLabel(res?.educationLevel?.name);
          setProgramValue(res?.educationLevel?.id);
          setDepLabel(res?.department?.name);
          setDepValue(res?.department?.id);
          setSubDepLabel(res?.subDepartment?.name);
          setSubDepValue(res?.subDepartment?.id);
        })
        .catch();
    }

    get("EducationLevelDD/Index")
      .then((res) => {
        setProgramLevel(res);
      })
      .catch();

    get("DepartmentDD/Index")
      .then((res) => {
        setDepartmentList(res);
      })
      .catch();
  }, [subjId, subjectId]);

  const selectSubDepByDepartment = (depValue) => {
    get(`SubDepartmentDD/Index/${depValue}`).then((res) => {
      setSubDepList(res);
    });
  };

  //   const selectUniversity = (label, value) => {
  //     setUniDropError(false);
  //     setUniLabel(label);
  //     setUniValue(value);
  //   }

  const selectProgramLevel = (label, value) => {
    setProgLvlError(false);
    setProgramLabel(label);
    setProgramValue(value);
  };

  const selectDepartment = (label, value) => {
    setSubDepLabel("Select Sub Department");
    setSubDepValue(0);
    setDeptDropError(false);
    setDepLabel(label);
    setDepValue(value);
    selectSubDepByDepartment(value);
  };

  const selectSubDepartment = (label, value) => {
    setSubDeptDropError(false);
    setSubDepLabel(label);
    setSubDepValue(value);
  };

  // const uniMenu = universityList.map((universityOptions) => ({
  //   label: universityOptions.name,
  //   value: universityOptions.id,
  // }));

  const programLevelMenu = programLevel.map((programOptions) => ({
    label: programOptions.name,
    value: programOptions.id,
  }));

  const departmentMenu = departmentList.map((depOptions) => ({
    label: depOptions.name,
    value: depOptions.id,
  }));

  const subDepMenu = subDepList.map((subDepOptions) => ({
    label: subDepOptions.name,
    value: subDepOptions.id,
  }));

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (id !== undefined) {
      if (tab === "2") {
        history.push(`/add-university-course-Fee/${id}/${subjId}`);
      }

      if (tab === "3") {
        history.push(`/add-university-course-test-score/${id}/${subjId}`);
      }
      if (tab === "4") {
        history.push(`/add-university-course-requirements/${id}/${subjId}`);
      }

      if (tab === "5") {
        history.push(`/add-university-course-assign-to-campus/${id}/${subjId}`);
      }
      if (tab === "6") {
        history.push(`/add-university-course-intake/${id}/${subjId}`);
      }
    } else {
      if (tab === "2") {
        history.push(`/add-university-course-Fee/${id}/${subjectId}`);
      }

      if (tab === "3") {
        history.push(`/add-university-course-test-score/${id}/${subjectId}`);
      }
      if (tab === "4") {
        history.push(`/add-university-course-requirements/${id}/${subjectId}`);
      }

      if (tab === "5") {
        history.push(
          `/add-university-course-assign-to-campus/${id}/${subjectId}`
        );
      }
      if (tab === "6") {
        history.push(`/add-university-course-intake/${id}/${subjectId}`);
      }
    }
  };

  const AuthStr = localStorage.getItem("token");

  const handleSubjectName = (e) => {
    setSubName(e.target.value);
    if (e.target.value === "") {
      setSubNameError("Course Name is required");
    } else {
      setSubNameError("");
    }
  };

  const ValidateForm = () => {
    var isValid = true;
    if (!subName) {
      isValid = false;
      setSubNameError("Course Name is required");
    }
    if (programValue === 0) {
      isValid = false;
      setProgLvlError(true);
    }
    if (depValue === 0) {
      isValid = false;
      setDeptDropError(true);
    }
    if (subDepValue === 0) {
      isValid = false;
      setSubDeptDropError(true);
    }
    return isValid;
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    // if(uniValue === 0){
    //   setUniDropError(true);
    // }

    if (ValidateForm()) {
      if (subId !== 0) {
        // setButtonStatus(true);
        setProgress(true);
        put("Subject/Update", subdata).then((res) => {
          // setButtonStatus(false);
          setProgress(false);
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push({
              pathname: `/add-university-course-Fee/${id}/${subjId}`,
            });
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        // setButtonStatus(true);
        setProgress(true);
        Axios.post(`${rootUrl}Subject/Create`, subdata, {
          headers: {
            "Content-Type": "application/json",
            authorization: AuthStr,
          },
        }).then((res) => {
          // setButtonStatus(false);
          setProgress(false);
          // localStorage.setItem("subjectId",res?.data?.result?.id);
          const subjeId = res?.data?.result?.id;
          setSubjectId(subjeId);

          if (res.status === 200 && res.data.isSuccess === true) {
            setSubmitData(true);
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push({
              pathname: `/add-university-course-Fee/${id}/${subjeId}`,
              id: subId,
            });
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const handleCancelAdd = () => {
    history.push(`/university-courses/${id}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Course Information"
        backTo="Subject"
        path={`/university-courses/${id}`}
      />

      <Nav tabs>
        <NavItem>
          <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
            Course Information
          </NavLink>
        </NavItem>

        {subjId !== undefined ? (
          <>
            <NavItem>
              {submitData || subjId ? (
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Course fee & delivery pattern
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "2"}>
                  Course fee & delivery pattern
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {submitData || subjId ? (
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  Test Score
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "3"}>
                  Test Score
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {submitData || subjId ? (
                <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                  Requirement
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "4"}>
                  Requirement
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {submitData || subjId ? (
                <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                  Campus
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "5"}>
                  Campus
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {submitData || subjId ? (
                <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                  Intake
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "6"}>
                  Intake
                </NavLink>
              )}
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              {submitData || subjectId ? (
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Course fee & delivery pattern
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "2"}>
                  Course fee & delivery pattern
                </NavLink>
              )}
            </NavItem>

            <NavItem>
              {submitData || subjectId ? (
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  Test Score
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "3"}>
                  Test Score
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {submitData || subjectId ? (
                <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                  Requirement
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "4"}>
                  Requirement
                </NavLink>
              )}
            </NavItem>

            <NavItem>
              {submitData || subjectId ? (
                <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                  Campus
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "5"}>
                  Campus
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {submitData || subjectId ? (
                <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                  Intake
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "6"}>
                  Intake
                </NavLink>
              )}
            </NavItem>
          </>
        )}
      </Nav>

      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <Form onSubmit={handleSubmit}>
                {subId !== 0 ? (
                  <input type="hidden" name="id" id="id" value={subId} />
                ) : null}
                <Input
                  type="hidden"
                  name="universityId"
                  id="universityId"
                  value={id}
                />
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <span>
                        <span className="text-danger">*</span>Course Name
                      </span>

                      <Input
                        type="text"
                        name="name"
                        value={subName}
                        id="name"
                        placeholder="Enter Course Name"
                        onChange={(e) => {
                          handleSubjectName(e);
                        }}
                      />
                      <span className="text-danger">{subNameError}</span>
                    </FormGroup>
                    <FormGroup>
                      <span>Description</span>

                      <Input
                        type="textarea"
                        rows="4"
                        defaultValue={description}
                        placeholder="Enter Description"
                        name="description"
                        id="description"
                        // required
                      />
                    </FormGroup>
                    <FormGroup>
                      <span>Duration</span>

                      <Input
                        type="text"
                        name="duration"
                        id="duration"
                        defaultValue={duration}
                        placeholder="Enter Duration"
                        // required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <span>
                        <span className="text-danger">*</span>Education level
                      </span>

                      <Select
                        options={programLevelMenu}
                        value={{ label: programLabel, value: programValue }}
                        onChange={(opt) =>
                          selectProgramLevel(opt.label, opt.value)
                        }
                        name="educationLevelId"
                        id="educationLevelId"
                      />
                      {progLvlError && (
                        <span className="text-danger">
                          Education level is required
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <span>
                        <span className="text-danger">*</span>Department
                      </span>

                      <Select
                        options={departmentMenu}
                        value={{ label: depLabel, value: depValue }}
                        onChange={(opt) =>
                          selectDepartment(opt.label, opt.value)
                        }
                        name="departmentId"
                        id="departmentId"
                      />
                      {deptDropError && (
                        <span className="text-danger">
                          Department is required
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <span>
                        <span className="text-danger">*</span>Sub-Department
                      </span>

                      <Select
                        options={subDepMenu}
                        value={{ label: subDepLabel, value: subDepValue }}
                        onChange={(opt) =>
                          selectSubDepartment(opt.label, opt.value)
                        }
                        name="subDepartmentId"
                        id="subDepartmentId"
                      />
                      {subDeptDropError && (
                        <span className="text-danger">
                          Sub-department is required
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup row className="text-right mt-4">
                  <Col lg="6" md="4">
                    <CancelButton cancel={handleCancelAdd} />
                    <SaveButton text="Save and Next" progress={progress} />
                  </Col>
                </FormGroup>
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
      <br />
      <br />
    </div>
  );
};

export default AddUniversitySubject;
