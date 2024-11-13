import React, { useEffect, useState, useRef } from "react";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { useHistory } from "react-router";
import get from "../../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import remove from "../../../../../helpers/remove";
import { userTypes } from "../../../../../constants/userTypeConstant";
import put from "../../../../../helpers/put";
import post from "../../../../../helpers/post";
import AddMissionManagerClear from "./Component/AddMissionManagerClear";
import AddMissionManagerAdd from "./Component/AddMissionManagerAdd";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { useParams, useLocation } from "react-router-dom";
import ColumnAdmissionManager from "../../../TableColumn/ColumnAdmissionManager";

const Index = () => {
  const AdmissionManagerPaging = JSON.parse(
    sessionStorage.getItem("admissionManager")
  );
  const { providerId } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [entity, setEntity] = useState(0);
  const [serialNum, setSerialNum] = useState(1);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    AdmissionManagerPaging?.currentPage
      ? AdmissionManagerPaging?.currentPage
      : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    AdmissionManagerPaging?.dataPerPage
      ? AdmissionManagerPaging?.dataPerPage
      : 15
  );
  const [callApi, setCallApi] = useState(false);
  const [searchStr, setSearchStr] = useState(
    AdmissionManagerPaging?.searchStr ? AdmissionManagerPaging?.searchStr : ""
  );
  const [providerDD, setProviderDD] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [managerName, setManagerName] = useState("");
  const [managerId, setManagerId] = useState(0);
  const [deleteData, setDeleteData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [providerLabel, setProviderLabel] = useState(
    AdmissionManagerPaging?.providerLabel
      ? AdmissionManagerPaging?.providerLabel
      : "Select Provider"
  );
  const [providerValue, setProviderValue] = useState(
    AdmissionManagerPaging?.providerValue
      ? AdmissionManagerPaging?.providerValue
      : 0
  );

  const [providerLabel2, setProviderLabel2] = useState("Select Provider");
  const [providerValue2, setProviderValue2] = useState(0);
  const [providerError, setProviderError] = useState(false);
  const [nameTitleDD, setNameTitleDD] = useState([]);
  const [nameTitleLabel, setNameTitleLabel] = useState("Select Title");
  const [nameTitleValue, setNameTitleValue] = useState(0);
  const [nameTitleError, setNameTitleError] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState("Select Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [uniStateLabel, setUniStateLabel] = useState("Select State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [uniStateError, setUniStateError] = useState(false);

  // for hide/unhide table column
  const [check, setCheck] = useState(true);
  const history = useHistory();
  const { addToast } = useToasts();
  const location = useLocation();
  const currentRoute = location.pathname;
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(false);
  const [mId, setMId] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const tableColumnAdmissionManager = JSON.parse(
      localStorage.getItem("ColumnAdmissionManager")
    );
    tableColumnAdmissionManager && setTableData(tableColumnAdmissionManager);
    !tableColumnAdmissionManager &&
      localStorage.setItem(
        "ColumnAdmissionManager",
        JSON.stringify(ColumnAdmissionManager)
      );
    !tableColumnAdmissionManager && setTableData(ColumnAdmissionManager);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "admissionManager",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        uniCountryLabel: uniCountryLabel && uniCountryLabel,
        uniCountryValue: uniCountryValue && uniCountryValue,
        uniStateLabel: uniStateLabel && uniStateLabel,
        unistateValue: unistateValue && unistateValue,
        providerLabel: providerLabel && providerLabel,
        providerValue: providerValue && providerValue,
        searchStr: searchStr && searchStr,
        dataPerPage: dataPerPage && dataPerPage,
      })
    );
  }, [
    currentPage,
    uniCountryLabel,
    uniCountryValue,
    uniStateLabel,
    unistateValue,
    providerLabel,
    providerValue,
    searchStr,
    dataPerPage,
  ]);

  useEffect(() => {
    get("ProviderDD/Index").then((res) => {
      setProviderDD(res);
      setLoading(false);
    });

    get("NameTittleDD/index").then((res) => {
      setNameTitleDD(res);
      setLoading(false);
    });

    get("CountryDD/index").then((res) => {
      setCountryList(res);
      setLoading(false);
    });

    if (userType === userTypes?.ProviderAdmin) {
      get(
        `Provideradmin/GetProviderId/${localStorage.getItem("referenceId")}`
      ).then((res) => {
        console.log(res);
        setMId(res);
      });
    }

    if (!isTyping) {
      get(
        `AdmissionManager/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&providerId=${providerValue}&search=${searchStr}`
      ).then((res) => {
        setManagerList(res?.models);
        setEntity(res?.totalEntity);
        setSerialNum(res?.firstSerialNumber);
        setLoading(false);
      });
    }
  }, [
    currentPage,
    userType,
    dataPerPage,
    providerValue,
    searchStr,
    success,
    isTyping,
  ]);

  useEffect(() => {
    if (providerId) {
      const findData = providerDD.find((status) => {
        return status.id.toString() === providerId;
      });

      setProviderValue(findData?.id);
      setProviderLabel(findData?.name);
    }
  }, [providerDD, providerId]);

  const providerMenu = providerDD.map((provider) => ({
    label: provider?.name,
    value: provider?.id,
  }));

  const selectProvider = (label, value) => {
    setProviderLabel(label);
    setProviderValue(value);
  };

  const selectProvider2 = (label, value) => {
    setProviderError(false);
    setProviderLabel2(label);
    setProviderValue2(value);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  const handlePass = (e) => {
    setPassError("");
    setPass(e.target.value);
  };

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
    if (
      fileList.length > 0 &&
      fileList[0]?.type !== "image/jpeg" &&
      fileList[0]?.type !== "image/jpg" &&
      fileList[0]?.type !== "image/png"
    ) {
      setFileList([]);
      setError("Only jpeg, jpg, png image is allowed");
    } else {
      setFileList(fileList);
      setError("");
    }
  };
  // Trial End

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  const componentRef = useRef();

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // on clear
  const handleClearSearch = () => {
    !providerId && setProviderLabel("Provider");
    !providerId && setProviderValue(0);
    setCallApi((prev) => !prev);
    setSearchStr("");
    setCurrentPage(1);
    history.replace({
      universityId: null,
    });
  };
  // useEffect(() => {
  //   handleClearSearch();
  // }, [currentRoute]);

  const redirectToAssignPage = (providerId, managerId) => {
    history.push({
      pathname: `/assignUniversity/${providerId}/${managerId}`,
      managerList: "managerList",
    });
  };

  const redirectToSub = (data) => {
    history.push(`/admissionManagerAssignedSubjects/${data}`);
  };

  const handleViewAdmissionManager = (managerId, providerId) => {
    history.push({
      pathname: `/admissionManagerProfile/${managerId}`,
      managerList: "managerList",
    });
  };

  const updateAdmissionManager = (managerId, providerId) => {
    history.push({
      pathname: `/admissionManagerGeneralInformation/${managerId}`,
      managerList: "managerList",
    });
  };

  const toggleDelete = (manager) => {
    setManagerId(manager?.id);
    setManagerName(manager?.firstName);
    setDeleteData(manager);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setManagerId(0);
    setManagerName("");
    setDeleteData({});
  };

  const handleDelete = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`AdmissionManager/Delete/${deleteData?.id}`).then((res) => {
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setProgress(false);
      setDeleteData({});
      setDeleteModal(false);
      setManagerId(0);
      setManagerName("");
      setSuccess(!success);
      setButtonStatus(false);
    });
  };

  const handleAccountStatus = (e, managerId) => {
    const subData = {
      id: managerId,
    };

    put(`AdmissionManager/UpdateAccountStatus/${managerId}`, subData).then(
      (res) => {
        if (res?.status == 200 && res?.data?.isSuccess == true) {
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
      }
    );
  };

  // on Close Modal
  const closeModal = () => {
    setNameTitleLabel("Select Title");
    setNameTitleValue(0);
    setUniCountryLabel("Select Country");
    setUniCountryValue(0);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    setProviderLabel("Provider");
    setProviderValue(0);
    setProviderLabel2("Select Provider");
    setProviderValue2(0);
    setCountryError(false);
    setUniStateError(false);
    setNameTitleError(false);
    setProviderError(false);
    setModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    subdata.append(
      "admissionManagerFile",
      FileList?.length < 1 ? null : FileList[0]?.originFileObj
    );

    if (userType == userTypes?.ProviderAdmin) {
      if (nameTitleValue === 0) {
        setNameTitleError(true);
      } else if (pass.length < 6) {
        setPassError("Password length can not be less than six digits");
      } else if (uniCountryValue === 0) {
        setCountryError(true);
      } else {
        setButtonStatus1(true);
        setProgress(true);
        post(`AdmissionManager/Create`, subdata).then((res) => {
          setButtonStatus1(false);
          setProgress(false);
          setSuccess(!success);

          if (res?.status === 200 && res?.data?.isSuccess == true) {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            closeModal();
            setModalOpen(false);
            setFileList([]);
          }
          if (res?.status === 200 && res?.data?.isSuccess == false) {
            addToast(res.data.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else {
      if (providerValue2 === 0) {
        setProviderError(true);
      } else if (nameTitleValue === 0) {
        setNameTitleError(true);
      } else if (pass.length < 6) {
        setPassError("Password length can not be less than six digits");
      } else if (uniCountryValue === 0) {
        setCountryError(true);
      } else {
        setButtonStatus1(true);
        setProgress(true);
        post(`AdmissionManager/Create`, subdata).then((res) => {
          setButtonStatus1(false);
          setProgress(false);
          setSuccess(!success);

          if (res?.status === 200 && res?.data?.isSuccess == true) {
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            closeModal();
            setModalOpen(false);
            setFileList([]);
          }
          if (res?.status === 200 && res?.data?.isSuccess == false) {
            addToast(res.data.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const nameTitleMenu = nameTitleDD?.map((nameTitle) => ({
    label: nameTitle?.name,
    value: nameTitle?.id,
  }));

  //   select name title
  const selectNameTitle = (label, value) => {
    setNameTitleError(false);
    setNameTitleLabel(label);
    setNameTitleValue(value);
  };

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setCountryError(false);
    setUniStateLabel("Select State");
    setUniStateValue(0);
  };

  const redirectToAdmissionOfficerList = (providerId, managerId) => {
    history.push(
      `/admissionOfficerListFromAdmissionManagerList/${providerId}/${managerId}`
    );
  };

  // for hide/unhide column
  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnAdmissionManager", JSON.stringify(values));
  };

  const redirectToAddAdmissionmanager = () => {
    history.push("/addAdmissionManager");
  };
  return (
    <div>
      <BreadCrumb title="Admission Manager List" backTo="" path="/" />
      <div>
        <AddMissionManagerClear
          userType={userType}
          userTypes={userTypes}
          providerMenu={providerMenu}
          providerLabel={providerLabel}
          providerValue={providerValue}
          selectProvider={selectProvider}
          searchStr={searchStr}
          setSearchStr={setSearchStr}
          searchValue={searchValue}
          providerId={providerId}
          setProviderLabel={setProviderLabel}
          setProviderValue={setProviderValue}
          handleKeyDown={handleKeyDown}
          handleClearSearch={handleClearSearch}
          setIsTyping={setIsTyping}
        ></AddMissionManagerClear>

        <AddMissionManagerAdd
          permissions={permissions}
          permissionList={permissionList}
          redirectToAddAdmissionmanager={redirectToAddAdmissionmanager}
          modalOpen={modalOpen}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          userType={userType}
          userTypes={userTypes}
          mId={mId}
          providerMenu={providerMenu}
          providerLabel2={providerLabel2}
          providerValue2={providerValue2}
          selectProvider2={selectProvider2}
          providerError={providerError}
          nameTitleMenu={nameTitleMenu}
          nameTitleLabel={nameTitleLabel}
          nameTitleValue={nameTitleValue}
          selectNameTitle={selectNameTitle}
          nameTitleError={nameTitleError}
          handlePass={handlePass}
          passError={passError}
          countryDD={countryDD}
          uniCountryLabel={uniCountryLabel}
          uniCountryValue={uniCountryValue}
          selectUniCountry={selectUniCountry}
          countryError={countryError}
          handlePreview={handlePreview}
          handleChange={handleChange}
          previewVisible={previewVisible}
          previewTitle={previewTitle}
          handleCancel={handleCancel}
          previewImage={previewImage}
          error={error}
          progress={progress}
          buttonStatus1={buttonStatus1}
          dataSizeName={dataSizeName}
          dataPerPage={dataPerPage}
          selectDataSize={selectDataSize}
          dropdownOpen={dropdownOpen}
          toggle={toggle}
          componentRef={componentRef}
          dropdownOpen1={dropdownOpen1}
          toggle1={toggle1}
          tableData={tableData}
          handleChecked={handleChecked}
          loading={loading}
          managerList={managerList}
          serialNum={serialNum}
          redirectToAssignPage={redirectToAssignPage}
          redirectToSub={redirectToSub}
          redirectToAdmissionOfficerList={redirectToAdmissionOfficerList}
          handleAccountStatus={handleAccountStatus}
          handleViewAdmissionManager={handleViewAdmissionManager}
          updateAdmissionManager={updateAdmissionManager}
          toggleDelete={toggleDelete}
          deleteModal={deleteModal}
          closeDeleteModal={closeDeleteModal}
          managerName={managerName}
          buttonStatus={buttonStatus}
          handleDelete={handleDelete}
          entity={entity}
          paginate={paginate}
          currentPage={currentPage}
        ></AddMissionManagerAdd>
      </div>
    </div>
  );
};

export default Index;
