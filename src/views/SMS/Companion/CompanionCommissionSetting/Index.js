import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import get from "../../../../helpers/get";
import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import Uget from "../../../../helpers/Uget";
import CompanionCommissionForm from "./Component/CompanionCommissionForm";
import TeamCommission from "./Component/TeamCommission";
import CompanionCommissionList from "./Component/CompanionCommissionList";

const DistributionLevelSetting = () => {
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

  useEffect(() => {
    Uget(`CompanionCommissionSetting/Index`).then((res) => {
      setDistributionData(res?.data);
      setLoading(false);
    });
  }, [success]);

  const toggleUpdate = (data) => {
    setUpdate(true);
    setNameError("");
    setPercentError("");
    Uget(`CompanionCommissionSetting/${data?.id}`).then((res) => {
      console.log(res);
      setData(res?.data);
      setName(res?.data?.name);
      setPercent(res?.data?.amount);
    });
  };

  return (
    <div>
      <BreadCrumb title="Companion Commission Settings" backTo="" path="/" />
      <div>
        <Card>
          <CardBody>
            {loading ? (
              <Loader />
            ) : (
              <div className="row mb-30px">
                <div className="col-md-5">
                  <CompanionCommissionForm
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
                  <CompanionCommissionList
                    success={success}
                    setSuccess={setSuccess}
                    distributionData={distributionData}
                    toggleUpdate={toggleUpdate}
                  />
                </div>
              </div>
            )}

            <TeamCommission />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DistributionLevelSetting;
