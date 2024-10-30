import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Image } from "antd";
import { Upload } from "antd";
import * as Icon from "react-feather";

import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavLink,
  NavItem,
  Nav,
} from "reactstrap";

import { useHistory, useLocation } from "react-router";
import { rootUrl } from "../../../../../../constants/constants";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import SpanButton from "../../../../Components/SpanButton";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import get from "../../../../../../helpers/get";
import { dateFormate } from "../../../../../../components/date/calenderFormate";

const ProviderAdminDetails = ({ providerAdminId, userId }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const location = useLocation();
  const history = useHistory();

  const userTypeId = localStorage.getItem("userType");

  const [consultantData, setConsultantData] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [eligibility, setEligibility] = useState({});
  const [registrationDate, setRegistrationDate] = useState("");

  const [serialNum, setSerialNum] = useState(1);

  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Account Status");
  const [statusValue, setStatusValue] = useState(0);

  const [success, setSuccess] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalOpen1, setViewModalOpen1] = useState(false);
  const [viewModalOpen2, setViewModalOpen2] = useState(false);
  const [viewModalOpen3, setViewModalOpen3] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [error, setError] = useState(false);

  const [text, setText] = useState("");

  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [error1, setError1] = useState(false);

  const [text1, setText1] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);

  const [generalInfo, setGeneralInfo] = useState({});
  const [personalInfo, setPersonalInfo] = useState({});

  useEffect(() => {
    if (providerAdminId == undefined) {
      get(`ProviderAdminProfile/Profile/${userId}`).then((res) => {
        setGeneralInfo(res?.providerAdminGeneralInformation);
        setContactInfo(res?.providerAdminAddress);
        setEligibility(res?.providerAdminEligibility);
        setPersonalInfo(res?.providerAdminPersonalInformation);
        console.log("Provider data", res);
        setLoading(false);
      });
    } else {
      get(`ProviderAdminProfile/Profile/${providerAdminId}`).then((res) => {
        setGeneralInfo(res?.providerAdminGeneralInformation);
        setContactInfo(res?.providerAdminAddress);
        setEligibility(res?.providerAdminEligibility);
        setPersonalInfo(res?.providerAdminPersonalInformation);
        console.log("Provider data", res);
        setLoading(false);
      });
    }
  }, []);


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

  const handleEdit = () => {
    history.push(`/admissionOfficerGeneralInfo/${userId}`);
  };

  return (
    <div>
      <Card>
        <CardBody>
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
                  {generalInfo?.nameTitle?.name} {generalInfo?.firstName}{" "}
                  {generalInfo?.lastName}
                </td>
              </tr>

              <tr>
                <td width="40%">
                  <b> Provider:</b>
                </td>

                <td width="60%">{generalInfo?.provider?.name}</td>
              </tr>

              <tr>
                <td width="40%">
                  <b> Email:</b>
                </td>

                <td width="60%">{generalInfo?.email}</td>
              </tr>

              {/* <tr>
                  <td width="40%">
                    <b>Admission Manager:</b>
                  </td>

                  <td width="60%">
                    {generalInfo?.}
                  </td>
                </tr> */}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="hedding-titel">
            <h5>
              {" "}
              <b>Personal Information</b>{" "}
            </h5>
            <div className="bg-h"></div>
          </div>

          <Table className="table-bordered mt-4">
            <tbody>
              <tr>
                <td width="40%">
                  <b> Date of Birth:</b>
                </td>

                <td width="60%">{dateFormate(personalInfo?.dateOfBirth)}</td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Passport/Id:</b>
                </td>

                <td width="60%">{personalInfo?.passportId}</td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Gender:</b>
                </td>

                <td width="60%">{personalInfo?.gender?.name}</td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Marital Status:</b>
                </td>

                <td width="60%">{personalInfo?.maritalStatus?.name}</td>
              </tr>

              <tr>
                <td width="40%">
                  <b>Phone Number:</b>
                </td>

                <td width="60%">{personalInfo?.phoneNumber}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>

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

      <Card>
        <CardBody>
          <div className="hedding-titel">
            <h5>
              {" "}
              <b>Eligibility</b>{" "}
            </h5>
            <div className="bg-h"></div>
          </div>

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
                    <td>{dateFormate(eligibility?.expireDate)}</td>
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
                            href={rootUrl + eligibility?.idOrPassport?.fileUrl}
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
                            href={rootUrl + eligibility?.idOrPassport?.fileUrl}
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
                eligibility?.proofOfAddress?.mediaType == 4 ? "modalHeight" : ""
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
              className={eligibility?.brp?.mediaType == 4 ? "modalHeight" : ""}
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
        </CardBody>
      </Card>
    </div>
  );
};

export default ProviderAdminDetails;
