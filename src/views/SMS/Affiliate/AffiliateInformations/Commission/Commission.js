import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Uget from "../../../../../helpers/Uget";
import Navigation from "../NavigationAndRegistration/Navigation";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import SaveButton from "../../../../../components/buttons/SaveButton";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import DefaultDropdownU from "../../../../../components/Dropdown/DefaultDropdownU";
import PreviousButton from "../../../../../components/buttons/PreviousButton";

const Commission = () => {
  const history = useHistory();
  const { affiliateId } = useParams();
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [current, setCurrent] = useState([]);
  const [logs, setLogs] = useState([]);
  const [commotionLable, setCommissionLable] = useState("Select");
  const [commissionValue, setCommissionValue] = useState(0);
  const [commissionError, setCommissionError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    Uget(`AffiliateCommissionLog/Index/${affiliateId}`).then((res) => {
      console.log(res);
      setCurrent(res?.data);
    });
    Uget(`AffiliateCommissionLog/logs/${affiliateId}`).then((res) => {
      console.log(res);
      setLogs(res?.data);
    });
  }, [affiliateId, success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    console.log(subData);
    if (commissionValue) {
      setButtonStatus(true);
      setProgress(true);

      post(`AffiliateCommissionLog/Assign`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        setSuccess(!success);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.title, {
            appearance: "success",
            autoDismiss: true,
          });
        }
      });
    } else {
      setCommissionError("Please select a commission");
    }
  };

  const goPrevious = () => {
    history.push(`/affiliateBankInfo/${affiliateId}`);
  };
  const goForward = () => {
    history.push(`/affiliateTerms/${affiliateId}`);
  };
  return (
    <>
      <Navigation
        title="Commission Information"
        activetab="6"
        affiliateId={affiliateId}
        success={success}
      />{" "}
      <Card>
        <CardBody>
          {/* <TabContent activeTab={"6"}>
            <TabPane tabId="6"></TabPane>
          </TabContent> */}
          <Row>
            <Col lg={7} md={10}>
              <div className="custom-card-border p-4 mb-4">
                <h5 className="mb-3">Current commission setting</h5>
                <p>Name: {current?.name}</p>
                <p>Commission Amount: {current?.amount}</p>
              </div>
              <div className="custom-card-border p-4 mb-4">
                <h5 className="mb-3">Update commission setting</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 w-75">
                    <input
                      type="hidden"
                      name="affiliateId"
                      id="affiliateId"
                      value={affiliateId}
                    />
                    <DefaultDropdownU
                      label={commotionLable}
                      setLabel={setCommissionLable}
                      value={commissionValue}
                      setValue={setCommissionValue}
                      url="AffiliateCommissionSetting/SelectList"
                      name="commissionSettingId"
                      error={commissionError}
                      setError={setCommissionError}
                      action={() => {}}
                    />
                  </div>
                  <SaveButton
                    text="Submit"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                </form>
              </div>
              <div className="custom-card-border p-4 mb-4">
                <h5 className="mb-3"> Commission log</h5>

                <div className="table-responsive fixedhead mb-2">
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="tablehead">
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Name </th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs?.map((item, i) => (
                        <tr key={i} className="border-buttom">
                          <td>{item?.fromDate} </td>
                          <td>{item?.toDate}</td>
                          <td>{item?.name}</td>
                          <td>{item?.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>

          <div className="d-flex justify-content-between mt-5">
            <PreviousButton action={goPrevious} />
            <SaveButton text="Next" action={goForward} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Commission;
