import React, { createRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import get from "../../../../helpers/get";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonForFunction from "../../Components/ButtonForFunction";
import {
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Col,
  Table,
  Card,
} from "reactstrap";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import ButtonLoader from "../../../../components/buttons/ButtonLoader";
import put from "../../../../helpers/put";
import post from "../../../../helpers/post";

const StudentType = () => {
  const history = useHistory();
  const myForm = createRef();
  const [studentTypeInfo, setStudentTypeInfo] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selected, setSelected] = useState("");
  const [selectedError, setSelectedError] = useState("");

  const { addToast } = useToasts();

  const [progress, setProgress] = useState(false);

  useEffect(() => {
    get("StudentType/Index").then((res) => {
      setStudentTypeInfo(res);
      console.log(res);
    });
  }, [success]);

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected("");
  };

  const openModal = () => {
    setModalOpen(!modalOpen);
    setSelected("");
  };
  const handleStudentType = (e) => {
    setSelected(e.target.value);
    if (e.target.value === "") {
      setSelectedError("Employees type is required");
    } else {
      setSelectedError("");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (!selected) {
      setSelectedError("Employees type is required");
    } else {
      setProgress(true);
      post(`StudentType/Create`, subData).then((action) => {
        setModalOpen(false);
        setProgress(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);

        setSelected("");
      });
    }
    setSuccess(!success);
  };

  const gotoList = (id) => {
    history.push(`/studentListByType/${id}`);
  };

  return (
    <div>
      <BreadCrumb title="Student Type List" backTo="" path="/" />

      <Card>
        <CardHeader>
          {/* {permissions?.includes(permissionList?.Edit_Student) ? (
            <ButtonForFunction
              className={"btn btn-uapp-add"}
              func={() => setModalOpen(true)}
              icon={<i className="fas fa-plus"></i>}
              name={" Add Student Type"}
              permission={6}
            />
          ) : null} */}
          <div className="ml-auto">
            {" "}
            <b>
              {" "}
              Total{" "}
              <span className="badge badge-primary">
                {" "}
                {studentTypeInfo.length}
              </span>{" "}
              Student Type Found{" "}
            </b>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <Modal isOpen={modalOpen} toggle={openModal} className="uapp-modal">
              <ModalHeader>Student Type</ModalHeader>
              <ModalBody>
                <Form ref={myForm} onSubmit={handleSubmit}>
                  <Input type="hidden" name="Id" id="Id" value={0} />

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        student Type <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={selected}
                        placeholder="student Type"
                        onChange={(e) => {
                          handleStudentType(e);
                        }}
                      />
                      <span className="text-danger">{selectedError}</span>
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
                      onClick={() => closeModal()}
                    >
                      Close
                    </Button>
                    <Button.Ripple
                      color="primary"
                      type="submit"
                      className="mr-1 mt-3"
                    >
                      {progress ? <ButtonLoader /> : "Submit"}
                    </Button.Ripple>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>
          <div className="table-responsive">
            <Table className="table-sm table-bordered text-center">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  {/* <th>SL/NO</th> */}
                  <th> Name</th>
                  <th> Student Count</th>
                </tr>
              </thead>
              <tbody>
                {studentTypeInfo.map((type, index) => (
                  <tr key={index} type={type}>
                    {/* <th scope="row">{index + 1}</th> */}
                    <td>{type?.name}</td>
                    <td>
                      <span
                        className="badge badge-pill badge-secondary"
                        style={{ cursor: "pointer" }}
                        onClick={() => gotoList(type?.id)}
                      >{`View (${type?.studentCount})`}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentType;
