import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router";

import MenuTable from "./MenuTable";
import get from "../../../helpers/get";
import Uget from "../../../helpers/Uget";
import put from "../../../helpers/put";
import Uremove from "../../../helpers/Uremove";
import { userTypes } from "../../../constants/userTypeConstant";
import LinkButton from "../Components/LinkButton";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { permissionList } from "../../../constants/AuthorizationConstant";
import Pagination from "../Pagination/Pagination";

const MenuList = () => {
  const userType = localStorage.getItem("userType");
  const userTypeId = localStorage.getItem("referenceId");
  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Status");
  const [statusValue, setStatusValue] = useState(0);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setconsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(
    userType === userTypes?.Consultant.toString() ? userTypeId : 0
  );
  const [searchStr, setSearchStr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [dataPerPage, setDataPerPage] = useState(15);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const componentRef = useRef();
  const [tableData, setTableData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [MenuItemList, setMenuItemList] = useState({});

  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [entity, setEntity] = useState(0);

  const [serialNum, setSerialNum] = useState(0);

  const [deleteModal, setDeleteModal] = useState(false);
  const { addToast } = useToasts();
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [delData, setDelData] = useState({});
  const history = useHistory();
  const [check, setCheck] = useState(false);
  const [parentList, setParentList] = useState([]);
  const [parentLabel, setParentLabel] = useState("Select Parent");
  const [parentValue, setParentValue] = useState(0);

  const adminPermission =
    userType === userTypes?.SystemAdmin.toString() ||
    userType === userTypes?.Admin.toString();

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };

  const consultantName = consultant?.map((cons) => ({
    label: cons?.name,
    value: cons?.id,
  }));

  const selectConsultant = (label, value) => {
    setconsultantLabel(label);
    setConsultantValue(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    get("MenuItem/GetMenuItems").then((res) => {
      setParentList(res);
    });
  }, []);

  const parentName = parentList?.map((cons) => ({
    label: cons?.title,
    value: cons?.id,
  }));
  const selectParent = (label, value) => {
    // setConsultantError(false);
    setParentLabel(label);
    setParentValue(value);
  };

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });
  }, []);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `MenuItem/paginated-list?&page=${currentPage}&pageSize=${dataPerPage}&searchText=${searchStr}&parentId=${parentValue}`
      ).then((res) => {
        console.log(res);
        setMenuItemList(res);
        setSerialNum(res?.from);
        setEntity(res?.totalFiltered);
        setLoading(false);
      });
    }
  }, [
    parentValue,
    currentPage,
    dataPerPage,
    searchStr,
    statusValue,
    loading,
    success,
    isTyping,
    consultantValue,
    branchValue,
  ]);

  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnAffiliate", JSON.stringify(values));
  };

  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const redirectToConsultantDashboard = (id) => {
    history.push(`/affiliate-dashboard/${id}`);
  };

  const redirectToConsultantProfile = (id) => {
    history.push(`/affiliate-profile/${id}`);
  };

  const handleUpdate = (data) => {
    put(`Affiliate/toggle-block-status/${data?.id}`).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.title, {
          autoDismiss: true,
          appearance: "success",
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.title, {
          autoDismiss: true,
          appearance: "error",
        });
      }
    });
  };

  const handleReset = () => {
    setStatusLabel("Status");
    setStatusValue(0);
    setconsultantLabel("Select Consultant");
    setConsultantValue(0);
    setSearchStr("");
    setCurrentPage(1);
  };

  const handleEdit = (data) => {
    history.push(`/affiliatePersonalInfo/${data?.id}`);
  };

  const toggleDanger = (p) => {
    setDelData(p);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    setProgress(true);
    Uremove(`Affiliate/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res?.data?.title, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log("dataPerPage", dataPerPage);
  console.log("entity", entity);
  return (
    <div>
      <BreadCrumb title="Menu List" backTo="" path="/" />

      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              {/* {permissions?.includes(permissionList?.Add_Consultant) ? ( */}
              <LinkButton
                url={"/menu-add"}
                className={"btn btn-uapp-add "}
                name={"Add Menu"}
                icon={<i className="fas fa-plus"></i>}
              />
              {/* ) : null} */}
            </Col>

            <Col lg="7" md="7" sm="12" xs="12"></Col>
          </Row>

          <MenuTable
            componentRef={componentRef}
            tableData={tableData}
            permissions={permissions}
            permissionList={permissionList}
            userTypeId={userTypeId}
            userTypes={userTypes}
            MenuItemList={MenuItemList}
            serialNum={serialNum}
            history={history}
            handlePass={handlePass}
            passModal={passModal}
            handleToggle={handleToggle}
            passData={passData}
            setError={setError}
            error={error}
            setPassModal={setPassModal}
            progress={progress}
            passError={passError}
            handleDate={handleDate}
            handleUpdate={handleUpdate}
            redirectToConsultantProfile={redirectToConsultantProfile}
            userType={userType}
            redirectToConsultantDashboard={redirectToConsultantDashboard}
            handleEdit={handleEdit}
            toggleDanger={toggleDanger}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            handleDeleteData={handleDeleteData}
            buttonStatus={buttonStatus}
            parentName={parentName}
            parentLabel={parentLabel}
            parentValue={parentValue}
            selectParent={selectParent}
          />

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default MenuList;
