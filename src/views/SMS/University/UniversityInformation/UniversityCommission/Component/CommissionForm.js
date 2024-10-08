import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import get from "../../../../../../helpers/get";
import { useState } from "react";
import CommissionFormCard from "./CommissionFormCard";
import Loader from "../../../../Search/Loader/Loader";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const CommissionForm = () => {
  const [levelList, setLevelList] = useState([]);
  const { uniId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`UniversityComission/GetComissions/${uniId}`).then((res) => {
      const defaultCommissionType = { label: "Commission Type", value: 0 };
      const fields = res?.map((p) => ({
        ...p,
        commissionType: defaultCommissionType,
        installment: 0,
        value: 0,
      }));
      setLevelList(fields);
      setLoading(false);
    });
  }, [uniId]);
  console.log("levelList", levelList);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title="Home/EU Application Commissions"
            backTo="University Commissions"
            path={`/addUniversityCommission/${uniId}`}
          />

          {levelList?.map((level, i) => (
            <CommissionFormCard uniId={uniId} level={level} i={i} key={i} />
          ))}
        </div>
      )}
    </>
  );
};

export default CommissionForm;
