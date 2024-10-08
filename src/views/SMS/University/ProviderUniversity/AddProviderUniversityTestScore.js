import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AddProviderUniversityTestScore = () => {
  const { providerProfileId, univerId } = useParams();
  const history = useHistory();

  const [ielts, setIelts] = useState(false);
  const [activetab, setActivetab] = useState("3");
  const [required, setRequired] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [score, setScore] = useState(null);

  const [data, setData] = useState({});
  const { addToast } = useToasts();

  useEffect(() => {
    get(`TestScoreRequirement/Index/${univerId}`).then((res) => {
      setData(res);
      setRequired(res?.isTestScoreRequired);
      setIelts(res?.isIeltsMandatory);
      setScore(res?.score);
    });
  }, []);

  const handleIelts = (e) => {
    setIelts(e.target.checked);
  };

  const handleRequired = (e) => {
    setRequired(e.target.checked);
  };

  const handleScore = (e) => {
    setScore(e.target.value);
  };

  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/addProviderUniversity/${providerProfileId}/${univerId}`);
    }
    if (tab == "2") {
      history.push(
        `/addProviderUniversityCampus/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "3") {
      history.push(
        `/addProviderUniversityTestScore/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "4") {
      history.push(
        `/addProviderUniversityFinancial/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "5") {
      history.push(
        `/addProviderUniversityFeatures/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "6") {
      history.push(
        `/addProviderUniversityGallery/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "7") {
      history.push(
        `/addProviderUniversityApplicationDocument/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "8") {
      history.push(
        `/addProviderUniversityTemplateDocument/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "9") {
      history.push(
        `/addProviderUniversityCommission/${providerProfileId}/${univerId}`
      );
    }
  };

  const submitTestScore = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("isTestScoreRequired", required);
    subData.append("isIeltsMandatory", data == null ? false : ielts);

    if (data?.id) {
      setProgress(true);
      put(`TestScoreRequirement/Update`, subData).then((res) => {
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push(
            `/addProviderUniversityFinancial/${providerProfileId}/${univerId}`
          );
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      setProgress(true);
      post(`TestScoreRequirement/Create`, subData).then((res) => {
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push(
            `/addProviderUniversityFinancial/${providerProfileId}/${univerId}`
          );
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Test Score Information"
        backTo="Provider Details"
        path={`/providerDetails/${providerProfileId}`}
      />

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Basic Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Campuses
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Test Score
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Financial
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Features
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                Gallery
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                Application Document
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
                Template Document
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "9"} onClick={() => toggle("9")}>
                Commission
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="3">
              <Form onSubmit={submitTestScore} className="mt-5">
                <div className="hedding-titel d-flex justify-content-between mb-3">
                  <div>
                    <h5>
                      {" "}
                      <b>Test Score Informtation</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                </div>

                <input
                  type="hidden"
                  name="universityId"
                  id="universityId"
                  value={univerId}
                />

                {data?.id ? (
                  <input type="hidden" name="id" id="id" value={data?.id} />
                ) : null}

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Is Test Score Required</span>
                  </Col>
                  <Col md="6">
                    <Input
                      className="ml-1"
                      type="checkbox"
                      //   name='isTestScoreRequired'
                      //   id='isTestScoreRequired'
                      onChange={handleRequired}
                      checked={required}
                    />
                  </Col>
                </FormGroup>

                {required ? (
                  <>
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>Is IELTS Mandatory</span>
                      </Col>
                      <Col md="6">
                        <Input
                          className="ml-1"
                          type="checkbox"
                          //   name='isIeltsMandatory'
                          //   id='isIeltsMandatory'
                          onChange={handleIelts}
                          checked={ielts}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          {ielts ? "IELTS Score" : "IELTS Equivalent Score"}
                        </span>
                      </Col>
                      <Col md="3">
                        <Input
                          type="text"
                          name="score"
                          id="score"
                          placeholder="Enter Score"
                          defaultValue={data?.score}
                          required
                          onChange={handleScore}
                        />
                      </Col>
                    </FormGroup>
                  </>
                ) : null}

                <div className="row">
                  <div className="col-md-5 d-flex justify-content-end">
                    <ButtonForFunction
                      type={"submit"}
                      className={"ml-lg-2 ml-sm-1 mt-3 badge-primary"}
                      name={progress ? <ButtonLoader /> : "Save"}
                      disable={!(required && score > "1")}
                      permission={6}
                    />
                  </div>
                </div>
              </Form>

              <div className="d-flex justify-content-between mt-5">
                <div>
                  <Link
                    to={`/addProviderUniversityCampus/${providerProfileId}/${univerId}`}
                  >
                    <Button color="warning">Previous Page</Button>
                  </Link>
                </div>

                <div>
                  <Link
                    to={`/addProviderUniversityFinancial/${providerProfileId}/${univerId}`}
                  >
                    <Button color="warning">Next Page</Button>
                  </Link>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddProviderUniversityTestScore;
