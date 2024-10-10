import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import get from "../../../helpers/get";
import Loader from "../Search/Loader/Loader";

const TandCDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`UserTermsAndConditions/GetDetails/${id}`).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      <BreadCrumb title="Terms And Condition" backTo="" path="/" />
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <CardBody>
            <h3 className="mb-4 fw-600">
              Terms and Conditions for{" "}
              <span className="text-orange">
                {data?.userName}
                {data?.consultantTypeName && <>({data?.consultantTypeName})</>}
                {data?.studentTypeName && <>({data?.studentTypeName})</>}
              </span>
            </h3>

            <div dangerouslySetInnerHTML={{ __html: data?.details }} />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default TandCDetails;
