import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import Loader from "../../../Search/Loader/Loader";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import BankLoan from "./Component/BankLoan";
import FamilyFunded from "./Component/FamilyFunded";
import GovernmentFundingAssesment from "./Component/GovernmentFundingAssesment";
import Scholarship from "./Component/Scholarship";
import SelfFunded from "./Component/SelfFunded";
import StudentLoanCompany from "./Component/StudentLoanCompany";

const SourceOfFund = ({ destination }) => {
  const { applicationStudentId, update } = useParams();
  const [fund, setFund] = useState([]);
  const [fundLabel, setFundLabel] = useState("Select Fund Type");
  const [fundValue, setFundValue] = useState(0);
  const [success, setSuccess] = useState(false);
  const userType = localStorage.getItem("userType");
  const [loading, setLoading] = useState(false);
  const [nav, setNav] = useState({});

  useEffect(() => {
    const fetchFund = async () => {
      setLoading(true);
      try {
        const fund = await get(`SourceOfFundDD/Index`);
        setFund(fund);

        const navigation = await get(
          `StudentNavbar/Get/${applicationStudentId}`
        );
        setNav(navigation);

        await get(`StudentFunding/Get/${applicationStudentId}`).then((res) => {
          setFundValue(res?.fundingType);

          setFundLabel(
            res?.fundingType === 1
              ? "Self Funded"
              : res?.fundingType === 2
              ? "Family Funded"
              : res?.fundingType === 3
              ? "Student Loan Company"
              : res?.fundingType === 4
              ? "Bank Loan"
              : res?.fundingType === 5
              ? "Government Loan/Fund"
              : res?.fundingType === 6
              ? "Scholarship"
              : "Select Fund Type"
          );
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFund();
  }, [success, applicationStudentId]);

  const fundOptions = fund?.map((f) => ({
    label: f.name,
    value: f.id,
  }));

  const selectFund = (label, value) => {
    setFundLabel(label);
    setFundValue(value);
  };

  const history = useHistory();
  const goPrevious = () => {
    history.push(
      `/addStudentApplicationInformation/${applicationStudentId}/${1}`
    );
  };
  const goForward = () => {
    history.push(
      `/addStudentEducationalInformation/${applicationStudentId}/${1}`
    );
  };

  return (
    <div>
      <BreadCrumb
        title="Funding Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <StudentNavigation
            studentid={applicationStudentId}
            activetab={"4"}
            success={success}
            setSuccess={setSuccess}
            action={() => {}}
          />
          <Card>
            <CardBody>
              <p className="section-title">
                Financial Capacity Assessments: (Fees/Funding)
              </p>

              <Row>
                <Col lg="6" md="8">
                  {update ? (
                    <FormGroup>
                      <span>
                        <span className="text-danger">*</span> How do you intend
                        to finance your education?
                      </span>

                      <Select
                        className="form-mt"
                        options={fundOptions}
                        value={{ label: fundLabel, value: fundValue }}
                        onChange={(opt) => selectFund(opt.label, opt.value)}
                        name="sourceOfFundId"
                        id="sourceOfFundId"
                        required
                      />
                    </FormGroup>
                  ) : null}
                </Col>
              </Row>

              <>
                {fundValue === 1 ? (
                  <SelfFunded
                    studentid={applicationStudentId}
                    success={success}
                    setSuccess={setSuccess}
                  />
                ) : fundValue === 2 ? (
                  <FamilyFunded
                    studentid={applicationStudentId}
                    success={success}
                    setSuccess={setSuccess}
                  />
                ) : fundValue === 3 ? (
                  <StudentLoanCompany
                    studentid={applicationStudentId}
                    success={success}
                    setSuccess={setSuccess}
                  />
                ) : fundValue === 4 ? (
                  <BankLoan
                    studentid={applicationStudentId}
                    success={success}
                    setSuccess={setSuccess}
                  />
                ) : fundValue === 5 ? (
                  <GovernmentFundingAssesment
                    studentid={applicationStudentId}
                    success={success}
                    setSuccess={setSuccess}
                  />
                ) : fundValue === 6 ? (
                  <Scholarship
                    studentid={applicationStudentId}
                    success={success}
                    setSuccess={setSuccess}
                  />
                ) : (
                  <Row className="mt-4">
                    <Col className=" d-flex justify-content-between">
                      <PreviousButton action={goPrevious} />
                      {userType !== userTypes?.Student.toString() &&
                      nav?.educational ? (
                        <SaveButton text="Next" action={goForward} />
                      ) : null}
                    </Col>
                  </Row>
                )}
              </>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default SourceOfFund;
