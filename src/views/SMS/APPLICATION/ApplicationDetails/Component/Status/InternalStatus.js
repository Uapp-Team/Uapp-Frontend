import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import put from "../../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../../helpers/get";
import ReactQuill from "react-quill";
import RichTextArea from "../../../../../../components/form/RichTextArea";
import { AdminUsers } from "../../../../../../components/core/User";

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
        setStatement(res?.note);
        const count = countWords(res?.note);
        setStringData(count);
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
    setStatement(e);
    const count = countWords(e);
    setStringData(count);
    if (e === "") {
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
    } else if (statusValue === 2 && stringData < 20) {
      setStateMentError("Statement minimum 20 words");
    } else {
      setProgress(true);
      put(
        `ApplicationInternalAssesmentRequirement/Update?id=${id}&statusid=${statusValue}&note=${statement}`
      ).then((action) => {
        console.log(action);
        setProgress(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      });
    }
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
                isDisabled={
                  !AdminUsers() && status?.internalAssesmentStatusId === 2
                    ? true
                    : false
                }
                name="statusId"
                id="statusId"
              />
            </FormGroup>

            {statusValue === 2 && (
              <>
                {!AdminUsers() && status?.note ? (
                  <>
                    <b>Note</b>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: status?.note,
                      }}
                    />
                  </>
                ) : (
                  <FormGroup>
                    <span>
                      Write a note <span className="text-danger">*</span>
                    </span>

                    <RichTextArea
                      defaultValue={statement}
                      onChange={handleStringData}
                    />

                    <div className="d-flex justify-content-between">
                      <div className="text-danger">{stateMentError}</div>
                      <div className="text-right">
                        {stringData ? stringData : "0"} / min word-20
                      </div>
                    </div>
                  </FormGroup>
                )}
              </>
            )}
            {!AdminUsers() && status?.note ? null : (
              <FormGroup>
                <SaveButton text="Save" progress={progress} />
              </FormGroup>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default InternalStatus;
