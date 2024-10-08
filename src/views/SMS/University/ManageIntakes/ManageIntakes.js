/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Input, Row, Form, FormGroup } from "reactstrap";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";

const ManageIntakes = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [buttonStatus, setButtonStatus] = useState(false);
  const [universityValue, setUniversityValue] = useState(0);
  const [universityLable, setUniversityLable] = useState("Select University");
  const [intakeData, setIntakeData] = useState([]);
  const [intakeStatusData, setIntakeStatusData] = useState([]);
  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [intakeError, setIntakeError] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [statusError, setStatusError] = useState(false);
  const [campuusLabel, setCampusLabel] = useState("Select Campus");
  const [campusValue, setCampusValue] = useState(0);
  const [campusError, setCampusError] = useState(false);
  const [campusIds, setCampusIds] = useState([]);
  const [checkIds, setCheckIds] = useState([]);
  const [checkSubIds, setCheckSubIds] = useState([]);
  const [progress5, setProgress5] = useState(false);
  const { addToast } = useToasts();
  const [date, setDate] = useState();
  const [dateError, setDateError] = useState(false);
  const [subjectIds, setSubjectIds] = useState([]);

  useEffect(() => {
    get(`IntakeDD/Index`).then((res) => {
      setIntakeData(res);
    });

    get(`IntakeStatus/GetAll`).then((res) => {
      setIntakeStatusData(res);
      console.log(res, "status");
    });
  }, []);

  useEffect(() => {
    get(`IntakeManagement/GetCampuses/${universityValue}`).then((res) => {
      setCampusLabel("Select Campus");
      setCampusValue(0);
      setCampusIds(res);
    });
  }, [universityValue]);

  useEffect(() => {
    if (campusValue !== 0 && intakeValue !== 0 && statusValue !== 0) {
      get(
        `IntakeManagement/GetCampusSubjects/${campusValue}/${intakeValue}/${statusValue}`
      ).then((res) => {
        setSubjectIds(res);
        let newChecked = [];
        res.map((item) => {
          item.subjectItems.map((per) => {
            per?.isChecked === true && newChecked.push(per?.subjectId);
          });
        });
        setCheckSubIds([...newChecked]);
      });
    }
  }, [campusValue, intakeValue, statusValue]);

  // const getSubjects = () => {
  //   if (campusValue !== 0 && intakeValue !== 0 && statusValue !== 0) {
  //     get(
  //       `IntakeManagement/GetCampusSubjects/${campusValue}/${intakeValue}/${statusValue}`
  //     ).then((res) => {
  //       setSubjectIds(res);
  //       console.log("sakib", res);
  //     });
  //   }
  // };

  // for intake dropdown
  const intakeDropDown = intakeData?.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));

  const intakeStatusDropDown = intakeStatusData?.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));

  const campusDropDown = campusIds?.map((campus) => ({
    label: campus?.name,
    value: campus?.id,
  }));

  const selectIntakeType = (label, value) => {
    setIntakeError(false);
    setIntakeLabel(label);
    setIntakeValue(value);
    // getSubjects();
  };

  const selectStatusType = (label, value) => {
    setStatusError(false);
    setStatusLabel(label);
    setStatusValue(value);
    // getSubjects();
  };

  const selectCampusType = (label, value) => {
    setCampusError(false);
    setCampusLabel(label);
    setCampusValue(value);
    // getSubjects();
  };

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
    if (campusValue === 0) {
      isFormValid = false;
      setCampusError(true);
    }
    if (!date && statusValue === 1) {
      isFormValid = false;
      setDateError(true);
    }

    return isFormValid;
  };

  const handleSubjectAssignInIntake = (e) => {
    e.preventDefault();

    const subdata = new FormData(e.target);
    console.log(checkIds);
    subdata.append(`subjects`, checkSubIds);

    if (validateForm()) {
      setButtonStatus(true);
      setProgress5(true);
      post(`IntakeManagement/AssignIntakes`, subdata).then((res) => {
        setButtonStatus(false);
        setProgress5(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
        handleClearSearch();
      });
    }
  };

  const handleClearSearch = () => {
    setUniversityValue(0);
    setUniversityLable("Select University");
    setCampusValue("Select Campus");
    setCampusLabel(0);
    setStatusLabel("Select Status");
    setStatusValue(0);
    setIntakeLabel("Select Intake");
    setIntakeValue(0);
    setDate();
    setSubjectIds([]);
    setCheckSubIds([]);
  };

  // const handleSelectAll = (e) => {
  //   let newChecked = [];
  //   const val = e.target.checked;
  //   if (val === true) {
  //     // eslint-disable-next-line array-callback-return
  //     subjectIds.map((per) => {
  //       const perId = per?.departmentId;
  //       newChecked.push(perId);
  //     });
  //     setCheckIds([...newChecked]);
  //   }

  //   if (val === false) {
  //     setCheckIds([]);
  //   }
  // };

  const handleCheck = (e, id, i) => {
    let val = e.target.checked;
    console.log(i);
    if (val === true) {
      let newChecked = [];
      setCheckIds([...checkIds, id]);
      subjectIds[i].subjectItems.map((per) => {
        const perId = per?.subjectId;
        newChecked.push(perId);
      });
      setCheckSubIds([...checkSubIds, ...newChecked]);
    } else {
      const res = checkIds.filter((c) => c !== id);
      setCheckIds(res);
      subjectIds[i].subjectItems.map((per) => {
        const perId = per?.subjectId;
        const res = checkSubIds.filter((c) => c !== perId);
        setCheckSubIds([res]);
      });
    }
  };

  const handleSubCheck = (e, id, i) => {
    let val = e.target.checked;

    if (val === true) {
      setCheckSubIds([...checkSubIds, id]);
    } else {
      const res = checkSubIds.filter((c) => c !== id);
      setCheckSubIds(res);
    }
  };

  return (
    <div>
      <BreadCrumb title="Manage Intakes" />

      <Card>
        <CardBody>
          <Form onSubmit={handleSubjectAssignInIntake}>
            <FormGroup>
              <Row>
                <Col lg="4" md="4" sm="6" xs="12">
                  <span>
                    <span className="text-danger">*</span> Intake
                  </span>
                  <Select
                    options={intakeDropDown}
                    value={{ label: intakeLabel, value: intakeValue }}
                    onChange={(opt) => selectIntakeType(opt.label, opt.value)}
                    name="intakeId"
                    id="intakeId"
                  />
                  {intakeError ? (
                    <span className="text-danger">Intake is required</span>
                  ) : null}
                </Col>

                <Col lg="4" md="4" sm="6" xs="12">
                  <span>
                    <span className="text-danger">*</span> Status
                  </span>

                  <Select
                    options={intakeStatusDropDown}
                    value={{ label: statusLabel, value: statusValue }}
                    onChange={(opt) => selectStatusType(opt.label, opt.value)}
                    name="intakeStatusId"
                    id="intakeStatusId"
                  />
                  {statusError ? (
                    <span className="text-danger">Status is required</span>
                  ) : null}
                </Col>
                {statusValue === 1 && (
                  <Col className="date-input" lg="4" md="4" sm="6" xs="12">
                    <span>
                      <span className="text-danger">*</span> Application
                      Dateline
                    </span>
                    <Input
                      type="date"
                      name="deadline"
                      id="deadline"
                      value={date}
                      onChange={(e) => {
                        setDate(
                          moment(new Date(e.target.value)).format("YYYY-MM-DD")
                        );
                        setDateError(false);
                      }}
                    />
                    {dateError ? (
                      <span className="text-danger">Date is required</span>
                    ) : null}
                  </Col>
                )}
              </Row>
            </FormGroup>
            <Row>
              <Col lg="4" md="4" sm="6" xs="12">
                {" "}
                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> University
                  </span>
                  <DefaultDropdown
                    label={universityLable}
                    setLabel={setUniversityLable}
                    value={universityValue}
                    setValue={setUniversityValue}
                    url="SearchFilter/Universities/0/0/0"
                    name=""
                    error={() => {}}
                    setError={() => {}}
                    errorText=""
                    action={() => {
                      setSubjectIds([]);
                      setCheckSubIds([]);
                    }}
                  />
                </FormGroup>
              </Col>{" "}
              {campusIds?.length > 0 && (
                <Col lg="4" md="4" sm="6" xs="12">
                  <FormGroup>
                    <span>
                      <span className="text-danger">*</span> Campus
                    </span>
                    <Select
                      options={campusDropDown}
                      value={{ label: campuusLabel, value: campusValue }}
                      onChange={(opt) => selectCampusType(opt.label, opt.value)}
                      name="campusId"
                      id="campusId"
                    />
                    {campusError ? (
                      <span className="text-danger">Campus is required</span>
                    ) : null}
                  </FormGroup>
                </Col>
              )}
            </Row>

            {subjectIds?.length > 0 && (
              <>
                <FormGroup>
                  <div className="mt-1 mb-4 d-flex justify-content-between cardborder">
                    Note: Assign any Changes from here will directly change the
                    subject intake module
                  </div>
                </FormGroup>

                <Row>
                  {/* <Col sm="12">
                    {subjectIds?.length > 1 && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          onChange={(e) => handleSelectAll(e)}
                          type="checkbox"
                          name=""
                          checked={
                            checkIds?.length === subjectIds?.length
                              ? true
                              : false
                          }
                        />
                        <label className="form-check-label" htmlFor="">
                          Select All
                        </label>
                      </div>
                    )}
                  </Col> */}
                  {subjectIds?.map((per, i) => (
                    <Col xs="12" sm="12" md="6" lg="4" key={i}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          onChange={(e) => handleCheck(e, per?.departmentId, i)}
                          type="checkbox"
                          checked={
                            per.subjectItems.every((value) =>
                              checkSubIds.includes(value.subjectId)
                            ) === true
                              ? true
                              : false
                          }
                          // checked={
                          //   checkIds.includes(per?.departmentId) === true
                          //     ? true
                          //     : false
                          // }
                        />
                        <label className="form-check-label" htmlFor="">
                          {per?.departmentName}
                        </label>
                      </div>

                      {per?.subjectItems?.map((item, j) => (
                        <div className="form-check ml-4" key={j}>
                          <input
                            className="form-check-input"
                            onChange={(e) =>
                              handleSubCheck(e, item?.subjectId, i)
                            }
                            type="checkbox"
                            checked={
                              checkSubIds.includes(item?.subjectId) === true
                                ? true
                                : false
                            }
                          />
                          <label className="form-check-label" htmlFor="">
                            {item?.subjectName}
                          </label>
                        </div>
                      ))}
                    </Col>
                  ))}
                </Row>

                <FormGroup row>
                  <Col className="text-center">
                    <CancelButton text="Clear" cancel={handleClearSearch} />
                    {permissions?.includes(permissionList.Edit_University) && (
                      <SaveButton
                        text="Apply"
                        progress={progress5}
                        buttonStatus={buttonStatus}
                      />
                    )}
                  </Col>
                </FormGroup>
              </>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageIntakes;
