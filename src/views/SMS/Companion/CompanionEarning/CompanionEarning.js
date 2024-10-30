import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row,
  Table,
} from "reactstrap";
import SaveButton from "../../../../components/buttons/SaveButton";
import earningBanner from "../../../../assets/img/earningbanner.svg";
import Pagination from "../../Pagination/Pagination";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import Typing from "../../../../components/form/Typing";
import EarningChart from "./EarningChart";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import CompanionInvite from "./CompanionInvite";
import CancelButton from "../../../../components/buttons/CancelButton";
import Uget from "../../../../helpers/Uget";

const CompanionEarning = () => {
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState([]);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [statusLable, setStatusLable] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [typeLable, setTypeLable] = useState("Select Type");
  const [typeValue, setTypeValue] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setamount] = useState("");
  const [amountError, setamountError] = useState("");
  const [progress, setProgress] = useState(false);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const referenceId = localStorage.getItem("referenceId");

  const [active, setActive] = useState(false);

  useEffect(() => {
    Uget(`Companion/get-active-status/${referenceId}`).then((res) => {
      console.log(res?.data);
      setActive(res?.data);
    });
  }, [referenceId]);

  useEffect(() => {
    get(`CompanionTransactoin/Balance/${referenceId}`).then((res) => {
      setBalance(res);
    });
    if (!isTyping) {
      get(
        `CompanionTransactoin?&page=${currentPage}&pageSize=${dataPerPage}&status=${statusValue}&type=${typeValue}&fromdate=${fromDate}&todate=${toDate}&string=${searchStr}`
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
    referenceId,
    searchStr,
    statusValue,
    toDate,
    typeValue,
    success,
  ]);

  const handleamount = (e) => {
    let data = e.target.value.trimStart();
    setamount(data);
    if (data === "") {
      setamountError("Amount is required");
    } else if (data < 50) {
      setamountError("Minimum Amount is 50");
    } else {
      setamountError("");
    }
  };

  const closeAmountModal = () => {
    setamount("");
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      setamountError("Amount is required");
    } else if (amount < 50) {
      setamountError("Minimum Amount is 50");
    } else {
      put(
        `CompanionTransactoin/Createwithdrawrequest?affiliateid=${referenceId}&amount=${amount}`
      ).then((res) => {
        setProgress(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: res?.data?.isSuccess === true ? "success" : "error",
            autoDismiss: true,
          });
          setIsOpen(!isOpen);
          setSuccess(!success);
        }
      });
    }
  };

  return (
    <>
      <BreadCrumb title="Earnings" backTo="" path="/" />

      <div className="custom-card-border pt-4 px-4 mb-30px">
        <Row>
          <Col lg={3} className="mb-3">
            <div className="custom-card-border p-3 h-100">
              <p className="aff-card-title">Balance available for use</p>
              <p className="aff-card-value my-4">
                £ {balance?.availableToWithdraw}
              </p>
              {balance?.canDoWithdrawRequest ? (
                <SaveButton text="Withdraw" action={() => setIsOpen(true)} />
              ) : (
                <span className="text-orange">
                  One withdraw request pending
                </span>
              )}
            </div>
          </Col>
          <Col lg={3} className="mb-3">
            <div className="custom-card-border p-3 h-100">
              <p className="aff-card-title">Earnings up to date</p>
              <p className="aff-card-value my-4">£ {balance?.earningsToDate}</p>
            </div>
          </Col>
          <Col lg={6} className="mb-3">
            {/* <div
                className="bg-affiliate-ads h-100"
                style={{
                  backgroundImage: `url(${earningBanner})`,
                }}
              ></div> */}
            <img className="w-100" src={earningBanner} alt="" />
          </Col>
        </Row>
      </div>

      <Row>
        <Col md={8} className="mb-30px">
          <EarningChart />
        </Col>
        <Col md={4} className="mb-30px">
          {active && <CompanionInvite />}
          {/* <CreateLink /> */}
        </Col>
      </Row>

      <Card className="uapp-employee-search pb-4">
        <CardBody>
          <div className="row mb-2 ddzindex">
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

          {/* <DataShow
                    dataPerPage={dataPerPage}
                    setDataPerPage={setDataPerPage}
                    setCurrentPage={setCurrentPage}
                  /> */}
          {!data || data?.length === 0 ? (
            <p className="text-center my-5">No Recent invitations</p>
          ) : (
            <>
              <div className="table-responsive fixedhead mb-2">
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr>
                      <th>Date</th>
                      <th>Transaction Code</th>
                      <th>Activity</th>
                      <th>Transaction Status </th>
                      <th>APP ID</th>
                      <th>Intake </th>
                      <th>Amount </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, i) => (
                      <tr key={i} className="border-buttom">
                        <td>{item?.transactionDate} </td>
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
                          {item?.activityType === 3 && "-"}£ {item?.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} className="uapp-modal">
        <ModalBody style={{ padding: "30px" }}>
          <div className="mb-3">
            <b>Create a withdraw request</b>
            <br />
            Avaliable From {balance?.availableToWithdraw}
          </div>
          <Form onSubmit={handleSubmit} className="w-75">
            <div className="mb-3">
              <Input
                className="form-mt"
                type="number"
                name="title"
                id="title"
                onChange={(e) => {
                  handleamount(e);
                }}
                placeholder="Enter amount"
                value={amount}
              />
              <span className="text-danger">{amountError}</span>
            </div>

            <FormGroup className="d-flex justify-content-between mt-3">
              <CancelButton cancel={closeAmountModal} />
              <SaveButton
                text="Submit"
                progress={progress}
                buttonStatus={progress}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CompanionEarning;
