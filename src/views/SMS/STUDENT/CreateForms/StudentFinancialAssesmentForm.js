import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
} from "reactstrap";
import Select from "react-select";

import get from "../../../../helpers/get";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";
import SelfFunded from "../SourceOfFunds/SelfFunded";
import FamilyFunded from "../SourceOfFunds/FamilyFunded";
import StudentLoanCompany from "../SourceOfFunds/StudentLoanCompany";
import BankLoan from "../SourceOfFunds/BankLoan";
import Scholarship from "../SourceOfFunds/Scholarship";
import GovernmentLoan from "../SourceOfFunds/GovernmentLoan";
import GovernmentFundingAssesment from "../SourceOfFunds/GovernmentFundingAssesment";

const SourceofFundAssesmentForm = () => {
  const { id } = useParams();
  const [fund, setFund] = useState([]);
  const [fundLabel, setFundLabel] = useState("Select Fund Type");
  const [fundValue, setFundValue] = useState(0);
  useEffect(() => {
    get(`SourceOfFundDD/Index`).then((res) => {
      setFund(res);
    });
  }, []);

  const fundOptions = fund?.map((f) => ({
    label: f.name,
    value: f.id,
  }));

  const selectFund = (label,value) =>{
    setFundLabel(label);
    setFundValue(value);
  }
  
  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Source of Fund Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white"> 12% Completed</span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <input type="hidden" name="studentId" id="studentId" value={id} />

          <FormGroup row className="has-icon-left position-relative">
            <Col md="2">
              <span>
                Source Of Fund <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="6">
              <Select
                options={fundOptions}
                value={{ label: fundLabel, value: fundValue }}
                onChange={(opt) => selectFund(opt.label, opt.value)}
                name="sourceOfFundId"
                id="sourceOfFundId"
                required
              />
            </Col>
          </FormGroup>
          {fundValue == 1 ? (
             <SelfFunded studentid={id}/>
          ) : fundValue == 2 ? (
            <FamilyFunded studentid={id}/>
          ) : fundValue == 3 ? (
            <StudentLoanCompany studentid={id} />
          ) : fundValue == 4 ? (
            <BankLoan studentid={id} />
          ) : fundValue == 5 ? (
            <GovernmentFundingAssesment studentid={id} />
          ) : fundValue == 6 ? (
            <Scholarship studentid={id} />
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default SourceofFundAssesmentForm;
