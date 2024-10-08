import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import get from "../../../../../helpers/get";
import Axios from "axios";
import {
  Card,
  CardBody,
  Input,
  CardHeader,
  Label,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { userTypes } from "../../../../../constants/userTypeConstant";
import Select from "react-select";
import { rootUrl } from "../../../../../constants/constants";
import ButtonLoader from "../../../Components/ButtonLoader";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import remove from "../../../../../helpers/remove";

import moment from "moment";
import Moment from "react-moment";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const CopyUniversitySubjectIntake = () => {
  const { id, subjId, newSubId } = useParams();
  const [activetab, setActivetab] = useState("8");
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
  const [checked1, setChecked1] = useState([]);
  const AuthStr = localStorage.getItem("token");
  const [buttonStatus5, setButtonStatus5] = useState(false);
  const [progress5, setProgress5] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [progress, setProgress] = useState(false);

  const [value, setValue] = useState();

  useEffect(() => {
    get(`IntakeDD/Index`).then((res) => {
      setIntakeData(res);
    });

    get(`IntakeStatus/GetAll`).then((res) => {
      setIntakeStatusData(res);
    });

    get(`UniversityCampusSubject/GetAllCampusBySubject/${newSubId}`).then(
      (res) => {
        setSubjectIds(res);
      }
    );

    get(`SubjectIntake/GetAllCampusWithIntake?subjectId=${newSubId}`).then(
      (res) => {
        console.log(res);
        setData(res);
      }
    );
  }, [success, newSubId]);

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
    // handleSearch();
  };

  const selectStatusType = (label, value) => {
    setStatusError(false);
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };

  // redirect to Next Page
  // const onNextPage = () => {
  //     history.push({
  //       pathname: `/addUniversitySubjectDeliveryPattern/${id}/${subjId}`,
  //     });
  //   };

  const onPreviousPage = () => {
    history.push(
      `/copyAddUniversitySubjectAssignToCampus/${id}/${subjId}/${newSubId}`
    );
  };

  const handleSubjectAssignInIntake = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);

    // for (let i = 0; i < subList1.length; i++) {
    subdata.append(`campusIds`, checked1);
    // }

    for (let value of subdata) {
    }

    const config = {
      headers: {
        authorization: AuthStr,
      },
    };

    // setLoading(true);

    if (intakeValue === 0) {
      setIntakeError(true);
    } else if (statusValue === 0) {
      setStatusError(true);
    } else {
      setButtonStatus5(true);
      setProgress5(true);
      Axios.post(
        `${rootUrl}SubjectIntake/AssignToCampus`,
        subdata,
        config
      ).then((res) => {
        setButtonStatus5(false);
        setProgress5(false);
        // setSubjectIds([]);
        setIntakeLabel("Select Intake");
        setIntakeValue(0);
        setStatusLabel("Select Status");
        setStatusValue(0);
        setValue("");
        setSuccess(!success);
        setChecked1([]);
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
    setValue("");
  };

  // on Select All Checkbox
  const handleSelectAll = (e) => {
    let newChecked = [];
    const val = e.target.checked;
    if (val == true) {
      subjectIds.map((per) => {
        const perId = per?.campusId.toString();
        newChecked.push(perId);
        document.getElementById(per?.campusId).checked = true;
      });
      setChecked1([...newChecked]);
    }

    if (val == false) {
      {
        subjectIds.map((per) => {
          document.getElementById(per?.campusId).checked = false;
        });
        setChecked1([]);
      }
    }
  };

  // onChange checkbox
  const handleCheck = (e) => {
    let ids = e.target.id;
    let val = e.target.checked;

    if (val == true) {
      if (!checked1?.includes(ids)) {
        setChecked1([...checked1, ids]);
      }
    } else {
      const newD = ids;
      const res = checked1.filter((c) => c != newD);
      setChecked1(res);
    }
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/copyAndAddUniversitySubject/${id}/${subjId}/${newSubId}`);
    }
    if (tab == "2") {
      history.push(
        `/copyAndAddUniversitySubjectFee/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "3") {
      history.push(
        `/copyAndAddUniversitySubjectDeliveryPattern/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "4") {
      history.push(
        `/copyAndAddUniversitySubjectTestScore/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "5") {
      history.push(
        `/copyAndAddUniversitySubjectRequirements/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "6") {
      history.push(
        `/copyAndAddUniversitySubjectDocumentRequirement/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "7") {
      history.push(
        `/copyAddUniversitySubjectAssignToCampus/${id}/${subjId}/${newSubId}`
      );
    }
    if (tab == "8") {
      history.push(
        `/copyAndAddUniversitySubjectIntake/${id}/${subjId}/${newSubId}`
      );
    }
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

  // redirect to dashboard
  const backToSubjectList = () => {
    history.push(`/university-courses/${id}`);
  };

  return (
    <div>
      {/* subject intake starts here */}
      {userType == userTypes?.Student ? null : (
        <div className="">
          <BreadCrumb
            title="subject Intake Information"
            backTo="University Course"
            path={`/university-courses/${id}`}
          />

          <Card className="uapp-employee-search">
            <CardBody className="search-card-body">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={activetab === "1"}
                    onClick={() => toggle("1")}
                  >
                    Course Information
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    active={activetab === "2"}
                    onClick={() => toggle("2")}
                  >
                    Course Fee Information
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    active={activetab === "3"}
                    onClick={() => toggle("3")}
                  >
                    Delivery Pattern
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activetab === "4"}
                    onClick={() => toggle("4")}
                  >
                    Test Score
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activetab === "5"}
                    onClick={() => toggle("5")}
                  >
                    Requirement
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activetab === "6"}
                    onClick={() => toggle("6")}
                  >
                    Document Requirement
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activetab === "7"}
                    onClick={() => toggle("7")}
                  >
                    Campus
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activetab === "8"}
                    onClick={() => toggle("8")}
                  >
                    Intake
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activetab}>
                <TabPane tabId="8">
                  <div className="hedding-titel d-flex justify-content-between mt-4 mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Course Intake</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>

                  <Form onSubmit={handleSubjectAssignInIntake}>
                    <Input
                      type="hidden"
                      id="subjectId"
                      name="subjectId"
                      value={newSubId}
                    />
                    <FormGroup>
                      <Row>
                        <Col lg="3" md="6" sm="6" xs="6">
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

                        <Col lg="3" md="6" sm="6" xs="6">
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

                        <Col className="date-input" lg="3" md="3" sm="6" xs="6">
                          <Input
                            type="date"
                            name="applicationDeadLine"
                            id="applicationDeadLine"
                            value={value}
                            // defaultValue={handleDate(currUpdateData?.endDate)}
                            onChange={(e) =>
                              setValue(
                                moment(new Date(e.target.value)).format(
                                  "YYYY-MM-DD"
                                )
                              )
                            }
                            required
                          />
                        </Col>

                        <Col lg="1" md="2" sm="6" xs="6">
                          {/* <div className='d-flex justify-content-center'> */}
                          <Button
                            disabled={buttonStatus5}
                            type="submit"
                            className="btn btn-uapp-add btn btn-secondary"
                          >
                            {progress5 ? <ButtonLoader /> : "Assign"}
                          </Button>
                          {/* </div> */}
                        </Col>

                        <Col lg="1" md="2" sm="6" xs="6">
                          <Button color="danger" onClick={handleClearSearch}>
                            Clear
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>

                    {/* {
                      intakeValue != 0 || statusValue != 0 ? */}
                    <FormGroup>
                      <Row>
                        <Col sm="12">
                          {subjectIds?.length > 0 && (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                onChange={(e) => handleSelectAll(e)}
                                type="checkbox"
                                name=""
                              />
                              <label className="form-check-label" htmlFor="">
                                Select All
                              </label>
                            </div>
                          )}
                        </Col>
                        {subjectIds?.map((per) => (
                          <Col xs="6" sm="4" md="3" key={per.campusId}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                onChange={(e) => handleCheck(e)}
                                type="checkbox"
                                name=""
                                id={per?.campusId}
                                checked={
                                  checked1.includes(`${per?.campusId}`)
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
                    </FormGroup>
                    {/* :
                    null
                    } */}
                  </Form>

                  {/* Table Data Showing  */}

                  <div className="hedding-titel d-flex justify-content-between mt-4 mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Course Intakes on Campuses</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                  </div>

                  <div className="table-responsive text-center">
                    <Table className="table-sm table-bordered">
                      <thead className="thead-uapp-bg">
                        <tr style={{ textAlign: "center" }}>
                          <th>Intake</th>
                          <th>Campuses</th>
                          {/* <th>Intake Status</th>
                     <th>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((ls, i) => (
                          <tr>
                            <td>{ls?.intakeName}</td>
                            <td>
                              <Table className="table-sm">
                                <tbody>
                                  {ls?.campusWithIntakeStatusViewModels?.map(
                                    (l) => (
                                      <tr>
                                        <td style={{ border: "none" }}>
                                          {l?.campusName}
                                        </td>
                                        <td style={{ border: "none" }}>
                                          {l?.intakeStatusName}
                                        </td>
                                        <td style={{ border: "none" }}>
                                          {l?.applicationDeadLine}
                                        </td>
                                        <td style={{ border: "none" }}>
                                          <Button
                                            color="danger"
                                            onClick={() => toggleDanger(l)}
                                            className="btn-sm"
                                          >
                                            <i className="fas fa-trash-alt"></i>
                                          </Button>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </Table>
                            </td>
                            {/* <td>
                    <Table className="table-sm">
                                    <tbody>
                                        {
                                            ls?.campusWithIntakeStatusViewModels?.map((l) =>(
                                                <tr>
                                                    <td style={{border: 'none'}}>{l?.intakeStatusName}</td>
                                                  
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </Table>
                    </td> */}
                            {/* <td>
                    <Table className="table-sm">
                                    <tbody>
                                  {
                                    ls?.campusWithIntakeStatusViewModels?.map((l) =>(
                                   <tr>
                                    <td style={{border: 'none'}}>
                                        <Button color='danger' onClick={()=>toggleDanger(ls)} className='btn-sm'>
                                        <i className="fas fa-trash-alt"></i>
                                        </Button>
                                    </td>
                                                  
                                     </tr>
                                ))
                           }
                      </tbody>

                     </Table>
                    </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "start",
                    }}
                  >
                    <ButtonForFunction
                      func={onPreviousPage}
                      color={"warning uapp-form-button float-right"}
                      name={"Previous Page"}
                      permission={6}
                    />
                    {/* <ButtonForFunction
                  func={onNextPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Next Page"}
                  permission={6}
                /> */}
                  </FormGroup>

                  {/* Delete Modal Start */}

                  <Modal
                    isOpen={deleteModal}
                    toggle={() => {
                      setDeleteModal(!deleteModal);
                      setDelData({});
                    }}
                    className="uapp-modal"
                  >
                    <ModalBody>
                      <p>
                        Are You Sure to Delete this ? Once Deleted it can't be
                        Undone!
                      </p>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" onClick={confirmDelete}>
                        {progress ? <ButtonLoader /> : "YES"}
                      </Button>
                      <Button onClick={() => setDeleteModal(false)}>NO</Button>
                    </ModalFooter>
                  </Modal>

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

export default CopyUniversitySubjectIntake;
