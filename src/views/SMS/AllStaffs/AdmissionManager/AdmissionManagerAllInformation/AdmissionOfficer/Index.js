import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import AdmissionManagerNav from "../NavigationAndRegister/AdmissionManagerNav";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Form,
  TabContent,
  TabPane,
  Table,
  Input,
  Row,
  Col,
} from "reactstrap";
import get from "../../../../../../helpers/get";
import loader from "../../../../../../assets/img/load.gif";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import post from "../../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import Loader from "../../../../Search/Loader/Loader";

const Index = () => {
  const [navItem, setNavItem] = useState("");
  const { admissionManagerId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();
  const activetab = "6";
  const [loading, setLoading] = useState(true);
  const [assignedOfficers, setAssignedOfficers] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get(`AdmissionManager/AssignedOfficers/${admissionManagerId}`).then(
      (res) => {
        setAssignedOfficers(res);
        setLoading(false);
      }
    );
  }, [admissionManagerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //post()
    post(`AdmissionManager/AssignOfficers`, assignedOfficers).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
    if (navItem?.terms === true) {
      history.push(`/admissionManagerTermsInformation/${admissionManagerId}`);
    } else history.push(`/admissionManagerProfile/${admissionManagerId}`);
  };
  const HandleAddOrRemove = (e, id) => {
    const values = [...assignedOfficers];
    values[id].isAssigned = e.target.checked;
    setAssignedOfficers(values);
    console.log("pki poki", assignedOfficers);
  };

  const handlePrevious = () => {
    if (navItem?.eligibility === true) {
      history.push(
        `/admissionManagerEligibilityInformation/${admissionManagerId}`
      );
    } else {
      history.push(
        `/admissionManagerEmergencyInformation/${admissionManagerId}`
      );
    }
  };
  return (
    <div>
      <BreadCrumb
        title="Assigned Admission officers"
        backTo={
          userType === userTypes?.AdmissionManager ? null : "Admission Manager"
        }
        path={`/admissionManagerList`}
      />
      <AdmissionManagerNav
        activetab={activetab}
        admissionManagerId={admissionManagerId}
        action={setNavItem}
      />

      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="6">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <p className="section-title">Admission officers</p>
                  <div className="table-responsive">
                    <Table className="table-sm table-bordered">
                      <thead className="tablehead">
                        <tr style={{ textAlign: "center" }}>
                          {/* <th>SL/NO</th> */}
                          <th>Name</th>
                          <th>Is Assigned</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignedOfficers?.map((officer, i) => (
                          <tr key={officer.id} style={{ textAlign: "center" }}>
                            {/* <th scope="row">{i + 1}</th> */}
                            <td>{officer.fullName}</td>
                            <td>
                              <input
                                // className="form-check-input"
                                type="checkbox"
                                onChange={(e) => {
                                  HandleAddOrRemove(e, i);
                                }}
                                value={officer?.isAssigned}
                                defaultChecked={
                                  officer?.isAssigned === true ? true : false
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Row>
                    <Col md="12">
                      <div className="d-flex justify-content-between">
                        <PreviousButton action={handlePrevious} />
                        {permissions?.includes(
                          permissionList.Update_AdmissionManager
                        ) ? (
                          <SaveButton
                            text="Save and Next"
                            action={handleSubmit}
                            // text={
                            //   navItem?.terms === true ? "Save and Next" : "Save"
                            // }
                            // progress={progress}
                            // buttonStatus={buttonStatus}
                          />
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default Index;
