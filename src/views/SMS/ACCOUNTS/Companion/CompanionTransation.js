import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { Card, CardBody, Input, Table } from "reactstrap";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import Typing from "../../../../components/form/Typing";
import Pagination from "../../Pagination/Pagination";
import DataShow from "../../../../components/Dropdown/DataShow";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const CompanionTransation = () => {
  const [data, setData] = useState([]);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [companionLabel, setCompanionLabel] = useState("Select Companion");
  const [companionValue, setCompanionValue] = useState(0);
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [statusLable, setStatusLable] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [typeLable, setTypeLable] = useState("Select Type");
  const [typeValue, setTypeValue] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    if (!isTyping) {
      get(
        `CompanionTransactoin?&page=${currentPage}&pageSize=${dataPerPage}&status=${statusValue}&type=${typeValue}&fromdate=${fromDate}&todate=${toDate}&string=${searchStr}&companionid=${companionValue}`
      ).then((res) => {
        setData(res?.models);
        setEntity(res?.totalEntity);
      });
    }
  }, [
    currentPage,
    dataPerPage,
    fromDate,
    isTyping,
    searchStr,
    statusValue,
    toDate,
    typeValue,
    companionValue,
  ]);

  return (
    <div>
      <BreadCrumb title="Companion Transaction List" backTo="" path="/" />
      <Card className="ddzindex">
        <CardBody>
          <div className="row">
            <div className="col-lg-2 col-md-4 mb-2">
              <span>Companion</span>
              <DefaultDropdown
                label={companionLabel}
                setLabel={setCompanionLabel}
                value={companionValue}
                setValue={setCompanionValue}
                url="CompanionDD"
                name="status"
                error={() => {}}
                setError={() => {}}
                action={() => {}}
              />
            </div>

            <div className="col-lg-2 col-md-4 mb-2">
              <span>From Date</span>

              <Input
                type="date"
                onChange={(e) => {
                  setfromDate(e.target.value);
                }}
                value={fromDate}
              />
            </div>
            <div className="col-lg-2 col-md-4 mb-2">
              <span>To Date</span>

              <Input
                type="date"
                onChange={(e) => {
                  settoDate(e.target.value);
                }}
                value={toDate}
              />
            </div>
            <div className="col-lg-2 col-md-4 mb-2">
              <span>Status</span>

              <DefaultDropdown
                label={statusLable}
                setLabel={setStatusLable}
                value={statusValue}
                setValue={setStatusValue}
                url="AffiliateTransactoin/TransactionStatus"
                name="status"
                error={() => {}}
                setError={() => {}}
                action={() => {}}
              />
            </div>
            <div className="col-lg-2 col-md-4 mb-2">
              <span>Type</span>

              <DefaultDropdown
                label={typeLable}
                setLabel={setTypeLable}
                value={typeValue}
                setValue={setTypeValue}
                url="AffiliateTransactoin/TransactionType"
                name="intake"
                error={() => {}}
                setError={() => {}}
                action={() => {}}
              />
            </div>
            <div className="col-lg-2 col-md-4 mb-2">
              <span>Transaction Code</span>

              <Typing
                name="search"
                placeholder="Email"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search pb-4">
        <CardBody>
          <div className="d-flex justify-content-end">
            <DataShow
              dataPerPage={dataPerPage}
              setDataPerPage={setDataPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {!data || data?.length === 0 ? (
            <p className="text-center my-5">No Recent invitations</p>
          ) : (
            <>
              <div className="table-responsive fixedhead mb-2">
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Transaction Code</th>
                      <th>Activity</th>
                      <th>Status </th>
                      <th>APP ID</th>
                      <th>Intake </th>
                      <th>Debit/Outflow </th>
                      <th>Credit/Inflow </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, i) => (
                      <tr key={i} className="border-buttom">
                        <td>{item?.transactionDate} </td>
                        <td>{item?.companionName} </td>
                        <td>{item?.transctionCode}</td>
                        <td>{item?.activity}</td>
                        <td>{item?.status}</td>
                        <td>{item?.applicationViewId}</td>
                        <td>{item?.intake}</td>
                        <td
                          className={`fw-600 ${
                            item?.activityType === 3 && "text-danger"
                          }`}
                        >
                          {item?.activityType === 3 && (
                            <>
                              {"-"}£ {item?.amount}
                            </>
                          )}
                        </td>
                        <td>
                          {item?.activityType !== 3 && <> £ {item?.amount}</>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CompanionTransation;
