import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Col,
  Input,
  Button,
} from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const CompanionAddSuccess = () => {
  const history = useHistory();

  const backToAssociateList = () => {
    history.push("/associateList");
  };

  return (
    <div>
      <BreadCrumb
        title="Referrer Registration"
        backTo="My Teams"
        path={`/ConsultantByCompanionList`}
      />

      <Card>
        <div className="p-3">
          <h2>Success</h2>
          <p>Kindly inform the new referrer to complete their profile</p>
        </div>
      </Card>
    </div>
  );
};

export default CompanionAddSuccess;
