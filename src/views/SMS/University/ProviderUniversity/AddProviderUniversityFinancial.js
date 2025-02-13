import Axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
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
import { rootUrl } from "../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AddProviderUniversityFinancial = (props) => {
  const [activetab, setActivetab] = useState("3");
  const [submitData, setSubmitData] = useState(false);
  const [financialData, setFinancialData] = useState({});
  const [financialId, setFinancialId] = useState(undefined);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const { addToast } = useToasts();
  const { providerProfileId, univerId } = useParams();

  const history = useHistory();
  const myForm = createRef();

  const location = useLocation();

  let uniId;
  if (location.id) {
    uniId = location.id;
  } else {
    uniId = "";
  }

  useEffect(() => {
    get(`FinancialInformation/GetByUniversity/${univerId}`).then((res) => {
      setFinancialData(res);
      setFinancialId(res?.id);
    });
  }, [univerId]);

  const back = () => {
    history.push(
      `/addProviderUniversityCampus/${providerProfileId}/${univerId}`
    );
  };

  const front = () => {
    history.push(
      `/addProviderUniversityFeatures/${providerProfileId}/${univerId}`
    );
  };

  const AuthStr = localStorage.getItem("token");

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    // subdata.append('UniversityLogoFile',exactLogoFile);
    // subdata.append('CoverImageFile',exactCoverFile);

    //  watch form data values
    for (var value of subdata.values()) {
    }

    //  const config = {
    //     headers: {
    //       'content-type': 'multipart/form-data'
    //     }
    //   }

    if (financialId == undefined) {
      setButtonStatus(true);
      setProgress(true);
      Axios.post(`${rootUrl}FinancialInformation/Create`, subdata, {
        headers: {
          authorization: AuthStr,
        },
      }).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        const uniID = res.data.result.universityId;

        if (res.status === 200 && res.data.isSuccess === true) {
          setSubmitData(true);
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push({
            pathname: `/addProviderUniversityFeatures/${providerProfileId}/${univerId}`,
            id: uniID,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
        }
      });
    } else {
      setButtonStatus(true);
      setProgress(true);
      put("FinancialInformation/Update", subdata).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });

          history.push({
            pathname: `/addProviderUniversityFeatures/${providerProfileId}/${univerId}`,
          });
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
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
    // if (tab == "3") {
    //   history.push(`/addProviderUniversityTestScore/${providerProfileId}/${univerId}`);
    // }
    if (tab == "3") {
      history.push(
        `/addProviderUniversityFinancial/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "4") {
      history.push(
        `/addProviderUniversityFeatures/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "5") {
      history.push(
        `/addProviderUniversityGallery/${providerProfileId}/${univerId}`
      );
    }
    // if (tab == "7") {
    //   history.push(`/addProviderUniversityApplicationDocument/${providerProfileId}/${univerId}`);
    // }
    if (tab == "6") {
      history.push(
        `/addProviderUniversityTemplateDocument/${providerProfileId}/${univerId}`
      );
    }
    if (tab == "7") {
      history.push(
        `/addProviderUniversityCommission/${providerProfileId}/${univerId}`
      );
    }
  };

  return (
    <div>
      <BreadCrumb
        title="University Financial Information"
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

            {/* <NavItem>

              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Test Score
              </NavLink>
            </NavItem> */}

            <NavItem>
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Financial
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Features
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                Gallery
              </NavLink>
            </NavItem>

            {/* <NavItem>
              
              <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                Application Document
              </NavLink>
            </NavItem> */}

            <NavItem>
              <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                Template Document
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                Commission
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="3">
              <Form ref={myForm} onSubmit={handleSubmit} className="mt-5">
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Financial Information</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                </div>

                {financialId !== undefined ? (
                  <>
                    <input
                      type="hidden"
                      name="id"
                      id="id"
                      value={financialId}
                    />
                  </>
                ) : null}

                <FormGroup row className="has-icon-left position-relative">
                  <Input
                    type="hidden"
                    id="UniversityId"
                    name="UniversityId"
                    value={univerId}
                  />
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Avg. Tution Fee <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="AvarageTutionFee"
                      id="AvarageTutionFee"
                      defaultValue={financialData?.avarageTutionFee}
                      placeholder="Average Tution Fee"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Avg. Living Cost <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="AvarageLivingCost"
                      id="AvarageLivingCost"
                      defaultValue={financialData?.avarageLivingCost}
                      placeholder="Average Living Cost"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Est. Total Cost <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      min="0"
                      name="EstimatedTotalCost"
                      id="EstimatedTotalCost"
                      defaultValue={financialData?.estimatedTotalCost}
                      placeholder="Estimated Total Cost"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="5">
                    <ButtonForFunction
                      type={"submit"}
                      className={"ml-lg-3 ml-sm-1 mt-3 badge-primary"}
                      name={progress ? <ButtonLoader /> : "Save"}
                      disable={buttonStatus}
                      permission={6}
                    />
                  </Col>
                </FormGroup>
              </Form>
              <div className="d-flex justify-content-between">
                <Button color="warning" onClick={back}>
                  Previous Page
                </Button>

                <Button color="warning" onClick={front}>
                  Next Page
                </Button>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddProviderUniversityFinancial;
