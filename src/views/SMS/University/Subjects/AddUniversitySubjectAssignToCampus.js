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
  Col,
} from "reactstrap";
import get from "../../../../helpers/get";
import SubjectNavbar from "./Components/SubjectNavbar";
import post from "../../../../helpers/post";
import SaveButton from "../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const AddUniversitySubjectAssignToCampus = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const activetab = "5";
  const [campusList, setCampusList] = useState([]);
  const history = useHistory();
  const { id, subjId } = useParams();
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    get(`SubjectCampus/index?subjectid=${subjId}`).then((res) => {
      setCampusList(res);
    });
  }, [subjId]);

  const handleisAcceptHome = (e, i) => {
    const values = [...campusList];
    values[i].isAcceptHome = e.target.checked;
    setCampusList(values);
  };
  const handleisAcceptEU_UK = (e, i) => {
    const values = [...campusList];
    values[i].isAcceptEU_UK = e.target.checked;
    setCampusList(values);
  };
  const handleisAcceptInternational = (e, i) => {
    const values = [...campusList];
    values[i].isAcceptInternational = e.target.checked;
    setCampusList(values);
  };

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
                className="mt-1 mb-4 d-flex justify-between col-md-6"
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
                    <td className="border-0">
                      <b>Campus</b>
                    </td>
                    <td className="border-0 text-center">
                      <b>Home</b>
                    </td>
                    <td className="border-0 text-center">
                      <b>EU</b>
                    </td>
                    <td className="border-0 text-center">
                      <b>International</b>
                    </td>
                  </thead>
                  <tbody>
                    {campusList?.length > 0 &&
                      campusList?.map((item, i) => (
                        <tr key={i}>
                          <td>{item?.name}</td>
                          <td className="text-center">
                            {item?.isAcceptHomeAvailable && (
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
                            )}
                          </td>
                          <td className="text-center">
                            {item?.isAcceptEU_UKAvailable && (
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
                            )}
                          </td>
                          <td className="text-center">
                            {item?.isAcceptInternationalAvailable && (
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
                            )}
                          </td>
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
