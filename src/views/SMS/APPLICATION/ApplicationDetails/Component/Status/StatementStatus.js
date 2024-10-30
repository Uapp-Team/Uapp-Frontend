import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Row } from "reactstrap";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import put from "../../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../../helpers/get";

const StatementStatus = ({ id, success, setSuccess }) => {
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [status, setStatus] = useState([]);
  const [statusDD, setStatusDD] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Select Application Status");
  const [statusValue, setStatusvalue] = useState(0);

  useEffect(() => {
    get(`ApplicationInternalAssesmentRequirement/Statuses`).then((res) => {
      setStatusDD(res);
    });
  }, []);

  useEffect(() => {
    if (id) {
      get(`ApplicationInternalAssesmentRequirement/Get/${id}`).then((res) => {
        setStatus(res);
      });
    }
  }, [id, success]);

  useEffect(() => {
    const initialStatus = statusDD.filter((item) => {
      return item.id === status?.internalAssesmentStatusId;
    });
    setStatusLabel(initialStatus[0]?.name);
    setStatusvalue(initialStatus[0]?.id);
  }, [statusDD, status]);

  const selectStatus = (label, value) => {
    setStatusLabel(label);
    setStatusvalue(value);
  };

  const statusMenu = statusDD.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));

  const handleApplicationUpdateSubmit = (e) => {
    e.preventDefault();

    setProgress(true);
    put(
      `ApplicationInternalAssesmentRequirement/Update/${id}/${statusValue}`
    ).then((action) => {
      setProgress(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  return (
    <div className="custom-card-border p-4 mb-130px ">
      <h4> Statement Assessment</h4>
      <Form onSubmit={handleApplicationUpdateSubmit}>
        <input type="hidden" name="id" id="id" value={id} />

        <Row>
          <Col md={7}>
            <FormGroup>
              <span>
                Status<span className="text-danger">*</span>{" "}
              </span>

              <Select
                options={statusMenu}
                value={{
                  label: statusLabel,
                  value: statusValue,
                }}
                onChange={(opt) => selectStatus(opt.label, opt.value)}
                name="statusId"
                id="statusId"
              />
            </FormGroup>

            <FormGroup>
              <SaveButton text="Save" progress={progress} />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StatementStatus;
