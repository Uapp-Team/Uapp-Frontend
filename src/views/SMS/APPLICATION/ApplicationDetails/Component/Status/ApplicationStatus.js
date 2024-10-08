import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import put from "../../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../../helpers/get";

const ApplicationStatus = ({ id, success, setSuccess }) => {
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [status, setStatus] = useState([]);
  const [statusDD, setStatusDD] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Select Application Status");
  const [statusValue, setStatusvalue] = useState(0);
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState(false);

  useEffect(() => {
    get(`ApplicationAssesmentStatusDD/index`).then((res) => {
      console.log(res);
      setStatusDD(res);
    });
  }, []);

  useEffect(() => {
    if (id) {
      get(`ApplicationAssesment/ApplicationDetails/${id}`).then((res) => {
        setStatus(res);
      });
    }
  }, [id]);

  useEffect(() => {
    const initialStatus = statusDD.filter((item) => {
      return item.id === status?.statusId;
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
    if (statusValue !== 3 && note === "") {
      setNoteError(true);
    } else {
      setProgress(true);
      put(
        `ApplicationAssesment/UpdateApplicationDetails?id=${id}&statusid=${statusValue}&note=${note}`
      ).then((action) => {
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
      <h4>Application Info Assessment</h4>
      <Form onSubmit={handleApplicationUpdateSubmit}>
        <input type="hidden" name="id" id="id" value={id} />

        <Row>
          <Col md={7}>
            <FormGroup>
              <span>
                Application Status <span className="text-danger">*</span>{" "}
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
            {statusValue !== 3 && (
              <FormGroup>
                <span>Note</span><span className="text-danger">*</span>{" "}

                <Input
                  type="textarea"
                  placeholder="Write note"
                  name="note"
                  id="note"
                  defaultValue={status?.note}
                  onChange={(e) => {
                    setNote(e.target.value);
                    setNoteError(false);
                  }}
                />
                {noteError && (
                  <span className="text-danger">Note is required</span>
                )}
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

export default ApplicationStatus;
