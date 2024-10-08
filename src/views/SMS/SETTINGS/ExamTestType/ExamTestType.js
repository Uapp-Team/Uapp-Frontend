import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  Form,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import post from "../../../../helpers/post";
import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const ExamTestType = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [examTestType, setExamTestType] = useState([]);
  const [examTestTypeValue, setExamTestTypeValue] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasts();

  useEffect(() => {
    get(`ExamTestType/Index`)
      .then((action) => {
        setExamTestType(action);
        setLoading(false);
      })
      .catch();
  }, [success]);

  const backToDashboard = () => {
    history.push("/");
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    localStorage.removeItem("updateUniCountry");
  };

  const handleUpdateSubmit = () => {
    const subData = {
      id: idVal,
      name: examTestTypeValue,
    };
    put(`ExamTestType/Update`, subData).then((action) => {
      setSuccess(!success);
      setModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });

      setExamTestTypeValue("");
    });
    localStorage.removeItem("updateExamTestTypeValue");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);
    post(`ExamTestType/Create`, subdata).then((action) => {
      setSuccess(!success);
      setModalOpen(false);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setModalOpen(false);
      history.push({
        pathname: "/examTestTypeAttribute",
        examTestTypeId: action?.data?.result?.id,
      });

      setExamTestTypeValue("");
    });
  };

  const idVal = localStorage.getItem("updateExamTestTypeValue");

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb title="Exam Test Types" backTo="" path="/" />

          <Card>
            <CardHeader>
              <div className="ml-auto">
                <div>
                  <b>
                    {" "}
                    Total{" "}
                    <span className="badge badge-primary">
                      {examTestType?.length}
                    </span>{" "}
                    Exam Test Types Found{" "}
                  </b>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <Modal
                  isOpen={modalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Add Exam Test Type</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      {idVal ? (
                        <input type="hidden" value={idVal} name="id" id="id" />
                      ) : null}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>Exam Test Type</span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={examTestTypeValue}
                            placeholder="Create exam test type"
                            onChange={(e) =>
                              setExamTestTypeValue(e.target.value)
                            }
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        className="has-icon-left position-relative"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          color="danger"
                          className="mr-1 mt-3"
                          onClick={closeModal}
                        >
                          Close
                        </Button>

                        {idVal ? (
                          <Button
                            color="warning"
                            className="mr-1 mt-3"
                            onClick={handleUpdateSubmit}
                          >
                            Update
                          </Button>
                        ) : (
                          <Button.Ripple
                            color="primary"
                            type="submit"
                            className="mr-1 mt-3"
                          >
                            Submit
                          </Button.Ripple>
                        )}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
              <div className="table-responsive">
                <Table className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      <th>SL/NO</th>
                      <th> Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examTestType?.map((exam, i) => (
                      <tr key={exam?.id}>
                        <th style={{ textAlign: "center" }} scope="row">
                          {i + 1}
                        </th>
                        <td style={{ textAlign: "center" }}>{exam?.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExamTestType;
