import React, { useEffect, useState } from "react";
import { Col, Form, Modal, ModalBody, Progress, Row } from "reactstrap";
import Input from "../../../../components/form/Input";
import SaveButton from "../../../../components/buttons/SaveButton";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import LogButton from "../../../../components/buttons/LogButton";
import get from "../../../../helpers/get";
import CloseBtn from "../../../../components/buttons/CloseBtn";

const ConversionRate = () => {
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState(0);
  const [log, setLog] = useState([]);
  const [valueErroe, setValueError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [logModal, setLogModal] = useState(false);

  useEffect(() => {
    get(`LeadEligibility/index`).then((res) => {
      setValue(res?.applicationConversionRate);
    });
  }, []);

  useEffect(() => {
    get(`LeadEligibility/log`).then((res) => {
      setLog(res);
    });
  }, [success]);

  const handlePercent = (newValue) => {
    // const newValue = e.target.value;
    const isNumeric = /^\d+(\.\d+)?$/.test(newValue);
    setValue(newValue);

    if (!newValue) {
      setValueError("Percent is required");
    } else if (!isNumeric) {
      setValueError("Input must contain only positive numbers.");
    } else if (newValue >= 100) {
      setValueError("Input percentage must be below 100");
    } else {
      setValueError("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    // subData.append("applicationConversionRate", value);
    console.log(subData);

    const isNumeric = /^\d+(\.\d+)?$/.test(value);
    if (!value) {
      setValueError("Percent is required");
    } else if (!isNumeric) {
      setValueError("Input must contain only positive numbers.");
    } else if (value >= 100) {
      setValueError("Input percentage must be below 100");
    } else {
      setValueError("");

      setButtonStatus(true);

      post(`LeadEligibility/save`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
        }
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Conversion rate requirements for lead eligibility</h4>
        <LogButton action={() => setLogModal(!logModal)} />
      </div>

      <Row>
        <Col sm={7}>
          <Form onSubmit={onSubmit}>
            <div className="d-flex align-items-center">
              <Input
                type="number"
                name="applicationConversionRate"
                onChange={(e) => handlePercent(e.target.value)}
                defaultValue={value}
                error={valueErroe}
              />
              <h5 className="mb-3 ml-1">%</h5>
            </div>
            <Progress
              value={value}
              color="teal"
              style={{ marginBottom: "10px" }}
            />
            <SaveButton
              text="Save"
              progress={buttonStatus}
              buttonStatus={buttonStatus}
            />
          </Form>
        </Col>
        <Col sm={5}></Col>
      </Row>

      <Modal
        isOpen={logModal}
        toggle={() => setLogModal(!logModal)}
        className="uapp-modal"
      >
        <ModalBody style={{ padding: "30px" }}>
          <div className="d-flex justify-content-between">
            <h5>Logs</h5>

            <CloseBtn action={() => setLogModal(!logModal)} />
          </div>
          <div className="overflowY-300p">
            <ul className="pt-3 pl-2">
              {log?.map((timeline, i) => (
                <li className="list" key={i}>
                  <div class="text-green">
                    {timeline?.fromDate} - {timeline?.toDate}
                  </div>
                  <p>Conversion rate {timeline?.applicationConversionRate}%</p>
                </li>
              ))}
            </ul>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConversionRate;
