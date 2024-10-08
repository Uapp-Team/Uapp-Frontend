import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
} from "reactstrap";
import Select from "react-select";

import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";

import get from "../../../../helpers/get";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ButtonLoader from "../../Components/ButtonLoader";
import SelfFunded from "../../STUDENT/StudentsAllInformation/StudentFundingInformation/Component/SelfFunded";
import FamilyFunded from "../../STUDENT/StudentsAllInformation/StudentFundingInformation/Component/FamilyFunded";
import StudentLoanCompany from "../../STUDENT/StudentsAllInformation/StudentFundingInformation/Component/StudentLoanCompany";
import BankLoan from "../../STUDENT/StudentsAllInformation/StudentFundingInformation/Component/BankLoan";
import Scholarship from "../../STUDENT/StudentsAllInformation/StudentFundingInformation/Component/Scholarship";
import GovernmentLoan from "../SourceOfFunds/GovernmentLoan";
import GovernmentFundingAssesment from "../../STUDENT/StudentsAllInformation/StudentFundingInformation/Component/GovernmentFundingAssesment";

const SourceofFundForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [progress, setProgress] = useState(false);

  const [applicationInformation, setApplicationInformation] = useState({});
  const [activetab, setActivetab] = useState("1");
  const [appliedStudentFinance, setIsAppliedStudentFinance] = useState("false");
  const [applyingFromInside, setIsApplyingFromInside] = useState("false");
  const [
    isStayedOutsideUKInLastThreeYears,
    setIsStayedOutsideUkInLastThreeYears,
  ] = useState("false");
  const [preSettlementStatus, setPresettlementStatus] = useState("false");
  const [studentType, setStudentType] = useState([]);
  const [studentTypeLabel, setStudentTypeLabel] = useState(
    "Select Student Type"
  );
  const [studentTypeValue, setStudentTypeValue] = useState(0);
  const [dateOfMoveToUk, setDateOfMoveToUk] = useState("");
  const [financeDetails, setFinanceDetails] = useState("");

  const [success, setSuccess] = useState(false);

  const [visaStatus, setVisaStatus] = useState([]);
  const [visaStatusLabel, setVisaStatusLabel] = useState("Select Visa Status");
  const [visaStatusValue, setVisaStatusValue] = useState(0);
  const [code, setCode] = useState("");

  const [visaError, setVisaError] = useState(false);

  const [applicationId, setApplicationId] = useState(0);

  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);

  // Update NEw Infos
  const [fund, setFund] = useState([]);
  const [fundLabel, setFundLabel] = useState("Select Fund Type");
  const [fundValue, setFundValue] = useState(0);
  const [selfError, setSelfError] = useState("");
  const [familyError, setFamilyError] = useState("");
  const [sLoanError, setSLoanError] = useState("");
  const [bLoanError, setBLoanError] = useState("");
  const [scholarshipError, setScholarshipError] = useState("");
  const [govtError, setGovtError] = useState("");

  const [fundError, setFundError] = useState("");

  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);

  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [FileList2, setFileList2] = useState([]);

  const [previewVisible3, setPreviewVisible3] = useState(false);
  const [previewImage3, setPreviewImage3] = useState("");
  const [previewTitle3, setPreviewTitle3] = useState("");
  const [FileList3, setFileList3] = useState([]);

  const [previewVisible4, setPreviewVisible4] = useState(false);
  const [previewImage4, setPreviewImage4] = useState("");
  const [previewTitle4, setPreviewTitle4] = useState("");
  const [FileList4, setFileList4] = useState([]);

  const [previewVisible5, setPreviewVisible5] = useState(false);
  const [previewImage5, setPreviewImage5] = useState("");
  const [previewTitle5, setPreviewTitle5] = useState("");
  const [FileList5, setFileList5] = useState([]);

  useEffect(() => {
    get(`SourceOfFundDD/Index`).then((res) => {
      setFund(res);
    });
  }, []);

  const styleLabelBold = {
    // fontWeight: "bold"
  };

  // on change radio button

  const handleChangeIsAppliedStudentFinance = (event) => {
    setIsAppliedStudentFinance(event.target.value);
  };

  const handleChangeIsApplyingFromInside = (event) => {
    setIsApplyingFromInside(event.target.value);
  };

  const handleChangeIsStayedoutsideUkInLastThreeYears = (event) => {
    setIsStayedOutsideUkInLastThreeYears(event.target.value);
  };

  const handlePreSettlementStatus = (event) => {
    setPresettlementStatus(event.target.value);
  };

  //  Dynamic1  COde Start

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase641(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setSelfError("");
  };

  // Dynamic1  code end

  //  Dynamic2  COde Start

  function getBase642(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel2 = () => {
    setPreviewVisible2(false);
  };

  const handlePreview2 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase642(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage2(file.url || file.preview);
    setPreviewVisible2(true);
    setPreviewTitle2(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
    setSelfError("");
  };

  // Dynamic2  code end

  //  Dynamic3  COde Start

  function getBase643(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel3 = () => {
    setPreviewVisible3(false);
  };

  const handlePreview3 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase643(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage3(file.url || file.preview);
    setPreviewVisible3(true);
    setPreviewTitle3(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange3 = ({ fileList }) => {
    setFileList3(fileList);
    setSLoanError("");
  };

  // Dynamic3  code end

  //  Dynamic4  COde Start

  function getBase644(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel4 = () => {
    setPreviewVisible4(false);
  };

  const handlePreview4 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase644(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage4(file.url || file.preview);
    setPreviewVisible4(true);
    setPreviewTitle4(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange4 = ({ fileList }) => {
    setFileList4(fileList);
    setBLoanError("");
  };

  // Dynamic4  code end

  //  Dynamic5  COde Start

  function getBase645(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel5 = () => {
    setPreviewVisible5(false);
  };

  const handlePreview5 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase645(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage5(file.url || file.preview);
    setPreviewVisible5(true);
    setPreviewTitle5(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange5 = ({ fileList }) => {
    setFileList5(fileList);
    setScholarshipError("");
  };

  // Dynamic5  code end

  const studentTypeName = studentType?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  const selectFund = (label, value) => {
    setFundError("");
    setSelfError("");
    setFamilyError("");
    setSLoanError("");
    setBLoanError("");
    setScholarshipError("");
    setGovtError("");
    setFundLabel(label);
    setFundValue(value);
  };

  const fundOptions = fund?.map((f) => ({
    label: f.name,
    value: f.id,
  }));

  // select  Student type
  const selectStudentType = (label, value) => {
    setStudentTypeLabel(label);
    setStudentTypeValue(value);
  };

  const visaStatusName = visaStatus?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  const selectVisaStatus = (label, value) => {
    setVisaStatusLabel(label);
    setVisaStatusValue(value);
    setVisaError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    if (fundValue == 1) {
      subData.append("selfFundedFile", FileList1[0]?.originFileObj);
    } else if (fundValue == 2) {
      subData.append("familyFundedFile", FileList2[0]?.originFileObj);
    } else if (fundValue == 3) {
      subData.append("studentLoanCompanyFile", FileList3[0]?.originFileObj);
    } else if (fundValue == 4) {
      subData.append("bankLoanFile", FileList4[0]?.originFileObj);
    } else if (fundValue == 6) {
      subData.append("bankLoanFile", FileList5[0]?.originFileObj);
    } else if (fundValue == 0) {
      setFundError("Fund is required");
    } else if (fundValue == 1 && FileList1?.length < 1) {
      setSelfError("Attachment is required");
    } else if (fundValue == 2 && FileList2?.length < 1) {
      setFamilyError("Attachment is required");
    } else if (fundValue == 3 && FileList3?.length < 1) {
      setSLoanError("Attachment is required");
    } else if (fundValue == 4 && FileList4?.length < 1) {
      setBLoanError("Attachment is required");
    } else if (fundValue == 6 && FileList5?.length < 1) {
      setScholarshipError("Attachment is required");
    } else {
      setButtonStatus(true);
      setProgress(true);
      if (fundValue == 1) {
        post(`SelfFunded/Create`, subData).then((res) => {
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/studentEducation/${id}`);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else if (fundValue == 2) {
        post(`FamilyFunded/Create`, subData).then((res) => {
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/studentEducation/${id}`);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else if (fundValue == 3) {
        post(`StudentLoanCompany/Create`, subData).then((res) => {
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/studentEducation/${id}`);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else if (fundValue == 4) {
        post(`BankLoan/Create`, subData).then((res) => {
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/studentEducation/${id}`);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else if (fundValue == 5) {
        post(`GovernmentLoanFund/Create`, subData).then((res) => {
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/studentEducation/${id}`);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else if (fundValue == 6) {
        post(`Scholarship/Create`, subData).then((res) => {
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/studentEducation/${id}`);
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Source of Fund Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white"> 14% Completed</span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <div className="test-score-div-1-style mt-1 mb-4">
            <span className="test-score-span-1-style">
              <b>Specify details on student funding</b>
            </span>
            <br />
            <div>
              Provide details on how student will fund the educational cost.
            </div>
          </div>

          <FormGroup row className="has-icon-left position-relative">
            <Col md="2">
              <span>
                Source Of Fund <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="6">
              <Select
                options={fundOptions}
                value={{ label: fundLabel, value: fundValue }}
                onChange={(opt) => selectFund(opt.label, opt.value)}
                name="sourceOfFundId"
                id="sourceOfFundId"
                required
              />
              <span className="text-danger">{fundError}</span>
            </Col>
          </FormGroup>

          {fundValue == 1 ? (
            <SelfFunded destination={"register"} studentid={id} />
          ) : fundValue == 2 ? (
            <FamilyFunded destination={"register"} studentid={id} />
          ) : fundValue == 3 ? (
            <StudentLoanCompany destination={"register"} studentid={id} />
          ) : fundValue == 4 ? (
            <BankLoan destination={"register"} studentid={id} />
          ) : fundValue == 5 ? (
            <GovernmentFundingAssesment
              destination={"register"}
              studentid={id}
            />
          ) : fundValue == 6 ? (
            <Scholarship destination={"register"} studentid={id} />
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default SourceofFundForm;
