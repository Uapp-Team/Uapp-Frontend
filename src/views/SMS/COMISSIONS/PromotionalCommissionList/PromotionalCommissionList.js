import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Col,
  Table,
  ButtonGroup,
} from "reactstrap";
import moment from "moment";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import Select from "react-select";
import post from "../../../../helpers/post";
import ButtonForFunction from "../../Components/ButtonForFunction";
import remove from "../../../../helpers/remove";
import put from "../../../../helpers/put";
import PromotionalCommissionForm from "./Component/PromotionalCommissionForm";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import { currentDate } from "../../../../components/date/calenderFormate";

const PromotionalCommissionList = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [university, setUniversity] = useState([]);
  const [universityLabel, setUniversityLabel] = useState("Select University");
  const [universityValue, setUniversityValue] = useState(0);
  const [intake, setIntake] = useState([]);
  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [commission, setCommission] = useState([]);
  const [commissionLabel, setCommissionLabel] = useState("Select Commission");
  const [commissionValue, setCommissionvalue] = useState(0);
  const [uniError, setUniError] = useState("");
  const [intakeError, setIntakeError] = useState("");
  const [commissionError, setCommissionError] = useState("");
  const [promotion, setPromotion] = useState([]);
  const [currDeleteData, setCurrDeleteData] = useState({});
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({});
  const [date, setDate] = useState(currentDate);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [min, setMin] = useState("");
  const [minError, setMinError] = useState("");
  const [dateError, setDateError] = useState("");
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    get(`PromotionalCommission/Index`).then((res) => {
      setPromotion(res);
    });

    get(`UniversityDD/Index`).then((res) => {
      setUniversity(res);
    });

    get(`AccountIntake/Index`).then((res) => {
      setIntake(res);
    });

    get(`CommissionGroupDD/Index`).then((res) => {
      setCommission(res);
    });
  }, [success]);

  const uniOptions = university?.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const selectUniversity = (label, value) => {
    setUniError("");
    setUniversityLabel(label);
    setUniversityValue(value);
  };

  const accountIntakeOptions = intake?.map((acc) => ({
    label: acc?.intakeName,
    value: acc?.id,
  }));

  const selectAccountIntake = (label, value) => {
    setIntakeError("");
    setIntakeLabel(label);
    setIntakeValue(value);
  };

  const commissionGroupOptions = commission?.map((com) => ({
    label: com?.name,
    value: com?.id,
  }));

  const selectCommissionGroup = (label, value) => {
    setCommissionError("");
    setCommissionLabel(label);
    setCommissionvalue(value);
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const closeModal = () => {
    setModalOpen(false);
    setUniversityLabel("Select University");
    setUniversityValue(0);
    setIntakeLabel("Select Intake");
    setIntakeValue(0);
    setCommissionLabel("Select Commission");
    setCommissionvalue(0);
    setMin("");
    setAmount("");
    setDate("");
    setMinError("");
    setUniError("");
    setIntakeError("");
    setCommissionError("");
    setDateError("");
    setAmountError("");
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const handleUpdate = (data) => {
    setUpdate(true);
    setData(data);

    get(`PromotionalCommission/Get/${data?.id}`).then((res) => {
      setUniversityLabel(res?.university?.name);
      setUniversityValue(res?.universityId);
      setIntakeValue(res?.accountIntakeId);
      setIntakeLabel(res?.accountIntake?.intakeName);
      setDate(res?.startFrom);
      res?.startFrom !== "0001-01-01T00:00:00"
        ? setDate(moment(new Date(res?.startFrom)).format("YYYY-MM-DD"))
        : setDate(currentDate);
      setAmount(res?.commissionAmount);
      setCommissionvalue(res?.commissionGroupId);
      setCommissionLabel(
        commission?.find((com) => com?.id == res?.commissionGroupId)?.name
      );
      setMin(res?.minumumStudentRequirement);
      setModalOpen(true);
    });
  };

  const toggleDanger = (data) => {
    setCurrDeleteData(data);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    remove(`PromotionalCommission/Delete/${currDeleteData?.id}`).then((res) => {
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      setDeleteModal(false);
    });
  };

  const handleMin = (e) => {
    setMin(e.target.value);
    if (e.target.value === "") {
      setMinError("Minimum Student Requirement is required");
    } else {
      setMinError("");
    }
  };

  const handleDate = (e) => {
    setDate(e.target.value);
    if (e.target.value === "") {
      setDateError("Start Date is required");
    } else {
      setDateError("");
    }
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    if (e.target.value === "") {
      setAmountError("Commission Amount is required");
    } else {
      setAmountError("");
    }
  };

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (!min) {
      isFormValid = false;
      setMinError("Minimum Student Requirement is required");
    }

    if (universityValue === 0) {
      isFormValid = false;
      setUniError("University Must be Selected");
    }
    if (intakeValue === 0) {
      isFormValid = false;
      setIntakeError("Account Intake Must be Selected");
    }
    if (commissionValue === 0) {
      isFormValid = false;
      setCommissionError("Commission Group is required");
    }
    if (!amount) {
      isFormValid = false;
      setAmountError("Commission Amount is required");
    }
    if (!new Date(date).getDate()) {
      isFormValid = false;
      setDateError("Start Date is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm();
    if (formIsValid) {
      if (!update) {
        post(`PromotionalCommission/Create`, subData).then((res) => {
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setModalOpen(false);
            setCommissionLabel("Select Commission Group");
            setCommissionvalue(0);
            setIntakeLabel("Select Account Intake");
            setIntakeValue(0);
            setUniversityLabel("Select University");
            setUniversityValue(0);
            setMin("");
            setAmount("");
            setDate("");
          }
        });
      } else {
        put(`PromotionalCommission/Update`, subData).then((res) => {
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setModalOpen(false);
            setCommissionLabel("Select Commission Group");
            setCommissionvalue(0);
            setIntakeLabel("Select Account Intake");
            setIntakeValue(0);
            setUniversityLabel("Select University");
            setUniversityValue(0);
            setMin("");
            setAmount("");
            setDate("");
            setUpdate(false);
          }
        });
      }
    }
  };

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
        <ModalHeader>Add Promotional Commission</ModalHeader>
        <ModalBody>
          <PromotionalCommissionForm
            handleSubmit={handleSubmit}
            update={update}
            data={data}
            uniOptions={uniOptions}
            universityLabel={universityLabel}
            universityValue={universityValue}
            selectUniversity={selectUniversity}
            uniError={uniError}
            min={min}
            handleDate={handleDate}
            date={date}
            accountIntakeOptions={accountIntakeOptions}
            selectAccountIntake={selectAccountIntake}
            intakeError={intakeError}
            intakeLabel={intakeLabel}
            intakeValue={intakeValue}
            amount={amount}
            commissionError={commissionError}
            commissionGroupOptions={commissionGroupOptions}
            commissionLabel={commissionLabel}
            commissionValue={commissionValue}
            selectCommissionGroup={selectCommissionGroup}
            handleMin={handleMin}
            minError={minError}
            dateError={dateError}
            handleAmount={handleAmount}
            amountError={amountError}
            closeModal={closeModal}
            progress={progress}
            buttonStatus={buttonStatus}
          ></PromotionalCommissionForm>
        </ModalBody>
      </Modal>

      <BreadCrumb title="Promotional Commission List" backTo="" path="/" />

      <Card className="uapp-employee-search">
        <CardHeader>
          {/* <div className=''> */}
          <Button className="btn btn-uapp-add" onClick={openModal}>
            <i className="fas fa-plus"></i> Add Promotional Commission
          </Button>

          <div>
            {" "}
            <b>
              {" "}
              Total{" "}
              <span className="badge badge-primary">
                {promotion?.length}
              </span>{" "}
              Promotional Commission Found{" "}
            </b>
          </div>
          {/* </div> */}
        </CardHeader>

        <CardBody className="search-card-body">
          <div className="table-responsive">
            <Table className="table-sm table-bordered">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Account Intake</th>
                  <th>University</th>
                  <th>Commission Amount</th>
                  <th>Commission Group</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {promotion?.map((prom, i) => (
                  <tr key={i} style={{ textAlign: "center" }}>
                    <th scope="row">{i + 1}</th>
                    <td>{prom?.accountIntake?.intakeName}</td>

                    <td>{prom?.university?.name}</td>

                    <td>{prom?.commissionAmount}</td>

                    <td>
                      {
                        commission?.find(
                          (p) => p?.id == prom?.commissionGroupId
                        )?.name
                      }
                    </td>

                    <td className="text-center">
                      <ButtonGroup variant="text">
                        <ButtonForFunction
                          icon={<i className="fas fa-edit"></i>}
                          color={"warning"}
                          className={"mx-1 btn-sm"}
                          func={() => handleUpdate(prom)}
                        />

                        <ButtonForFunction
                          icon={<i className="fas fa-trash-alt"></i>}
                          color={"danger"}
                          className={"mx-1 btn-sm"}
                          func={() => toggleDanger(prom)}
                        />
                      </ButtonGroup>
                      <ConfirmModal
                        text="Do You Want To Delete This Promotional Commission ? Once Deleted it can't be Undone!"
                        isOpen={deleteModal}
                        toggle={() => setDeleteModal(!deleteModal)}
                        confirm={handleDeleteData}
                        cancel={() => setDeleteModal(false)}
                      />
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

export default PromotionalCommissionList;
