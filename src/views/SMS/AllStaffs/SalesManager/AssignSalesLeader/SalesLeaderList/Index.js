import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import SalesManagerTable from "./Component/SalesManagerTable.js";
import Uget from "../../../../../../helpers/Uget.js";
import Loader from "../../../../Search/Loader/Loader.js";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb.js";
import { permissionList } from "../../../../../../constants/AuthorizationConstant.js";
import Pagination from "../../../../Pagination/Pagination.jsx";

const Index = (props) => {
  const SaleManagerPaging = JSON.parse(
    sessionStorage.getItem("Sales Team Leader")
  );
  const userType = localStorage.getItem("userType");
  const { type, branchId } = useParams();

  const location = useLocation();
  const history = useHistory();
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    SaleManagerPaging?.currentPage ? SaleManagerPaging?.currentPage : 1
  );
  const [searchStr, setSearchStr] = useState(
    SaleManagerPaging?.searchStr ? SaleManagerPaging?.searchStr : ""
  );
  const [dataPerPage, setDataPerPage] = useState(
    SaleManagerPaging?.dataPerPage ? SaleManagerPaging?.dataPerPage : 15
  );
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const userTypeId = localStorage.getItem("userType");
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // for hide/unhide table column
  const [check, setCheck] = useState(true);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [cPass, setCPass] = useState("");
  const [pass, setPass] = useState("");
  const [progress, setProgress] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [branchLabel, setBranchLabel] = useState(
    SaleManagerPaging?.branchLabel
      ? SaleManagerPaging?.branchLabel
      : "Select branch"
  );
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `SalesTeamLeader/FetchSalesManagerSalesTeamLeadersPagedData?page=${currentPage}&pagesize=${dataPerPage}&searchText=${searchStr}`
      ).then((action) => {
        setEmployeeList(action?.items);
        setSerialNum(action?.from);
        setEntity(action?.totalFiltered);
        setLoading(false);
      });
    }
  }, [
    callApi,
    currentPage,
    dataPerPage,
    searchStr,
    success,
    isTyping,
    branchId,
  ]);

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // add staff handler

  // employee click handler
  const handleEmpClick = (id) => {
    history.push({
      pathname: `/salesTeamLeaderProfile/${id}`,
    });
  };

  return (
    <div>
      <BreadCrumb title="Sales Team Leader List" backTo="" path="/" />
      <div>
        <Card className="uapp-employee-search">
          <CardBody>
            {permissions?.includes(
              permissionList?.View_SalesTeamLeader_list
            ) && (
              <>
                {employeeList?.length === 0 ? (
                  <h4 className="text-center">No Data Found</h4>
                ) : (
                  <>
                    {" "}
                    {loading ? (
                      <Loader />
                    ) : (
                      <SalesManagerTable
                        tableData={tableData}
                        permissions={permissions}
                        permissionList={permissionList}
                        data={data}
                        deleteModal={deleteModal}
                        buttonStatus={buttonStatus}
                        progress={progress}
                        userTypeId={userTypeId}
                        employeeList={employeeList}
                        handleEmpClick={handleEmpClick}
                        serialNum={serialNum}
                        passModal={passModal}
                        passData={passData}
                        pass={pass}
                        setPass={setPass}
                        setError={setError}
                        error={error}
                        passError={passError}
                        setPassModal={setPassModal}
                      />
                    )}
                  </>
                )}
              </>
            )}

            <Pagination
              dataPerPage={dataPerPage}
              totalData={entity}
              paginate={paginate}
              currentPage={currentPage}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employeeTypeList: state.employeeTypeDataReducer.employeeType,
});
export default connect(mapStateToProps)(Index);
