import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  TabContent,
  TabPane,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import ButtonLoader from "../../../../Components/ButtonLoader";
import ProviderAdminNavigation from "../ProviderAdminRegistrationAndNavigation/ProviderAdminNavigation";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import post from "../../../../../../helpers/post";
import get from "../../../../../../helpers/get";
import ContactFormProviderAdmin from "./Component/ContactFormProviderAdmin";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const ProviderAdminContactInfo = () => {
  const [activetab, setActivetab] = useState("3");
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Country");
  const [countryValue, setCountryValue] = useState(0);
  const [progress, setProgress] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phnNo, setPhnNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [cityN, setCityN] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressData, setAddressData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userTypeId = localStorage.getItem("userType");
  const { providerId, providerAdminId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountry(res);
    });

    get(`ProviderAdminAddress/GetByAdmin/${providerAdminId}`).then((res) => {
      console.log("address", res);
      setAddressData(res);
      setCountryLabel(
        res?.country?.name == null ? "Select Country" : res?.country?.name
      );
      setCountryValue(res?.country?.id == null ? 0 : res?.country?.id);
      setPhnNo(res?.cellPhoneNumber !== null ? res?.cellPhoneNumber : null);
      setHouseNo(res?.houseNo !== null ? res?.houseNo : null);
      setAddressLine(res?.addressLine !== null ? res?.addressLine : null);
      setCityN(res?.city !== null ? res?.city : null);
      setState(res?.state !== null ? res?.state : "");
      setZipCode(res?.zipCode !== null ? res?.zipCode : null);
    });
  }, [success]);

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("cellPhoneNumber", phnNo);
    subData.append("houseNo", houseNo);
    subData.append("addressLine", addressLine);
    subData.append("city", cityN);
    subData.append("state", state);
    subData.append("zipCode", zipCode);
    subData.append("countryId", countryValue);
    subData.append("providerAdminId", providerAdminId);
    subData.append("id", addressData === false ? 0 : addressData?.id);

    // for (var value of subData) {
    //   console.log(value);
    // }

    if (countryValue == 0) {
      setCountryError(true);
    } else {
      setButtonStatus(true);
      setProgress(true);

      post("ProviderAdminAddress/Address", subData).then((res) => {
        setProgress(false);
        setSuccess(!success);
        addToast(res?.data?.message, {
          appearance: res?.data?.isSuccess == true ? "success" : "error",
          autoDismiss: true,
        });

        setButtonStatus(false);
      });
    }
  };

  const goBackward = () => {
    history.push(`/providerAdminPersonalInfo/${providerId}/${providerAdminId}`);
  };

  const goForward = () => {
    history.push(
      `/providerAdminEligibilityInfo/${providerId}/${providerAdminId}`
    );
  };

  const onGoUniProfile = () => {
    history.push(`/providerAdminProfile/${providerAdminId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Designated Person Information"
        backTo="Provider Admin Profile"
        path={`/providerAdminProfile/${providerAdminId}`}
      />

      <Card>
        <CardBody>
          <ProviderAdminNavigation
            activetab={activetab}
            providerId={providerId}
            providerAdminId={providerAdminId}
          />

          <TabContent activeTab={activetab}>
            <TabPane tabId="3">
              <Form className="mt-5" onSubmit={handleSubmit}>
                <ContactFormProviderAdmin
                  providerAdminId={providerAdminId}
                  countryLabel={countryLabel}
                  countryValue={countryValue}
                  success={success}
                  countryError={countryError}
                  buttonStatus={buttonStatus}
                  progress={progress}
                  countryName={countryName}
                  selectCountry={selectCountry}
                  phnNo={phnNo}
                  setPhnNo={setPhnNo}
                  houseNo={houseNo}
                  setHouseNo={setHouseNo}
                  setAddressLine={setAddressLine}
                  addressLine={addressLine}
                  cityN={cityN}
                  setCityN={setCityN}
                  state={state}
                  setState={setState}
                  zipCode={zipCode}
                  setZipCode={setZipCode}
                />

                <div className="row">
                  <div className="col-md-8 d-flex justify-content-end">
                    <ButtonForFunction
                      type={"submit"}
                      name={progress ? <ButtonLoader /> : "Save"}
                      className={"mr-1 mt-3 badge-primary"}
                      disable={buttonStatus}
                    />
                  </div>
                </div>
              </Form>

              <FormGroup
                className="has-icon-left position-relative"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <ButtonForFunction
                  className={"mr-1 mt-3 btn-warning"}
                  func={goBackward}
                  name={"Previous"}
                  icon={<i className="fas fa-arrow-left-long mr-1"></i>}
                />

                <Button.Ripple
                  onClick={goForward}
                  className="mr-1 mt-3 btn-warning"
                >
                  Next
                  <i className="fas fa-arrow-right-long ml-1"></i>
                </Button.Ripple>
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProviderAdminContactInfo;
