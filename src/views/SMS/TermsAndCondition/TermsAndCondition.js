import React, { createRef, useEffect, useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Form, FormGroup, Input, Table } from "reactstrap";
import Select from "react-select";
import get from "../../../helpers/get";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SaveButton from "../../../components/buttons/SaveButton";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import AddButton from "../../../components/buttons/AddButton";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CancelButton from "../../../components/buttons/CancelButton";
import ButtonForFunction from "../Components/ButtonForFunction";

const TermsAndCondition = () => {
  const myForm = createRef();
  const [users, setUsers] = useState([]);
  const [usersLabel, setUsersLabel] = useState("Select Users");
  const [usersValue, setUsersValue] = useState(0);
  const [state, setstate] = useState(1);
  const [isDraft, setIsDraft] = useState(false);
  const [data, setData] = useState([]);
  const [consultantTypeList, setConsultantTypeList] = useState([]);
  const [consultantTypeLabel, setConsultantTypeLabel] = useState(
    "Select Consultant Type"
  );
  const [consultantTypeValue, setConsultantTypeValue] = useState(0);
  const [day, setDay] = useState(15);
  const [value, setValue] = useState("");
  const [studentTypeList, setStudentTypeList] = useState([]);
  const [studentTypeLabel, setStudentTypeLabel] = useState("Student Type");
  const [studentTypeValue, setStudentTypeValue] = useState(0);
  const [progress, setProgress] = useState(false);
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(0);
  // const [currentUserDetails, setCurrentUserDetails] = useState({});

  useEffect(() => {
    setLoading(true);
    if (usersValue !== 13 || (usersValue === 13 && consultantTypeValue !== 0)) {
      get(
        `UserTermsAndConditions/Get?userId=${usersValue}&consultantTypeId=${consultantTypeValue}&studentTypeId=${studentTypeValue}`
      ).then((res) => {
        console.log(res);
        setLoading(false);
        setData(res);
        res?.length > 0 ? setstate(1) : setstate(2);
        // setValue(res?.details === "undefined" ? "" : res?.details);
        // setId(res === null ? 0 : res?.id);
      });
    }
  }, [success, usersValue, consultantTypeValue, studentTypeValue]);

  // useEffect(() => {
  //   get(`UserTermsAndConditions/GetByCurrentUser`).then((res) => {
  //     setLoading(false);
  //     setCurrentUserDetails(res);
  //   });
  // }, [success]);

  useEffect(() => {
    get("StudentTypeDD/Index").then((res) => {
      setStudentTypeList(res);
    });
    get(`UserTermsAndConditions/UserSelectList`).then((res) => {
      setUsers(res);
    });
    get("ConsultantTypeDD/Index").then((res) => {
      setConsultantTypeList(res);
    });
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "ordered" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

  const handleSubmit = (event) => {
    // public long Id { get; set; }
    // public long UserTypeId { get; set; }
    // public string UserName { get; set; }
    // public long? ConsultantTypeId { get; set; }
    // public long? StudentTypeId { get; set; }
    // public string Details { get; set; }
    // public int DayLimit { get; set; }
    // public bool IsDraft { get; set; } = false;
    // public string CreatedOn { get; set; }

    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("studentTypeId", studentTypeValue);
    subData.append("userTypeId", usersValue);
    subData.append("consultantTypeId", consultantTypeValue);
    subData.append("details", value);
    subData.append("id", id);
    subData.append("dayLimit", day);
    subData.append("isDraft", isDraft);

    setProgress(true);
    post(`UserTermsAndConditions/Submit`, subData).then((res) => {
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setstate(1);
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const roleName = users?.map((role) => ({ label: role.name, value: role.id }));

  const selectRole = (label, value) => {
    setUsersLabel(label);
    setUsersValue(value);
  };

  const empOptiopns = consultantTypeList?.map((emp) => ({
    label: emp?.name,
    value: emp?.id,
  }));

  const selectEmployeeType = (label, value) => {
    setConsultantTypeLabel(label);
    setConsultantTypeValue(value);
  };
  const studentTypeOption = studentTypeList?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));
  const selectStudentType = (label, value) => {
    setStudentTypeLabel(label);
    setStudentTypeValue(value);
  };

  return (
    <div>
      <BreadCrumb title="Terms And Condition" backTo="" path="/" />

      <Form onSubmit={handleSubmit} ref={myForm}>
        <Card className="ddzindex">
          <CardBody>
            <FormGroup row>
              <Col sm="6" md="4" lg="3">
                <Select
                  options={roleName}
                  value={{ label: usersLabel, value: usersValue }}
                  onChange={(opt) => selectRole(opt.label, opt.value)}
                  name="userId"
                  id="userId"
                />
              </Col>
              {usersValue === 13 && (
                <Col md="4" lg="3" sm="6">
                  <Select
                    options={empOptiopns}
                    value={{
                      label: consultantTypeLabel,
                      value: consultantTypeValue,
                    }}
                    onChange={(opt) => selectEmployeeType(opt.label, opt.value)}
                    name="consultantTypeId"
                    id="consultantTypeId"
                    // isDisabled={type ? true : false}
                  />
                </Col>
              )}

              {usersValue === 6 && (
                <Col lg="3" md="4" sm="6" className="mb-2">
                  <Select
                    options={studentTypeOption}
                    value={{ label: studentTypeLabel, value: studentTypeValue }}
                    onChange={(opt) => selectStudentType(opt.label, opt.value)}
                    name="studentTypeId"
                    id="studentTypeId"
                    // isDisabled={type}
                  />
                </Col>
              )}
            </FormGroup>
          </CardBody>
        </Card>
        {usersValue !== 0 && !loading && (
          <Card>
            <CardBody>
              {state === 1 ? (
                <>
                  {/* <AddButton action={() => setstate(2)} /> */}
                  <ButtonForFunction
                    color="primary"
                    icon={<i className="fas fa-plus"></i>}
                    func={() => setstate(2)}
                    name={" Add Terms And Condition"}
                    className="mb-3"
                  />

                  {data?.length > 0 && (
                    <div className="table-responsive fixedhead mb-2">
                      <Table
                        id="table-to-xls"
                        className="table-sm table-bordered"
                      >
                        <thead className="tablehead">
                          <tr>
                            <th>Created Date</th>
                            <th>Day limit for signed</th>
                            <th>Is Draft</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.map((item, i) => (
                            <tr key={i} className="border-buttom">
                              <td>
                                {item?.createdOn}{" "}
                                {item?.isActive && (
                                  <span className="text-green fw-600">
                                    Current
                                  </span>
                                )}
                              </td>
                              <td>{item?.dayLimit}</td>
                              <td>{item?.isDraft.toString()}</td>
                              <td>
                                <div className="d-flex justify-content-around">
                                  <span
                                    className="text-info pointer"
                                    onClick={() => {
                                      setValue(item?.details);
                                      setstate(2);
                                      setId(item?.id);
                                    }}
                                  >
                                    Clone
                                  </span>

                                  <Link to={`/terms-details/${item?.id}`}>
                                    View
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2 className="mb-3 " style={{ color: "#045d5e" }}>
                    <b>
                      Set Terms & Condition For{" "}
                      <span style={{ color: "#fc7300" }}> {usersLabel}</span>{" "}
                      users
                    </b>
                  </h2>

                  <FormGroup row>
                    <Col md="8" style={{ height: "370px" }}>
                      <ReactQuill
                        theme="snow"
                        value={value}
                        modules={modules}
                        className="editor-input"
                        onChange={setValue}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="8">
                      <span>
                        Enter the number of days within which the user should
                        accept revised T&Cs:
                      </span>
                      <Input
                        className="form-mt"
                        type="number"
                        name="dayLimit"
                        id="dayLimit"
                        onChange={(e) => {
                          setDay(e.target.value);
                        }}
                        value={day}
                        placeholder="Enter the number of days within which the user should accept revised T&Cs:"
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md={8} className="align-items-center">
                      <input
                        onChange={(e) => {
                          setIsDraft(e.target.checked);
                        }}
                        type="checkbox"
                        name="isDraft"
                        value={isDraft}
                        checked={isDraft}
                      />
                      <span>
                        {" "}
                        Check this box if you want to keep it as a draft
                      </span>
                    </Col>
                  </FormGroup>

                  <FormGroup row className="text-right">
                    <Col md="8">
                      <CancelButton cancel={() => setstate(1)} />
                      <SaveButton progress={progress} />
                    </Col>
                  </FormGroup>
                </>
              )}
            </CardBody>
          </Card>
        )}
      </Form>
    </div>
  );
};

export default TermsAndCondition;
