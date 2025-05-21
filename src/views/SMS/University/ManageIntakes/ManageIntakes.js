/* eslint-disable array-callback-return */
import moment from "moment";
import React, { useEffect, useState } from "react";
import Select from "react-select";
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
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import DMYPicker from "../../../../components/form/DMYPicker";

const ManageIntakes = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
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
  const [checkSubIdsError, setCheckSubIdsError] = useState(false);
  const [progress5, setProgress5] = useState(false);
  const { addToast } = useToasts();
  const [date, setDate] = useState();
  const [startDate, setStartDate] = useState();
  const [dateError, setDateError] = useState(false);
  const [subjectIds, setSubjectIds] = useState([]);
  const [expandIds, setExpandIds] = useState([]);
  const [agree, setAgree] = useState(false);
  const [deadline, setDeadline] = useState("");

  const handleDeadlineDate = (value) => {
    setDate(value);
    setDateError(false);
  };

  const handleCollapsId = (i) => {
    const res = expandIds.filter((c) => c !== i);
    setExpandIds(res);
  };

  const handleAgree = (e) => {
    setAgree(e.target.checked);
  };

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
    if (campusValue !== 0) {
      get(`IntakeManagement/GetCampusSubjects/${campusValue}`).then((res) => {
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
  }, [success, campusValue]);

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

  function getLastDateOfMonth(dateText) {
    const [month, year] = dateText.trim().split(" ");
    const dateObject = new Date(`${month} 1, ${year}`);
    dateObject.setMonth(dateObject.getMonth() + 1, 0);
    const lastFullDate = moment(new Date(dateObject)).format("YYYY-MM-DD");
    return lastFullDate;
  }

  const selectIntakeType = (label, value) => {
    setIntakeError(false);
    setIntakeLabel(label);
    setIntakeValue(value);
    // setDate(getLastDateOfMonth(label));
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
    console.log(checkSubIds);
    if (checkSubIds.length === 0) {
      isFormValid = false;
      setCheckSubIdsError(true);
    }

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

    if (date && (statusValue === 1 || statusValue === 3)) {
      if (subdata.has("deadline")) {
        subdata.delete("deadline");
      }
      const formattedDate = moment(new Date(date)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      subdata.append("deadline", formattedDate);
    }

    if (startDate && statusValue === 1) {
      if (subdata.has("classStart")) {
        subdata.delete("classStart");
      }
      const formattedDate = moment(new Date(startDate)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      subdata.append("classStart", formattedDate);
    }

    if (validateForm()) {
      setButtonStatus(true);
      setProgress5(true);
      post(`IntakeManagement/AssignIntakes`, subdata).then((res) => {
        setButtonStatus(false);
        setProgress5(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          setSuccess(!success);
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
        // handleClearSearch();
      });
    }
  };

  const handleClearSearch = () => {
    setUniversityLable("Select University");
    setUniversityValue(0);
    setCampusLabel("Select Campus");
    setCampusValue(0);
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

  const handleChecked = (e, id, i) => {
    // let val = check ? check : e.target.checked;

    const res = checkIds.filter((c) => c !== id);
    setCheckIds(res);
    let updateChecked = checkSubIds;
    subjectIds[i].subjectItems.map((per) => {
      const perId = per?.subjectId;
      const result = updateChecked.filter((c) => c !== perId);
      updateChecked = result;
    });
    setCheckSubIds([...updateChecked]);

    let newChecked = [];
    setCheckIds([...checkIds, id]);
    subjectIds[i].subjectItems.map((per) => {
      const perId = per?.subjectId;
      newChecked.push(perId);
    });
    setCheckSubIds([...checkSubIds, ...newChecked]);
    setCheckSubIdsError(false);
  };

  const handleCheck = (e, id, i, check) => {
    let val = check ? check : e.target.checked;
    if (val === true) {
      let newChecked = [];
      setCheckIds([...checkIds, id]);
      subjectIds[i].subjectItems.map((per) => {
        const perId = per?.subjectId;
        newChecked.push(perId);
      });
      setCheckSubIds([...checkSubIds, ...newChecked]);
      setCheckSubIdsError(false);
    } else {
      const res = checkIds.filter((c) => c !== id);
      setCheckIds(res);
      let updateChecked = checkSubIds;
      subjectIds[i].subjectItems.map((per) => {
        const perId = per?.subjectId;
        const result = updateChecked.filter((c) => c !== perId);
        updateChecked = result;
      });
      setCheckSubIds([...updateChecked]);
    }
  };

  const handleSubCheck = (e, id, i) => {
    let val = e.target.checked;

    if (val === true) {
      setCheckSubIds([...checkSubIds, id]);
      setCheckSubIdsError(false);
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
            <Row>
              <Col lg="4" md="4" sm="6" xs="12">
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
              </Col>
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

                  <Col md={8}>
                    <span className="section-title mr-3">Subjects</span>
                    {checkSubIdsError ? (
                      <span className="text-danger">Subject is required</span>
                    ) : null}

                    <Table responsive>
                      {subjectIds?.map((per, i) => (
                        <div key={i} className="mb-1">
                          <thead className="tablehead w-100 d-flex justify-content-between px-1">
                            <th className="form-check pl-4 border-0">
                              {per.subjectItems.every((value) =>
                                checkSubIds?.includes(value.subjectId)
                              ) === true ? (
                                <input
                                  className="form-check-input"
                                  onChange={(e) =>
                                    handleCheck(e, per?.departmentId, i)
                                  }
                                  type="checkbox"
                                  checked={true}
                                />
                              ) : per.subjectItems.filter((value) =>
                                  checkSubIds?.includes(value.subjectId)
                                ).length > 0 ? (
                                <input
                                  className="form-check-input"
                                  style={{ opacity: ".3" }}
                                  onChange={(e) =>
                                    handleChecked(e, per?.departmentId, i, true)
                                  }
                                  type="checkbox"
                                  checked={true}
                                />
                              ) : (
                                <input
                                  className="form-check-input"
                                  onChange={(e) =>
                                    handleCheck(e, per?.departmentId, i)
                                  }
                                  type="checkbox"
                                  checked={false}
                                />
                              )}

                              <label
                                className="form-check-label mt-1"
                                htmlFor=""
                              >
                                {per?.departmentName}
                              </label>
                            </th>
                            <th className="border-0">
                              {expandIds.includes(i) ? (
                                <i
                                  class="fas fa-minus fs-16px pointer text-right"
                                  onClick={() => handleCollapsId(i)}
                                ></i>
                              ) : (
                                <i
                                  class="fas fa-plus fs-16px pointer text-right"
                                  onClick={() =>
                                    setExpandIds([...expandIds, i])
                                  }
                                ></i>
                              )}
                            </th>
                          </thead>
                          {expandIds.includes(i) && (
                            <tbody className="w-100">
                              {per?.subjectItems?.map((item, j) => (
                                <tr key={j} className="w-100">
                                  <td className="w-50">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        onChange={(e) =>
                                          handleSubCheck(e, item?.subjectId, i)
                                        }
                                        type="checkbox"
                                        checked={
                                          checkSubIds?.includes(
                                            item?.subjectId
                                          ) === true
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor=""
                                      >
                                        {item?.subjectName}
                                      </label>
                                    </div>
                                  </td>

                                  <td className="w-50">
                                    {item?.allIntakes.length > 0 && (
                                      <Table>
                                        <thead>
                                          <th>Intake</th>
                                          <th>Status</th>
                                          <th>Class Start Date</th>
                                          <th>Deadline</th>
                                        </thead>
                                        <tbody>
                                          {item?.allIntakes.map((intake, k) => (
                                            <tr key={k}>
                                              <td>{intake?.name}</td>
                                              <td>{intake?.status}</td>
                                              <td>{intake?.classStart}</td>
                                              <td>{intake?.deadline}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </Table>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                        </div>
                      ))}
                    </Table>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <p className="section-title">Change intake status</p>
                      <div className="mt-3">
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
                      </div>

                      <div className="mt-3">
                        <span>
                          <span className="text-danger">*</span> Status
                        </span>

                        <Select
                          options={intakeStatusDropDown}
                          value={{ label: statusLabel, value: statusValue }}
                          onChange={(opt) =>
                            selectStatusType(opt.label, opt.value)
                          }
                          name="intakeStatusId"
                          id="intakeStatusId"
                        />
                        {statusError ? (
                          <span className="text-danger">
                            Status is required
                          </span>
                        ) : null}
                      </div>
                      {(statusValue === 1 || statusValue === 3) && (
                        <FormGroup className="has-icon-left position-relative mt-3">
                          <DMYPicker
                            label="Application Deadline"
                            value={date}
                            setValue={handleDeadlineDate}
                            error={dateError}
                            action={setDateError}
                            required={true}
                            name="deadline"
                            id="deadline"
                          />
                        </FormGroup>
                      )}

                      {statusValue === 1 && (
                        <FormGroup className="has-icon-left position-relative mt-3">
                          <DMYPicker
                            label="Class Start Date"
                            value={startDate}
                            setValue={setStartDate}
                            required={false}
                            name="classStart"
                            id="classStart"
                            clear={true}
                          />
                        </FormGroup>
                      )}

                      {checkSubIds.length > 0 && (
                        <>
                          <div className="text-danger my-2 ">
                            <p style={{ fontSize: "12px" }}>
                              Note: Assigning any intake to subjects will
                              directly affect on the search and apply dataset.
                              Make sure you have selected all the fields
                              properly before proceeding to apply changes
                            </p>
                          </div>

                          <div
                            className="form-label-group position-relative has-icon-left"
                            style={{
                              paddingLeft: "20px",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            <Input
                              type="checkbox"
                              name=""
                              className="color"
                              onChange={handleAgree}
                            />
                            <p style={{ color: " #7D8287" }}>
                              I have checked all the parameters and accepting
                              that the changes are liable by me.
                            </p>
                          </div>
                        </>
                      )}

                      <div className="d-flex justify-content-between mt-3">
                        <CancelButton text="Clear" cancel={handleClearSearch} />
                        {permissions?.includes(
                          permissionList.Edit_University
                        ) &&
                          checkSubIds.length > 0 &&
                          agree && (
                            <SaveButton
                              text="Apply"
                              progress={progress5}
                              buttonStatus={buttonStatus}
                            />
                          )}
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageIntakes;
