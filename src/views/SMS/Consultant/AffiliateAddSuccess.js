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

const AffiliateAddSuccess = () => {
  const history = useHistory();

  const backToAssociateList = () => {
    history.push("/associateList");
  };

  return (
    <div>
      <BreadCrumb
        title="Affiliate Registration"
        backTo="My Teams"
        path={`/ConsultantByAffiliateList`}
      />

      <Card>
        <div className="p-3">
          <h2>Success</h2>
          <p>Please notify the new affiliate to complete his / her profile!</p>
        </div>
      </Card>
    </div>
  );
};

export default AffiliateAddSuccess;
