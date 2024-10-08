import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  TabContent,
  TabPane,
  Form,
} from "reactstrap";
import { useHistory, useParams } from "react-router";
// import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";
import UniversityNavbar from "../Components/UniversityNavbar";
import Select from "react-select";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../constants/userTypeConstant";

const AddUniversityRecruitmentType = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const activetab = "8";
  const [progress, setProgress] = useState(false);
  const [achome, setAcHome] = useState("false");
  const [aceu, setAcEu] = useState("false");
  const [acint, setAcInt] = useState("false");
  const [territory, setTerritory] = useState("true");
  const [countryList, setCountryList] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [loading, setLoading] = useState(true);
  const { univerId } = useParams();
  const history = useHistory();
  const [buttonStatus, setButtonStatus] = useState(false);
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");
  console.log(selectedOption);
  const handleHome = (event) => {
    setAcHome(event.target.value);
  };

  const handleEu = (event) => {
    setAcEu(event.target.value);
  };

  const handleInt = (event) => {
    setAcInt(event.target.value);
  };

  const handleTerritory = (event) => {
    setTerritory(event.target.value);
  };

  const styleLabelBold = {
    // fontWeight: "bold"
  };
  useEffect(() => {
    get("Countrydd/index").then((res) => {
      console.log(res);
      setCountryList(res);
    });
  }, []);
  useEffect(() => {
    get(`UniversityRecruitment/Get/${univerId}`).then((res) => {
      console.log(res);
      setAcHome(`${res?.isAcceptHome}`);
      setAcEu(`${res?.isAcceptEU_UK}`);
      setAcInt(`${res?.isAcceptInternational}`);
      setTerritory(`${res?.hasGlobalTeritory}`);
      setSelectedOption(res?.countryIds);
      setLoading(false);
    });
  }, [univerId]);

  const countryName = countryList.map((country) => ({
    label: country?.name,
    value: country?.id,
  }));

  const goPrevious = () => {
    history.push(`/addUniversityRequirements/${univerId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    let value = 0;

    for (value of subdata) {
      console.log("valuesss", value);
    }

    setButtonStatus(true);
    setProgress(true);
    post(`UniversityRecruitment/save`, subdata).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        userType !== userTypes?.ProviderAdmin &&
          history.push(`/addUniversityCommission/${univerId}`);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title="Recruitment Type"
            backTo="University"
            path="/universityList"
          />

          <UniversityNavbar activetab={activetab} univerId={univerId} />
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="8">
                  <Form onSubmit={handleSubmit}>
                    <p className="section-title">Recruitment Type</p>
                    <Input
                      type="hidden"
                      id="universityId"
                      name="universityId"
                      value={univerId}
                    />
                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>Home </span>
                      </Col>
                      <Col md="6">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isAcceptHome"
                            onChange={handleHome}
                            name="isAcceptHome"
                            value="true"
                            checked={achome === "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isAcceptHome"
                            style={styleLabelBold}
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isAcceptHome"
                            onChange={handleHome}
                            name="isAcceptHome"
                            value="false"
                            checked={achome === "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isAcceptHome"
                            style={styleLabelBold}
                          >
                            No
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>EU/UK </span>
                      </Col>
                      <Col md="6">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isAcceptEU_UK"
                            onChange={handleEu}
                            name="isAcceptEU_UK"
                            value="true"
                            checked={aceu === "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isAcceptEU_UK"
                            style={styleLabelBold}
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isAcceptEU_UK"
                            onChange={handleEu}
                            name="isAcceptEU_UK"
                            value="false"
                            checked={aceu === "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isAcceptEU_UK"
                            style={styleLabelBold}
                          >
                            No
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>International </span>
                      </Col>
                      <Col md="6">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isAcceptInternational"
                            onChange={handleInt}
                            name="isAcceptInternational"
                            value="true"
                            checked={acint === "true"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isAcceptInternational"
                            style={styleLabelBold}
                          >
                            Yes
                          </Label>
                        </FormGroup>

                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="radio"
                            id="isAcceptInternational"
                            onChange={handleInt}
                            name="isAcceptInternational"
                            value="false"
                            checked={acint === "false"}
                          />
                          <Label
                            className="form-check-label"
                            check
                            htmlFor="isAcceptInternational"
                            style={styleLabelBold}
                          >
                            No
                          </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    {acint === "true" ? (
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>Requirement Territory? </span>
                        </Col>
                        <Col md="6">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="hasGlobalTeritory"
                              onChange={handleTerritory}
                              name="hasGlobalTeritory"
                              value="true"
                              checked={territory === "true"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="hasGlobalTeritory"
                              style={styleLabelBold}
                            >
                              Global
                            </Label>
                          </FormGroup>

                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="radio"
                              id="hasGlobalTeritory"
                              onChange={handleTerritory}
                              name="hasGlobalTeritory"
                              value="false"
                              checked={territory === "false"}
                            />
                            <Label
                              className="form-check-label"
                              check
                              htmlFor="hasGlobalTeritory"
                              style={styleLabelBold}
                            >
                              Country Specific
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                    ) : (
                      <Input
                        type="hidden"
                        id="hasGlobalTeritory"
                        name="hasGlobalTeritory"
                        value="false"
                      />
                    )}

                    {acint === "true" && territory === "false" ? (
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            <span className="text-danger">*</span>
                            Recruitment For{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Select
                            isMulti
                            name="countryIds"
                            id="countryIds"
                            onChange={setSelectedOption}
                            options={countryName}
                            value={selectedOption}
                          />
                        </Col>
                      </FormGroup>
                    ) : (
                      <Input
                        type="hidden"
                        id="countryIds"
                        name="countryIds"
                        value=""
                      />
                    )}
                    <FormGroup row className=" mt-4">
                      <Col md="7" className="d-flex justify-content-between">
                        <PreviousButton action={goPrevious} />

                        <>
                          {permissions?.includes(
                            permissionList.Edit_University
                          ) && (
                            <SaveButton
                              text={
                                userType === userTypes?.ProviderAdmin
                                  ? "Save"
                                  : "Save and Next"
                              }
                              progress={progress}
                              buttonStatus={buttonStatus}
                            />
                          )}
                        </>
                      </Col>
                    </FormGroup>
                  </Form>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddUniversityRecruitmentType;
