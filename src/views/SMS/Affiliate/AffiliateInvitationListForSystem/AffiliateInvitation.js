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
import InvitationAction from "./InvitationAction";
import Typing from "../../../../components/form/Typing";
import { Filter } from "react-feather";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import Pagination from "../../Pagination/Pagination";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Select from "react-select";
import DataShow from "../../../../components/Dropdown/DataShow";
import LinkButton from "../../Components/LinkButton";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import Loader from "../../Search/Loader/Loader";
import { userTypes } from "../../../../constants/userTypeConstant";
import { useParams } from "react-router";

const AffiliateInvitation = () => {
  const { addToast } = useToasts();

  const referenceId = localStorage.getItem("referenceId");
  const userTypeId = localStorage.getItem("userType");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [inStatusLable, setStatusLable] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const { affiliateId } = useParams();

  useEffect(() => {
    if (!isTyping) {
      get(
        `AffiliateInvitation?&page=${currentPage}&pageSize=${dataPerPage}&fromdate=${fromDate}&todate=${toDate}&status=${statusValue}&email=${searchStr}&affiliateid=${affiliateId}`
      ).then((res) => {
        console.log(res);
        setData(res?.models);
        setEntity(res?.totalEntity);
        setLoading(false);
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
    success,
    affiliateId,
  ]);

  const closeModal = () => {
    setModalOpen(false);
    setEmail("");
    setEmailError("");
    // setSuccess(!success);
  };
  const handleEmailError = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Email is not Valid");
    } else {
      setButtonStatus(true);
      setProgress(true);
      post(`AffiliateInvitation/Invite/${email}`, subData).then((action) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
        setEmail("");
        setModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      });
    }
  };
  return (
    <>
      <BreadCrumb title="Invitation List" backTo="" path="/" />
      <Card className="uapp-employee-search zindex-100">
        <CardBody>
          <div className="row">
            <div className="col-md-3 mb-2">
              <span>From Date</span>

              <Input
                type="date"
                onChange={(e) => {
                  setfromDate(e.target.value);
                }}
                value={fromDate}
              />
            </div>
            <div className="col-md-3 mb-2">
              <span>To Date</span>

              <Input
                type="date"
                onChange={(e) => {
                  settoDate(e.target.value);
                }}
                value={toDate}
              />
            </div>

            <div className="col-md-3 mb-2">
              <span>Status</span>

              <DefaultDropdown
                label={inStatusLable}
                setLabel={setStatusLable}
                value={statusValue}
                setValue={setStatusValue}
                url="InvitationStatusDD"
                name="status"
                error={() => {}}
                setError={() => {}}
                action={() => {}}
              />
            </div>
            <div className="col-md-3 mb-2">
              <span>Email</span>

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

      {loading ? (
        <Loader />
      ) : (
        <Card className="uapp-employee-search">
          <CardBody>
            <Row className="mb-3">
              <Col
                lg="5"
                md="5"
                sm="12"
                xs="12"
                style={{ marginBottom: "10px" }}
              >
                {userTypeId === userTypes?.Affiliate.toString() ? (
                  <LinkButton
                    className={"btn btn-uapp-add "}
                    name={"Invite"}
                    icon={<i className="fas fa-plus"></i>}
                    func={() => setModalOpen(true)}
                  />
                ) : null}
              </Col>

              <Col lg="7" md="7" sm="12" xs="12">
                <div className="d-flex justify-content-end">
                  <DataShow
                    dataPerPage={dataPerPage}
                    setDataPerPage={setDataPerPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </Col>
            </Row>
            {data?.length === 0 ? (
              <h4 className="text-center">No Data Found</h4>
            ) : (
              <>
                <div className="table-responsive fixedhead mb-2">
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="tablehead">
                      <tr>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Source</th>
                        <th>University</th>
                        <th>Course</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, i) => (
                        <tr key={i} className="border-buttom">
                          <td>{item?.date}</td>
                          <td>{item?.email}</td>
                          <td>{item?.source}</td>
                          <td>{item?.university} </td>
                          <td>{item?.course}</td>
                          <td>{item?.status}</td>
                          <td className="text-id hover">
                            <InvitationAction
                              text={
                                item?.statusId === 1 ? "Resend" : "Timeline"
                              }
                              email={item?.email}
                              data={item?.companionInvitationTimeline}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
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
      )}

      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
        <ModalBody>
          <h4 className="mb-3">Send Invitation to email</h4>
          <Form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="consultantId"
              id="consultantId"
              value={referenceId}
            />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>
                  <span className="text-danger">*</span>Email
                </span>
              </Col>
              <Col md="8">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Write Email"
                  onChange={(e) => {
                    handleEmailError(e);
                  }}
                />
                <span className="text-danger">{emailError}</span>
              </Col>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between mt-3">
              <CancelButton cancel={closeModal} />

              <SaveButton
                text="Send Email"
                progress={progress}
                buttonStatus={buttonStatus}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AffiliateInvitation;
