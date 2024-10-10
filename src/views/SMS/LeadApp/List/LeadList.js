import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Modal, ModalBody, Row, Table } from "reactstrap";
import Lget from "../../../../helpers/Lget";
import PrintFile from "../../ReactTableConvertToXl/PrintFile";
import DataShow from "../../../../components/Dropdown/DataShow";
import Pagination from "../../Pagination/Pagination";
import {
  currentDate,
  firstDateMonth,
} from "../../../../components/date/DateFormate";
import LeadAssign from "../Common/LeadAssign";
import LeadStatus from "../Common/LeadStatus";
import GroupButton from "../../../../components/buttons/GroupButton";
import Typing from "../../../../components/form/Typing";
import DateRangePicker from "../../../../components/form/DateRangePicker";
import DefaultDropdownL from "../../../../components/Dropdown/DefaultDropdownL";
import ButtonForFunction from "../../Components/ButtonForFunction";
import Preview from "../../../../components/buttons/Preview";
import LeadAdd from "./LeadAdd";
import { AdminUsers } from "../../../../components/core/User";

const LeadList = () => {
  const componentRef = useRef();
  // const { addToast } = useToasts();
  const [modalData, setModalData] = useState();
  const [modalForAddLead, setModalForAddLead] = useState(false);
  const [modalForAssign, setModalForAssign] = useState(false);
  const [modalForStaus, setModalForStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // const [isSubmit, setIsSubmit] = useState(false);
  // const [lable, setLable] = useState("Select Consultant");
  // const [consultantId, setConsultantId] = useState(0);
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  // const [consultantIdError, setConsultantIdError] = useState("");

  const [assign, setAssign] = useState("0");
  const [source, setSource] = useState(0);
  const branch = 0;
  // const [branch, setBranch] = useState(0);
  const [consultant, setConsultant] = useState(0);
  const [campaign, setCampaign] = useState(0);
  const [status, setStatus] = useState(0);

  const [formData, setFormDate] = useState(firstDateMonth);
  const [toDate, setToDate] = useState(currentDate);
  // const [checked, setChecked] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    if (!isTyping) {
      Lget(
        `Leads/Index?page=${currentPage}&pagesize=${dataPerPage}&assign=${assign}&source=${source}&status=${status}&from_date=${formData}&to_date=${toDate}&query=${search}&branchid=${branch}&consultantid=${consultant}&campaignid=${campaign}`
      ).then((res) => {
        console.log(res);

        setData(res?.data);
      });
    }
  }, [
    assign,
    campaign,
    consultant,
    currentPage,
    dataPerPage,
    formData,
    isTyping,
    search,
    source,
    status,
    success,
    toDate,
  ]);

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   if (consultantId === 0) {
  //     setConsultantIdError(true);
  //   } else {
  //     setConsultantIdError(false);
  //     setIsSubmit(true);
  //     Lput(`Consultant/Assign?id=${consultantId}`).then((res) => {
  //       setIsSubmit(false);
  //       if (res?.status === 200 && res?.data?.isSuccess === true) {
  //         addToast(res?.data?.message, {
  //           appearance: "success",
  //           autoDismiss: true,
  //         });
  //         setSuccess(!success);
  //       } else {
  //         addToast(res?.data?.message, {
  //           appearance: "error",
  //           autoDismiss: true,
  //         });
  //       }
  //     });
  //     setIsSubmit(false);
  //   }
  // };

  return (
    <>
      <BreadCrumb title="Lead List" backTo="" path="/" />
      <GroupButton
        list={[
          { id: "0", name: "All Leads" },
          { id: "1", name: "Assigned Leads" },
          { id: "2", name: "Unassigned Leads" },
          {
            id: "3",
            name: `Returned Leads (${
              data?.totalReturned ? data?.totalReturned : 0
            })`,
          },
        ]}
        value={assign}
        setValue={setAssign}
        action={() => setCurrentPage(1)}
      />
      <Card className="uapp-employee-search zindex-100">
        <CardBody className="search-card-body">
          <Row>
            <Col lg="4" md="4" sm="12" xs="12">
              <Typing
                placeholder="Search..."
                value={search}
                setValue={setSearch}
                setIsTyping={setIsTyping}
              />
            </Col>

            <Col lg="8" md="8" sm="12" xs="12">
              <div className="d-flex justify-content-end">
                <DateRangePicker
                  formData={formData}
                  setFormDate={setFormDate}
                  toDate={toDate}
                  setToDate={setToDate}
                />
                <button
                  className="btn btn-white btn-icon border mb-3 ml-2"
                  onClick={() => setFilter(!filter)}
                >
                  <i class="fas fa-filter"></i>
                </button>
              </div>
            </Col>
          </Row>

          {filter && (
            <Row>
              <Col xl={3} lg={4} xs={6}>
                <DefaultDropdownL
                  placeholder="Select Source"
                  url="LeadSource"
                  value={source}
                  setValue={setSource}
                />
              </Col>
              <Col xl={3} lg={4} xs={6}>
                <DefaultDropdownL
                  placeholder="Select Form"
                  url="Campaign"
                  value={campaign}
                  setValue={setCampaign}
                />
              </Col>
              {AdminUsers() && (
                <Col xl={3} lg={4} xs={6}>
                  <DefaultDropdownL
                    url="Consultant/SelectList"
                    placeholder="Select Consultant"
                    value={consultant}
                    setValue={setConsultant}
                  />
                </Col>
              )}
              <Col xl={3} lg={4} xs={6}>
                <DefaultDropdownL
                  placeholder="Select Status"
                  url="LeadStatus"
                  value={status}
                  setValue={setStatus}
                />
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <Row>
            <Col lg="7" md="7" sm="12" xs="12">
              {/* <p className="fs-16px fw-600">Assigned Consultants</p> */}
              {/* <p className="fs-16px fw-600">Lead List</p> */}
              <ButtonForFunction
                color="primary"
                icon={<i className="fas fa-plus"></i>}
                func={() => setModalForAddLead(true)}
                name={" Add Lead"}
              />
            </Col>
            <Col lg="5" md="5" sm="12" xs="12">
              <div className="d-flex justify-content-end">
                <div className="mr-3">
                  <DataShow
                    dataPerPage={dataPerPage}
                    setDataPerPage={setDataPerPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
                <PrintFile
                  dropdownOpen={dropdownOpen}
                  toggle={() => setDropdownOpen((prev) => !prev)}
                  componentRef={componentRef}
                ></PrintFile>

                {/* <AffiliateColumnHide
                  dropdownOpen1={dropdownOpen1}
                  toggle1={toggle1}
                  tableData={tableData}
                  setTableData={setTableData}
                  handleChecked={handleChecked}
                ></AffiliateColumnHide> */}
              </div>
            </Col>
          </Row>
          <div className="table-responsive fixedhead mb-3">
            <Table className="table-bordered">
              <thead className="tablehead">
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Form</th>
                  <th>Status</th>
                  {/* {(AdminUsers()) &&  */}
                  <th>Assigned to</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.models?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.sourceName}</td>
                    <td>{item.campaignname}</td>
                    <td>
                      <span
                        className={`pointer fw-600 text-uapp`}
                        onClick={() => {
                          setModalForStatus(true);
                          setModalData({
                            leadId: item.id,
                            status: item.status,
                            statusName: item.statusName,
                          });
                        }}
                      >
                        {item.statusName}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`pointer fw-600 text-uapp`}
                        onClick={() => {
                          setModalForAssign(true);
                          setModalData({
                            leadId: item.id,
                            branchId: item.branchId,
                            consultantId: item.consultantId,
                          });
                        }}
                      >
                        {item.assignedTo ? item.assignedTo : "Unassigned"}
                      </span>
                    </td>

                    <td>
                      <Preview url={`/lead/profile/${item.id}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination
            dataPerPage={dataPerPage}
            totalData={data?.totalEntity}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>

      <Modal
        isOpen={modalForStaus}
        toggle={() => setModalForStatus(false)}
        className="uapp-modal"
      >
        <ModalBody>
          <LeadStatus
            data={modalData}
            refetch={() => setSuccess(!success)}
            action={() => setModalForStatus(false)}
          />
        </ModalBody>
      </Modal>

      <Modal
        isOpen={modalForAssign}
        toggle={() => setModalForAssign(false)}
        className="uapp-modal"
      >
        <ModalBody>
          <LeadAssign
            data={modalData}
            refetch={() => setSuccess(!success)}
            action={() => setModalForAssign(false)}
          />
        </ModalBody>
      </Modal>

      <Modal
        isOpen={modalForAddLead}
        toggle={() => setModalForAddLead(false)}
        className="uapp-modal"
      >
        <ModalBody>
          <LeadAdd
            refetch={() => setSuccess(!success)}
            action={() => setModalForAddLead(false)}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default LeadList;
