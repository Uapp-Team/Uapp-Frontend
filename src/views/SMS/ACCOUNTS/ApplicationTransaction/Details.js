import React, { useEffect, useState } from "react";
import {
  Card,
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
} from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import get from "../../../../helpers/get";
import Select from "react-select";
import CustomButtonRipple from "../../Components/CustomButtonRipple";
import SpanButton from "../../Components/SpanButton";
import put from "../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../components/buttons/SaveButton";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [transaction, setTransaction] = useState([]);
  const [transactionLabel, setTransactionLabel] = useState("Select");
  const [transactionValue, setTransactionValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [payment, setPayment] = useState([]);
  const [firstLabel, setFirstLabel] = useState("Select");
  const [firstValue, setFirstValue] = useState(0);
  const [secondLabel, setSecondLabel] = useState("Select");
  const [secondValue, setSecondValue] = useState(null);
  const [thirdLabel, setThirdLabel] = useState("Select");
  const [thirdValue, setThirdValue] = useState(null);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [openModal5, setOpenModal5] = useState(false);
  const [installment, setInstallment] = useState({});
  const [installmentNote, setInstallmentNote] = useState("");
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    get(`ApplicationTransaction/Details/${id}`).then((res) => {
      setData(res);
      setTransactionLabel(res?.transactionStatus);
      setTransactionValue(res?.transactionStatusId);
      setNote(res?.transactionNote);
    });

    get(`TransactionStatusDD/Index`).then((res) => setTransaction(res));

    get(`ApplicationTransactionInstallment/Get/${id}`).then((res) => {
      setInstallment(res);
      // setInstallmentNote(res?.firstInstallmentNote);
      setFirstLabel(
        res?.firstInstallmentStatus == 1
          ? "Pending"
          : res?.firstInstallmentStatus == 2
          ? "Received"
          : "Rejected"
      );
      setFirstValue(res?.firstInstallmentStatus);

      setSecondLabel(
        res?.secondInstallmentStatus == 1
          ? "Pending"
          : res?.secondInstallmentStatus == 2
          ? "Received"
          : res?.secondInstallmentStatus == 3
          ? "Rejected"
          : "Select"
      );
      setSecondValue(res?.secondInstallmentStatus);

      setThirdLabel(
        res?.thirdInstallmentStatus == 1
          ? "Pending"
          : res?.thirdInstallmentStatus == 2
          ? "Received"
          : res?.thirdInstallmentStatus == 3
          ? "Rejected"
          : "Select"
      );
      setThirdValue(res?.thirdInstallmentStatus);
    });

    get(`InstallmentStatusDD/Index`).then((res) => {
      //
      setPayment(res);
    });
  }, [success]);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const closeModal2 = () => {
    setOpenModal2(false);
  };
  const closeModal3 = () => {
    setOpenModal3(false);
  };
  const closeModal4 = () => {
    setOpenModal4(false);
  };
  const closeModal5 = () => {
    setOpenModal5(false);
    setNote("");
    setNoteError("");
  };

  const transactionOptions = transaction?.map((tr) => ({
    label: tr?.name,
    value: tr?.id,
  }));

  const selectTransaction = (label, value) => {
    setTransactionLabel(label);
    setTransactionValue(value);
  };

  const installmentOptions = payment?.map((pay) => ({
    label: pay?.name,
    value: pay?.id,
  }));

  const select1stPayment = (label, value) => {
    setFirstLabel(label);
    setFirstValue(value);
  };
  const select2ndPayment = (label, value) => {
    setSecondLabel(label);
    setSecondValue(value);
  };
  const select3rdPayment = (label, value) => {
    setThirdLabel(label);
    setThirdValue(value);
  };

  const submit1 = (event) => {
    event.preventDefault();
    setProgress2(true);
    const subData = new FormData(event.target);

    put(`ApplicationTransactionInstallment/UpdateFirst`, subData).then(
      (res) => {
        setProgress2(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setOpenModal2(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    );
  };

  const submit2 = (event) => {
    event.preventDefault();
    setProgress3(true);
    const subData = new FormData(event.target);

    put(`ApplicationTransactionInstallment/UpdateSecond`, subData).then(
      (res) => {
        setProgress3(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setOpenModal3(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    );
  };

  const submit3 = (event) => {
    event.preventDefault();
    setProgress4(true);
    const subData = new FormData(event.target);

    put(`ApplicationTransactionInstallment/UpdateThird`, subData).then(
      (res) => {
        setProgress4(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setOpenModal4(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    );
  };

  const handleNote = (e) => {
    const str = e.target.value.trimStart();
    setNote(str);
    if (str === "") {
      setNoteError("Note is required");
    } else {
      setNoteError("");
    }
  };

  const submit4 = (event) => {
    setProgress(true);
    event.preventDefault();

    const subData = new FormData(event.target);

    if (!note) {
      setNoteError("Note is required");
    } else {
      put(`ApplicationTransaction/TransactionNote`, subData).then((res) => {
        setProgress(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setOpenModal5(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const updateTransactionStatus = (event) => {
    setProgress1(true);
    event.preventDefault();

    const subData = new FormData(event.target);
    setButtonStatus(true);
    put(`ApplicationTransaction/UpdateStatus`, subData).then((res) => {
      setProgress1(false);
      setButtonStatus(false);
      if (res?.status == 200) {
        if (res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setOpenModal(false);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    });
  };

  return (
    <div>
      <BreadCrumb
        title="Application Transaction Details"
        backTo="Application Transaction List"
        path={`/applicationTransaction`}
      />

      <div className="row">
        <div className="col-md-7">
          <Card>
            <CardBody>
              <p className="section-title">Basic Information</p>

              <Table className="table-bordered mt-4">
                <tbody>
                  <tr>
                    <td width="40%">
                      <b>Student:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.student}</>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>University:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.unviersity}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Course:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.subject}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Consultant:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.consultant}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Registration Status:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.registrationStatus}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Transaction Status:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.transactionStatus}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Account Intake:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.accountIntake}</>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      <b>Amount:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        £{data?.amount}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Modal
                isOpen={openModal5}
                toggle={closeModal5}
                className="uapp-modal2"
              >
                <ModalHeader>Transaction Note</ModalHeader>
                <ModalBody>
                  <Form onSubmit={submit4}>
                    <input
                      type="hidden"
                      name="id"
                      id="id"
                      value={installment?.applicationTransactionId}
                    />

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="2">
                        <span>
                          Note<span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="8">
                        <Input
                          type="textarea"
                          Row={6}
                          value={note}
                          onChange={(e) => {
                            handleNote(e);
                          }}
                          name="transactionNote"
                          id="transactionNote"
                        />
                        <span className="text-danger">{noteError}</span>
                      </Col>
                    </FormGroup>

                    <div className="row">
                      <div className="col-md-10">
                        <div className="d-flex justify-content-between">
                          <Button color="danger" onClick={closeModal5}>
                            Cancel
                          </Button>
                          <SaveButton text="Submit"></SaveButton>
                        </div>
                      </div>
                    </div>
                  </Form>
                </ModalBody>
              </Modal>
              {data?.transactionNote == null ? (
                <>
                  {permissions?.includes(
                    permissionList.Add_Transaction_Note
                  ) ? (
                    <Button color="primary" onClick={() => setOpenModal5(true)}>
                      <i className="fas fa-plus"></i>{" "}
                      <span className="ml-1">Add Note</span>
                    </Button>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="section-title">Note</p>

                      <span>{data?.transactionNote}</span>
                    </div>

                    <div>
                      {permissions?.includes(
                        permissionList.Add_Transaction_Note
                      ) ? (
                        <SpanButton
                          icon={
                            <i
                              style={{ cursor: "pointer" }}
                              className="fas fa-pencil-alt pencil-style"
                            ></i>
                          }
                          func={() => setOpenModal5(true)}
                          permission={6}
                        />
                      ) : null}
                    </div>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="col-md-5">
          <Card>
            <CardBody>
              <p className="section-title">Payment Authorization</p>
              <Table className="table-bordered mt-4">
                <tbody>
                  <tr>
                    <td width="40%">
                      <b>Transaction Status:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.transactionStatus}</>

                        <div className="d-flex justify-content-between">
                          {data?.transactionStatusId !== 2 && (
                            <>
                              {permissions?.includes(
                                permissionList.Update_Transaction_Status
                              ) ? (
                                <SpanButton
                                  icon={
                                    <i
                                      style={{ cursor: "pointer" }}
                                      className="fas fa-pencil-alt pencil-style"
                                    ></i>
                                  }
                                  func={() => setOpenModal(true)}
                                  permission={6}
                                />
                              ) : null}
                            </>
                          )}

                          {data?.transactionStatusId !== 2 && (
                            <Modal
                              isOpen={openModal}
                              toggle={closeModal}
                              className="uapp-modal2"
                            >
                              <ModalHeader>
                                Update Transaction Status
                              </ModalHeader>
                              <ModalBody>
                                <Form onSubmit={updateTransactionStatus}>
                                  <input
                                    type="hidden"
                                    name="applicationTransactionId"
                                    id="applicationTransactionId"
                                    value={data?.id}
                                  />

                                  <FormGroup
                                    row
                                    className="has-icon-left position-relative"
                                  >
                                    <Col md="5">
                                      <span>
                                        Transaction Status{" "}
                                        <span className="text-danger">*</span>{" "}
                                      </span>
                                    </Col>
                                    <Col md="7">
                                      <Select
                                        options={transactionOptions}
                                        value={{
                                          label: transactionLabel,
                                          value: transactionValue,
                                        }}
                                        onChange={(opt) =>
                                          selectTransaction(
                                            opt.label,
                                            opt.value
                                          )
                                        }
                                        name="transactionStatusId"
                                        id="transactionStatusId"
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

                                    <CustomButtonRipple
                                      color={"primary"}
                                      type={"submit"}
                                      className={"mr-1 mt-3"}
                                      name={
                                        progress1 ? <ButtonLoader /> : "Submit"
                                      }
                                      permission={6}
                                      isDisabled={buttonStatus}
                                    />

                                    {/* }  */}
                                  </FormGroup>
                                </Form>
                              </ModalBody>
                            </Modal>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td width="40%">
                      <b>Date:</b>
                    </td>

                    <td width="60%">
                      <div className="d-flex justify-content-between">
                        <>{data?.transactionDate}</>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="section-title">
                <b>University Installment</b>
              </p>

              {/* Installments */}

              <div className="hedding-titel d-flex justify-content-between mt-4">
                <p className="section-title">1st Installment</p>

                {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}

                {permissions?.includes(
                  permissionList?.Add_Transaction_Installment
                ) ? (
                  <>
                    {" "}
                    {installment?.firstInstallmentStatus == 1 ? (
                      <SpanButton
                        icon={
                          <i
                            style={{ cursor: "pointer" }}
                            className="fas fa-pencil-alt pencil-style"
                          ></i>
                        }
                        func={() => setOpenModal2(true)}
                        permission={6}
                      />
                    ) : null}
                  </>
                ) : null}
              </div>

              <div className="mt-3">
                {installment?.firstInstallmentStatus == 1 ? null : (
                  <>
                    {" "}
                    <b>Date: </b>{" "}
                    <span>
                      {" "}
                      {handleDate(installment?.firstInstallmentDate)}
                    </span>
                  </>
                )}
                <br />
                <b>Note: </b> <span> {installment?.firstInstallmentNote}</span>
                <br />
                <b>Status: </b>{" "}
                <span>
                  {" "}
                  {installment?.firstInstallmentStatus == 1
                    ? "Pending"
                    : installment?.firstInstallmentStatus == 2
                    ? "Received"
                    : installment?.firstInstallmentStatus == 3
                    ? "Rejected"
                    : null}
                </span>
                <Modal
                  isOpen={openModal2}
                  toggle={closeModal2}
                  className="uapp-modal2"
                >
                  <ModalHeader>Update Installment Status</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={submit1}>
                      <input
                        type="hidden"
                        name="applicationTransactionId"
                        id="applicationTransactionId"
                        value={installment?.applicationTransactionId}
                      />

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>
                            Installment Status{" "}
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="7">
                          <Select
                            options={installmentOptions}
                            value={{
                              label: firstLabel,
                              value: firstValue,
                            }}
                            onChange={(opt) =>
                              select1stPayment(opt.label, opt.value)
                            }
                            name="firstInstallmentStatus"
                            id="firstInstallmentStatus"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="5">
                          <span>Note </span>
                        </Col>
                        <Col md="7">
                          <Input
                            type="text"
                            name="firstInstallmentNote"
                            id="firstInstallmentNote"
                            placeholder="Enter Note"
                            defaultValue={installment?.firstInstallmentNote}
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
                          onClick={closeModal2}
                        >
                          Close
                        </Button>

                        <CustomButtonRipple
                          color={"primary"}
                          type={"submit"}
                          className={"mr-1 mt-3"}
                          name={progress2 ? <ButtonLoader /> : "Submit"}
                          permission={6}
                          isDisabled={buttonStatus}
                        />

                        {/* }  */}
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>

              {installment?.firstInstallmentStatus == 2 ? (
                <>
                  <div className="hedding-titel d-flex justify-content-between mt-4">
                    <div>
                      <h6>
                        {" "}
                        <b>2nd Installment</b>{" "}
                      </h6>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    {permissions?.includes(
                      permissionList?.Add_Transaction_Installment
                    ) ? (
                      <>
                        {" "}
                        {installment?.secondInstallmentStatus == 1 ? (
                          <SpanButton
                            icon={
                              <i
                                style={{ cursor: "pointer" }}
                                className="fas fa-pencil-alt pencil-style"
                              ></i>
                            }
                            func={() => setOpenModal3(true)}
                            permission={6}
                          />
                        ) : null}
                      </>
                    ) : null}
                  </div>

                  <div className="mt-3">
                    {installment?.secondInstallmentStatus == 1 ? null : (
                      <>
                        <b>Date: </b>{" "}
                        <span>
                          {" "}
                          {handleDate(installment?.secondInstallmentDate)}
                        </span>
                      </>
                    )}
                    <br />
                    <b>Note: </b>{" "}
                    <span> {installment?.secondInstallmentNote}</span>
                    <br />
                    <b>Status: </b>{" "}
                    <span>
                      {" "}
                      {installment?.secondInstallmentStatus == 1
                        ? "Pending"
                        : installment?.firstInstallmentStatus == 2
                        ? "Received"
                        : installment?.secondInstallmentStatus == 3
                        ? "Rejected"
                        : null}
                    </span>
                    <Modal
                      isOpen={openModal3}
                      toggle={closeModal3}
                      className="uapp-modal2"
                    >
                      <ModalHeader>Update Installment Status</ModalHeader>
                      <ModalBody>
                        <Form onSubmit={submit2}>
                          <input
                            type="hidden"
                            name="applicationTransactionId"
                            id="applicationTransactionId"
                            value={installment?.applicationTransactionId}
                          />

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="4">
                              <span>
                                Installment Status{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="8">
                              <Select
                                options={installmentOptions}
                                value={{
                                  label: secondLabel,
                                  value: secondValue,
                                }}
                                onChange={(opt) =>
                                  select2ndPayment(opt.label, opt.value)
                                }
                                name="secondInstallmentStatus"
                                id="secondInstallmentStatus"
                              />
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="4">
                              <span>
                                Note <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="8">
                              <Input
                                type="text"
                                name="secondInstallmentNote"
                                id="secondInstallmentNote"
                                placeholder="Enter Note"
                                defaultValue={
                                  installment?.secondInstallmentNote
                                }
                                required
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
                              onClick={closeModal3}
                            >
                              Close
                            </Button>

                            <CustomButtonRipple
                              color={"primary"}
                              type={"submit"}
                              className={"mr-1 mt-3"}
                              name={progress3 ? <ButtonLoader /> : "Submit"}
                              permission={6}
                              isDisabled={buttonStatus}
                            />

                            {/* }  */}
                          </FormGroup>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </div>
                </>
              ) : null}

              {installment?.secondInstallmentStatus == 2 ? (
                <>
                  <div className="hedding-titel d-flex justify-content-between mt-4">
                    <div>
                      <h6>
                        {" "}
                        <b>3rd Installment</b>{" "}
                      </h6>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                    {permissions?.includes(
                      permissionList.Add_Transaction_Installment
                    ) ? (
                      <>
                        {installment?.thirdInstallmentStatus == 1 ? (
                          <SpanButton
                            icon={
                              <i
                                style={{ cursor: "pointer" }}
                                className="fas fa-pencil-alt pencil-style"
                              ></i>
                            }
                            func={() => setOpenModal4(true)}
                            permission={6}
                          />
                        ) : null}
                      </>
                    ) : null}
                  </div>

                  <div className="mt-3">
                    {installment?.thirdInstallmentStatus == 1 ? null : (
                      <>
                        {" "}
                        <b>Date: </b>{" "}
                        <span>
                          {" "}
                          {handleDate(installment?.thirdInstallmentDate)}
                        </span>
                      </>
                    )}
                    <br />
                    <b>Note: </b>{" "}
                    <span> {installment?.thirdInstallmentNote}</span>
                    <br />
                    <b>Status: </b>{" "}
                    <span>
                      {" "}
                      {installment?.thirdInstallmentStatus == 1
                        ? "Pending"
                        : installment?.thirdInstallmentStatus == 2
                        ? "Received"
                        : installment?.thirdInstallmentStatus == 3
                        ? "Rejected"
                        : null}
                    </span>
                    <Modal
                      isOpen={openModal4}
                      toggle={closeModal4}
                      className="uapp-modal2"
                    >
                      <ModalHeader>Update Installment Status</ModalHeader>
                      <ModalBody>
                        <Form onSubmit={submit3}>
                          <input
                            type="hidden"
                            name="applicationTransactionId"
                            id="applicationTransactionId"
                            value={installment?.applicationTransactionId}
                          />

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="4">
                              <span>
                                Installment Status{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="8">
                              <Select
                                options={installmentOptions}
                                value={{
                                  label: thirdLabel,
                                  value: thirdValue,
                                }}
                                onChange={(opt) =>
                                  select3rdPayment(opt.label, opt.value)
                                }
                                name="thirdInstallmentStatus"
                                id="thirdInstallmentStatus"
                              />
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="4">
                              <span>
                                Note <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="8">
                              <Input
                                type="text"
                                name="thirdInstallmentNote"
                                id="thirdInstallmentNote"
                                placeholder="Enter Note"
                                defaultValue={installment?.thirdInstallmentNote}
                                required
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
                              onClick={closeModal4}
                            >
                              Close
                            </Button>

                            <CustomButtonRipple
                              color={"primary"}
                              type={"submit"}
                              className={"mr-1 mt-3"}
                              name={progress4 ? <ButtonLoader /> : "Submit"}
                              permission={6}
                              isDisabled={buttonStatus}
                            />

                            {/* }  */}
                          </FormGroup>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </div>
                </>
              ) : null}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Details;
