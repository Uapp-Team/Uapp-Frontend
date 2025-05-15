import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import icon_info from "../../../../assets/img/icons/icon_info.png";
import {
  Card,
  CardBody,
  Table,
  TabContent,
  TabPane,
  Form,
  FormGroup,
} from "reactstrap";
import SubjectNavbar from "./Components/SubjectNavbar";
import post from "../../../../helpers/post";
import SaveButton from "../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import CheckBoxByObj from "../../../../components/form/CheckBoxByObj";
import { deliverySchedules } from "../../../../constants/presetData";
import Uget from "../../../../helpers/Uget";

const AddUniversitySubjectAssignToCampus = () => {
  // const campus = [
  //   {
  //     campusId: 56,
  //     subjectId: 7598,
  //     name: "Leeds",
  //     isAcceptHome: true,
  //     isAcceptInternational: false,
  //     isAcceptEU_UK: true,
  //     isAcceptHomeAvailable: true,
  //     isAcceptInternationalAvailable: false,
  //     isAcceptEU_UKAvailable: true,
  //     isAssigned: true,
  //     // deliverySchedule: [],
  //   },
  //   {
  //     campusId: 57,
  //     subjectId: 7598,
  //     name: "Birmingham",
  //     isAcceptHome: true,
  //     isAcceptInternational: false,
  //     isAcceptEU_UK: true,
  //     isAcceptHomeAvailable: true,
  //     isAcceptInternationalAvailable: false,
  //     isAcceptEU_UKAvailable: true,
  //     isAssigned: true,
  //     deliverySchedule: [],
  //   },
  //   {
  //     campusId: 58,
  //     subjectId: 7598,
  //     name: "London",
  //     isAcceptHome: true,
  //     isAcceptInternational: false,
  //     isAcceptEU_UK: true,
  //     isAcceptHomeAvailable: true,
  //     isAcceptInternationalAvailable: false,
  //     isAcceptEU_UKAvailable: true,
  //     isAssigned: true,
  //     deliverySchedule: [],
  //   },
  // ];

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const activetab = "5";
  const [campusList, setCampusList] = useState([]);
  const history = useHistory();
  const { id, subjId } = useParams();
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    Uget(`SubjectCampus/index?subjectid=${subjId}`).then((res) => {
      setCampusList(res?.data);
    });
  }, [subjId]);

  const handleisAcceptHome = (e, i) => {
    const values = [...campusList];
    values[i].isAcceptHome = e.target.checked;
    setCampusList(values);
    handleAccepts(i);
  };
  const handleisAcceptEU_UK = (e, i) => {
    const values = [...campusList];
    values[i].isAcceptEU_UK = e.target.checked;
    setCampusList(values);
    handleAccepts(i);
  };
  const handleisAcceptInternational = (e, i) => {
    const values = [...campusList];
    values[i].isAcceptInternational = e.target.checked;
    setCampusList(values);
    handleAccepts(i);
  };

  const handleAccepts = (i) => {
    const values = [...campusList];
    if (
      values[i].isAcceptHome === false &&
      values[i].isAcceptEU_UK === false &&
      values[i].isAcceptInternational === false
    ) {
      values[i].deliverySchedules = [];
    }
    setCampusList(values);
  };

  const setDeliverySchedule = (e, i) => {
    const values = [...campusList];

    if (
      values[i].isAcceptHome === true ||
      values[i].isAcceptEU_UK === true ||
      values[i].isAcceptInternational === true
    ) {
      values[i].deliverySchedules = e;
      setCampusList(values);
    } else {
      addToast("please select at least one application type", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
  };

  console.log("campusList", campusList);

  const handlePrevious = () => {
    history.push(`/add-university-course-requirements/${id}/${subjId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonStatus(true);
    setProgress(true);
    post(`SubjectCampus/Submit`, campusList).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push({
          pathname: `/add-university-course-intake/${id}/${subjId}`,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <div>
      <SubjectNavbar
        title="Course in Campuses"
        activeTab={activetab}
        id={id}
        subjId={subjId}
      />

      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="5">
              <p className="section-title">Course available in Campuses</p>

              <div
                className="mt-1 mb-4 d-flex justify-between col-md-8 col-xl-6"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <img
                  className="pt-2"
                  style={{ height: "100%" }}
                  src={icon_info}
                  alt=""
                />{" "}
                <div className="pl-3">
                  <span>
                    Assign an individual subject with specific application
                    types.
                  </span>
                  <br />
                  <span>
                    N.B : Select the checkboxes of a particular campus only.
                  </span>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                <Table id="table-to-xls" className="table-bordered">
                  <thead className="tablehead">
                    <td className="border-0 w-25">
                      <b>Campus</b>
                    </td>
                    <td className="border-0 text-center w-25">
                      <b>Application Types</b>
                    </td>
                    <td className="border-0 text-center w-50">
                      <b>Delivery Schedule</b>
                    </td>
                    {/* <td className="border-0 text-center">
                      <b>International</b>
                    </td> */}
                  </thead>
                  <tbody>
                    {campusList?.length > 0 &&
                      campusList?.map((item, i) => (
                        <tr key={i}>
                          <td className="w-25">{item?.name}</td>
                          <td className="w-25 fs-13px">
                            {item?.isAcceptInternationalAvailable && (
                              <p className="d-flex align-items-center mb-1">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleisAcceptInternational(e, i);
                                  }}
                                  value={item?.isAcceptInternational}
                                  defaultChecked={
                                    item?.isAcceptInternational === true
                                      ? true
                                      : false
                                  }
                                />
                                <span className="ml-2"> International</span>
                              </p>
                            )}

                            {item?.isAcceptHomeAvailable && (
                              <p className="d-flex align-items-center mb-1">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleisAcceptHome(e, i);
                                  }}
                                  value={item?.isAcceptHome}
                                  defaultChecked={
                                    item?.isAcceptHome === true ? true : false
                                  }
                                />
                                <span className="ml-2">Home</span>
                              </p>
                            )}

                            {item?.isAcceptEU_UKAvailable && (
                              <p className="d-flex align-items-center mb-1">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleisAcceptEU_UK(e, i);
                                  }}
                                  value={item?.isAcceptEU_UK}
                                  defaultChecked={
                                    item?.isAcceptEU_UK === true ? true : false
                                  }
                                />
                                <span className="ml-2">EU</span>
                              </p>
                            )}
                          </td>
                          <td className="text-center w-50">
                            <CheckBoxByObj
                              register={() => {}}
                              name={`${item?.deliverySchedule}-${i}`}
                              list={deliverySchedules}
                              defaultValue={item?.deliverySchedules}
                              action={(e) => setDeliverySchedule(e, i)}
                              className="mb-0"
                              colSize={[
                                "col-6",
                                "col-6",
                                "col-6",
                                "col-6",
                                "col-12",
                              ]}
                            />
                          </td>
                          {/* <td className="text-center"></td> */}
                        </tr>
                      ))}
                  </tbody>
                </Table>

                <FormGroup className="d-flex justify-content-between mt-4">
                  <PreviousButton action={handlePrevious} />

                  {permissions?.includes(permissionList?.Edit_Subjects) && (
                    <SaveButton
                      text="Save & Next"
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />
                  )}
                </FormGroup>
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddUniversitySubjectAssignToCampus;
