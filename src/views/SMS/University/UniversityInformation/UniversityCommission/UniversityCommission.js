import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  TabContent,
  TabPane,
  FormGroup,
  Col,
} from "reactstrap";
import get from "../../../../../helpers/get";
import UniversityNavbar from "../../Components/UniversityNavbar";
import EuCommissionList from "./Component/EuCommissionList";
import InternationalCommissionList from "./Component/InternationalCommissionList";
import Loader from "../../../Search/Loader/Loader";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";

const UniversityCommission = () => {
  const history = useHistory();
  const { univerId } = useParams();
  const activetab = "9";
  const success = false;
  const [loading, setLoading] = useState(true);

  const [euCommissions, setEuCommissions] = useState([]);
  const [intCommissions, setIntCommissions] = useState([]);

  useEffect(() => {
    get(`UniversityComission/GetByUniversity/${univerId}`).then((res) => {
      setEuCommissions(res);
    });
    get(`InternationalComission/GetByUniversity/${univerId}`).then((res) => {
      setIntCommissions(res);
    });
    setLoading(false);
  }, [success, univerId]);

  // redirect to
  const backToUniList = () => {
    history.push("/universityList");
  };
  const goPrevious = () => {
    history.push(`/addUniversityRecruitmentType/${univerId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="University Commission Information"
        backTo="University"
        path="/universityList"
      />
      <UniversityNavbar activetab={activetab} univerId={univerId} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="9">
                  <EuCommissionList
                    euCommissions={euCommissions}
                    univerId={univerId}
                  />

                  <InternationalCommissionList
                    intCommissions={intCommissions}
                    univerId={univerId}
                  />
                </TabPane>
                <FormGroup row className=" mt-4">
                  <Col md="7" className="d-flex justify-content-between">
                    <PreviousButton action={goPrevious} />
                  </Col>
                </FormGroup>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UniversityCommission;
