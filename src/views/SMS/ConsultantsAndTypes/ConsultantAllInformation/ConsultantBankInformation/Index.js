import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody } from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import ConsultantNavigation from "../NavigationAndRegistration/ConsultantNavigation";
import put from "../../../../../helpers/put";
import remove from "../../../../../helpers/remove";
import BankInformationForm from "./Component/BankInformationForm";
import BankDetailsCard from "./Component/BankDetailsCard";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { userTypes } from "../../../../../constants/userTypeConstant";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ConsultantBankDetails = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { consultantRegisterId } = useParams();
  const [bankDetailsData, setBankDetailsData] = useState([]);
  const [fetchedData, setFetchedData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const activetab = "6";
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [navVisibility, setNavVisibility] = useState({});
  const [bankName, setBankName] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [shortCodeError, setShortCodeError] = useState("");
  const history = useHistory();
  const userTypeId = localStorage.getItem("userType");
  const [isDefault, setIsDefault] = useState(false);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get(`BankDetails/Index/${consultantRegisterId}`).then((res) => {
      setBankDetailsData(res);
    });

    get(`ConsultantNavBar/Get/${consultantRegisterId}`).then((res) => {
      console.log("consNav", res);
      setNavVisibility(res);
    });
  }, [success, consultantRegisterId]);

  const toggleDanger = (p) => {
    setDeleteData(p);
    setDeleteModal(true);
  };

  const addNewData = () => {
    setShowForm(true);
    setFetchedData({});
  };
  const removeNewData = () => {
    setShowForm(false);
  };

  // on Close Modal
  const closeModal = () => {
    setIsEdit(false);
    setFetchedData({});
  };

  const handleEdit = (data) => {
    setIsEdit(true);
    get(`BankDetails/Get/${data?.id}`).then((res) => {
      setFetchedData(res);
      setAccountName(res?.accountName);
      setAccountNumber(res?.accountNumber);
      setBankName(res?.bankName);
      setShortCode(res?.sortCode);
      setIsDefault(res?.isDefault);
    });
  };

  const goPrevious = () => {
    history.push(`/consultantEligibilityInformation/${consultantRegisterId}`);
  };
  const goForward = () => {
    if (navVisibility?.recruitment === true) {
      history.push(`/consultantRecruitmentInformation/${consultantRegisterId}`);
    } else if (userTypeId === userTypes?.Consultant.toString()) {
      history.push(`/consultantTermsInformation/${consultantRegisterId}`);
    } else {
      history.push(`/consultantCommissionInformation/${consultantRegisterId}`);
    }
  };

  //  Update Bank Details
  const handleSubmitUpdate = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (ValidateForm()) {
      setButtonStatus(true);
      setProgress(true);
      put("BankDetails/Update", subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setFetchedData({});
        setAccountName("");
        setAccountNumber("");
        setBankName("");
        setShortCode("");
        setIsEdit(false);
        setSuccess(!success);
      });
    }
  };

  // Delete Bank Details
  const handleDeletePermission = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`BankDetails/Delete/${deleteData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const handleBankName = (e) => {
    let data = e.target.value.trimStart();
    setBankName(data);
    if (data === "") {
      setBankNameError("Bank name is required");
    } else {
      setBankNameError("");
    }
  };
  const handleAccountName = (e) => {
    let data = e.target.value.trimStart();
    setAccountName(data);
    if (data === "") {
      setAccountNameError("Account Holder name is required");
    } else {
      setAccountNameError("");
    }
  };
  const handleAccountNumber = (e) => {
    let data = e.target.value.trimStart();
    setAccountNumber(data);
    if (data === "") {
      setAccountNumberError("Account number is required");
    } else {
      setAccountNumberError("");
    }
  };
  const handleShortCode = (e) => {
    let data = e.target.value.trimStart();
    setShortCode(data);
    if (data.length > 6) {
      setShortCodeError("Sort Code is not more than 6 digit");
    } else {
      setShortCodeError("");
    }
  };

  const ValidateForm = () => {
    var isValid = true;

    if (!bankName) {
      isValid = false;
      setBankNameError("Bank name is required");
    }
    if (!accountName) {
      isValid = false;
      setAccountNameError("Account Holder name is required");
    }
    if (!accountNumber) {
      isValid = false;
      setAccountNumberError("Account number is required");
    }
    // if (!shortCode) {
    //   isValid = false;
    //   setShortCodeError("Sort Code is required");
    // }

    if (shortCode?.length > 6) {
      isValid = false;
      setShortCodeError("Sort Code is not more than 6 digit");
    }
    return isValid;
  };

  // Post Bank Details
  const handleSubmit = (event) => {
    console.log("object");
    event.preventDefault();
    const subData = new FormData(event.target);

    if (ValidateForm()) {
      setButtonStatus(true);
      setProgress(true);
      post("BankDetails/Create", subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status === 200) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFetchedData({});
          setAccountName("");
          setAccountNumber("");
          setBankName("");
          setShortCode("");
          setShowForm(false);
          setSuccess(!success);
        }
      });
    }
  };
  console.log(navVisibility);
  return (
    <div>
      <BreadCrumb
        title="Consultant Bank Information"
        backTo={userType === userTypes?.Consultant ? null : "Consultant"}
        path={`/consultantList`}
      />

      <ConsultantNavigation
        consultantId={consultantRegisterId}
        activetab={activetab}
        navVisibility={navVisibility}
        success={success}
      />
      <Card>
        <CardBody>
          {bankDetailsData.map((details) => (
            <div className="row mx-2 mb-3">
              <div className="col-12 border p-2 rounded" key={details?.id}>
                <BankDetailsCard
                  isDefault={isDefault}
                  details={details}
                  handleEdit={handleEdit}
                  toggleDanger={toggleDanger}
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  handleDeletePermission={handleDeletePermission}
                  buttonStatus={buttonStatus}
                  progress={progress}
                />
              </div>
            </div>
          ))}

          {permissions?.includes(permissionList?.Edit_Consultant) && (
            <>
              {!showForm && bankDetailsData?.length > 0 ? (
                <button
                  id="bank-details"
                  className="add-button mb-4"
                  onClick={addNewData}
                  permission={6}
                >
                  Add Bank details
                </button>
              ) : null}
            </>
          )}

          {bankDetailsData?.length < 1 || showForm || isEdit ? (
            <div className=" mx-2">
              <BankInformationForm
                handleSubmit={isEdit ? handleSubmitUpdate : handleSubmit}
                fetchedData={fetchedData}
                consultantRegisterId={consultantRegisterId}
                progress={progress}
                handleBankName={handleBankName}
                bankNameError={bankNameError}
                handleAccountName={handleAccountName}
                accountNameError={accountNameError}
                handleAccountNumber={handleAccountNumber}
                accountNumberError={accountNumberError}
                handleShortCode={handleShortCode}
                shortCodeError={shortCodeError}
                buttonStatus={buttonStatus}
                bankDetailsData={bankDetailsData}
                bankName={bankName}
                accountName={accountName}
                accountNumber={accountNumber}
                shortCode={shortCode}
                cancel={isEdit ? closeModal : removeNewData}
                isDefault={isDefault}
                setIsDefault={setIsDefault}
              ></BankInformationForm>
            </div>
          ) : null}

          <div className="d-flex justify-content-between mt-5">
            <PreviousButton action={goPrevious} />
            <SaveButton text="Next" action={goForward} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ConsultantBankDetails;
