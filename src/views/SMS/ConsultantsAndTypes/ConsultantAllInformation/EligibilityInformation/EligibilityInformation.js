import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import ConsultantNavigation from "../NavigationAndRegistration/ConsultantNavigation";
import EligibilityForm from "./Component/EligibilityForm";

const EligibilityInformation = () => {
  const activetab = "5";
  const [success, setSuccess] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select Country of Citizenship"
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [errorc, setErrorC] = useState("");
  const [uniCountryLabel2, setUniCountryLabel2] = useState("Select Residence");
  const [uniCountryValue2, setUniCountryValue2] = useState(0);
  const [errorc2, setErrorC2] = useState("");
  const [exDate, setExDate] = useState(null);
  const [residency, setResidency] = useState([]);
  const [residencyLabel, setResidencyLabel] = useState(
    "Select Residency Status"
  );
  const [permanentResidencyStatusList, setPermanentResidencyStatusList] = useState([]);
  const [permanentResidencyStatusLabel, setPermanentResidencyStatusLabel] = useState(
    "Select Permanent Residency Status"
  );
  const [permanentResidencyStatusValue, setPermanentResidencyStatusValue] = useState(0);
  const [permanentResidencyStatusError, setPermanentResidencyStatusError] = useState("");
  
  const [residencyValue, setResidencyValue] = useState(0);
  const [residencyError, setResidencyError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [FileList3, setFileList3] = useState(null);
  const [idPassportFile, setIdPassportFile] = useState(null);
  const [idPassportError, setIdPassportError] = useState("");
  const [FileList4, setFileList4] = useState(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState(null);
  const [proofOfAddressError, setProofOfAddressError] = useState("");
  const [FileList5, setFileList5] = useState(null);
  const [brpFile, setBrpFile] = useState(null);
  const [proofOfRightError, setProofOfRightError] = useState("");
  const [FileList6, setFileList6] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [cvError, setCvError] = useState("");
  const [FileList7, setFileList7] = useState(null);
  const [bacFile, setBacFile] = useState(null);
  const [bacError, setBacError] = useState("");
  const [rightToWork, setRightToWork] = useState(null);
  const [eligibilityData, setEligibilityData] = useState({});
  const [navVisibility, setNavVisibility] = useState({});
  const { consultantRegisterId } = useParams();
  const { addToast } = useToasts();
  const [visa, setVisa] = useState("");
  const [visaError, setVisaError] = useState("");
  const [dateError, setDateError] = useState("");
  const history = useHistory();
  const userType = localStorage.getItem("userType");
  const [isIdPassportApproved, setIsIdPassportApproved] = useState(true);
  const [isProofOfAddressApproved, setIsProofOfAddressApproved] =
    useState(true);
  const [isBrpApproved, setIsBrpApproved] = useState(true);
  const [isCvApproved, setIsCvApproved] = useState(true);
  const [isBacApproved, setIsBacApproved] = useState(true);
  const [extraDocuments, setExtraDocuments] = useState([]);
  const [extraDocumentErrors, setExtraDocumentErrors] = useState([]);

  useEffect(() => {
    get("CountryDD/index").then((res) => {
      setCountryList(res);
    });

    get("ResidencyStatusDD/index").then((res) => {
      //
      setResidency(res);
    });

    get(`ConsultantNavBar/GetNavbar/${consultantRegisterId}`).then((res) => {
      //
      setNavVisibility(res);
    });

    get(
      `ConsultantEligibility/GetConsultantEligibility/${consultantRegisterId}`
    ).then((res) => {
      setEligibilityData(res);
      console.log("res = ");
      console.table(res);
      
      setIdPassportFile(
        res?.idOrPassport?.fileUrl ? res?.idOrPassport?.fileUrl : null
      );
      setProofOfAddressFile(
        res?.proofOfAddress?.fileUrl ? res?.proofOfAddress?.fileUrl : null
      );
      setBrpFile(res?.brp?.fileUrl ? res?.brp?.fileUrl : null);
      
      setCvFile(res?.cv?.fileUrl ? res?.cv?.fileUrl : null);
      setBacFile(
        res?.bacCertificate?.fileUrl ? res?.bacCertificate?.fileUrl : null
      );
       
      let existingDocuments = [...extraDocuments];
      const result =  res?.extraDocumentFiles.map((extraDocumentFile,index)=>{
        existingDocuments =  [...existingDocuments, { id:null,title: "", file: null,fileUrl:null,isDocumentApproved:null }];
        
        existingDocuments[index].id = extraDocumentFile?.id;
        existingDocuments[index].title = extraDocumentFile?.fileName;
        existingDocuments[index].fileUrl = extraDocumentFile?.fileUrl;
        existingDocuments[index].isDocumentApproved = extraDocumentFile?.isDocumentApproved;
      });
      setExtraDocuments(existingDocuments);
      
      setUniCountryLabel(
        res?.countryOfCitizenShip?.name
          ? res?.countryOfCitizenShip?.name
          : "Select Country of Citizenship"
      );

      setUniCountryValue(
        res?.countryOfCitizenShip?.id ? res?.countryOfCitizenShip?.id : 0
      );

      setUniCountryLabel2(
        res?.countryOfResidence?.name
          ? res?.countryOfResidence?.name
          : "Select Residence"
      );

      setUniCountryValue2(
        res?.countryOfResidence?.id ? res?.countryOfResidence?.id : 0
      );

      setResidencyLabel(
        res !== null ? res?.residencyStatus?.name : "Select Residency Status"
      );
      setResidencyValue(res !== null ? res?.residencyStatus?.id : "0");
      
      setPermanentResidencyStatusLabel(res !== null ? res?.permanentResidencyStatus : "Select Permanent Residency Status");
      setPermanentResidencyStatusValue(res !== null ? res?.permanentResidencyStatusId : "0");
      setRightToWork(
        res != null && res?.haveRightToWork === true
          ? true
          : res != null && res?.haveRightToWork === false
          ? false
          : null
      );
      setExDate(
        res?.expireDate
          ? moment(new Date(res?.expireDate)).format("YYYY-MM-DD")
          : null
      );
      setVisa(res?.visaType);
      setIsIdPassportApproved(res?.isIdOrPasswordApproved);
      setIsProofOfAddressApproved(res?.isProofOfAddressApproved);
      setIsBrpApproved(res?.isBRPApproved);
      setIsCvApproved(res?.isCvApproved);
      setIsBacApproved(res?.isBacCertificateApproved);

    });
  }, [success, consultantRegisterId, setRightToWork]);

  useEffect(() => {
      if(residencyValue === 1)
      {
        get(`ConsultantDD/GetPermanentResidencyStatusTypes`).then((res) => {
            setPermanentResidencyStatusList(res);
        });
      }
    },[residencyValue]);

useEffect(() => {
  console.log("extraDocuments updated : ");
  console.table(extraDocuments);
}, [extraDocuments]);

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  const countryDD2 = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

 const permanentResidencyStatusOptions = permanentResidencyStatusList?.map((residencyStatusOption) => ({
    label: residencyStatusOption?.name,
    value: residencyStatusOption?.id,
  }));

  // select Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setErrorC("");
    if (uniCountryValue === uniCountryValue2) {
      setResidencyValue(0);
      setResidencyLabel("Select Residency Status");
    }
  };

  // select residence
  const selectUniCountry2 = (label, value) => {
    setUniCountryLabel2(label);
    setUniCountryValue2(value);
    setErrorC2("");
    if (uniCountryValue === uniCountryValue2) {
      setResidencyValue(0);
      setResidencyLabel("Select Residency Status");
    }
  };
  // select permanent Residence
  const selectPermanentResidencyStatus = (label, value) => {
    setPermanentResidencyStatusLabel(label);
    setPermanentResidencyStatusValue(value);
  };

  const residencyOptions = residency?.map((r) => ({
    label: r.name,
    value: r.id,
  }));

  const selectResidency = (label, value) => {
    setResidencyError("");
    setResidencyLabel(label);
    setResidencyValue(value);
  };

  // Add new extra doc
  const addExtraDocument = () => {
    setExtraDocuments([...extraDocuments, { id:null,title: "", file: null , fileUrl:null,isDocumentApproved:null }]);
    setExtraDocumentErrors([...extraDocumentErrors, { titleError: "", fileError: "" }]); 
  };

  // Remove extra doc by index
  const removeExtraDocument = (index) => {
    setExtraDocuments(extraDocuments.filter((element, i) => i !== index));
    setExtraDocumentErrors(extraDocumentErrors.filter((element, i) => i !== index));
  };

  // Id or Passport Code Start

  // function getBase643(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // const handleCancel3 = () => {
  //   setPreviewVisible3(false);
  // };

  // const handlePreview3 = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase643(file.originFileObj);
  //   }
  //   setPreviewImage3(file.url || file.preview);
  //   setPreviewVisible3(true);
  //   setPreviewTitle3(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  const handleChange3 = ({ fileList }) => {
    setFileList3(fileList);
    setIdPassportError("");
  };
  // Id or Passport Code End

  // Proof of Address Code Start

  // function getBase644(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // const handleCancel4 = () => {
  //   setPreviewVisible4(false);
  // };

  // const handlePreview4 = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase644(file.originFileObj);
  //   }
  //   setPreviewImage4(file.url || file.preview);
  //   setPreviewVisible4(true);
  //   setPreviewTitle4(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  const handleChange4 = ({ fileList }) => {
    setFileList4(fileList);
    setProofOfAddressError("");
  };
  // Proof of Address Code End

  // Proof of Right to Work Code Start

  // function getBase645(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // const handleCancel5 = () => {
  //   setPreviewVisible5(false);
  // };

  // const handlePreview5 = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase645(file.originFileObj);
  //   }

  //   setPreviewImage5(file.url || file.preview);
  //   setPreviewVisible5(true);
  //   setPreviewTitle5(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  const handleChange5 = ({ fileList }) => {
    setFileList5(fileList);
    setProofOfRightError("");
  };
  // Proof of Right to Work Code End

  // CV Start

  // function getBase646(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // const handleCancel6 = () => {
  //   setPreviewVisible6(false);
  // };

  // const handlePreview6 = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase646(file.originFileObj);
  //   }

  //   setPreviewImage6(file.url || file.preview);
  //   setPreviewVisible6(true);
  //   setPreviewTitle6(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };

  const handleChange6 = ({ fileList }) => {
    setFileList6(fileList);
    setCvError("");
  };
  // cv End

  const handleChange7 = ({ fileList }) => {
    setFileList7(fileList);
    setBacError("");
  };

  // on change radio button
  const onRadioValueChange = (event) => {
    setRightToWork(event.target.value);
  };

  const handlevisaType = (e) => {
    let data = e.target.value.trimStart();
    setVisa(data);
    if (data === "") {
      setVisaError("Visa type is required");
    } else {
      setVisaError("");
    }
  };
  const handleDate = (e) => {
    setExDate(e);
    setDateError("");

    const today = new Date();
    const selectedDate = new Date(e);

    if (selectedDate <= today) {
      setDateError("Expiry Date of Your BRP/TRP or Visa Should be future date");
    }
  };
  const handleExtraDocumentFileNameChange = (index, value) => {
    const newDocs = [...extraDocuments];
    newDocs[index].title = value;       
    setExtraDocuments(newDocs);
    displayErrorExtraDocumentNames(extraDocuments,index,setExtraDocumentErrors);
  };  

  const handleExtraDocumentFileChange = (index, newFile) => {
    
    setExtraDocuments(prev => {
    const existingExtraDocuments = [...prev];
    existingExtraDocuments[index] = { ...existingExtraDocuments[index], file: newFile };
    return existingExtraDocuments;
  });

    const newDocs = [...extraDocuments];
    newDocs[index].file = newFile;
    setExtraDocuments(newDocs);
    displayErrorOfExtraDocuments(extraDocuments,index,setExtraDocumentErrors);

  };
  const ValidateForm = () => {
    var isValid = true;
    if (uniCountryValue === 0) {
      isValid = false;
      setErrorC("Country of nationality  is required");
    }
    if (uniCountryValue2 === 0) {
      isValid = false;
      setErrorC2("Country of residence is required");
    }
    if (uniCountryValue !== uniCountryValue2 && residencyValue === 0) {
      isValid = false;
      setResidencyError("Residency status is required");
    }
    if (
      uniCountryValue !== uniCountryValue2 &&
      FileList5 === null &&
      brpFile == null
    ) {
      isValid = false;
      setProofOfRightError("File is required");
    }
    if (residencyValue === 2 && !visa) {
      isValid = false;
      setVisaError("Visa Type is required");
    }

    if (residencyValue === 2 && new Date(exDate) <= new Date()) {
      isValid = false;
      setDateError("Expiry Date of Your BRP/TRP or Visa Should be future date");
    }

    if (residencyValue === 2 && !exDate) {
      isValid = false;
      setDateError("Expiry Date of Your BRP/TRP or Visa is required");
    }
    if (FileList3 === null && idPassportFile == null) {
      isValid = false;
      setIdPassportError("File is required");
    }
    if (FileList4 === null && proofOfAddressFile == null) {
      isValid = false;
      setProofOfAddressError("File is required");
    }
    if (FileList6 === null && cvFile == null) {
      isValid = false;
      setCvError("File is required");
    }

    isValid =  validateExtraDocumentNames(extraDocuments,setExtraDocumentErrors,isValid);
    isValid =  validateExtraDocuments(extraDocuments,setExtraDocumentErrors,isValid);
    //Reassigning the isValid after checking extra Doc Names 
    return isValid;
    
  };

  const validateExtraDocumentNames = ((extraDocuments,setExtraDocumentErrors,isValid) =>{
    extraDocuments.forEach((element,index) => {
      if(extraDocuments[index].title===null || extraDocuments[index].title==="")
      {
        isValid = false;
        setExtraDocumentErrors((prevErrors)=>{
          const newErrors = [...prevErrors];
          newErrors[index] = {...newErrors[index]};
          newErrors[index].titleError = "Document name is required";
          return newErrors;
        }) 
      }
    });
    return isValid;
  });

  const validateExtraDocuments = ((extraDocuments,setExtraDocumentErrors,isValid) =>{
    extraDocuments.forEach((element,index) => {
      if(extraDocuments[index].fileUrl === null && extraDocuments[index].file === null)
      {
        isValid = false;
        setExtraDocumentErrors((prevErrors)=>{
          const newErrors = [...prevErrors];
          newErrors[index] = {...newErrors[index]};
          newErrors[index].fileError = "Document file is required";
          return newErrors;
        }) 
      }
    });
    return isValid;
  });

  const displayErrorExtraDocumentNames = ((extraDocuments,index,setExtraDocumentErrors)=>{
       if(extraDocuments[index].title === "")
        {
          const existingExtraDocumentErrors = [...extraDocumentErrors];
          setExtraDocumentErrors((prevErrors) => {
            const newErrors = [...prevErrors];              // copy existing error's array
            newErrors[index] = { ...newErrors[index] };     // copy the object index wise
            newErrors[index].titleError = "Document name is required ";       // update safely
            
            return newErrors;
          });
        }
        else
        {
           const existingExtraDocumentErrors = [...extraDocumentErrors];
            setExtraDocumentErrors((prevErrors) => {
            const newErrors = [...prevErrors];              
            newErrors[index] = { ...newErrors[index] };     
            newErrors[index].titleError = "";      
            
            return newErrors;
          });
        }
  });

  const displayErrorOfExtraDocuments = ((extraDocuments,index,setExtraDocumentErrors)=>{
       if(extraDocuments[index].fileUrl !== null || extraDocuments[index].file !== null)
        {
          const existingExtraDocumentErrors = [...extraDocumentErrors];
            setExtraDocumentErrors((prevErrors) => {
            const newErrors = [...prevErrors];              
            newErrors[index] = { ...newErrors[index] };     
            newErrors[index].fileError = "";      
            
            return newErrors;
          });
        }
        else
        {
          const existingExtraDocumentErrors = [...extraDocumentErrors];
          setExtraDocumentErrors((prevErrors) => {
            const newErrors = [...prevErrors];              // copy existing error's array
            newErrors[index] = { ...newErrors[index] };     // copy the object index wise
            newErrors[index].fileError = "Document file is required ";       // update safely
            
            return newErrors;
          });
        }
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("visa", visa);
    subData.append("idOrPassportFile", FileList3);
    subData.append("proofOfAddressFile", FileList4);
    subData.append("BRPFile", FileList5);
    subData.append("CvFile", FileList6);
    subData.append("BacCertificateFile", FileList7);
   
    // append each extra document
    extraDocuments.forEach((doc, index) => {
      
      if (doc.name) {
        subData.append(`ExtraDocuments[${index}].Name`, doc.name);
      }
      if (doc.file) {
        subData.append(`ExtraDocuments[${index}].Document`, doc.file);
      }
    });
    subData.append(
      "expireDate",
      residencyValue === 2 && uniCountryValue !== uniCountryValue2 ? exDate : ""
    );

    if (ValidateForm()) {
      setButtonStatus(true);
      setProgress(true);
      post(`ConsultantEligibility/submit`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
        history.push(`/consultantBankInformation/${consultantRegisterId}`);
      });
    }
  };
  const handlePrevious = () => {
    history.push(`/consultantEmergencyInformation/${consultantRegisterId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Consultant Eligibility Information"
        backTo={userType === userTypes?.Consultant ? null : "Consultant"}
        path={`/consultantList`}
        // path={`/consultantList`}
      />

      <ConsultantNavigation
        consultantId={consultantRegisterId}
        activetab={activetab}
        navVisibility={navVisibility}
        success={success}
      />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <p className="section-title">Right to work Information </p>
            <TabPane tabId="5">
              <EligibilityForm
                handleSubmit={handleSubmit}
                consultantRegisterId={consultantRegisterId}
                eligibilityData={eligibilityData}
                countryDD={countryDD}
                uniCountryLabel={uniCountryLabel}
                uniCountryValue={uniCountryValue}
                errorc={errorc}
                selectUniCountry={selectUniCountry}
                countryDD2={countryDD2}
                uniCountryLabel2={uniCountryLabel2}
                uniCountryValue2={uniCountryValue2}
                selectUniCountry2={selectUniCountry2}
                errorc2={errorc2}
                residencyValue={residencyValue}
                residencyOptions={residencyOptions}
                selectResidency={selectResidency}
                residencyError={residencyError}
                residencyLabel={residencyLabel}
                permanetResidencyStatusValue={permanentResidencyStatusValue}
                permanetResidencyStatusOptions={permanentResidencyStatusOptions}
                selectPermanentResidencyStatus={selectPermanentResidencyStatus}
                permanetResidencyStatusError={permanentResidencyStatusError}
                permanetResidencyStatusLabel={permanentResidencyStatusLabel}
                exDate={exDate}
                onRadioValueChange={onRadioValueChange}
                rightToWork={rightToWork}
                setRightToWork={setRightToWork}
                FileList3={FileList3}
                setFileList3={setFileList3}
                idPassportFile={idPassportFile}
                setIdPassportFile={setIdPassportFile}
                setIdPassportError={setIdPassportError}
                handleChange3={handleChange3}
                idPassportError={idPassportError}
                FileList4={FileList4}
                setFileList4={setFileList4}
                proofOfAddressFile={proofOfAddressFile}
                setProofOfAddressFile={setProofOfAddressFile}
                handleChange4={handleChange4}
                proofOfAddressError={proofOfAddressError}
                setProofOfAddressError={setProofOfAddressError}
                FileList5={FileList5}
                setFileList5={setFileList5}
                brpFile={brpFile}
                setBrpFile={setBrpFile}
                setProofOfRightError={setProofOfRightError}
                handleChange5={handleChange5}
                proofOfRightError={proofOfRightError}
                FileList6={FileList6}
                setFileList6={setFileList6}
                cvFile={cvFile}
                setCvFile={setCvFile}
                handleChange6={handleChange6}
                cvError={cvError}
                setCvError={setCvError}
                FileList7={FileList7}
                setFileList7={setFileList7}
                bacFile={bacFile}
                setBacFile={setBacFile}
                handleChange7={handleChange7}
                bacError={bacError}
                setBacError={setBacError}
                progress={progress}
                buttonStatus={buttonStatus}
                visa={visa}
                visaError={visaError}
                handlevisaType={handlevisaType}
                dateError={dateError}
                setDateError={setDateError}
                handleDate={handleDate}
                handlePrevious={handlePrevious}
                isIdPassportApproved={isIdPassportApproved}
                setIsIdPassportApproved={setIsIdPassportApproved}
                isProofOfAddressApproved={isProofOfAddressApproved}
                setIsProofOfAddressApproved={setIsProofOfAddressApproved}
                isBrpApproved={isBrpApproved}
                setIsBrpApproved={setIsBrpApproved}
                isCvApproved={isCvApproved}
                setIsCvApproved={setIsCvApproved}
                isBacApproved={isBacApproved}
                setIsBacApproved={setIsBacApproved}
                extraDocuments={extraDocuments}
                setExtraDocuments={setExtraDocuments}
                addExtraDocument={addExtraDocument}
                removeExtraDocument={removeExtraDocument}
                extraDocumentErrors={extraDocumentErrors}
                setExtraDocumentErrors={setExtraDocumentErrors}
                handleExtraDocumentFileChange={handleExtraDocumentFileChange}
                handleExtraDocumentFileNameChange={handleExtraDocumentFileNameChange}
              ></EligibilityForm>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default EligibilityInformation;
