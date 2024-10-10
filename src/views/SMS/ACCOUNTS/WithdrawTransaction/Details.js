import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import get from "../../../../helpers/get";
import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const Details = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    get(`WithdrawTransaction/Get/${id}`).then((res) => {
      console.log(res);
      setData(res);
      setLoading(false);
    });
  }, [id]);

  return (
    <>
      <BreadCrumb title="Withdraw Transaction Details" backTo="" path="" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody>
              <Table className="table-bordered mt-4">
                <tbody>
                  <tr>
                    <td width="40%">
                      <b>Consultant:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.consultantName}</>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>Transaction Code:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.transactionCode}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Transaction Date:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.transactionDate}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Transaction Note:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.transactionNote}</>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>Payment Type:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.paymentType}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Amount:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.amount}</>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>Reference:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.reference}</>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default Details;
