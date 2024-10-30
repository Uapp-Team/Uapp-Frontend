import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardHeader } from "reactstrap";
import get from "../../../../helpers/get";
import Loader from "../../Search/Loader/Loader";
import DistributionLevelSettingForm from "./Component/DistributionLevelSettingForm";
import DistributionLevelSettingList from "./Component/DistributionLevelSettingList";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const DistributionLevelSetting = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [distributionData, setDistributionData] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState("");
  const [valueError, setValueError] = useState("");
  const [percentError, setPercentError] = useState("");

  const backToDashboard = () => {
    history.push("/");
  };

  useEffect(() => {
    get(`DistributionLevelSetting/Index`).then((res) => {
      setDistributionData(res);
      setLoading(false);
    });
  }, [success]);

  const toggleUpdate = (data) => {
    setUpdate(true);
    setNameError("");
    setValueError("");
    setPercentError("");
    get(`DistributionLevelSetting/Get/${data?.id}`).then((res) => {
      setData(res);
      setName(res?.levelName);
      setValue(res?.levelValue);
      setPercent(res?.commissionPercent);
    });
  };

  return (
    <div>
      <BreadCrumb title="Distribution Level Settings" backTo="" path="/" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-5">
                  <DistributionLevelSettingForm
                    success={success}
                    setSuccess={setSuccess}
                    update={update}
                    setUpdate={setUpdate}
                    name={name}
                    setName={setName}
                    value={value}
                    setValue={setValue}
                    percent={percent}
                    setPercent={setPercent}
                    data={data}
                    setData={setData}
                    nameError={nameError}
                    setNameError={setNameError}
                    valueError={valueError}
                    setValueError={setValueError}
                    percentError={percentError}
                    setPercentError={setPercentError}
                  />
                </div>

                <div className="col-md-7">
                  <DistributionLevelSettingList
                    success={success}
                    setSuccess={setSuccess}
                    distributionData={distributionData}
                    toggleUpdate={toggleUpdate}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DistributionLevelSetting;
