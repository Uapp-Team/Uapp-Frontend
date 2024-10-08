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
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
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
import HomeStudent from "../../STUDENT/CommonApplicationComponents/HomeStudent";
import InternationalStudent from "../../STUDENT/CommonApplicationComponents/InternationalStudent";
import EUStudent from "../../STUDENT/CommonApplicationComponents/EUStudent";

const StudentApplicationForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [progress, setProgress] = useState(false);

  const [applicationInformation, setApplicationInformation] = useState({});
  const [activetab, setActivetab] = useState("1");
  const [homeOne, setHomeOne] = useState("");
  const [homeTwo, setHomeTwo] = useState("");
  const [intOne, setIntOne] = useState("");
  const [intTwo, setIntTwo] = useState("");
  const [intThree, setIntThree] = useState("");
  const [intFour, setIntFour] = useState("");
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

  const [euOne, setEuOne] = useState("");
  const [euTwo, setEuTwo] = useState("");
  const [euThree, setEuThree] = useState("");
  const [euFour, setEuFour] = useState("");

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

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);

  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [FileList2, setFileList2] = useState([]);

  useEffect(() => {
    get("StudentTypeDD/Index").then((res) => {
      setStudentType(res);
    });

    get(`SourceOfFundDD/Index`).then((res) => {
      setFund(res);
    });

    get("VisaTypeDD/Index").then((res) => {
      setVisaStatus(res);
    });

    get(`ApplicationInfo/GetByStudentId/${id}`).then((res) => {
      console.log(res);
      setApplicationInformation(res);
      setStudentTypeLabel(res?.studentType?.name);
      setStudentTypeValue(res?.studentType?.id);
    });
  }, []);

  // Trial start

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    // if(fileList.length > 0 && fileList[0]?.type !== 'image/jpeg' && fileList[0]?.type !== 'image/jpg' && fileList[0]?.type !== 'image/png'){
    //   setFileList([]);
    //   setError('Only jpeg, jpg, png image is allowed');
    // }
    // else{
    setFileList(fileList);

    // }
  };

  // Trial End

  // Trial2 start

  const handleCancel2 = () => {
    setPreviewVisible2(false);
  };

  const handlePreview2 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange2 = ({ fileList }) => {
    // if(fileList.length > 0 && fileList[0]?.type !== 'image/jpeg' && fileList[0]?.type !== 'image/jpg' && fileList[0]?.type !== 'image/png'){
    //   setFileList([]);
    //   setError('Only jpeg, jpg, png image is allowed');
    // }
    // else{
    setFileList2(fileList);

    // }
  };

  // Trial2 End

  const styleLabelBold = {
    // fontWeight: "bold"
  };

  // on change radio button

  //   const handleChangeIsAppliedStudentFinance = (event) => {

  //     setIsAppliedStudentFinance(event.target.value)
  // }

  const home1Function = (event) => {
    setHomeOne(event.target.value);
  };

  const eu1Function = (event) => {
    setEuOne(event.target.value);
  };

  const eu2Function = (event) => {
    setEuTwo(event.target.value);
  };

  const eu3Function = (event) => {
    setEuThree(event.target.value);
  };

  const eu4Function = (event) => {
    setEuFour(event.target.value);
  };

  const home2Function = (event) => {
    setHomeTwo(event.target.value);
  };

  const Int1Function = (event) => {
    setIntOne(event.target.value);
  };

  const Int2Function = (event) => {
    setIntTwo(event.target.value);
  };

  const Int3Function = (event) => {
    setIntThree(event.target.value);
  };

  const Int4Function = (event) => {
    setIntFour(event.target.value);
  };

  //   const handleChangeIsApplyingFromInside = (event) => {

  //     setIsApplyingFromInside(event.target.value);
  // }

  //   const handleChangeIsStayedoutsideUkInLastThreeYears = (event) => {

  //     setIsStayedOutsideUkInLastThreeYears(event.target.value);
  // }

  //   const handlePreSettlementStatus = (event) => {

  //     setPresettlementStatus(event.target.value);
  // }

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
    subData.append("RefusalLetterForUKVisaFile", FileList[0]?.originFileObj);
    subData.append(
      "RefusalLetterForOtherVisaFile",
      FileList2[0]?.originFileObj
    );

    setButtonStatus(true);
    setProgress(true);

    post("ApplicationInfo/Submit", subData).then((res) => {
      setProgress(false);
      setButtonStatus(false);

      if (res?.status == 200) {
        if (res?.data?.isSuccess == true) {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push(`/studentSourceofFund/${id}`);
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
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Application Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white"> 12% Completed</span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <div className="test-score-div-1-style mt-1 mb-4">
            <span className="test-score-span-1-style">
              <b>Please provide the information bellow</b>
            </span>
            <br />
            <div>
              We need to know in details about application informations.
            </div>
          </div>

          {/* <FormGroup row className="has-icon-left position-relative">
                <Col md="4">
                  <span>
                    Student Type <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                <Select
                    options={studentTypeName}
                    value={{ label: studentTypeLabel, value: studentTypeValue }}
                    onChange={(opt) => selectStudentType(opt.label, opt.value)}
                    name="studentTypeId"
                    id="studentTypeId"
                    required

                  />

                  
                </Col>
              </FormGroup> */}

          {studentTypeLabel == "Home" ? (
            <HomeStudent
              applicationStudentId={id}
              studentTypeValue={studentTypeValue}
              destination={"register"}
            />
          ) : //          <>

          //       <FormGroup row className="has-icon-left position-relative">
          //       <Col md="4">
          //         <span>
          //           Have You Ever Had Any Other Loans From The Student Loans Company (SLC)?{' '}<span className='text-danger'>*</span>
          //         </span>
          //       </Col>
          //       <Col md="6">

          //       <FormGroup check inline>
          //       <Input className="form-check-input" type="radio" id="loanfromStudentLoansCompanyForHome" onChange={home1Function} name="loanfromStudentLoansCompanyForHome" value='true' checked={homeOne == 'true'} />
          //       <Label className="form-check-label" check htmlFor="loanfromStudentLoansCompanyForHome" style={styleLabelBold}>Yes</Label>

          //       </FormGroup>

          //       <FormGroup check inline>
          //       <Input className="form-check-input" type="radio" id="loanfromStudentLoansCompanyForHome" onChange={home1Function} name="loanfromStudentLoansCompanyForHome" value='false' checked={homeOne == 'false'} />
          //       <Label className="form-check-label" check htmlFor="loanfromStudentLoansCompanyForHome" style={styleLabelBold}>No</Label>

          //       </FormGroup>

          //       </Col>
          //     </FormGroup>

          //  {
          //   (homeOne == 'true') ?
          //   <FormGroup row className="has-icon-left position-relative">
          //   <Col md="4">
          //  <span>How Many years?</span>{' '}<span className='text-danger'>*</span>
          //   </Col>
          //   <Col md="6">

          //     <Input
          //     type='text'
          //     name='LoanYearsForHome'
          //     id='LoanYearsForHome'
          //     required
          //     placeholder='Enter Years'
          //     />

          //   </Col>
          // </FormGroup>
          // :
          // null
          //  }

          //     <FormGroup row className="has-icon-left position-relative">
          //       <Col md="4">
          //         <span>
          //         Have You Started an Undergraduate or Postgraduate Course of Higher Education in Any Country Since Leaving School?{' '}<span className='text-danger'>*</span>
          //         </span>
          //       </Col>
          //       <Col md="6">

          //       <FormGroup check inline>
          //       <Input className="form-check-input" type="radio" id="HavingUndergraduatePostgraduateCourseForHome" onChange={home2Function} name="HavingUndergraduatePostgraduateCourseForHome" value='true' checked={homeTwo == 'true'} />
          //       <Label className="form-check-label" check htmlFor="HavingUndergraduatePostgraduateCourseForHome" style={styleLabelBold}>Yes</Label>

          //       </FormGroup>

          //       <FormGroup check inline>
          //       <Input className="form-check-input" type="radio" id="HavingUndergraduatePostgraduateCourseForHome" onChange={home2Function} name="HavingUndergraduatePostgraduateCourseForHome" value='false' checked={homeTwo == 'false'} />
          //       <Label className="form-check-label" check htmlFor="HavingUndergraduatePostgraduateCourseForHome" style={styleLabelBold}>No</Label>

          //       </FormGroup>

          //       </Col>
          //     </FormGroup>

          //          </>

          null}

          {studentTypeLabel == "International" ? (
            <InternationalStudent
              applicationStudentId={id}
              studentTypeValue={studentTypeValue}
              destination={"register"}
            />
          ) : //     <>

          //     <FormGroup row className="has-icon-left position-relative">
          //     <Col md="4">
          //       <span>
          //       Are You Applying From Inside UK? <span className="text-danger">*</span>{" "}
          //       </span>
          //     </Col>
          //     <Col md="6">

          //     <FormGroup check inline>
          //     <Input className="form-check-input" type="radio" id="IsApplyingFromInside" onChange={Int1Function} name="IsApplyingFromInside" value='true' checked={intOne == 'true'} />
          //     <Label className="form-check-label" check htmlFor="IsApplyingFromInside" style={styleLabelBold}>Yes</Label>

          //     </FormGroup>

          //     <FormGroup check inline>
          //     <Input className="form-check-input" type="radio" id="isApplyingFromInside" onChange={Int1Function} name="isApplyingFromInside" value='false' checked={intOne == 'false'} />
          //     <Label className="form-check-label" check htmlFor="isApplyingFromInside" style={styleLabelBold}>No</Label>

          //     </FormGroup>

          //     </Col>
          //   </FormGroup>

          //   {
          //     (intOne == 'true') ?

          //     <FormGroup row className="has-icon-left position-relative">
          //     <Col md="4">
          //    <span>What is Your Current Residency Status?</span>{' '}<span className='text-danger'>*</span>
          //     </Col>
          //     <Col md="6">

          //     <Input
          //     required
          //     type='text'
          //     name='CurrentResidencyStatusForInternational'
          //     id='CurrentResidencyStatusForInternational'
          //     placeholder='Enter Current Residency Status'
          //     />

          //     </Col>
          //   </FormGroup>

          //   :
          //   (intOne == 'false') ?

          //   <FormGroup row className="has-icon-left position-relative">
          //   <Col md="4">
          //     <span>
          //     Have You Ever Applied for A UK Visa? <span className="text-danger">*</span>{" "}
          //     </span>
          //   </Col>
          //   <Col md="6">

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="IsAppliedForUkVisa" onChange={Int2Function} name="IsAppliedForUkVisa" value='true' checked={intTwo == 'true'} />
          //   <Label className="form-check-label" check htmlFor="IsAppliedForUkVisa" style={styleLabelBold}>Yes</Label>

          //   </FormGroup>

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="IsAppliedForUkVisa" onChange={Int2Function} name="IsAppliedForUkVisa" value='false' checked={intTwo == 'false'} />
          //   <Label className="form-check-label" check htmlFor="IsAppliedForUkVisa" style={styleLabelBold}>No</Label>

          //   </FormGroup>

          //   </Col>
          // </FormGroup>

          // :

          // null

          //   }

          //   {
          //     (intTwo == 'true') ?

          //     <FormGroup row className="has-icon-left position-relative">
          //     <Col md="4">
          //    <span>What Type of Visa You Have Applied for?</span>{' '}<span className='text-danger'>*</span>
          //     </Col>
          //     <Col md="6">

          //     <Input
          //     required
          //     placeholder='Enter Visa Type'
          //     type='text'
          //     name='VisaType'
          //     id='VisaType'
          //     />

          //     </Col>
          //   </FormGroup>

          //     :
          //     null
          //   }

          //   <FormGroup row className="has-icon-left position-relative">
          //   <Col md="4">
          //     <span>
          //     Have You Ever Been Refused for UK Visa? <span className="text-danger">*</span>{" "}
          //     </span>
          //   </Col>
          //   <Col md="6">

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="IsRefusedForUKVisa" onChange={Int3Function} name="IsRefusedForUKVisa" value='true' checked={intThree == 'true'} />
          //   <Label className="form-check-label" check htmlFor="IsRefusedForUKVisa" style={styleLabelBold}>Yes</Label>

          //   </FormGroup>

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="IsRefusedForUKVisa" onChange={Int3Function} name="IsRefusedForUKVisa" value='false' checked={intThree == 'false'} />
          //   <Label className="form-check-label" check htmlFor="IsRefusedForUKVisa" style={styleLabelBold}>No</Label>

          //   </FormGroup>

          //   </Col>
          // </FormGroup>

          // {
          //   (intThree == 'true') ?

          //   <FormGroup row className="has-icon-left position-relative">
          //   <Col md="4">
          //     <span>
          //     Attach the refusal letter
          //     </span>
          //   </Col>
          //   <Col md="6">

          //         <>
          //           <Upload
          //             listType="picture-card"
          //             multiple={false}
          //             fileList={FileList}
          //             onPreview={handlePreview}
          //             onChange={handleChange}
          //             beforeUpload={(file) => {
          //               return false;
          //             }}
          //           >
          //             {FileList.length < 1 ? (
          //               <div
          //                 className="text-danger"
          //                 style={{ marginTop: 8 }}
          //               >
          //                 <Icon.Upload />
          //                 <br />
          //                 <span>Upload File Here</span>
          //               </div>
          //             ) : (
          //               ""
          //             )}
          //           </Upload>
          //           <Modal
          //             visible={previewVisible}
          //             title={previewTitle}
          //             footer={null}
          //             onCancel={handleCancel}
          //           >
          //             <img
          //               alt="example"
          //               style={{ width: "100%" }}
          //               src={previewImage}
          //             />
          //           </Modal>

          //         </>

          //   </Col>
          // </FormGroup>

          //   :
          //   null
          // }

          //   <FormGroup row className="has-icon-left position-relative">
          //   <Col md="4">
          //     <span>
          //     Have You Ever Been Refused A Visa to Any Other Country? <span className="text-danger">*</span>{" "}
          //     </span>
          //   </Col>
          //   <Col md="6">

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="IsRefusedForOtherVisa" onChange={Int4Function} name="IsRefusedForOtherVisa" value='true' checked={intFour == 'true'} />
          //   <Label className="form-check-label" check htmlFor="IsRefusedForOtherVisa" style={styleLabelBold}>Yes</Label>

          //   </FormGroup>

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="IsRefusedForOtherVisa" onChange={Int4Function} name="IsRefusedForOtherVisa" value='false' checked={intFour == 'false'} />
          //   <Label className="form-check-label" check htmlFor="IsRefusedForOtherVisa" style={styleLabelBold}>No</Label>

          //   </FormGroup>

          //   </Col>
          // </FormGroup>

          // {
          //   intFour == 'true' ?

          //   <FormGroup row className="has-icon-left position-relative">
          //   <Col md="4">
          //     <span>
          //     Attach the refusal letter
          //     </span>
          //   </Col>
          //   <Col md="6">

          //         <>
          //           <Upload
          //             listType="picture-card"
          //             multiple={false}
          //             fileList={FileList2}
          //             onPreview={handlePreview2}
          //             onChange={handleChange2}
          //             beforeUpload={(file) => {
          //               return false;
          //             }}
          //           >
          //             {FileList2.length < 1 ? (
          //               <div
          //                 className="text-danger"
          //                 style={{ marginTop: 8 }}
          //               >
          //                 <Icon.Upload />
          //                 <br />
          //                 <span>Upload File Here</span>
          //               </div>
          //             ) : (
          //               ""
          //             )}
          //           </Upload>
          //           <Modal
          //             visible={previewVisible2}
          //             title={previewTitle2}
          //             footer={null}
          //             onCancel={handleCancel2}
          //           >
          //             <img
          //               alt="example"
          //               style={{ width: "100%" }}
          //               src={previewImage2}
          //             />
          //           </Modal>

          //         </>

          //   </Col>
          // </FormGroup>

          // :

          // null
          // }

          //     </>

          null}

          {studentTypeLabel == "EU/EEA" ? (
            <EUStudent
              applicationStudentId={id}
              studentTypeValue={studentTypeValue}
              destination={"register"}
            />
          ) : //       <>

          //     <FormGroup row className="has-icon-left position-relative">
          //       <Col md="4">
          //      <span>When Did You Move to The UK?</span>{' '}<span className='text-danger'>*</span>
          //       </Col>
          //       <Col md="6">

          //       <Input
          //       required
          //       type='date'
          //       name='DateOfMoveToUk'
          //       id='DateOfMoveToUk'
          //       />

          //       </Col>
          //     </FormGroup>

          //     <FormGroup row className="has-icon-left position-relative">
          //     <Col md="4">
          //       <span>
          //         Have You Ever Had Any Other Loans From The Student Loans Company (SLC)?{' '}<span className='text-danger'>*</span>
          //       </span>
          //     </Col>
          //     <Col md="6">

          //     <FormGroup check inline>
          //     <Input className="form-check-input" type="radio" id="loanfromStudentLoansCompanyForEU" onChange={eu1Function} name="loanfromStudentLoansCompanyForEU" value='true' checked={euOne == 'true'} />
          //     <Label className="form-check-label" check htmlFor="loanfromStudentLoansCompanyForEU" style={styleLabelBold}>Yes</Label>

          //     </FormGroup>

          //     <FormGroup check inline>
          //     <Input className="form-check-input" type="radio" id="loanfromStudentLoansCompanyForEU" onChange={eu1Function} name="loanfromStudentLoansCompanyForEU" value='false' checked={euOne == 'false'} />
          //     <Label className="form-check-label" check htmlFor="loanfromStudentLoansCompanyForEU" style={styleLabelBold}>No</Label>

          //     </FormGroup>

          //     </Col>
          //   </FormGroup>

          //   {
          //     (euOne == 'true') ?

          //     <FormGroup row className="has-icon-left position-relative">
          //       <Col md="4">
          //      <span>How Many Years?</span>{' '}<span className='text-danger'>*</span>
          //       </Col>
          //       <Col md="6">

          //       <Input
          //       required
          //       type='text'
          //       name='LoanYearsForEU'
          //       id='LoanYearsForEU'
          //       placeholder='Enter Years'
          //       />

          //       </Col>
          //     </FormGroup>
          //     :
          //     null

          //   }

          //   <FormGroup row className="has-icon-left position-relative">
          //     <Col md="4">
          //       <span>
          //       Do You Have Settled or Pre-settled Status Under The EU Settlement Scheme?{' '}<span className='text-danger'>*</span>
          //       </span>
          //     </Col>
          //     <Col md="6">

          //     <FormGroup check inline>
          //     <Input className="form-check-input" type="radio" id="IsHavePre_Settlementstatus" onChange={eu2Function} name="IsHavePre_Settlementstatus" value='true' checked={euTwo == 'true'} />
          //     <Label className="form-check-label" check htmlFor="IsHavePre_Settlementstatus" style={styleLabelBold}>Yes</Label>

          //     </FormGroup>

          //     <FormGroup check inline>
          //     <Input className="form-check-input" type="radio" id="IsHavePre_Settlementstatus" onChange={eu2Function} name="IsHavePre_Settlementstatus" value='false' checked={euTwo == 'false'} />
          //     <Label className="form-check-label" check htmlFor="IsHavePre_Settlementstatus" style={styleLabelBold}>No</Label>

          //     </FormGroup>

          //     </Col>
          //   </FormGroup>

          //   {
          //     (euTwo == 'true')   ?

          //     <>

          //     <FormGroup row className="has-icon-left position-relative">
          //     <Col md="4">
          //    <span>Please Provide The Valid Share Code</span>{' '}<span className='text-danger'>*</span>
          //     </Col>
          //     <Col md="6">

          //     <Input
          //     required
          //     type='text'
          //     name='ShareCode '
          //     id='ShareCode '
          //     placeholder='Enter Share Code'
          //     />

          //     </Col>
          //   </FormGroup>

          //   <FormGroup row className="has-icon-left position-relative">
          //   <Col md="4">
          //     <span>
          //     Have You Been Resident in The UK And Islands For The Last Three Years?{' '}<span className='text-danger'>*</span>
          //     </span>
          //   </Col>
          //   <Col md="6">

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="IsStayedInsideInUkinLast3Years" onChange={eu3Function} name="IsStayedInsideInUkinLast3Years" value='true' checked={euThree == 'true'} />
          //   <Label className="form-check-label" check htmlFor="IsStayedInsideInUkinLast3Years" style={styleLabelBold}>Yes</Label>

          //   </FormGroup>

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="IsStayedInsideInUkinLast3Years" onChange={eu3Function} name="IsStayedInsideInUkinLast3Years" value='false' checked={euThree == 'false'} />
          //   <Label className="form-check-label" check htmlFor="IsStayedInsideInUkinLast3Years" style={styleLabelBold}>No</Label>

          //   </FormGroup>

          //   </Col>
          //   </FormGroup>

          //     </>

          //   :

          //   (euTwo == 'false') ?

          //   <FormGroup row className="has-icon-left position-relative">
          //     <Col md="4">
          //    <span>What is Your Current Residency Status in The UK?</span>{' '}<span className='text-danger'>*</span>
          //     </Col>
          //     <Col md="6">

          //     <Input
          //     required
          //     type='text'
          //     name='CurrentResidencyStatusForEU'
          //     id='CurrentResidencyStatusForEU'
          //     placeholder='Enter Residency Status'
          //     />

          //     </Col>
          //   </FormGroup>

          //   :
          //   null

          //   }

          // <FormGroup row className="has-icon-left position-relative">
          //   <Col md="4">
          //     <span>
          //     Have You Started An Undergraduate or Postgraduate Course of Higher Education in Any Country Since Leaving School?{' '}<span className='text-danger'>*</span>
          //     </span>
          //   </Col>
          //   <Col md="6">

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="HavingUndergraduatePostgraduateCourseForEU" onChange={eu4Function} name="HavingUndergraduatePostgraduateCourseForEU" value='true' checked={euFour == 'true'} />
          //   <Label className="form-check-label" check htmlFor="HavingUndergraduatePostgraduateCourseForEU" style={styleLabelBold}>Yes</Label>

          //   </FormGroup>

          //   <FormGroup check inline>
          //   <Input className="form-check-input" type="radio" id="HavingUndergraduatePostgraduateCourseForEU" onChange={eu4Function} name="HavingUndergraduatePostgraduateCourseForEU" value='false' checked={euFour == 'false'} />
          //   <Label className="form-check-label" check htmlFor="HavingUndergraduatePostgraduateCourseForEU" style={styleLabelBold}>No</Label>

          //   </FormGroup>

          //   </Col>
          //   </FormGroup>

          //       </>

          null}
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentApplicationForm;
