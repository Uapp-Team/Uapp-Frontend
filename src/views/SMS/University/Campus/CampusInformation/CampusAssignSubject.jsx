import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, Col, Form, FormGroup, Table } from "reactstrap";
import get from "../../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import SaveButton from "../../../../../components/buttons/SaveButton";
import CampusNavbar from "../CampusNavbar";
import post from "../../../../../helpers/post";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const CampusAssignSubject = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { uniId, campusId } = useParams();
  const [campusList, setCampusList] = useState([]);
  const history = useHistory();
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    get(`CampusSubjects/GetAll/${campusId}`).then((res) => {
      setCampusList(res);
    });
  }, [campusId]);

  const handleisAcceptHome = (e, i) => {
    const values = [...campusList];
    values[i].isAcceptHome = e.target.checked;
    setCampusList(values);
  };
  const handleisAcceptEU_UK = (e, i) => {
    const values = [...campusList];
    values[i].isAcceptEu_Uk = e.target.checked;
    setCampusList(values);
  };
  const handleisAcceptInternational = (e, i) => {
    const values = [...campusList];
    values[i].isAcceptInternational = e.target.checked;
    setCampusList(values);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonStatus(true);
    setProgress(true);
    post(`CampusSubjects/Submit`, campusList).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        history.push(`/CampusSubjectIntake/${uniId}/${campusId}`);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };
  const goPrevious = () => {
    history.push(`/CampusInformation/${uniId}/${campusId}`);
  };
  return (
    <div>
      <CampusNavbar
        title="Assign Course"
        activeTab="2"
        id={uniId}
        subId={campusId}
      />
      <Card>
        <CardBody>
          <p className="section-title">Assign Campus Subject</p>

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
                {campusList.length > 0 &&
                  campusList?.map((item, i) => (
                    <tr key={i}>
                      <td>{item?.subjectName}</td>
                      <td className="text-center">
                        {item?.isHomeVisible && (
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
                        {item?.isEu_UkVisible && (
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              handleisAcceptEU_UK(e, i);
                            }}
                            value={item?.isAcceptEu_Uk}
                            defaultChecked={
                              item?.isAcceptEu_Uk === true ? true : false
                            }
                          />
                        )}
                      </td>
                      <td className="text-center">
                        {item?.isInternationalVisible && (
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

            <FormGroup row className="mt-4 ">
              <Col className="d-flex justify-content-between">
                <PreviousButton action={goPrevious} />
                {permissions?.includes(permissionList.Edit_University) && (
                  <SaveButton
                    text="Save & Next"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                )}
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CampusAssignSubject;
