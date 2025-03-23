import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  NavLink,
  NavItem,
  Nav,
} from "reactstrap";
import { useHistory, useLocation } from "react-router";
import get from "../../../helpers/get";
import { rootUrl } from "../../../constants/constants";
import ButtonForFunction from "../Components/ButtonForFunction";
import { userTypes } from "../../../constants/userTypeConstant";
import { permissionList } from "../../../constants/AuthorizationConstant";
import SpanButton from "../Components/SpanButton";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const ConsultantDetails = () => {
  const { consultantRegisterId } = useParams();
  const [priceRangeList, setPriceRangeList] = useState([]);
  const [activetab, setActivetab] = useState("1");

  const [commissionGroupList, setCommissionGrouplist] = useState([]);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const location = useLocation();
  const history = useHistory();

  const userTypeId = localStorage.getItem("userType");

  const [consultantData, setConsultantData] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [eligibility, setEligibility] = useState({});
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalOpen1, setViewModalOpen1] = useState(false);
  const [viewModalOpen2, setViewModalOpen2] = useState(false);
  const [viewModalOpen3, setViewModalOpen3] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);

  console.log("ID ID ID", consultantRegisterId);

  useEffect(() => {
    get(`Consultant/Profile/${consultantRegisterId}`).then((res) => {
      setConsultantData(res);
      setContactInfo(res?.consultantContact);
      setEligibility(res?.consultantProfileEligibility);
      console.log("cons data", res);
      setLoading(false);
    });

    get(`GroupPriceRange/ByConsultant/${consultantRegisterId}`).then((res) => {
      setPriceRangeList(res);
      setLoading(false);
    });

    get(`ConsultantCommissionGroup/Index/${consultantRegisterId}`).then(
      (res) => {
        setCommissionGrouplist(res);
        setLoading(false);
      }
    );
  }, []);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleUpdateBankDetailsFromProfile = () => {
    history.push(`/consultantBankInformation/${consultantRegisterId}`);
  };

  // on Close Modal
  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const closeViewModal1 = () => {
    setViewModalOpen1(false);
  };

  const closeViewModal2 = () => {
    setViewModalOpen2(false);
  };

  const closeViewModal3 = () => {
    setViewModalOpen3(false);
  };

  // redirect to dashboard
  const backToConsultantList = () => {
    history.push(`/consultantProfile/${consultantRegisterId}`);
  };

  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/consultantDetails/${consultantRegisterId}`);
    }

    if (tab == "2") {
      history.push(`/consultantTermsandConditions/${consultantRegisterId}`);
    }
  };

  const handleEdit = () => {
    history.push(`/consultantInformation/${consultantRegisterId}`);
  };

  return (
    <>
      <div className="">
        <BreadCrumb
          title="Consultant Details"
          backTo={
            !(userTypeId == userTypes?.Consultant) ? "Consultant Profile" : null
          }
          path={
            !(userTypeId == userTypes?.Consultant)
              ? `/consultantProfile/${consultantRegisterId}`
              : null
          }
        />

        <Card>
          <CardBody>
            <Nav tabs>
              <NavItem>
                <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                  Details
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Terms & Conditions
                </NavLink>
              </NavItem>

              <div className="ml-auto">
                <SpanButton
                  icon={
                    <i
                      style={{ cursor: "pointer" }}
                      className="fas fa-pencil-alt pencil-style"
                    ></i>
                  }
                  func={handleEdit}
                  permission={6}
                />
              </div>
            </Nav>

            <div className="hedding-titel mt-4">
              <h5>
                {" "}
                <b>General Information</b>{" "}
              </h5>
              <div className="bg-h"></div>
            </div>
            <Table className="table-bordered mt-4">
              <tbody>
                <tr>
                  <td width="40%">
                    <b> Name:</b>
                  </td>

                  <td width="60%">
                    {consultantData?.nameTitle?.name}{" "}
                    {consultantData?.firstName} {consultantData?.lastName}
                  </td>
                </tr>

                <tr>
                  <td width="40%">
                    <b> Consultant Type:</b>
                  </td>

                  <td width="60%">{consultantData?.consultantType?.name}</td>
                </tr>

                <tr>
                  <td width="40%">
                    <b>Recruitment Type:</b>
                  </td>

                  <td width="60%">
                    {/* {consultantData?.isAcceptedHome == true  ? "Home/UK, " : null}{" "}{consultantData?.isAcceptedEU_UK == true ? "EU/EEU, " : null}{" "}
                              {consultantData?.isAcceptedInternational == true ? "International" : null} */}

                    {consultantData?.isAcceptedHome == true &&
                    consultantData?.isAcceptedEU_UK == true &&
                    consultantData?.isAcceptedInternational == true
                      ? "Home/UK, EU/EEU, International"
                      : consultantData?.isAcceptedHome == true &&
                        consultantData?.isAcceptedEU_UK == true &&
                        consultantData?.isAcceptedInternational == false
                      ? "Home/UK, EU/EEU"
                      : consultantData?.isAcceptedHome == true &&
                        consultantData?.isAcceptedEU_UK == false &&
                        consultantData?.isAcceptedInternational == false
                      ? "Home/UK"
                      : consultantData?.isAcceptedHome == false &&
                        consultantData?.isAcceptedEU_UK == true &&
                        consultantData?.isAcceptedInternational == true
                      ? "EU/EEU, International"
                      : consultantData?.isAcceptedHome == false &&
                        consultantData?.isAcceptedEU_UK == false &&
                        consultantData?.isAcceptedInternational == true
                      ? "International"
                      : consultantData?.isAcceptedHome == true &&
                        consultantData?.isAcceptedEU_UK == false &&
                        consultantData?.isAcceptedInternational == true
                      ? "Home/UK, International"
                      : "EU/EEU"}
                  </td>
                </tr>

                <tr>
                  <td width="40%">
                    <b>Branch:</b>
                  </td>

                  <td width="60%">{consultantData?.branch?.name}</td>
                </tr>
                <tr>
                  <td width="40%">
                    <b> Account Status:</b>
                  </td>

                  <td width="60%">
                    {consultantData?.accountStatus?.statusName}
                  </td>
                </tr>

                <tr>
                  <td width="40%">
                    <b>Registration Date:</b>
                  </td>

                  <td width="60%">{consultantData?.createdOn}</td>
                </tr>
                <tr>
                  <td width="40%">
                    <b>Have Right To Work:</b>
                  </td>

                  <td width="60%">
                    {consultantData?.haveRightToWork == null ? "No" : "Yes"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>

      <div className=" info-item mt-4">
        <Card>
          <CardBody>
            <div className="hedding-titel">
              <h5>
                {" "}
                <b>Contact Information</b>{" "}
              </h5>
              <div className="bg-h"></div>
            </div>

            <Table className="table-bordered mt-4">
              <tbody>
                <tr>
                  <td width="40%">
                    <b> Phone Number:</b>
                  </td>

                  <td width="60%">{contactInfo?.cellPhoneNumber}</td>
                </tr>

                <tr>
                  <td width="40%">
                    <b>House No:</b>
                  </td>

                  <td width="60%">{contactInfo?.houseNo}</td>
                </tr>

                <tr>
                  <td width="40%">
                    <b>Address Line:</b>
                  </td>

                  <td width="60%">{contactInfo?.addressLine}</td>
                </tr>

                <tr>
                  <td width="40%">
                    <b>Country:</b>
                  </td>

                  <td width="60%">{contactInfo?.country?.name}</td>
                </tr>

                <tr>
                  <td width="40%">
                    <b>City:</b>
                  </td>

                  <td width="60%">{contactInfo?.city}</td>
                </tr>
                <tr>
                  <td width="40%">
                    <b>State/County:</b>
                  </td>

                  <td width="60%">{contactInfo?.state}</td>
                </tr>
                <tr>
                  <td width="40%">
                    <b>Zip/Post Code:</b>
                  </td>

                  <td width="60%">{contactInfo?.zipCode}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>

      <div className=" info-item mt-4">
        <Card>
          <div className="hedding-titel d-flex justify-content-between">
            <div>
              <h5>
                {" "}
                <b>Bank Details</b>{" "}
              </h5>

              <div className="bg-h"></div>
            </div>
          </div>

          {consultantData?.bankDetails?.length > 0 ? (
            <div className="row">
              {consultantData?.bankDetails?.map((data, i) => (
                <div className="col-md-6 col-sm-12" key={i}>
                  <Card>
                    <CardBody className="consultant-card-shadow-style d-flex justify-content-between">
                      <div className="p-3">
                        <b>Account Name:</b> <span>{data?.accountName}</span>
                        <br />
                        <b>Account Number:</b>{" "}
                        <span>{data?.accountNumber}</span>
                        <br />
                        <b>Bank Address:</b> <span>{data?.bankAddress}</span>
                        <br />
                        <b>Bank Name:</b> <span>{data?.bankName}</span>
                        <br />
                        <b>BIC:</b> <span>{data?.bic}</span>
                        <br />
                        <b>Sort Code:</b> <span>{data?.sortCode}</span>
                        <br />
                        <b>Swift:</b> <span>{data?.swift}</span>
                      </div>
                      {permissions?.includes(permissionList.Edit_Consultant) ? (
                        <div className="edit-style mt-md-3">
                          <span>
                            {" "}
                            <i
                              className="fas fa-pencil-alt pencil-style"
                              onClick={handleUpdateBankDetailsFromProfile}
                            ></i>{" "}
                          </span>
                        </div>
                      ) : null}
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <span className="my-4">There is no data available here.</span>
          )}
        </Card>
      </div>

      <div className=" info-item mt-4">
        <Card>
          <div className="hedding-titel d-flex justify-content-between">
            <div>
              <h5>
                {" "}
                <b>
                  Current Commission Group{" "}
                  {priceRangeList.length > 0 ? (
                    <>: {priceRangeList[0]?.commissionGroup?.name}</>
                  ) : null}
                </b>{" "}
              </h5>

              <div className="bg-h"></div>
            </div>
          </div>

          {priceRangeList.length < 1 ? (
            <p className="mt-4">There is no data available here.</p>
          ) : (
            <div className="table-responsive  mt-4">
              <Table id="table-to-xls">
                <thead className="tablehead">
                  <tr style={{ textAlign: "center" }}>
                    <th>#</th>
                    <th>Price Range</th>
                    <th>Range From</th>
                    <th>Range To</th>
                    <th>Commission Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {priceRangeList?.map((range, i) => (
                    <tr key={range.id} style={{ textAlign: "center" }}>
                      <th scope="row">{1 + i}</th>

                      <td>{range?.priceRangeName}</td>

                      <td>{range?.rangeFrom}</td>

                      <td>{range?.rangeTo}</td>

                      <td>{range?.commissionAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </div>

      {commissionGroupList.length > 1 ? (
        <div className=" info-item mt-4">
          <Card>
            <div className="hedding-titel d-flex justify-content-between">
              <div>
                <h5>
                  {" "}
                  <b>Consultant Commission Group History</b>{" "}
                </h5>

                <div className="bg-h"></div>
              </div>
            </div>

            <span className="ml-3 mt-3">
              <b>Assigned Commission Groups</b>
            </span>
            <div className="table-responsive  mt-2">
              <Table id="table-to-xls">
                <thead className="tablehead">
                  <tr style={{ textAlign: "center" }}>
                    <th>#</th>
                    <th>Name</th>
                    <th>Applications</th>
                    <th>Status</th>
                    <th>Date Range</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {commissionGroupList?.map((commission, i) => (
                    <tr key={commission?.id} style={{ textAlign: "center" }}>
                      <th scope="row">{1 + i}</th>
                      <td>{commission?.commissionGroup?.name}</td>

                      <td>{commission?.applicationCount}</td>

                      <td>
                        {commission?.isActive == false
                          ? "Deactivated"
                          : "Active"}
                      </td>

                      <td>
                        {handleDate(commission?.createdOn)}
                        {" to "}
                        {handleDate(commission?.updatedOn)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </div>
      ) : null}

      {consultantData?.consultantTypeId == 1 ? (
        <div className=" info-item mt-4">
          <Card>
            <div className="hedding-titel">
              <h5>
                {" "}
                <b>Eligibility</b>{" "}
              </h5>
              <div className="bg-h"></div>
            </div>

            {/* {
                        consultantData?.idOrPassportMedia == null && consultantData?.proofOfAddressMedia == null && consultantData?.proofOfRightToWorkMedia == null ?
                        <div className="my-4">
                          There are no documents added here.
                        </div>
                        : */}
            <Table className="table-bordered mt-4">
              <tbody>
                <tr>
                  <td>
                    <b>Country of Citizenship:</b>
                  </td>
                  <td>{eligibility?.countryOfCitizenShip?.name}</td>
                </tr>
                <tr>
                  <td>
                    <b>Residence:</b>
                  </td>
                  <td>{eligibility?.countryOfResidence?.name}</td>
                </tr>

                {eligibility?.countryOfCitizenShip?.id ==
                eligibility?.countryOfResidence?.id ? null : (
                  <tr>
                    <td>
                      <b>Residency Status:</b>
                    </td>
                    <td>{eligibility?.residencyStatus?.name}</td>
                  </tr>
                )}

                {eligibility?.countryOfCitizenShip?.id !==
                  eligibility?.countryOfResidence?.id &&
                eligibility?.residencyStatus?.id == 2 ? (
                  <>
                    <tr>
                      <td>
                        <b>Visa Type:</b>
                      </td>
                      <td>{eligibility?.visaType}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Expiry Date of Your BRP/TRP or Visa:</b>
                      </td>
                      <td>{handleDate(eligibility?.expireDate)}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Do You Have Right to Work?</b>
                      </td>
                      <td>
                        {eligibility?.haveRightToWork !== false ? "Yes" : "No"}
                      </td>
                    </tr>
                  </>
                ) : null}

                <tr>
                  {eligibility?.idOrPassport !== null ? (
                    <>
                      <td width="40%">
                        <b>Id or Passport: </b>
                      </td>

                      <td width="60%">
                        <div className="d-flex">
                          {eligibility?.idOrPassport?.mediaType == 1 ||
                          eligibility?.idOrPassport?.mediaType == 4 ? (
                            <ButtonForFunction
                              color={"success"}
                              func={() => setViewModalOpen(true)}
                              className={"btn mr-2"}
                              name={"View"}
                              permission={6}
                            />
                          ) : eligibility?.idOrPassport?.mediaType == 5 ||
                            eligibility?.idOrPassport?.mediaType == 6 ||
                            eligibility?.idOrPassport?.mediaType == 9 ? (
                            <a
                              href={
                                "https://view.officeapps.live.com/op/embed.aspx?src=" +
                                rootUrl +
                                eligibility?.idOrPassport?.fileUrl
                              }
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button className={"btn mr-2"} color={"success"}>
                                View
                              </Button>
                            </a>
                          ) : (
                            <a
                              href={
                                rootUrl + eligibility?.idOrPassport?.fileUrl
                              }
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button className={"btn mr-2"} color={"success"}>
                                View
                              </Button>
                            </a>
                          )}

                          <Button
                            // color="primary"
                            className="btn btn-uapp-add"
                          >
                            <a
                              style={{ textDecoration: "none", color: "white" }}
                              href={
                                rootUrl + eligibility?.idOrPassport?.fileUrl
                              }
                              rel="noopener noreferrer"
                              target="_blank"
                              // download
                            >
                              Download
                            </a>
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : null}
                </tr>

                <tr>
                  {eligibility?.proofOfAddress !== null ? (
                    <>
                      <td width="40%">
                        <b>Proof of Address: </b>
                      </td>

                      <td width="60%">
                        <div className="d-flex">
                          {/* <ButtonForFunction
                                  color={"success"}
                                  func={() => setViewModalOpen1(true)}
                                  className={"btn mr-2"}
                                  name={"View"}
                                  permission={6}
                                /> */}

                          {eligibility?.proofOfAddress?.mediaType == 1 ||
                          eligibility?.proofOfAddress?.mediaType == 4 ? (
                            <ButtonForFunction
                              color={"success"}
                              func={() => setViewModalOpen1(true)}
                              className={"btn mr-2"}
                              name={"View"}
                              permission={6}
                            />
                          ) : eligibility?.proofOfAddress?.mediaType == 5 ||
                            eligibility?.proofOfAddress?.mediaType == 6 ||
                            eligibility?.proofOfAddress?.mediaType == 9 ? (
                            <a
                              href={
                                "https://view.officeapps.live.com/op/embed.aspx?src=" +
                                rootUrl +
                                eligibility?.proofOfAddress?.fileUrl
                              }
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button className={"btn mr-2"} color={"success"}>
                                View
                              </Button>
                            </a>
                          ) : (
                            <a
                              href={
                                rootUrl + eligibility?.proofOfAddress?.fileUrl
                              }
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button className={"btn mr-2"} color={"success"}>
                                View
                              </Button>
                            </a>
                          )}

                          <Button
                            // color="primary"
                            className="btn btn-uapp-add"
                          >
                            <a
                              style={{ textDecoration: "none", color: "white" }}
                              href={
                                rootUrl + eligibility?.proofOfAddress?.fileUrl
                              }
                              rel="noopener noreferrer"
                              target="_blank"
                              // download
                            >
                              Download
                            </a>
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : null}
                </tr>

                <tr>
                  {eligibility?.brp !== null ? (
                    <>
                      <td width="40%">
                        <b>BRP/TRP: </b>
                      </td>

                      <td width="60%">
                        <div className="d-flex">
                          {eligibility?.brp?.mediaType == 1 ||
                          eligibility?.brp?.mediaType == 4 ? (
                            <ButtonForFunction
                              color={"success"}
                              func={() => setViewModalOpen2(true)}
                              className={"btn mr-2"}
                              name={"View"}
                              permission={6}
                            />
                          ) : eligibility?.brp?.mediaType == 5 ||
                            eligibility?.brp?.mediaType == 6 ||
                            eligibility?.brp?.mediaType == 9 ? (
                            <a
                              href={
                                "https://view.officeapps.live.com/op/embed.aspx?src=" +
                                rootUrl +
                                eligibility?.brp?.fileUrl
                              }
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button className={"btn mr-2"} color={"success"}>
                                View
                              </Button>
                            </a>
                          ) : (
                            <a
                              href={rootUrl + eligibility?.brp?.fileUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button className={"btn mr-2"} color={"success"}>
                                View
                              </Button>
                            </a>
                          )}

                          <Button
                            // color="primary"
                            className="btn btn-uapp-add"
                          >
                            <a
                              style={{ textDecoration: "none", color: "white" }}
                              href={rootUrl + eligibility?.brp?.fileUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                              // download
                            >
                              Download
                            </a>
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : null}
                </tr>

                <tr>
                  {eligibility?.cv !== null ? (
                    <>
                      <td width="40%">
                        <b>CV: </b>
                      </td>

                      <td width="60%">
                        <div className="d-flex">
                          {eligibility?.cv?.mediaType == 1 ||
                          eligibility?.cv?.mediaType == 4 ? (
                            <ButtonForFunction
                              color={"success"}
                              func={() => setViewModalOpen3(true)}
                              className={"btn mr-2"}
                              name={"View"}
                              permission={6}
                            />
                          ) : eligibility?.cv?.mediaType == 5 ||
                            eligibility?.cv?.mediaType == 6 ||
                            eligibility?.cv?.mediaType == 9 ? (
                            <a
                              href={
                                "https://view.officeapps.live.com/op/embed.aspx?src=" +
                                rootUrl +
                                eligibility?.cv?.fileUrl
                              }
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button className={"btn mr-2"} color={"success"}>
                                View
                              </Button>
                            </a>
                          ) : (
                            <a
                              href={rootUrl + eligibility?.cv?.fileUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button className={"btn mr-2"} color={"success"}>
                                View
                              </Button>
                            </a>
                          )}

                          <Button
                            // color="primary"
                            className="btn btn-uapp-add"
                          >
                            <a
                              style={{ textDecoration: "none", color: "white" }}
                              href={rootUrl + eligibility?.cv?.fileUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                              // download
                            >
                              Download
                            </a>
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : null}
                </tr>
              </tbody>
            </Table>
            {/* } */}

            <Modal
              size={eligibility?.idOrPassport?.mediaType == 4 ? "xl" : "50%"}
              isOpen={viewModalOpen}
              toggle={closeViewModal}
              className={
                eligibility?.idOrPassport?.mediaType == 4 ? "" : "uapp-modal2"
              }
            >
              <ModalHeader>Id or Passport</ModalHeader>
              <ModalBody
                className={
                  eligibility?.idOrPassport?.mediaType == 4 ? "modalHeight" : ""
                }
              >
                {/* <Form> */}

                {eligibility?.idOrPassport?.mediaType == 1 ? (
                  <img
                    src={rootUrl + eligibility?.idOrPassport?.fileUrl}
                    alt="gallery_image"
                    className="image"
                    style={{ width: "100%" }}
                  />
                ) : eligibility?.idOrPassport?.mediaType == 4 ? (
                  <iframe
                    src={rootUrl + eligibility?.idOrPassport?.fileUrl}
                    // frameBorder="0"
                    // scrolling="auto"
                    // scrolling="no"
                    height="100%"
                    width="100%"
                    title="docs"
                  ></iframe>
                ) : //   <span>This type of file cannot be displayed. You can download it by{" "}
                //      <a
                //     href={rootUrl +
                //       consultantData?.idOrPassportMedia?.fileUrl}
                //     target="_blank"
                //   >
                //     clicking here.
                //   </a>
                // </span>
                null}
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  className="mr-1 mt-3"
                  onClick={closeViewModal}
                >
                  Close
                </Button>
              </ModalFooter>
            </Modal>

            <Modal
              size={eligibility?.proofOfAddress?.mediaType == 4 ? "xl" : "50%"}
              isOpen={viewModalOpen1}
              toggle={closeViewModal1}
              className={
                eligibility?.proofOfAddress?.mediaType == 4 ? "" : "uapp-modal2"
              }
            >
              <ModalHeader>Proof of Address</ModalHeader>
              <ModalBody
                className={
                  eligibility?.proofOfAddress?.mediaType == 4
                    ? "modalHeight"
                    : ""
                }
              >
                {/* <Form> */}

                {eligibility?.proofOfAddress?.mediaType == 1 ? (
                  <img
                    src={rootUrl + eligibility?.proofOfAddress?.fileUrl}
                    alt="gallery_image"
                    className="image"
                    style={{ width: "100%" }}
                  />
                ) : eligibility?.proofOfAddress?.mediaType == 4 ? (
                  <iframe
                    src={rootUrl + eligibility?.proofOfAddress?.fileUrl}
                    // frameBorder="0"
                    // scrolling="auto"
                    // scrolling="no"
                    height="100%"
                    width="100%"
                    title="docs"
                  ></iframe>
                ) : //   <span>This type of file cannot be displayed. You can download it by{" "}
                //      <a
                //     href={rootUrl +
                //       consultantData?.proofOfAddressMedia?.fileUrl}
                //     target="_blank"
                //   >
                //     clicking here.
                //   </a>
                // </span>
                null}
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  className="mr-1 mt-3"
                  onClick={closeViewModal1}
                >
                  Close
                </Button>
              </ModalFooter>
            </Modal>

            <Modal
              size={eligibility?.brp?.mediaType == 4 ? "xl" : "50%"}
              isOpen={viewModalOpen2}
              toggle={closeViewModal2}
              className={eligibility?.brp?.mediaType == 4 ? "" : "uapp-modal2"}
            >
              <ModalHeader>BRP/TRP</ModalHeader>
              <ModalBody
                className={
                  eligibility?.brp?.mediaType == 4 ? "modalHeight" : ""
                }
              >
                {/* <Form> */}

                {eligibility?.brp?.mediaType == 1 ? (
                  <img
                    src={rootUrl + eligibility?.brp?.fileUrl}
                    alt="gallery_image"
                    className="image"
                    style={{ width: "100%" }}
                  />
                ) : eligibility?.brp?.mediaType == 4 ? (
                  <iframe
                    src={rootUrl + eligibility?.brp?.fileUrl}
                    // frameBorder="0"
                    // scrolling="auto"
                    // scrolling="no"
                    height="100%"
                    width="100%"
                    title="docs"
                  ></iframe>
                ) : //   <span>This type of file cannot be displayed. You can download it by{" "}
                //      <a
                //     href={rootUrl +
                //       consultantData?.proofOfRightToWorkMedia?.fileUrl}
                //     target="_blank"
                //   >
                //     clicking here.
                //   </a>
                // </span>
                null}
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  className="mr-1 mt-3"
                  onClick={closeViewModal2}
                >
                  Close
                </Button>
              </ModalFooter>
            </Modal>

            <Modal
              size={eligibility?.cv?.mediaType == 4 ? "xl" : "50%"}
              isOpen={viewModalOpen3}
              toggle={closeViewModal3}
              className={eligibility?.cv?.mediaType == 4 ? "" : "uapp-modal2"}
            >
              <ModalHeader>CV</ModalHeader>
              <ModalBody
                className={eligibility?.cv?.mediaType == 4 ? "modalHeight" : ""}
              >
                {/* <Form> */}

                {eligibility?.cv?.mediaType == 1 ? (
                  <img
                    src={rootUrl + eligibility?.cv?.fileUrl}
                    alt="gallery_image"
                    className="image"
                    style={{ width: "100%" }}
                  />
                ) : eligibility?.cv?.mediaType == 4 ? (
                  <iframe
                    src={rootUrl + eligibility?.cv?.fileUrl}
                    // frameBorder="0"
                    // scrolling="auto"
                    // scrolling="no"
                    height="100%"
                    width="100%"
                    title="docs"
                  ></iframe>
                ) : //   <span>This type of file cannot be displayed. You can download it by{" "}
                //      <a
                //     href={rootUrl +
                //       consultantData?.proofOfRightToWorkMedia?.fileUrl}
                //     target="_blank"
                //   >
                //     clicking here.
                //   </a>
                // </span>
                null}
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  className="mr-1 mt-3"
                  onClick={closeViewModal3}
                >
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default ConsultantDetails;
