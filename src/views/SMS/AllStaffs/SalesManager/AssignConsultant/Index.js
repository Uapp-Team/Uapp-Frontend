import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
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
import { useToasts } from "react-toast-notifications";
// import Loader from "../../../../Search/Loader/Loader";
import post from "../../../../../helpers/post";
import Loader from "../../../Search/Loader/Loader";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import { userTypes } from "../../../../../constants/userTypeConstant";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import Uget from "../../../../../helpers/Uget";
import Typing from "../../../../../components/form/Typing";

const Index = () => {
  const [navItem, setNavItem] = useState("");
  const { salesManagerId, branchId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();
  const activetab = "6";
  const [loading, setLoading] = useState(true);
  const [assignedConsultants, setAssignedConsultants] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");
  const [searchStr, setSearchStr] = useState("");
  const [callApi, setCallApi] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `SalesManager/FetchSalesTeamLeaders?employeeId=${salesManagerId}&searchText=${searchStr}`
      ).then((res) => {
        setAssignedConsultants(res?.data);
        setLoading(false);
      });
    }
  }, [salesManagerId, searchStr, isTyping, callApi]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCallApi((prev) => !prev);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const salesTeamLeaderIds = assignedConsultants
      .filter((c) => c.isAssign)
      .map((c) => c.salesTeamLeaderId);

    const subdata = {
      employeeId: salesManagerId,
      salesTeamLeaderIds: salesTeamLeaderIds,
    };
    post(`SalesManager/AssignSalesTeamLeaders`, subdata).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const HandleAddOrRemove = (e, id) => {
    const values = [...assignedConsultants];
    values[id].isAssign = e.target.checked;
    setAssignedConsultants(values);
    console.log("pki poki", assignedConsultants);
  };

  return (
    <div>
      <BreadCrumb
        title="Assigned Sales Team Leader"
        backTo={
          userType === userTypes?.SalesTeamLeader ? null : "Sales Manager"
        }
        path={`/salesManagerList`}
      />

      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="6">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Row>
                    <Col md="8" sm="12">
                      {" "}
                      <p className="section-title">Sales Team Leader</p>
                    </Col>
                    <Col md="4" sm="12">
                      <Typing
                        name="search"
                        placeholder="Sales Team Leader Name"
                        value={searchStr}
                        setValue={setSearchStr}
                        setIsTyping={setIsTyping}
                        onKeyDown={handleKeyDown}
                      />
                    </Col>
                  </Row>

                  <div className="table-responsive mt-4">
                    <Table className="table-sm table-bordered">
                      <thead className="tablehead">
                        <tr style={{ textAlign: "center" }}>
                          {/* <th>SL/NO</th> */}
                          <th>Name</th>
                          <th>Email</th>
                          <th>Is Assigned</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignedConsultants?.map((con, i) => (
                          <tr
                            key={con.salesTeamLeaderId}
                            style={{ textAlign: "center" }}
                          >
                            {/* <th scope="row">{i + 1}</th> */}
                            <td>{con.salesTeamLeaderName}</td>
                            <td>{con.salesTeamLeaderEmail}</td>
                            <td>
                              <input
                                // className="form-check-input"
                                type="checkbox"
                                onChange={(e) => {
                                  HandleAddOrRemove(e, i);
                                }}
                                value={con?.isAssign}
                                defaultChecked={
                                  con?.isAssign === true ? true : false
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
                      <div className="text-center">
                        <SaveButton
                          text="Save"
                          action={handleSubmit}
                          // text={
                          //   navItem?.terms === true ? "Save and Next" : "Save"
                          // }
                          // progress={progress}
                          // buttonStatus={buttonStatus}
                        />
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
