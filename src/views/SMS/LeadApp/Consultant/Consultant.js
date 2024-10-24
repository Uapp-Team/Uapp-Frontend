import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Form, Row, Table } from "reactstrap";
import SaveButton from "../../../../components/buttons/SaveButton";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import Lget from "../../../../helpers/Lget";
import PrintFile from "../../ReactTableConvertToXl/PrintFile";
import DataShow from "../../../../components/Dropdown/DataShow";
import ToggleSwitch from "../../Components/ToggleSwitch";
import DeleteButtonForLead from "../../../../components/buttons/DeleteButtonForLead";
import Lput from "../../../../helpers/Lput";
import { useToasts } from "react-toast-notifications";
import Pagination from "../../Pagination/Pagination";

const Consultant = () => {
  const componentRef = useRef();
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [lable, setLable] = useState("Select Consultant");
  const [consultantId, setConsultantId] = useState(0);
  const [data, setData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [consultantIdError, setConsultantIdError] = useState("");

  useEffect(() => {
    Lget("Consultant/Index").then((res) => {
      setData(res?.data);
    });
  }, [success]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (consultantId === 0) {
      setConsultantIdError(true);
    } else {
      setConsultantIdError(false);
      setIsSubmit(true);
      Lput(`Consultant/Assign?id=${consultantId}`).then((res) => {
        setIsSubmit(false);
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
      });
      setIsSubmit(false);
    }
  };

  return (
    <>
      <BreadCrumb title="Lead Consultant" backTo="" path="/" />

      <Card className="uapp-employee-search zindex-100">
        <CardBody className="search-card-body">
          <p>Select consultant form uapp to work on lead management</p>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col sm={5} className="mb-3">
                <DefaultDropdown
                  label={lable}
                  setLabel={setLable}
                  value={consultantId}
                  setValue={setConsultantId}
                  url={`consultantdd/ActiveConsultant`}
                  name="consultantId"
                  error={consultantIdError}
                  setError={setConsultantIdError}
                  errorText="Please select a consultant"
                  action={() => {}}
                />
              </Col>
              <Col sm={2} className="mb-3">
                <SaveButton text="Assign" buttonStatus={isSubmit} />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <Row>
            <Col lg="5" md="5" sm="12" xs="12">
              <p className="fs-16px fw-600">Assigned Consultants</p>
            </Col>
            <Col lg="7" md="7" sm="12" xs="12">
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
                  {/* <th>Uapp ID</th> */}
                  <th>Name</th>
                  <th>Total</th>
                  <th>In Progress</th>
                  <th>Converted</th>
                  <th>Conversation Rate</th>
                  <th>Response Rate</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, i) => (
                  <tr key={i}>
                    {/* <td>{item.name}</td> */}
                    <td>{item.name}</td>
                    <td>{item.totalLead}</td>
                    <td>{item.inProcessLead}</td>
                    <td>{item.convertedLead}</td>
                    <td>{item.convertedLead}</td>
                    <td>1 hour</td>
                    <td>
                      <ToggleSwitch
                        defaultChecked={true}
                        onChange={(e) => {}}
                      />
                    </td>
                    <td>
                      <DeleteButtonForLead
                        url={`Consultant/unassign?id=${item?.id}`}
                        success={success}
                        setSuccess={setSuccess}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination
            dataPerPage={dataPerPage}
            totalData={1}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Consultant;
