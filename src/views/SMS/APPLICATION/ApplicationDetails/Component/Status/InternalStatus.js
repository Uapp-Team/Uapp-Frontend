import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import put from "../../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../../helpers/get";

const InternalStatus = ({ id, success, setSuccess }) => {
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [status, setStatus] = useState([]);
  const [statusDD, setStatusDD] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Select Application Status");
  const [statusValue, setStatusvalue] = useState(0);
  const [stateMentError, setStateMentError] = useState("");
  const [stringData, setStringData] = useState(0);
  const [statement, setStatement] = useState("");

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

  function countWords(str) {
    const arr = str?.split(" ");
    return arr?.filter((word) => word !== "")?.length;
  }

  const handleStringData = (e) => {
    const count = countWords(e.target.value);
    setStringData(count);
    setStatement(e.target.value);
    if (e.target.value === "") {
      setStateMentError("Statement is required");
    } else if (count < 20) {
      setStateMentError("Statement minimum 20 words");
    } else {
      setStateMentError("");
    }
  };

  const handleApplicationUpdateSubmit = (e) => {
    e.preventDefault();
    if (statusValue === 2 && statement === "") {
      setStateMentError("Statement is required");
    }
    if (statusValue === 2 && stringData < 20) {
      setStateMentError("Statement minimum 20 words");
    }
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
      <h4> Internal Assessment</h4>
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
            {statusValue === 2 && (
              <FormGroup>
                <span>
                  Write a note <span className="text-danger">*</span>
                </span>

                <Input
                  type="textarea"
                  name="statement"
                  id="statement"
                  value={statement}
                  onChange={(e) => handleStringData(e)}
                />

                <div className="d-flex justify-content-between">
                  <div className="text-danger">{stateMentError}</div>
                  <div className="text-right">{stringData} / min word-20</div>
                </div>
              </FormGroup>
            )}

            <FormGroup>
              <SaveButton text="Save" progress={progress} />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default InternalStatus;
