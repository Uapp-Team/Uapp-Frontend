import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardHeader } from "reactstrap";
import { useState } from "react";
import CommissionFormCardInt from "./CommissionFormCardInt";
import get from "../../../../../../helpers/get";
import Loader from "../../../../Search/Loader/Loader";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const CommissionForm = () => {
  const history = useHistory();
  const { uniId } = useParams();
  const [loading, setLoading] = useState(true);
  const [levelList, setLevelList] = useState([]);
  const [uniCountryList, setUniCountryList] = useState([]);

  useEffect(() => {
    get(`InternationalComission/GetComissions/${uniId}`).then((res) => {
      const defaultCommissionType = { label: "Commission Type", value: 0 };
      const fields = res?.map((p) => ({
        ...p,
        commissionType: defaultCommissionType,
        installment: 0,
        value: 0,
      }));
      setLevelList(fields);
      // setLoading(false);
    });
    get(`InternationalComission/GetCountries/${uniId}`).then((res) => {
      setUniCountryList(res);
    });
    setLoading(false);
  }, [uniId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title="International Application Commissions"
            backTo="University Commissions"
            path={`/addUniversityCommission/${uniId}`}
          />

          {levelList?.map((level, i) => (
            <CommissionFormCardInt
              uniId={uniId}
              uniCountryList={uniCountryList}
              level={level}
              i={i}
              key={i}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CommissionForm;
