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
import Typing from "../../../components/form/Typing";
import Select from "react-select";
import TagButton from "../../../components/buttons/TagButton";
import PrintFile from "../Affiliate/AffiliateList/PrintFile";

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
    setParentLabel("Select Parent");
    setParentValue(0);
    setSearchStr("");
    setCurrentPage(1);
  };

  const handleEdit = (data) => {
    history.push(`/affiliatePersonalInfo/${data?.id}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <BreadCrumb title="Menu List" backTo="" path="/" />
      <Card className="uapp-employee-search zindex-100">
        <CardBody>
          <Row>
            <Col className="uapp-mb mb-2" md="3" sm="12">
              <Select
                options={parentName}
                value={{
                  label: parentLabel,
                  value: parentValue,
                }}
                onChange={(opt) => selectParent(opt.label, opt.value)}
                name="parentId"
                id="parentId"
              />
            </Col>
            <Col className="uapp-mb mb-2" md="3" sm="12">
              <Typing
                name="search"
                placeholder="Search Title"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
                onKeyDown={handleKeyDown}
              />
            </Col>
          </Row>

          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <div className="d-flex justify-between-start">
                <div className="mt-1 mx-1" style={{ display: "flex" }}>
                  {parentValue !== 0 && (
                    <TagButton
                      label={parentLabel}
                      setValue={() => setParentValue(0)}
                      setLabel={() => setParentLabel("Select Parent")}
                    ></TagButton>
                  )}
                </div>

                <div className="mt-1 mx-0 d-flex btn-clear mb-2">
                  {parentValue !== 0 ? (
                    <button className="tag-clear" onClick={handleReset}>
                      Clear All
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              <LinkButton
                url={"/menu-add"}
                className={"btn btn-uapp-add "}
                name={"Add Menu"}
                icon={<i className="fas fa-plus"></i>}
              />
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex justify-content-end">
                {/* Dropdown number start */}
                <div className="mr-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Showing :</div>
                    <div className="ddzindex">
                      <Select
                        options={dataSizeName}
                        value={{ label: dataPerPage, value: dataPerPage }}
                        onChange={(opt) => selectDataSize(opt.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* Dropdown number end */}

                <PrintFile
                  dropdownOpen={dropdownOpen}
                  toggle={toggle}
                  componentRef={componentRef}
                ></PrintFile>
              </div>
            </Col>
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
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            buttonStatus={buttonStatus}
            parentName={parentName}
            parentLabel={parentLabel}
            parentValue={parentValue}
            selectParent={selectParent}
            setSuccess={setSuccess}
            success={success}
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
